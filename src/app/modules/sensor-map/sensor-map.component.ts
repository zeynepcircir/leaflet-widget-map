import {
  AfterViewInit,
  ComponentRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import * as Leaflet from 'leaflet';

import { SensorPopupComponent } from '../../modules/sensor-popup/sensor-popup.component';
import { Sensor } from '../../shared/types/sensor.type';

@Component({
  selector: 'app-sensor-map',
  templateUrl: './sensor-map.component.html',
  styleUrls: ['./sensor-map.component.css'],
  standalone: true,
})
export class SensorMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: Leaflet.Map;
  private icon!: Leaflet.Icon;
  private layer!: Leaflet.TileLayer;

  // Dinamik URL ve Atıf Bilgisi
  private readonly TILE_LAYER_URL: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private readonly TILE_LAYER_ATTRIBUTION: string = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Zeynep Çırçır';

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
    this.initializeAssets();
  }

  ngOnInit(): void {
    this.map = Leaflet.map(this.mapContainer.nativeElement)
      .setView([39, 34], 5)
      .addLayer(this.layer);

   
  }

  renderMarker(sensor: Sensor) {
    const marker = Leaflet.marker([sensor.latitude, sensor.longitude], {
      icon: this.icon,
    }).addTo(this.map);

    let popupComponent: ComponentRef<SensorPopupComponent> =
      this.viewContainerRef.createComponent(SensorPopupComponent);
    popupComponent.instance.sensor = sensor;

    marker
      .bindPopup(popupComponent.location.nativeElement, {
        closeButton: false,
        minWidth: 250,
        className: 'shadow-xl',
      })
      .openPopup()
      .closePopup();
  }

  initializeAssets() {
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
