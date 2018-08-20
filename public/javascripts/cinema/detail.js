var myApp = angular.module('Cinema', [])
myApp.controller('DetailController', ['$scope', '$http', function ($scope, $http) {
  $scope.tempImage = '/images/movie-image.jpg'
  let pathname = window.location.pathname
  let link = pathname.substr(pathname.lastIndexOf('/') + 1)
  $http({
    url: `/api/cinema/${link}`,
    method: 'GET'
  }).then(function (response) {
    $scope.movie = response.data.cinema
    document.title = $scope.movie.movieName
  },
  function (error) {
    console.log(error)
  }
  )
}])
