var myApp = angular.module('Cinema')
myApp.controller('CreateController', ['$scope', 'apiService', function ($scope, apiService) {
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
        required: 'Vui lòng nhập tên bộ phim'
      },
      movieType: {
        required: 'Vui lòng chọn thể loại phim'
      },
      description: {
        required: 'Vui lòng nhập chi tiết phim'
      }
    }
  }
  $scope.createMovie = function () {
    if ($scope.createForm.validate()) {
      let data = new FormData()
      data.append('movieName', $scope.movieName)
      data.append('movieType', $scope.movieType)
      data.append('publicDate', common.stringToTimestamp($('#datepicker').data('date')))
      data.append('description', $scope.description)
      data.append('user', $scope.user._id)
      data.append('file', $scope.file)
      // data.append('user', )
      $.ajax('/api/cinema', {
        method: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          window.location.href = '/'
        },
        error: function (err) {
          alert('Lỗi xin hãy thử lại')
        }
      })
    } else {
      var elements = $scope.createForm.$$controls
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === ''
      })
      var fisrtInvalidElement = invalidElements[0]
      fisrtInvalidElement.$$element.focus()
    }
  }
  $scope.addImage = function () {
    var inputFile = document.getElementById('inputFile')
    inputFile.click()
  }
  $('#inputFile').change(function (e) {
    $scope.file = e.target.files[0]
    console.log($scope.file)
    $('#movie-image').attr('src', URL.createObjectURL($scope.file))
  })
}])
