import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sensor } from '../../types/sensor.type';
import { Subject, takeUntil } from 'rxjs';
import { BaseDataService } from '../../services/base-data.service';
import { SensorWidgetComponent } from '../../../modules/sensor-widget/sensor-widget.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensor-dashboard',
  standalone: true,
  imports: [FormsModule, SensorWidgetComponent, CommonModule],
  templateUrl: './sensor-dashboard.component.html',
  styleUrl: './sensor-dashboard.component.css',
})
export class SensorDashboardComponent implements OnInit, OnDestroy {
  private unsub$: Subject<void> = new Subject<void>();
  private sensors: Sensor[] = [];
  public filteredSensors: Sensor[] = [];
  public searchQuery: string = '';

  constructor(private dataService: BaseDataService) { }

  ngOnInit(): void {
    this.dataService
      .getSensorData()
      .pipe(takeUntil(this.unsub$))
      .subscribe({
        next: (data) => {
          this.sensors = data;
          this.filteredSensors = data;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('complete');
        },
      });

    this.dataService.selectedSensorId$
      .pipe(takeUntil(this.unsub$))
      .subscribe((id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
  }

  filterSensors(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredSensors = this.sensors.filter((sensor) =>
      sensor.name.toLowerCase().includes(query),
    );
  }
  scrollToSensor(el: Event): void {
    const element = el.target as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
  }
}
