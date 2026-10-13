import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {map} from 'rxjs';
import {OutdoorCentersStore} from '../../../application/outdoor-centers.store';
import {OutdoorCenterSummary} from '../outdoor-center-summary/outdoor-center-summary';

/**
 * Grid with the summary of every outdoor center.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-outdoor-center-summary-list',
  imports: [MatGridListModule, MatProgressBarModule, TranslatePipe, OutdoorCenterSummary],
  templateUrl: './outdoor-center-summary-list.html',
  styleUrl: './outdoor-center-summary-list.css'
})
export class OutdoorCenterSummaryList {
  private readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly store = inject(OutdoorCentersStore);
  protected readonly columns = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(result => (result.matches ? 1 : 2))),
    {initialValue: 2}
  );
}
