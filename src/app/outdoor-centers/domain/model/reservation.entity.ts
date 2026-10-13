import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Reservation of participants in an outdoor center.
 * @author Oskar Sosa
 */
export class Reservation implements BaseEntity {
  id: number;
  outdoorCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: Date;

  constructor(reservation: {
    id: number;
    outdoorCenterId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.id = reservation.id;
    this.outdoorCenterId = reservation.outdoorCenterId;
    this.activityType = reservation.activityType;
    this.participantName = reservation.participantName;
    this.participants = reservation.participants;
    this.weatherTemperature = reservation.weatherTemperature;
    this.reservedAt = reservation.reservedAt;
  }
}
