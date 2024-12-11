import { WritableSignal } from '@angular/core';

export type Sensor = {
    id: string;
    name: string;
    isSelected: WritableSignal<boolean>;
    temperature: WritableSignal<number>;
    humidity: WritableSignal<number>;
    latitude: number;
    longitude: number;
    battery: number;
    date: Date;
};
