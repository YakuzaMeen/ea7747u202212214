import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {OutdoorCentersStore} from '../../../application/outdoor-centers.store';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {ACTIVITY_TYPES, ActivityType} from '../../../domain/model/activity-type';
import {Reservation} from '../../../domain/model/reservation.entity';
import {notBlankValidator} from '../../../../shared/presentation/validators/not-blank.validator';

/**
 * Form to register a new reservation.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private readonly router = inject(Router);
  private readonly outdoorCentersStore = inject(OutdoorCentersStore);
  protected readonly weatherStore = inject(WeatherStore);

  protected readonly activityTypes = ACTIVITY_TYPES;
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = new FormGroup({
    activityType: new FormControl<ActivityType | null>(null, Validators.required),
    participantName: new FormControl('', {nonNullable: true, validators: [Validators.required, notBlankValidator]}),
    participants: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
      control => this.validateCapacity(control)
    ])
  });

  private readonly selectedActivityType = toSignal(this.form.controls.activityType.valueChanges, {initialValue: null});
  private readonly formStatus = toSignal(this.form.statusChanges, {initialValue: this.form.status});

  protected readonly selectedOutdoorCenter = computed(() => {
    const activityType = this.selectedActivityType();
    return activityType ? this.outdoorCentersStore.findOutdoorCenterByActivityType(activityType) : undefined;
  });

  private readonly selectedOutdoorCenterId = computed(() => this.selectedOutdoorCenter()?.id);

  protected readonly canSubmit = computed(() =>
    this.formStatus() === 'VALID' &&
    this.selectedOutdoorCenter() !== undefined &&
    this.weatherStore.hasValidTemperature() &&
    !this.submitting()
  );

  constructor() {
    this.weatherStore.reset();
    effect(() => {
      if (this.selectedOutdoorCenterId() !== undefined) {
        untracked(() => this.loadWeather());
      }
    });
    effect(() => {
      this.selectedOutdoorCenter();
      untracked(() => this.form.controls.participants.updateValueAndValidity());
    });
  }

  protected loadWeather(): void {
    const outdoorCenter = this.selectedOutdoorCenter();
    if (outdoorCenter) {
      this.weatherStore.loadCurrentWeather(outdoorCenter.latitude, outdoorCenter.longitude);
    }
  }

  protected submit(): void {
    const outdoorCenter = this.selectedOutdoorCenter();
    const currentWeather = this.weatherStore.currentWeather();
    if (!this.canSubmit() || !outdoorCenter || !currentWeather) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set(null);
    const reservation = new Reservation({
      id: 0,
      outdoorCenterId: outdoorCenter.id,
      activityType: outdoorCenter.activityType,
      participantName: this.form.controls.participantName.value.trim(),
      participants: Number(this.form.controls.participants.value),
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date()
    });
    this.outdoorCentersStore.createReservation(reservation).subscribe({
      next: () => this.router.navigate(['/home']).then(),
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.submitting.set(false);
      }
    });
  }

  protected cancel(): void {
    this.router.navigate(['/home']).then();
  }

  private validateCapacity(control: AbstractControl): ValidationErrors | null {
    const outdoorCenter = untracked(() => this.selectedOutdoorCenter?.());
    if (!outdoorCenter || control.value === null) {
      return null;
    }
    return Number(control.value) > outdoorCenter.availableCapacity
      ? {exceedsCapacity: {capacity: outdoorCenter.availableCapacity}}
      : null;
  }
}
