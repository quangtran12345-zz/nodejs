var myApp = angular.module('Cinema')
myApp.controller('HomeController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.tempImage = '/images/movie-image.jpg'
  $scope.signout = function () {
    common.showConfirmBox('Bạn có thật sự muốn đăng xuất', function () {
      common.setCookie('token', null)
      window.location.href = '/'
    })
  }
  let token = common.getCookie('token')
  if (token) {
    apiService.getUser({token: token})
      .then(function (response) {
        $scope.user = response.data
        console.log($scope.user)
      })
  } else {
    token = $('#token').val()
    common.setCookie('token', token)
    apiService.getUser({token: token})
      .then(function (response) {
        $scope.user = response.data
      })
  }
  apiService.getFilms().then(function (response) {
    $scope.movies = response.data.cinemas
    console.log($scope.movies)
    $('.loader').fadeOut(500)
  },
  function (error) {
    console.log(error)
  }
  )
}])
