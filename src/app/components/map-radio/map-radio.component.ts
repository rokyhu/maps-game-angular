import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-map-radio',
  templateUrl: './map-radio.component.html',
  styleUrls: ['./map-radio.component.scss'],
})
export class MapRadioComponent implements OnChanges {
  @Input() markers: Map<number, google.maps.Marker>;
  @Input() markersGuessed: Map<number, google.maps.Marker>;
  @Input() currentGuessIndex: number;
  @Output() onGuessSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(): void {}

  onClick(event: any): void {
    console.log(event.currentTarget);
    this.onGuessSubmit.emit();
  }
}
