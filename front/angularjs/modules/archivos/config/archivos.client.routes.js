// 'use strict'
// //Configuración de rutas para 'archivos'
// angular.module('archivos').config(
// 	function ($routeProvider) {
// 		$routeProvider
// 			.when('/archivos', {
// 				templateUrl: 'modules/archivos/views/list-archivo.view.html'
// 				// controller: 'ArchivosController'
// 			})
// 			.when('modules//archivos/create', {
// 				templateUrl: 'archivos/views/create-archivo.view.html'
// 			})
// 			.when('modules//archivos/:archivoId', {
// 				templateUrl: 'archivos/views/details-archivo.view.html'
// 			})
// 			.when('modules//archivos/:archivoId/edit', {
// 				templateUrl: 'archivos/views/edit-archivo.view.html'
// 			});
// 	}
// );


'use strict'
//Configuración de rutas para 'archivos'
angular.module('archivos').config([
	'$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/archivos', {
				templateUrl: 'modules/archivos/views/list-archivo.view.html'
			})
			.when('/archivos/create', {
				templateUrl: 'modules/archivos/views/create-archivo.view.html'
			})
			.when('/archivos/:archivoId', {
				templateUrl: 'modules/archivos/views/details-archivo.view.html'
			})
			.when('/archivos/:archivoId/edit', {
				templateUrl: 'modules/archivos/views/edit-archivo.view.html'
			});
	}
]);