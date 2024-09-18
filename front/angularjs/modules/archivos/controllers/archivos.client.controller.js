angular.module('archivos').controller('ArchivosController',
  function ($scope, $location, $routeParams, $http, ArchivoService) {
    $http.get('http://localhost:3000/api/archivos')
      .then(function (response) {
        $scope.archivos = response.data;
      })
      .catch(function (error) {
        console.error('Error:', error);
      });



    // *** PostMessage test ***

    var angularAppOrigin = 'http://localhost:4200'; // Dominio de la app Angular

    var angularWindow;

    $scope.openAngularApp = function () {
      // Abrir la aplicación Angular en una nueva ventana
      angularWindow = window.open(angularAppOrigin, 'AngularApp', 'width=800,height=600');
      // angularWindow = window.open('http://localhost:4200', 'AngularApp', 'width=800,height=600');
    };

    $scope.sendMessage = function () {
      // Enviar mensaje a la aplicación Angular
      // Para ventanas abiertas con window.open
      if (angularWindow) {
        angularWindow.postMessage('Hola desde AngularJS', angularAppOrigin);
      }
      // Para iframes
      var iframe = document.getElementById('angularApp');
      iframe.contentWindow.postMessage('Hola desde AngularJS', angularAppOrigin);
    };

    // Escuchar mensajes de la aplicación Angular
    window.addEventListener('message', function (event) {
      if (event.origin !== angularAppOrigin) return;

      $scope.$apply(function () {
        $scope.messageFromAngular = event.data;
      });
    }, false);


    // ===================================================================



    // $scope.sendMessage = function () {
    //   // Enviar mensaje a la aplicación Angular
    //   localStorage.setItem('message', 'Hola desde AngularJS');

    //   // Disparar un evento para notificar a la aplicación Angular
    //   window.dispatchEvent(new Event('storage'));
    // };

    // // Escuchar mensajes de la aplicación Angular
    // window.addEventListener('storage', function (e) {
    //   if (e.key === 'angular-message') {
    //     $scope.$apply(function () {
    //       $scope.messageFromAngular = localStorage.getItem('angular-message');
    //     });
    //   }
    // });



    // $http.get('http://localhost:3000/api/archivos/:archivoId')
    // var id = $routeParams.archivoId;
    // console.log('id:', id);
    // $http.get(`http://localhost:3000/api/archivos/${id}`)
    //   .then(function (response) {
    //     $scope.archivo = response.data;
    //   })
    //   .catch(function (error) {
    //     console.error('Error:', error);
    //   });

    $scope.create = function () {
      ArchivoService.save($scope.archivo);
      $location.path('/archivos');
    };

    $scope.findOne = function () {
      var id = $routeParams.archivoId;
      $http.get(`http://localhost:3000/api/archivos/${id}`)
        .then(function (response) {
          $scope.archivo = response.data;
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    };

    $scope.delete = function (archivoId) {
      // var id = archivo._id;
      $http.delete(`http://localhost:3000/api/archivos/${archivoId}`)
        .then(function (response) {
          $location.path('/archivos');
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }

    $scope.update = function () {
      var id = $routeParams.archivoId;
      console.log('id:', id);
      $http.put(`http://localhost:3000/api/archivos/${id}`, $scope.archivo)
        .then(function (response) {
          $location.path('/archivos');
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }

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