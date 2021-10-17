import { Component, OnInit } from '@angular/core';
import { Coord } from '../../coord';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from '../../city';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  zoom = 7;
  center: Coord = { lat: 47.4979, lng: 19.0402 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
  };
  markerOptions = {
    animation: google.maps.Animation.BOUNCE,
  };
  cities: City[];

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.citiesService
      .getCities()
      .subscribe((cities) => (this.cities = cities));
  }

  onDblClick(event: google.maps.MapMouseEvent): void {
    console.log(event);
  }
}
