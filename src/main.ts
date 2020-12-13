import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { loadFont, loadMaterialIcons } from '@app/core/utils';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  // load material icons when dom content is loaded
  loadMaterialIcons();
  // load font when dom content is loaded
  loadFont();
  // execute platform browser dynamic with app browser module as main entry
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
