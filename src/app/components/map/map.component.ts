import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { MapStylesService } from 'src/app/services/map-styles.service';
import { City } from '../../city';
import { ScoringGuide } from '../../scoringGuide';
import {} from 'googlemaps';
import { MatDialog } from '@angular/material/dialog';
import { DialogWarnComponent } from '../dialog-warn/dialog-warn.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'c') {
      this.toggleGameMarkersOnMap();
    }
  }

  cities: City[];
  pickedCities: City[];
  mapStyles: any;
  activeMapStyle: string = 'silver';
  currentGuessIndex: number = 0;
  markers: Map<number, google.maps.Marker> = new Map();
  paths: Map<number, google.maps.Polyline> = new Map();
  markersGuessed: Map<number, google.maps.Marker> = new Map();
  readyForNextGuess: boolean = false;
  currentMarkerGuess: google.maps.Marker = null;
  bounds: any;
  isDataLoaded: boolean = false;
  scoringMap: Map<number, ScoringGuide> = new Map([
    [2, { score: 5, color: 'green' }],
    [3, { score: 3, color: 'teal' }],
    [10, { score: 2, color: 'yellow' }],
    [35, { score: 1, color: 'orange' }],
  ]);
  currentScore: number = 0;

  targetIcon = {
    url: '../../assets/images/spotlight-green-hidpi.png',
    size: new google.maps.Size(27, 43),
    scaledSize: new google.maps.Size(27, 43),
  };

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 46.4979;
  lng = 19.0402;

  coordinates: google.maps.LatLng;

  mapOptions: google.maps.MapOptions;

  constructor(
    private citiesService: CitiesService,
    private mapStyleService: MapStylesService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.pickedCities = this.pickCities(10);
      this.mapStyleService.getMapStyles('gta').subscribe((styles) => {
        this.mapStyles = styles;
        this.initMap();
        this.isDataLoaded = true;
      });
    });
  }

  initMap() {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      streetViewControl: false,
      maxZoom: 8,
      styles: this.mapStyles[this.activeMapStyle],
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.map.addListener('dblclick', (e) =>
      this.addMarkerGuess(e.latLng, this.map)
    );
    this.addGameMarkers();
    this.centerMapOnMarkerMap(this.markers);
  }

  pickCities(count: number): City[] {
    const pickedCities: City[] = [];
    for (let i = 0; i < count; i++) {
      let pickedCity: City;
      do {
        pickedCity =
          this.cities[Math.floor(Math.random() * this.cities.length)];
      } while (pickedCities.indexOf(pickedCity) != -1);
      pickedCities.push(pickedCity);
    }
    return pickedCities;
  }

  addGameMarkers() {
    for (const city of this.pickedCities) {
      this.addGameMarker(
        new google.maps.LatLng(parseFloat(city.lat), parseFloat(city.lng)),
        this.map,
        city.city
      );
    }
  }

  toggleGameMarkersOnMap() {
    if (this.markers.get(0).getMap() == null) {
      this.setMapOnAll(this.map);
    } else {
      this.setMapOnAll(null);
    }
  }

  setMapOnAll(map: google.maps.Map) {
    for (const [key, marker] of this.markers.entries()) {
      marker.setMap(map);
      if (map !== null) {
        marker.setAnimation(google.maps.Animation.DROP);
      }
    }
  }

  private centerMapOnMarkerMap(markers: Map<number, google.maps.Marker>) {
    this.bounds = this.getBounds(markers);
    this.map.fitBounds(this.bounds);
  }

  getBounds(markers: Map<number, google.maps.Marker>) {
    let north;
    let south;
    let east;
    let west;

    for (const [key, marker] of markers.entries()) {
      north =
        north !== undefined
          ? Math.max(north, marker.getPosition().lat())
          : marker.getPosition().lat();
      south =
        south !== undefined
          ? Math.min(south, marker.getPosition().lat())
          : marker.getPosition().lat();
      east =
        east !== undefined
          ? Math.max(east, marker.getPosition().lng())
          : marker.getPosition().lng();
      west =
        west !== undefined
          ? Math.min(west, marker.getPosition().lng())
          : marker.getPosition().lng();
    }

    const bounds = { north, south, east, west };

    return bounds;
  }

  addGameMarker(
    position: google.maps.LatLng,
    map: google.maps.Map,
    title: string
  ) {
    const marker = this.createMarker(position, map, title, null);
    this.markers.set(this.markers.size, marker); // each map item will get a key starting from 0
    marker.setMap(null); // hide game markers by default
  }

  addMarkerGuess(position: google.maps.LatLng, map: google.maps.Map) {
    const title = `Guess for ${this.markers
      .get(this.currentGuessIndex)
      .getTitle()}`;
    const marker = this.createMarker(position, map, title, this.targetIcon);
    if (this.currentMarkerGuess !== null) {
      this.currentMarkerGuess.setMap(null);
    }
    this.currentMarkerGuess = marker;
    this.currentMarkerGuess.setMap(map);

    this.currentMarkerGuess.addListener('dblclick', () => {
      this.currentMarkerGuess.setMap(null);
      this.currentMarkerGuess = null;
    });
  }

  createMarker(
    position: google.maps.LatLng,
    map: google.maps.Map,
    title: string,
    icon: any
  ) {
    return new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: icon,
    });
  }

  changeMap(style: string) {
    this.mapOptions.styles = this.mapStyles[style];
    this.map.setOptions(this.mapOptions);
    this.map.fitBounds(this.bounds);
  }

  onGuessSubmit() {
    if (this.currentMarkerGuess === null) {
      this.openDialogGuessNotFound();
    } else {
      this.openDialogConfirmGuess();
    }
  }

  openDialogGuessNotFound() {
    this.dialog.open(DialogWarnComponent, {
      data: {
        title: 'No city guess found',
        body: 'Please double click on map to make a guess.',
      },
    });
  }

  openDialogConfirmGuess() {
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirm guess',
        body: 'Please confirm your guess or go back to make a change.',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component upon closing
      if (res.hasOwnProperty('data') && res.data) {
        this.revealGuessResult();
      }
    });
  }

  revealGuessResult() {
    this.markers.get(this.currentGuessIndex).setMap(this.map);

    const marker: google.maps.Marker = this.markers.get(this.currentGuessIndex);

    const distanceInKm: number = this.getDistanceInKms(
      marker,
      this.currentMarkerGuess
    );

    console.log('distance: ' + distanceInKm);

    const scoringGuide: ScoringGuide = this.getScoringGuide(distanceInKm);

    console.log('score add: ' + scoringGuide.score);

    this.currentScore = this.currentScore + scoringGuide.score;

    const path = new google.maps.Polyline({
      path: [marker.getPosition(), this.currentMarkerGuess.getPosition()],
      geodesic: true,
      strokeColor: scoringGuide.color,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    path.setMap(this.map);

    this.mapOptions.maxZoom = 9;
    this.map.setOptions(this.mapOptions);

    this.paths.set(this.paths.size, path);

    this.centerMapOnMarkerMap(
      new Map([
        [0, marker],
        [1, this.currentMarkerGuess],
      ])
    );

    this.readyForNextGuess = true;
  }

  getDistanceInKms(
    marker1: google.maps.Marker,
    marker2: google.maps.Marker
  ): number {
    const distanceInMeters =
      google.maps.geometry.spherical.computeDistanceBetween(
        marker1.getPosition(),
        marker2.getPosition()
      );
    return Math.ceil(distanceInMeters / 1000);
  }

  getScoringGuide(distanceInKm: number): ScoringGuide {
    for (const [key, scoringGuide] of this.scoringMap.entries()) {
      if (distanceInKm <= key) {
        return scoringGuide;
      }
    }
    return { score: 0, color: 'red' };
  }

  onAdvanceToNext() {
    this.readyForNextGuess = false;
    this.resetMapView();

    this.currentMarkerGuess.setMap(null); // hide from map
    this.markersGuessed.set(this.markersGuessed.size, this.currentMarkerGuess); // each map item will get a key starting from 0
    this.currentMarkerGuess = null;
    this.currentGuessIndex = this.currentGuessIndex + 1;
    if (this.markersGuessed.size === this.markers.size) {
      alert('game over');
    }
  }

  private resetMapView() {
    this.mapOptions.maxZoom = 8;
    this.map.setOptions(this.mapOptions);
    this.centerMapOnMarkerMap(this.markers);
    this.markers.get(this.currentGuessIndex).setMap(null);
    this.paths.get(this.currentGuessIndex).setMap(null);
  }
}
