import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {OutdoorCenterSummaryList} from '../../../../outdoor-centers/presentation/components/outdoor-center-summary-list/outdoor-center-summary-list';

/**
 * Home view with the outdoor centers overview.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, OutdoorCenterSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
