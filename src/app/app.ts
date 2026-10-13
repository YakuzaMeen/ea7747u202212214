import {Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Root component of the application.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html'
})
export class App {
}
