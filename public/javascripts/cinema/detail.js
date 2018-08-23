var myApp = angular.module('Cinema')
myApp.controller('DetailController', ['$scope', 'apiService', function ($scope, apiService) {
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
      })
  }
  $scope.tempImage = '/images/movie-image.jpg'
  let pathname = window.location.pathname
  let link = pathname.substr(pathname.lastIndexOf('/') + 1)
  apiService.getFilm(link).then(function (response) {
    $scope.movie = response.data.cinema
    document.title = $scope.movie.movieName    
    $('.loader').fadeOut(500)
  },
  function (error) {
    console.log(error)
  }
  )
  
}])
