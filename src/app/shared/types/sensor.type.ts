import { WritableSignal } from '@angular/core';

export type Sensor = {
    id: string;
    name: string;
    temperature: WritableSignal<number>;
    humidity: WritableSignal<number>;
    isSelected: WritableSignal<boolean>;
    battery: number;
    date: Date;
    latitude: number;
    longitude: number;
};
