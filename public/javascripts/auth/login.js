var myApp = angular.module('Cinema', ['ngValidate'])
myApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
  $scope.validationOptions = {
    rules: {
      password: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: 'Vui lòng nhập email',
        email: 'Email không đúng định dạng'
      },
      password: {
        required: 'Vui lòng nhập mật khẩu'
      }
    }
  }
  $scope.createUser = function () {
    if ($scope.createForm.validate()) {
      let data = {
        email: $scope.email,
        password: $scope.password
      }
      $http({
        url: '/api/auth',
        method: 'POST',
        data: data
      }).then(function (response) {
        alert('Tài khoản đã được tạo thành công')
      },
      function (error) {
        alert(error.data.errorMessage)
      }
      )
    } else {
      var elements = $scope.createForm.$$controls
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === ''
      })
      var fisrtInvalidElement = invalidElements[0]
      fisrtInvalidElement.$$element.focus()
    }
  }
}])
