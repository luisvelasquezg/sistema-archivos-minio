import angular from 'angular';
import 'zone.js';
import '@angular/compiler';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TestService } from './app/services/test.service';
import { AppComponent } from './app/app.component';
import { NuevoComponenteComponent } from './app/components/nuevo-componente/nuevo-componente.component';


@NgModule({
  declarations: [
    AppComponent,
    NuevoComponenteComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    TestService,
    {
      provide: 'testService',
      useFactory: (injector: Injector) => injector.get(TestService),
      deps: ['$injector']
    }
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['myApp']);
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .then(platformRef => {
//     const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
//     upgrade.bootstrap(document.documentElement, ['myApp']);
//   })
// .catch(err => console.error(err));


// ====================
// angular.element(document).ready(function () {
//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .then(platformRef => {
//       const upgrade = platformRef.injector.get(UpgradeModule);
//       upgrade.bootstrap(document.body, ['myApp']);
//     });
// });
// ====================


// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then(platformRef => {
//     const upgrade = platformRef.injector.get(UpgradeModule);
//     upgrade.bootstrap(document.getElementById('angularjs-app'), ['myAngularJSApp']);
//   });