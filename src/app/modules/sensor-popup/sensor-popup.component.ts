import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { FormsModule } from '@angular/forms';
import { BaseDataService } from '../../shared/services/base-data.service';

@Component({
  selector: 'app-sensor-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sensor-popup.component.html',
  styleUrl: './sensor-popup.component.css',
})
export class SensorPopupComponent implements OnInit {
  @Input() sensor!: Sensor;
  private newTemperature?: number;
  private newHumidity?: number;
  protected PopupState = PopupState;
  protected popupState: PopupState = PopupState.INFORMATION;

  constructor(private dataService: BaseDataService) { }

  ngOnInit(): void {
    this.sensor.isSelected.set(false);
  }

  humidity(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    const val = Number(inputEl.value);
    this.newHumidity = val;
  }

  updateHumidity() {
    if (!this.newHumidity || this.newHumidity < 0 || this.newHumidity > 100)
      return;
    this.sensor.humidity.set(this.newHumidity);
    this.navigateToPage(PopupState.INFORMATION);
  }

  temperature(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    const val = Number(inputEl.value);
    this.newTemperature = val;
  }

  updateTemperature() {
    if (
      !this.newTemperature ||
      this.newTemperature < -273.17 ||
      this.newTemperature > 100
    )
      return;
    this.sensor.temperature.set(this.newTemperature);
    this.navigateToPage(PopupState.INFORMATION);
  }

  navigateToPage(state: PopupState) {
    this.popupState = state;
  }

  closePopup() {
    this.dataService.unSelectedSensorId$.next(this.sensor.id);
  }

  cancel() {
    this.navigateToPage(PopupState.INFORMATION);
  }
}

enum PopupState {
  TEMPERATURE,
  HUMIDITY,
  INFORMATION,
}
