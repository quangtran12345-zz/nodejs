var myApp = angular.module('Cinema', []);
myApp.controller('DetailController', ['$scope', '$http', function ($scope, $http) {  
  $scope.tempImage = '/images/movie-image.jpg';    
    let pathname = window.location.pathname;
    let _id = pathname.substr(pathname.lastIndexOf("/")+1);
    $http({
      url: `/api/cinema/${_id}`,
      method: 'GET',         
    }).then(function (response) {  
      $scope.movie = response.data.cinema;       
    },
      function (error) {
        console.log(error);
      }
    );  
}]);