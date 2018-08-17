var myApp = angular.module('Cinema', []);
myApp.controller('CreateController', ['$scope', '$http', function ($scope, $http) {
  $scope.movieTypes = ['Hành Động', 'Kinh Dị', 'Tình Cảm']
  $scope.createMovie = function () {
    let data = {
      movieName: $scope.movieName,
      movieType: $scope.movieType,
      publicDate: common.stringToTimestamp($("#datepicker").data("date")),
      description: $scope.description,
      
    }
    $http({
      url: '/api/cinema',
      method: 'POST',
      data: data
    }).then(function (response) {
      console.log(response);
    },
      function (error) {
        console.log(error);
      }
    );
  }
  $scope.addImage = function(){
   var inputFile = document.getElementById("inputFile");
   inputFile.click();
  }
  $scope.getImage = function(){
      console.log(a);
  }
}]);