import { Component } from '@angular/core';
import { SensorMapComponent } from '../../modules/sensor-map/sensor-map.component';
import { DevicesComponent } from '../../shared/devices/devices.component';
@Component({
  selector: 'app-main',
  imports: [SensorMapComponent, DevicesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}