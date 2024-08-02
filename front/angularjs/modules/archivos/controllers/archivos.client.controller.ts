angular.module('archivos').controller('ArchivosController',
  function ($scope, $location, $routeParams, $http, ArchivoService) {
    $http.get('http://localhost:3000/api/archivos')
      .then(function (response) {
        $scope.archivos = response.data;
      })
      .catch(function (error) {
        console.error('Error:', error);
      });

    // $http.get('http://localhost:3000/api/archivos/:archivoId')
    //   .then(function (response) {
    //     $scope.archivos = response.data;
    //   })
    //   .catch(function (error) {
    //     console.error('Error:', error);
    //   });

    $scope.create = function () {
      ArchivoService.save($scope.archivo);
      $location.path('/archivos');
    };

    $scope.findOne = function () {
      $scope.archivo = ArchivoService.get({
        // archivoId: $routeParams.archivoId
        id: $routeParams.id
      });
    };
  })


// ===================================================================


// angular.module('archivos').controller('ArchivosController', [
//   '$scope',
//   '$routeParams',
//   '$location',
//   'Archivos',
//   function ($scope, $routeParams, $location, Archivos) {

//     $scope.create = function () {
//       var archivo = new Archivos({
//         title: this.title,
//         content: this.content
//       });
//       archivo.$save(function (response) {
//         $location.path('archivos/' + response._id);
//       }, function (errorResponse) {
//         $scope.error = errorResponse.data.message;
//       });
//     };

//     $scope.find = function () {
//       $scope.archivos = Archivos.query();
//     };

//     $scope.findOne = function () {
//       $scope.archivo = Archivos.get({
//         archivoId: $routeParams.archivoId
//       });
//     };

//     $scope.update = function () {
//       $scope.archivo.$update(function () {
//         $location.path('archivos/' + $scope.archivo._id);
//       }, function (errorResponse) {
//         $scope.error = errorResponse.data.message;
//       });
//     };

//     $scope.delete = function (archivo) {
//       if (archivo) {
//         archivo.$remove(function () {
//           for (var i in $scope.archivos) {
//             if ($scope.archivos[i] === archivo) {
//               $scope.archivos.splice(i, 1);
//             }
//           }
//         });
//       } else {
//         $scope.archivo.$remove(function () {
//           $location.path('archivos');
//         });
//       }
//     };
//   }]);