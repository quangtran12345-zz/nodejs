var myApp = angular.module('Cinema',[]);
myApp.controller('CreateController', ['$scope', function($scope) {
  $scope.movieTypes = ['Hành Động','Kinh Dị','Tình Cảm']
}]);