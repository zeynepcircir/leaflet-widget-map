import { Component, importProvidersFrom } from '@angular/core';
import { SensorMapComponent } from '../../modules/sensor-map/sensor-map.component';
import { SensorDashboardComponent } from '../../shared/dashboard/sensor-dashboard/sensor-dashboard.component';

@Component({
  selector: 'app-main',
  imports: [SensorMapComponent, SensorDashboardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}