var myApp = angular.module('Cinema', []);
myApp.controller('DetailController', ['$scope', '$http', function ($scope, $http) {
    let pathname = window.location.pathname;
    let _id = pathname.substr(pathname.lastIndexOf("/")+1);
    console.log(_id);
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