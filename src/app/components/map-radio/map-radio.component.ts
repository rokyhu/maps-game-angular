import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-radio',
  templateUrl: './map-radio.component.html',
  styleUrls: ['./map-radio.component.scss'],
})
export class MapRadioComponent implements OnInit {
  @Input() markers: Map<number, google.maps.Marker>;
  @Input() markersGuessed: Map<number, google.maps.Marker>;
  currentGuessIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onCheck(): void {
    console.log('yoooo');
  }
}
