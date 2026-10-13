import {BaseResource} from '../../shared/infrastructure/base-resource';

/**
 * Outdoor center resource returned by the API.
 * @author Oskar Sosa
 */
export interface OutdoorCenterResource extends BaseResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}
