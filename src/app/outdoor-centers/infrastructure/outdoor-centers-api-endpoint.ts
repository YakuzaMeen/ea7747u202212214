import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {OutdoorCenter} from '../domain/model/outdoor-center.entity';
import {OutdoorCenterResource} from './outdoor-centers-response';
import {OutdoorCenterAssembler} from './outdoor-center-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for outdoor center operations.
 * @author Oskar Sosa
 */
export class OutdoorCentersApiEndpoint extends BaseApiEndpoint<OutdoorCenter, OutdoorCenterResource, OutdoorCenterAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderOutdoorCentersEndpointPath}`,
      new OutdoorCenterAssembler()
    );
  }
}
