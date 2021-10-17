import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { City } from '../../city';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-radio',
  templateUrl: './map-radio.component.html',
  styleUrls: ['./map-radio.component.scss'],
})
export class MapRadioComponent implements OnInit {
  @Input() cities: City[] = [];
  activeCity = new FormControl('');

  constructor() {}

  ngOnInit(): void {}

  onCheck(): void {
    console.log(this.activeCity.value);
  }
}
