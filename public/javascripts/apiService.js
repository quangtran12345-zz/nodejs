const POS_DOMAIN = 'localhost:3000'
const apiVersion = '/api/'
angular.module('Cinema', ['ngValidate']).factory('apiService', ['$http', function ($http) {
  return {
    getFilms: function () {
      return $http.get('/api/cinema')
    },
    getFilm: function (link) {
      return $http.get('/api/cinema/' + link)
    },
    signup: function (data) {
      return $http.post('/api/auth/signup', data)
    },
    signin: function (data) {
      return $http.post('/api/auth/signin', data)
    },
    getUser: function (token) {
      return $http.post('/api/auth/user', token)
    },
    editInfo: function (id, data) {
      return $http.put('/api/user/' + id, data)
    },
    changePassword: function (id, data) {
      return $http.put('/api/user/' + id + '/change-password', data)
    }
  }
}])
