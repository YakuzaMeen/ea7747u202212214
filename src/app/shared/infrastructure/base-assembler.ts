import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource} from './base-resource';

/**
 * Base contract for mapping between domain entities and API resources.
 * @author Oskar Sosa
 */
export interface BaseAssembler<TEntity extends BaseEntity, TResource extends BaseResource> {
  toEntityFromResource(resource: TResource): TEntity;

  toResourceFromEntity(entity: TEntity): TResource;
}
