var myApp = angular.module('Cinema', ['ngValidate']);
myApp.controller('CreateController', ['$scope', '$http', function ($scope, $http) {
  $scope.movieTypes = ['Hành Động', 'Kinh Dị', 'Tình Cảm']
  $scope.validationOptions = {
    rules: {
      movieName: {
        required: true
      },
      movieType: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      movieName: {
        required: "Vui lòng nhập tên bộ phim"
      },
      movieType: {
        required: "Vui lòng chọn thể loại phim"
      },
      description: {
        required: "Vui lòng nhập chi tiết phim"
      }
    }
  }
  $scope.createMovie = function () {
    if ($scope.createForm.validate()) {
      let data = new FormData();
      data.append('movieName', $scope.movieName);
      data.append('movieType', $scope.movieType);
      data.append('publicDate', common.stringToTimestamp($("#datepicker").data("date")));
      data.append('description', $scope.description);
      data.append('file', $scope.file);
      $.ajax('/api/cinema', {
        method: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          console.log(data);          
          // if (filmId) {
          //   $scope.notiMessage = 'Sửa phim thành công'
          //   document.getElementById('SuccessDialog').style.display = 'block'
          // } else {
          //   $scope.notiMessage = 'Tạo phim thành công'
          //   document.getElementById('SuccessDialog').style.display = 'block'
          // }
          //$scope.$apply()
        },
        error: function (err) {
          err && console.log(err)
        }
      })
    } else {
      var elements = $scope.createForm.$$controls;
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === '';
      });
      var fisrtInvalidElement = invalidElements[0];
      fisrtInvalidElement.$$element.focus();
    }
  }
  $scope.addImage = function () {
    var inputFile = document.getElementById("inputFile");
    inputFile.click();
  }
  $('#inputFile').change(function (e) {
    $scope.file = e.target.files[0];
    console.log($scope.file);
    $('#movie-image').attr('src', URL.createObjectURL($scope.file));
  });
}]);