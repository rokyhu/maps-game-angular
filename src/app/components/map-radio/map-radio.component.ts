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
  @Input() currentMarkerGuess: google.maps.Marker;
  @Input() currentScore: number;
  @Input() readyForNextGuess: boolean;
  @Output() onGuessSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAdvanceToNext: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnChanges(): void {}

  onConfirmClick(event: any): void {
    this.onGuessSubmit.emit();
  }

  onNextClick(event: any): void {
    this.onAdvanceToNext.emit();
  }
}
