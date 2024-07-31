angular.module('myApp').controller('UserController', function ($scope, $location, $routeParams, UserService) {
  $scope.users = UserService.getAll();

  $scope.user = $routeParams.id ? UserService.get($routeParams.id) : {};

  $scope.saveUser = function () {
    if ($scope.user.id) {
      UserService.update($scope.user);
    } else {
      UserService.create($scope.user);
    }
    $location.path('/users');
  };

  $scope.deleteUser = function (id) {
    UserService.delete(id);
    $scope.users = UserService.getAll();
  };
});
