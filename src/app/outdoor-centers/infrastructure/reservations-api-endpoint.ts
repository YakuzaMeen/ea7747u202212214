import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource} from './reservations-response';
import {ReservationAssembler} from './reservation-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for reservation operations.
 * @author Oskar Sosa
 */
export class ReservationsApiEndpoint extends BaseApiEndpoint<Reservation, ReservationResource, ReservationAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`,
      new ReservationAssembler()
    );
  }

  getByOutdoorCenterId(outdoorCenterId: number): Observable<Reservation[]> {
    const params = new HttpParams().set('outdoorCenterId', outdoorCenterId);
    return this.http.get<ReservationResource[]>(this.endpointUrl, {params}).pipe(
      map(resources => resources.map(resource => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch reservations'))
    );
  }

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<ReservationResource>(this.endpointUrl, this.assembler.toRequestFromEntity(reservation)).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to create reservation'))
    );
  }
}
