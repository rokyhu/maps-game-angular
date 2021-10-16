import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdsModule } from '@cds/angular';

import '@cds/core/alert/register.js';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CdsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
