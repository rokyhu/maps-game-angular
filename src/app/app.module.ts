import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, ContainerComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
