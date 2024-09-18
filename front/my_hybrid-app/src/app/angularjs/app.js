// app.js
// var mainApplicationModuleName = 'myApp';

angular.module('myApp', [
  'ng.upgrade',
  'ngRoute',
  'ngResource', 
  'archivos'
])

angular.module('myApp', [])
  .factory('testService', downgradeInjectable(TestService));

angular.module('myApp').config([
  '$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.module('myApp')
  .value('angularJsInjectable', 'angularJsInjectable-value-mi-valor');

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