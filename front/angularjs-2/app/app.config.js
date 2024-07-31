angular.module('myApp').config(function ($routeProvider) {
  $routeProvider
    .when('/users', {
      templateUrl: 'app/views/users.html',
      controller: 'UserController'
    })
    .when('/products', {
      templateUrl: 'app/views/products.html',
      controller: 'ProductController'
    })
    .when('/users/new', {
      templateUrl: 'app/views/userForm.html',
      controller: 'UserController'
    })
    .when('/users/edit/:id', {
      templateUrl: 'app/views/userForm.html',
      controller: 'UserController'
    })
    .when('/products/new', {
      templateUrl: 'app/views/productForm.html',
      controller: 'ProductController'
    })
    .when('/products/edit/:id', {
      templateUrl: 'app/views/productForm.html',
      controller: 'ProductController'
    })
    .otherwise({
      redirectTo: '/users'
    });
});
