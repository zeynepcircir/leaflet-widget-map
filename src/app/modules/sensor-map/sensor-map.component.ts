import {
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Component,
  ElementRef
} from '@angular/core';
import * as Leaflet from 'leaflet';

import { SensorPopupComponent } from '../../modules/sensor-popup/sensor-popup.component';
import { BaseDataService } from '../../shared/services/base-data.service';
import { Sensor } from '../../shared/types/sensor.type';

@Component({
  selector: 'app-sensor-map',
  templateUrl: './sensor-map.component.html',
  styleUrls: ['./sensor-map.component.css'],
  standalone: true,
})
export class SensorMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private icon!: Leaflet.Icon;
  private layer!: Leaflet.TileLayer;
  private map!: Leaflet.Map;

  private readonly TILE_LAYER_URL: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private readonly TILE_LAYER_ATTRIBUTION: string = '&copy; <a href="https://www.openstreetmap.org/">Map data 2024 Google, INEGI</a> | Keyboard shortcuts | 500 km | Terms';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private dataService: BaseDataService
  ) {
    this.fetchAssets();
  }

  ngOnInit(): void {
    this.map = Leaflet.map(this.mapContainer.nativeElement)
      .setView([39, 34], 5)
      .addLayer(this.layer);

    this.dataService.getSensorData().subscribe((data: Sensor[]) => {
      data.forEach((sensor) => {
        this.renderMarker(sensor);
      });
    });
  }

  renderMarker(sensor: Sensor) {
    const marker = Leaflet.marker([sensor.latitude, sensor.longitude], {
      icon: this.icon,
    }).addTo(this.map);

    let popupComponent: ComponentRef<SensorPopupComponent> =
      this.viewContainerRef.createComponent(SensorPopupComponent);
    popupComponent.instance.sensor = sensor;

    marker.on('popupopen', () => {
      this.dataService.selectSensor(sensor.id);
    });

    marker.on('popupclose', () => {
      this.dataService.unselectSensor(sensor.id);
    });

    this.dataService.selectedSensorId$.subscribe((id) => {
      if (id === sensor.id) {
        this.map.flyTo([sensor.latitude, sensor.longitude], 12, { animate: true });
        marker.openPopup();
      }
    });

    this.dataService.unSelectedSensorId$.subscribe((id) => {
      if (id === sensor.id) {
        marker.closePopup();
      }
    });

    marker
      .bindPopup(popupComponent.location.nativeElement, {
        closeButton: false,
        minWidth: 250,
        className: 'shadow-xl',
      })
      .openPopup()
      .closePopup();
  }

  fetchAssets() {
    this.icon = Leaflet.icon({
      iconUrl: 'assets/icons/map-pin.svg',
      iconAnchor: [18, 56],
      popupAnchor: [-137, 166],
      shadowSize: [41, 41],
      className: 'z-50',
    });

    this.layer = Leaflet.tileLayer(this.TILE_LAYER_URL, {
      attribution: this.TILE_LAYER_ATTRIBUTION,
      maxZoom: 18,
    });
  }
}
