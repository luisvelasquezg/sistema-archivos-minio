'use strict'
//Configuración de rutas para 'archivos'
angular.module('archivos').config([
	'$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/archivos', {
				templateUrl: 'archivos/views/list-archivo.view.html'
			}).
			when('/archivos/create', {
				templateUrl: 'archivos/views/create-archivo.view.html'
			}).
			when('/archivos/:archivoId', {
				templateUrl: 'archivos/views/details-archivo.view.html'
			}).
			when('/archivos/:archivoId/edit', {
				templateUrl: 'archivos/views/edit-archivo.view.html'
			});
	}
]);