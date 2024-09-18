import angular from 'angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app.module';

const app = angular.module('myApp', []);

// Configura tus controladores y servicios de AngularJS aquí

// Bootstrap la aplicación híbrida
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule);
  upgrade.bootstrap(document.body, ['myApp']);
});