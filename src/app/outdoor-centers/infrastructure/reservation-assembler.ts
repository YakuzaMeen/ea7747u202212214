import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {ReservationResource} from './reservations-response';
import {CreateReservationRequest} from './create-reservation.request';

/**
 * Maps reservation entities to and from API resources and requests.
 * @author Oskar Sosa
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource> {
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation({
      id: resource.id,
      outdoorCenterId: resource.outdoorCenterId,
      activityType: resource.activityType as ActivityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt)
    });
  }

  toResourceFromEntity(entity: Reservation): ReservationResource {
    return {
      id: entity.id,
      ...this.toRequestFromEntity(entity)
    };
  }

  toRequestFromEntity(entity: Reservation): CreateReservationRequest {
    return {
      outdoorCenterId: entity.outdoorCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString()
    };
  }
}
