import { TileCoordinator } from '@angular/material/grid-list/tile-coordinator';
import { Coord } from './coord';

export interface City {
  id: number;
  name: string;
  position: google.maps.LatLng;
  positionGuess?: Coord;
  disabled: boolean;
}
