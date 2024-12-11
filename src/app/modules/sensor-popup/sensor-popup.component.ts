import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sensor-popup',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './sensor-popup.component.html',
    styleUrl: './sensor-popup.component.css',
})
export class SensorPopupComponent implements OnInit {
    @Input() sensor!: Sensor;

    protected PopupState = PopupState;
    protected popupState: PopupState = PopupState.INFORMATION;

    private newTemperature?: number;
    private newHumidity?: number;

    constructor() {}

    ngOnInit(): void {
        this.sensor.isSelected.set(false);
    }
    temperatureChange(e: Event) {
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
        this.setPage(PopupState.INFORMATION);
    }

    humidityChange(e: Event) {
        const inputEl = e.target as HTMLInputElement;
        const val = Number(inputEl.value);
        this.newHumidity = val;
    }

    updateHumidity() {
        if (!this.newHumidity || this.newHumidity < 0 || this.newHumidity > 100)
            return;
        this.sensor.humidity.set(this.newHumidity);
        this.setPage(PopupState.INFORMATION);
    }

    setPage(state: PopupState) {
        this.popupState = state;
    }

    closePopup() {
    }

    cancel() {
        this.setPage(PopupState.INFORMATION);
    }
}

enum PopupState {
    INFORMATION,
    TEMPERATURE,
    HUMIDITY,
}
