import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';
import {OutdoorCenter} from '../../../domain/model/outdoor-center.entity';

/**
 * Card with the reservations and capacity of an outdoor center.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-outdoor-center-summary',
  imports: [MatCardModule, MatListModule, TranslatePipe, DatePipe],
  templateUrl: './outdoor-center-summary.html',
  styleUrl: './outdoor-center-summary.css'
})
export class OutdoorCenterSummary {
  readonly outdoorCenter = input.required<OutdoorCenter>();
}
