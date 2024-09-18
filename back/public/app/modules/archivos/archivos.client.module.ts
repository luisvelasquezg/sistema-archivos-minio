// // angular.module('archivos', ['ngRoute']);
// angular.module('archivos', []);


import * as angular from 'angular';

// Definir interfaces para los modelos de datos si es necesario
interface Archivo {
  nombre: string;
  descripcion: number;
  ubicacion: string;
  fechaCreacion: Date;
  // Añade más propiedades según sea necesario
}

// Convertir el módulo a TypeScript
const archivosModule = angular.module('archivos', [
  'ngRoute',
  'core.archivo'
]);

// Configuración del módulo
archivosModule.config(['$routeProvider',
  function($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
      .when('/archivos', {
        templateUrl: 'modules/archivos/views/list-archivos.client.view.html'
      })
      .when('/archivos/:archivoId', {
        templateUrl: 'modules/archivos/views/view-archivo.client.view.html'
      });
  }
]);

// Definir controladores como clases
class ListArchivosController {
  archivos: Archivo[];
  
  static $inject = ['ArchivoService'];
  
  constructor(private ArchivoService: any) {
    this.archivos = [];
    this.cargarArchivos();
  }

  cargarArchivos(): void {
    this.ArchivoService.query().$promise.then((archivos: Archivo[]) => {
      this.archivos = archivos;
    });
  }
}

archivosModule.controller('ListArchivosController', ListArchivosController);

// Exportar el módulo
export default archivosModule.name;