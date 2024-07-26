// app.js
angular.module('myApp', [
  'ngRoute',
  'ngResource', 
  'archivos'
])
  .controller('MainController', function ($scope, $http) {
    $http.get('http://localhost:3000/api/archivos')
      .then(function (response) {
        $scope.archivos = response.data;
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  });