var myApp = angular.module('Cinema')
myApp.controller('RegisterController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.validationOptions = {
    rules: {
      name: {
        required: true
      },
      password: {
        required: true,
        rangelength: [6, 13]
      },
      email: {
        required: true,
        email: true
      },
      confirmPassword: {
        equalTo: '#pwd'
      }
    },
    messages: {
      name: {
        required: 'Vui lòng nhập tên tài khoản'
      },
      email: {
        required: 'Vui lòng nhập email',
        email: 'Email không đúng định dạng'
      },
      password: {
        required: 'Vui lòng nhập mật khẩu',
        rangelength: 'Mật phải từ 6 đến 13 ký tự'
      },
      confirmPassword: {
        equalTo: 'Mật khẩu nhâp lại không trùng khớp '
      }
    }
  }
  $scope.createUser = function () {
    if ($scope.createForm.validate()) {
      let data = {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      }
      apiService.signup(data).then(function (response) {
        if (response.status === 200) {
          apiService.signin(data).then(function (response) {
            console.log(response)
            if (response.data.status === 200) {
              common.setCookie('token', response.data.token, 1)
              window.location.href = '/'
            }
          },
          function (error) {
            alert(error.data.errorMessage)
          }
          )
        }
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
