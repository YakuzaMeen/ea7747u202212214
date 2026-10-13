import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {OutdoorCenter} from '../domain/model/outdoor-center.entity';
import {ActivityType} from '../domain/model/activity-type';
import {OutdoorCenterResource} from './outdoor-centers-response';

/**
 * Maps outdoor center entities to and from API resources.
 * @author Oskar Sosa
 */
export class OutdoorCenterAssembler implements BaseAssembler<OutdoorCenter, OutdoorCenterResource> {
  toEntityFromResource(resource: OutdoorCenterResource): OutdoorCenter {
    return new OutdoorCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType as ActivityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });
  }

  toResourceFromEntity(entity: OutdoorCenter): OutdoorCenterResource {
    return {
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    };
  }
}
