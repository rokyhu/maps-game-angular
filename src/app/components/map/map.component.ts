import { Component, OnInit } from '@angular/core';
import {} from 'google.maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  center: any = { lat: 47.4979, lng: 19.0402 };

  constructor() {}

  ngOnInit(): void {}
}
