import { Component, OnInit } from '@angular/core';
import { Coord } from '../../coord';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  center: Coord = { lat: 47.4979, lng: 19.0402 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
  };

  constructor() {}

  ngOnInit(): void {}

  onDblClick(event: google.maps.MapMouseEvent): void {
    console.log(event);
  }
}
