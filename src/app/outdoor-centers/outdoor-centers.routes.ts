import {Routes} from '@angular/router';

const reservationForm = () =>
  import('./presentation/views/reservation-form/reservation-form').then(m => m.ReservationForm);

/**
 * Child routes for the outdoor centers bounded context.
 * @author Oskar Sosa
 */
export const outdoorCentersRoutes: Routes = [
  {path: 'new', loadComponent: reservationForm, title: 'TrailGo - New Reservation'}
];
