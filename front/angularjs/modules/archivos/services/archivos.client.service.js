'use strict';

angular.module('archivos').service('ArchivoService', [
  '$resource',
  function ($resource) {
    return $resource('api/archivos/:archivoId', {
      archivoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);