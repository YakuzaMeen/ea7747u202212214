import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';
import {Reservation} from './reservation.entity';

/**
 * Outdoor center with its reservations and capacity rules.
 * @author Oskar Sosa
 */
export class OutdoorCenter implements BaseEntity {
  id: number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
  reservations: Reservation[];

  constructor(outdoorCenter: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
    reservations?: Reservation[];
  }) {
    this.id = outdoorCenter.id;
    this.name = outdoorCenter.name;
    this.activityType = outdoorCenter.activityType;
    this.capacity = outdoorCenter.capacity;
    this.latitude = outdoorCenter.latitude;
    this.longitude = outdoorCenter.longitude;
    this.reservations = outdoorCenter.reservations ?? [];
  }

  get totalParticipants(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  get availableCapacity(): number {
    return this.capacity - this.totalParticipants;
  }

  get hasReservations(): boolean {
    return this.reservations.length > 0;
  }

  canAccept(participants: number): boolean {
    return Number.isInteger(participants) && participants > 0 && participants <= this.availableCapacity;
  }

  withReservations(reservations: Reservation[]): OutdoorCenter {
    return new OutdoorCenter({
      id: this.id,
      name: this.name,
      activityType: this.activityType,
      capacity: this.capacity,
      latitude: this.latitude,
      longitude: this.longitude,
      reservations
    });
  }
}
