import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-styles',
  templateUrl: './map-styles.component.html',
  styleUrls: ['./map-styles.component.scss'],
})
export class MapStylesComponent implements OnInit {
  @Input() mapStyles: any = [];
  @Input() activeMapStyle: any = '';
  selectedMapStyle = new FormControl('');
  @Output() onChangeMapStyleEvent: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onChangeMapStyle(): void {
    this.onChangeMapStyleEvent.emit(this.selectedMapStyle.value);
  }
}
