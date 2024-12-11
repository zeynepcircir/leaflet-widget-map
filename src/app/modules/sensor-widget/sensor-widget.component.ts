import { Component, Input } from '@angular/core';
import { Sensor } from '../../shared/types/sensor.type';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sensor-widget',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sensor-widget.component.html',
    styleUrl: './sensor-widget.component.css',
})
export class SensorWidgetComponent {
    @Input() sensor!: Sensor;

    constructor() {}

    selectSensor() {
    }
}
