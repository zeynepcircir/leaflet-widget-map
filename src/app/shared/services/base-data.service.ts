import { Injectable } from '@angular/core';
import { Sensor } from '../types/sensor.type';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService {
  constructor() { }
  abstract getSensorData(): Observable<Sensor[]>;
  abstract selectSensor(id: string): void;
  abstract unselectSensor(id: string): void;
  abstract selectedSensorId$: Subject<string>;
  abstract unSelectedSensorId$: Subject<string>;
}
