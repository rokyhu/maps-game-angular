import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { MapStylesService } from 'src/app/services/map-styles.service';
import { City } from '../../city';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  cities: City[];
  currentGuessIndex: number = 0;
  markers: google.maps.Marker[] = [];
  markerGuess: google.maps.Marker = null;
  animationDrop: google.maps.Animation = google.maps.Animation.DROP;

  targetIcon = '../../assets/images/target-32px.png';

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 46.4979;
  lng = 19.0402;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    maxZoom: 7,
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
    this.map.addListener('dblclick', (e) =>
      this.addMarkerGuess(e.latLng, this.map, null)
    );
    this.revealMarkers();
    console.log(this.markers);
    const bounds = this.getBounds();
    this.map.fitBounds(bounds);
  }

  revealMarkers() {
    for (const city of this.cities) {
      this.addMarker(city.position, this.map, this.animationDrop);
    }
  }

  constructor(
    private citiesService: CitiesService,
    private mapStyleService: MapStylesService
  ) {}

  // onDblClick(event: google.maps.MapMouseEvent): void {
  //   console.log(event);
  // }

  getBounds() {
    let north;
    let south;
    let east;
    let west;

    for (let marker of this.markers) {
      north =
        north !== undefined
          ? Math.max(north, marker.getPosition().lat())
          : marker.getPosition().lat();
      south =
        south !== undefined
          ? Math.min(south, marker.getPosition().lat())
          : marker.getPosition().lat();
      east =
        east !== undefined
          ? Math.max(east, marker.getPosition().lng())
          : marker.getPosition().lng();
      west =
        west !== undefined
          ? Math.min(west, marker.getPosition().lng())
          : marker.getPosition().lng();
    }

    const bounds = { north, south, east, west };

    return bounds;
  }

  addMarker(
    position: google.maps.LatLng,
    map: google.maps.Map,
    animation: google.maps.Animation
  ) {
    const marker = this.createMarker(position, map, animation, null);
    marker.setMap(map);
    this.markers.push(marker);

    marker.addListener('dblclick', () => {
      marker.setMap(null);
      this.markers = this.markers.filter((m) => m !== marker);
      console.log(marker);
    });
  }

  addMarkerGuess(
    position: google.maps.LatLng,
    map: google.maps.Map,
    animation: google.maps.Animation
  ) {
    const marker = this.createMarker(position, map, animation, this.targetIcon);
    if (this.markerGuess !== null) {
      this.markerGuess.setMap(null);
    }
    this.markerGuess = marker;
    this.markerGuess.setMap(map);

    this.markerGuess.addListener('dblclick', () => {
      this.markerGuess.setMap(null);
      this.markerGuess = null;
    });
  }

  createMarker(
    position: google.maps.LatLng,
    map: google.maps.Map,
    animation: google.maps.Animation,
    icon: any
  ) {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: 'Hello World!',
      icon: icon,
      animation: animation,
    });
  }
}
