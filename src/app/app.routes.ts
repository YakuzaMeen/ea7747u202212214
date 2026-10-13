import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const outdoorCentersRoutes = () =>
  import('./outdoor-centers/outdoor-centers.routes').then(m => m.outdoorCentersRoutes);

/**
 * Root routes of the application.
 * @author Oskar Sosa
 */
export const routes: Routes = [
  {path: 'home', component: Home, title: 'TrailGo - Home'},
  {path: 'reservations', loadChildren: outdoorCentersRoutes},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', loadComponent: pageNotFound, title: 'TrailGo - Page Not Found'}
];
