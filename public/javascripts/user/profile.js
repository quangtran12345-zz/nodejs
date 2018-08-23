var myApp = angular.module('Cinema')
myApp.controller('ProfileController', ['$scope', 'apiService', function ($scope, apiService) {
  let token = common.getCookie('token')
  if (token) {
    apiService.getUser({token: token})
      .then(function (response) {
        $scope.user = response.data
        $('.loader').fadeOut(500)
      })
  }
  $scope.validationOptions = {
    rules: {
      name: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Vui lòng nhập tên người dùng'
      }
    }
  }
  $scope.updateUser = function () {
    if ($scope.userForm.validate()) {
      let data = {
        username: $scope.username,
        _id: $scope.user._id
      }
      apiService.editInfo(data).then(function (response) {
        console.log(response)
        window.location.href = `/user/${$scope.user._id}`
      }, function (err) {
        alert(err)
      })
    } else {
      var elements = $scope.userForm.$$controls
      var invalidElements = elements.filter(function (el) {
        return el.$viewValue === undefined || el.$viewValue === ''
      })
      var fisrtInvalidElement = invalidElements[0]
      fisrtInvalidElement.$$element.focus()
    }
  }
  $scope.signout = function () {
    common.showConfirmBox('Bạn có thật sự muốn đăng xuất', function () {
      common.setCookie('token', null)
      window.location.href = '/'
    })
  }
  $scope.addImage = function () {
    var inputFile = document.getElementById('inputFile')
    inputFile.click()
  }
  $scope.showInput = function () {
    $scope.username = $scope.user.username
    $scope.email = $scope.user.email
    $('.user-profile').hide()
    $('.form-control').show()
    $('#btnSave').show()
  }
  $scope.hideInput = function () {
    $scope.username = $scope.user.username
    $scope.email = $scope.user.email
    $('.user-profile').show()
    $('.form-control').hide()
    $('#btnSave').hide()
  }
  $('#inputFile').on('change', function (e) {
    $scope.file = e.target.files[0]
    if ($scope.file !== undefined) {
      let data = new FormData()
      data.append('file', $scope.file)
      data.append('_id', $scope.user._id)
      $.ajax('/api/user/avatar', {
        method: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          $scope.avatar = data.avatarURL
          $('#user-avatar').attr('src', data.avatarURL)
        },
        error: function (err) {
          alert('Lỗi xin hãy thử lại')
        }
      })
    }
  })
}])
