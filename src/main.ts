import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment) {
  let mapScript = document.createElement('script');
  mapScript.id = 'google-maps-script';
  mapScript.src = environment.GOOGLE_MAPS_SCRIPT;
  mapScript.async = true;
  mapScript.defer = true;
  document.head.append(mapScript);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
