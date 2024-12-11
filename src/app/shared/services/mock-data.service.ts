import { Injectable, signal } from '@angular/core';
import { Sensor } from '../types/sensor.type';
import { Observable, of, Subject } from 'rxjs';
import { BaseDataService } from './base-data.service';

@Injectable({
    providedIn: 'root',
})
export class MockDataService extends BaseDataService {
    private readonly sensorLocations: string[] = [
      'Library',
      'Cafeteria',
      'Conference Room',
      'Reception',
      'Parking Lot',
      'Main Entrance',
      'Garden',
      'Rooftop',
    ];

    private sensorData: Sensor[] = [];
    public selectedSensorId$: Subject<string> = new Subject();
    public unSelectedSensorId$: Subject<string> = new Subject();

    private startTime = Date.now();

    constructor() {
        super();
        this.generateMockData();
    }

    public getSensorData(): Observable<Sensor[]> {
        return of(this.sensorData);
    }

    public selectSensor(id: string): void {
        this.sensorData.forEach((sensor) => {
            sensor.isSelected.set(false);
        });

        if (this.startTime + 100 < Date.now()) {
            this.selectedSensorId$.next(id);
        }

        this.sensorData
            .find((sensor) => sensor.id === id)
            ?.isSelected.set(true);
    }

    public unselectSensor(id: string): void {
        this.sensorData
            .find((sensor) => sensor.id === id)
            ?.isSelected.set(false);
    }

    private generateMockData(): void {
        for (const location of this.sensorLocations) {
            this.sensorData.push({
                id: crypto.randomUUID(),
                name: location,
                isSelected: signal(false),
                temperature: signal(Math.round(Math.random() * 20 + 10)), 
                humidity: signal(Math.round(Math.random() * 40 + 20)),
                battery: Math.round(Math.random() * 80 + 20), 
                latitude: Math.random() * 5 + 37,
                longitude: Math.random() * 10 + 27, 
                date: new Date(
                    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7, 
                ),
            });
        }
    }
}
