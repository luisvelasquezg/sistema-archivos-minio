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


// ============================================================================


// import angular from 'angular';
import * as angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';
import archivos from './app/modules/archivos/archivos';

angular.module('myApp', [
  ngRoute,
  ngResource, 
  archivos
  // 'ngRoute',
  // 'ngResource', 
  // 'archivos'
])

// Añade tu aplicación AngularJS al DOM
document.addEventListener('DOMContentLoaded', function() {
  angular.bootstrap(document, ['myApp']);
});




  // .controller('MainController', function ($scope, $http) {
  //   $http.get('http://localhost:3000/api/archivos')
  //     .then(function (response) {
  //       $scope.archivos = response.data;
  //     })
  //     .catch(function (error) {
  //       console.error('Error:', error);
  //     });
  // })  
  
  // angular.module('myApp', [
  //   'ngRoute',
  //   'ngResource', 
  //   'archivos'
  // ])
  //   .controller('MainController', function ($scope, $http) {
  //     $http.get('http://localhost:3000/api/archivos')
  //       .then(function (response) {
  //         $scope.archivos = response.data;
  //       })
  //       .catch(function (error) {
  //         console.error('Error:', error);
  //       });
  //   });