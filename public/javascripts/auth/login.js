var myApp = angular.module('Cinema')
myApp.controller('LoginController', ['$scope', 'apiService', function ($scope, apiService) {
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
  $scope.forgotPassword = function () {
    if ($scope.emailForm.validate()) {
      let data = {email: $scope.confirmEmail}
      apiService.forgotPassword(data).then(function (response) {
        console.log(response)
        if (response.data.status === 200) {
          alert(response.data.message)
          $('#myModal').modal('toggle')
        }
      }, function (error) {
        alert(error.data.errorMessage)
      })
    } else {
      var elements = $scope.emailForm.$$controls
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === ''
      })
      var fisrtInvalidElement = invalidElements[0]
      fisrtInvalidElement.$$element.focus()
    }
  }
  $scope.login = function () {
    if ($scope.createForm.validate()) {
      let data = {
        email: $scope.email,
        password: $scope.password
      }
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
    } else {
      var elements = $scope.createForm.$$controls
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === ''
      })
      var fisrtInvalidElement = invalidElements[0]
      fisrtInvalidElement.$$element.focus()
    }
  }
  $('.loader').fadeOut(500)
}])
