'use strict';

angular.module('archivos').factory('ArchivoService', [
  '$resource',
  '$window',
  function ($resource, $window) {
    // console.log('$resource:', $resource);
    // return $resource('api/archivos/:archivoId', {
    // return $resource();


    // this.setData = function(key, value) {
    //   $window.localStorage.setItem(key, value);
    // };
  
    // this.getData = function(key) {
    //   return $window.localStorage.getItem(key);
    // };
  
    // this.removeData = function(key) {
    //   $window.localStorage.removeItem(key);
    // };


    // $window.addEventListener('storage', function (event) {
    //   if (event.key === 'tuClave') {
    //     console.log('El valor de localStorage ha cambiado:', event.newValue);
    //   }
    // });

    
    // window.addEventListener('dataUpdate', function(event) {
    //   var data = event.detail.data;
    //   console.log('Datos recibidos:', data);
    // });

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