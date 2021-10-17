import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from '../../city';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-radio',
  templateUrl: './map-radio.component.html',
  styleUrls: ['./map-radio.component.scss'],
})
export class MapRadioComponent implements OnInit {
  activeCity = new FormControl('');
  cities: City[];

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.citiesService
      .getCities()
      .subscribe((cities) => (this.cities = cities));
  }

  onCheck(): void {
    console.log(this.activeCity.value);
  }
}
