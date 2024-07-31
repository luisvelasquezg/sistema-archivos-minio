'use strict';

angular.module('archivos').service('Archivos', [
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