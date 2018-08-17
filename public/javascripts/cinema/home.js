var myApp = angular.module('Cinema', []);
myApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    $http({
      url: '/api/cinema',
      method: 'GET',      
    }).then(function (response) {  
      $scope.movies = response.data.cinemas;
      console.log(response.data);      
    },
      function (error) {
        console.log(error);
      }
    );  
}]);