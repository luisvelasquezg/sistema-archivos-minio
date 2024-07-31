angular.module('myApp').factory('ProductService', function () {
  let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
  ];

  return {
    getAll: function () {
      return products;
    },
    get: function (id) {
      return products.find(product => product.id === parseInt(id));
    },
    create: function (product) {
      product.id = products.length ? products[products.length - 1].id + 1 : 1;
      products.push(product);
    },
    update: function (updatedProduct) {
      let index = products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        products[index] = updatedProduct;
      }
    },
    delete: function (id) {
      products = products.filter(product => product.id !== parseInt(id));
    }
  };
});
