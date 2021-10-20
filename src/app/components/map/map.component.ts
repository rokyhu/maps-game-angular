import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { MapStylesService } from 'src/app/services/map-styles.service';
import { City } from '../../city';
import {} from 'googlemaps';
import { EventEmitter } from 'stream';
import { CLARITY_MOTION_ENTER_LEAVE_PROPERTY } from '@cds/core/internal';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  cities: City[];
  pickedCities: City[];
  mapStyles: any;
  activeMapStyle: string = 'silver';
  currentGuessIndex: number = 0;
  markers: google.maps.Marker[] = [];
  markerGuess: google.maps.Marker = null;
  bounds: any;

  targetIcon = '../../assets/images/target-32px.png';

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 46.4979;
  lng = 19.0402;

  coordinates: google.maps.LatLng;

  mapOptions: google.maps.MapOptions;

  ngAfterViewInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.pickedCities = this.pickCities(10);
      this.mapStyleService.getMapStyles('gta').subscribe((styles) => {
        this.mapStyles = styles;
        this.mapInitializer();
      });
    });
  }

  mapInitializer() {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      streetViewControl: false,
      maxZoom: 8,
      styles: this.mapStyles[this.activeMapStyle],
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.map.addListener('dblclick', (e) =>
      this.addMarkerGuess(e.latLng, this.map, 'Your guess', null)
    );
    this.revealMarkers();
    this.bounds = this.getBounds();
    this.map.fitBounds(this.bounds);
  }

  pickCities(count: number): City[] {
    const pickedCities: City[] = [];
    for (let i = 0; i < count; i++) {
      let pickedCity: City;
      do {
        pickedCity =
          this.cities[Math.floor(Math.random() * this.cities.length)];
      } while (pickedCities.indexOf(pickedCity) != -1);
      pickedCities.push(pickedCity);
    }
    return pickedCities;
  }

  revealMarkers() {
    for (const city of this.pickedCities) {
      this.addMarker(
        new google.maps.LatLng(parseFloat(city.lat), parseFloat(city.lng)),
        this.map,
        city.city,
        google.maps.Animation.DROP
      );
      console.log(parseInt(city.lat), parseInt(city.lng));
    }
  }

  constructor(
    private citiesService: CitiesService,
    private mapStyleService: MapStylesService
  ) {}

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
    title: string,
    animation: google.maps.Animation
  ) {
    const marker = this.createMarker(position, map, title, animation, null);
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
    title: string,
    animation: google.maps.Animation
  ) {
    const marker = this.createMarker(
      position,
      map,
      title,
      animation,
      this.targetIcon
    );
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
    title: string,
    animation: google.maps.Animation,
    icon: any
  ) {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icon,
      animation: animation,
    });
  }

  changeMap(style: string) {
    this.mapOptions.styles = this.mapStyles[style];
    this.map.setOptions(this.mapOptions);
    this.map.fitBounds(this.bounds);
  }
}
