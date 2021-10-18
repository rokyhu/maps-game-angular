import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment) {
  const head = document.querySelector('head');
  let mapScript = document.createElement('script');
  mapScript.setAttribute('id', 'google-maps-script');
  mapScript.setAttribute('src', environment.GOOGLE_MAPS_API_KEY);
  mapScript.setAttribute('async', 'true');
  console.log(mapScript);
  head.append(mapScript);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
