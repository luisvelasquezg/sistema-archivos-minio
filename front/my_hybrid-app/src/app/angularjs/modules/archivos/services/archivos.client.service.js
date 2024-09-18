'use strict';

angular.module('archivos').factory('ArchivoService', [
  '$resource',
  function ($resource) {
    // console.log('$resource:', $resource);
    // return $resource('api/archivos/:archivoId', {
    // return $resource();
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