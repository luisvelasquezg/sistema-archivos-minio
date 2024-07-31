angular.module('myApp').controller('ProductController', function ($scope, $location, $routeParams, ProductService) {
  $scope.products = ProductService.getAll();

  $scope.product = $routeParams.id ? ProductService.get($routeParams.id) : {};

  $scope.saveProduct = function () {
    if ($scope.product.id) {
      ProductService.update($scope.product);
    } else {
      ProductService.create($scope.product);
    }
    $location.path('/products');
  };

  $scope.deleteProduct = function (id) {
    ProductService.delete(id);
    $scope.products = ProductService.getAll();
  };
});
