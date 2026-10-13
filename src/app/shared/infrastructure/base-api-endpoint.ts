import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource} from './base-resource';
import {BaseAssembler} from './base-assembler';

/**
 * Base endpoint with common read operations for a REST collection.
 * @author Oskar Sosa
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TAssembler extends BaseAssembler<TEntity, TResource>
> {
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {
  }

  getAll(): Observable<TEntity[]> {
    return this.http.get<TResource[]>(this.endpointUrl).pipe(
      map(resources => resources.map(resource => this.assembler.toEntityFromResource(resource))),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> =>
      throwError(() => new Error(`${operation}: ${error.statusText || 'Unexpected error'}`));
  }
}
