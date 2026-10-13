import {computed, inject, Service, signal} from '@angular/core';
import {catchError, forkJoin, Observable, switchMap, tap, throwError} from 'rxjs';
import {OutdoorCentersApi} from '../infrastructure/outdoor-centers-api';
import {OutdoorCenter} from '../domain/model/outdoor-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';

/**
 * Holds outdoor centers and reservations state.
 * @author Oskar Sosa
 */
@Service()
export class OutdoorCentersStore {
  private readonly outdoorCentersApi = inject(OutdoorCentersApi);
  private readonly outdoorCentersSignal = signal<OutdoorCenter[]>([]);
  private readonly reservationsSignal = signal<Reservation[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly outdoorCenters = computed(() =>
    this.outdoorCentersSignal().map(outdoorCenter =>
      outdoorCenter.withReservations(
        this.reservationsSignal().filter(reservation => reservation.outdoorCenterId === outdoorCenter.id)
      )
    )
  );

  constructor() {
    this.loadOutdoorCenters();
  }

  loadOutdoorCenters(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    forkJoin({
      outdoorCenters: this.outdoorCentersApi.getOutdoorCenters(),
      reservations: this.outdoorCentersApi.getReservations()
    }).subscribe({
      next: ({outdoorCenters, reservations}) => {
        this.outdoorCentersSignal.set(outdoorCenters);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('load-failed');
        this.loadingSignal.set(false);
      }
    });
  }

  findOutdoorCenterByActivityType(activityType: ActivityType): OutdoorCenter | undefined {
    return this.outdoorCenters().find(outdoorCenter => outdoorCenter.activityType === activityType);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const outdoorCenter = this.outdoorCentersSignal().find(center => center.id === reservation.outdoorCenterId);
    if (!outdoorCenter) {
      return throwError(() => new Error('outdoor-center-not-found'));
    }
    return this.outdoorCentersApi.getReservationsByOutdoorCenterId(outdoorCenter.id).pipe(
      tap(reservations => this.replaceReservations(outdoorCenter.id, reservations)),
      switchMap(reservations =>
        outdoorCenter.withReservations(reservations).canAccept(reservation.participants)
          ? this.outdoorCentersApi.createReservation(reservation)
          : throwError(() => new Error('insufficient-capacity'))
      ),
      catchError((error: Error) =>
        throwError(() => new Error(error.message === 'insufficient-capacity' ? error.message : 'create-failed'))
      ),
      tap(created => this.reservationsSignal.update(reservations => [...reservations, created]))
    );
  }

  private replaceReservations(outdoorCenterId: number, reservations: Reservation[]): void {
    this.reservationsSignal.update(current => [
      ...current.filter(reservation => reservation.outdoorCenterId !== outdoorCenterId),
      ...reservations
    ]);
  }
}
