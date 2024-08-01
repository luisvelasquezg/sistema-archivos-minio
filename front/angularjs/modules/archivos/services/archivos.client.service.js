'use strict';

angular.module('archivos').factory('ArchivoService', [
  '$resource',
  function ($resource) {
    // return $resource('api/archivos/:archivoId', {
    return $resource('api/archivos/:id', {
      // archivoId: '@_id'
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);