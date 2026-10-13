import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {OutdoorCentersApiEndpoint} from './outdoor-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';
import {OutdoorCenter} from '../domain/model/outdoor-center.entity';
import {Reservation} from '../domain/model/reservation.entity';

/**
 * API facade for outdoor centers and reservations.
 * @author Oskar Sosa
 */
@Service()
export class OutdoorCentersApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly outdoorCentersEndpoint = new OutdoorCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getOutdoorCenters(): Observable<OutdoorCenter[]> {
    return this.outdoorCentersEndpoint.getAll();
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  getReservationsByOutdoorCenterId(outdoorCenterId: number): Observable<Reservation[]> {
    return this.reservationsEndpoint.getByOutdoorCenterId(outdoorCenterId);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.reservationsEndpoint.create(reservation);
  }
}
