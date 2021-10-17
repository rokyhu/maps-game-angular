import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MapComponent, NavigationComponent, TutorialComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
