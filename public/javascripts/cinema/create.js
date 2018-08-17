var myApp = angular.module('Cinema', []);
myApp.controller('CreateController', ['$scope', '$http', function ($scope, $http) {
  $scope.movieTypes = ['Hành Động', 'Kinh Dị', 'Tình Cảm']
  $scope.createMovie = function () {
    let data = new FormData();        
    data.append('movieName',$scope.movieName);
    data.append('movieType',$scope.movieType);
    data.append('publicDate',common.stringToTimestamp($("#datepicker").data("date")));
    data.append('description',$scope.description);
    data.append('file',$scope.file);
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
  $('#inputFile').change(function(e){    
    $scope.file = e.target.files[0];
    $('#movie-image').attr('src',URL.createObjectURL($scope.file));
  });
}]);