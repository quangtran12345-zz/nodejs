var myApp = angular.module('Cinema')
myApp.controller('ProfileController', ['$scope', 'apiService', function ($scope, apiService) {
  let token = common.getCookie('token')
  if (token) {
    apiService.getUser({token: token})
      .then(function (response) {
        $scope.user = response.data
      })
  }
  $scope.addImage = function () {
    var inputFile = document.getElementById('inputFile')
    inputFile.click()
  }
  $scope.showInput = function () {
    $scope.username = $scope.user.username
    $scope.email = $scope.user.email
    $('.user-profile').toggle()
    $('.form-control').toggle()
  }
}])
