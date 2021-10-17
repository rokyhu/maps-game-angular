import { TileCoordinator } from '@angular/material/grid-list/tile-coordinator';
import { Coord } from './coord';

export interface City {
  id: number;
  name: string;
  coord: Coord;
  coordGuess?: Coord;
  disabled: boolean;
}
