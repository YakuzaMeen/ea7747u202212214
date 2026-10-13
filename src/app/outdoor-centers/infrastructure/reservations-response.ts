import {BaseResource} from '../../shared/infrastructure/base-resource';

/**
 * Reservation resource returned by the API.
 * @author Oskar Sosa
 */
export interface ReservationResource extends BaseResource {
  id: number;
  outdoorCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
