angular.module('myApp').factory('UserService', function () {
  let users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
  ];

  return {
    getAll: function () {
      return users;
    },
    get: function (id) {
      return users.find(user => user.id === parseInt(id));
    },
    create: function (user) {
      user.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(user);
    },
    update: function (updatedUser) {
      let index = users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
      }
    },
    delete: function (id) {
      users = users.filter(user => user.id !== parseInt(id));
    }
  };
});
