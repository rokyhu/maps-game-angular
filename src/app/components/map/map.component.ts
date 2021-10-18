import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { MapStylesService } from 'src/app/services/map-styles.service';
import { City } from '../../city';
import {} from 'googlemaps';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  cities: City[];
  markers: google.maps.Marker[] = [];

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 47.4979;
  lng = 19.0402;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 7,
    disableDoubleClickZoom: true,
    maxZoom: 6,
    mapTypeId: 'terrain',
    styles: [],
  };

  ngAfterViewInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.mapInitializer();
      this.mapStyleService.getMapStyles('gta').subscribe((styles) => {
        this.mapOptions.styles = styles.dark;
        this.map.setOptions(this.mapOptions);
      });
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.markersInitializer();
    this.map.addListener('dblclick', (e) => {
      console.log(e);
    });
  }

  markersInitializer() {
    for (const city of this.cities) {
      const marker = new google.maps.Marker({
        position: city.position,
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
      });

      this.markers.push(marker);
      marker.setMap(this.map);
    }
  }

  // mapId: string = 'f55ed6c86bb00053';

  constructor(
    private citiesService: CitiesService,
    private mapStyleService: MapStylesService
  ) {}

  onDblClick(event: google.maps.MapMouseEvent): void {
    console.log(event);
  }

  getBounds(markers: City[]) {
    let north;
    let south;
    let east;
    let west;

    for (let marker of markers) {
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north =
        north !== undefined
          ? Math.max(north, marker.position.lat)
          : marker.position.lat;
      south =
        south !== undefined
          ? Math.min(south, marker.position.lat)
          : marker.position.lat;
      east =
        east !== undefined
          ? Math.max(east, marker.position.lng)
          : marker.position.lng;
      west =
        west !== undefined
          ? Math.min(west, marker.position.lng)
          : marker.position.lng;
    }

    const bounds = { north, south, east, west };

    return bounds;
  }
}
