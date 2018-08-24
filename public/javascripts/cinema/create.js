var myApp = angular.module('Cinema')
myApp.controller('CreateController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.genres = ['Hành Động', 'Kinh Dị', 'Tình Cảm']
  $('#datepicker').datetimepicker({
    format: 'DD/MM/YYYY',
    date: new Date()
  })
  const postData = function () {
    let data = new FormData()
    if (filmId) {
      data.append('id', $scope.movie._id)
      data.append('posterURL', $scope.movie.posterURL)
    }
    data.append('name', $scope.name)
    data.append('genre', $scope.genre)
    data.append('releaseDate', common.stringToTimestamp($('#datepicker').data('date')))
    data.append('content', $scope.content)
    data.append('user', $scope.user._id)
    data.append('file', $scope.file)
    data.append('creatorId', $scope.user._id)
    // data.append('user', )
    $.ajax('/api/cinema', {
      method: 'POST',
      data: data,
      processData: false,
      contentType: false,
      success: function (data) {
        if (filmId) {
          window.location.href = `/film/${data.cinema.link}`
        } else {
          window.location.href = '/'
        }
      },
      error: function (err) {
        alert('Lỗi xin hãy thử lại')
      }
    })
  }

  $scope.signout = function () {
    common.showConfirmBox('Bạn có thật sự muốn đăng xuất', function () {
      common.setCookie('token', null)
      window.location.href = '/'
    })
  }
  let filmId = $('#filmId').val()
  if (filmId) {
    apiService.getFilm(filmId).then(function (response) {
      $scope.movie = response.data.cinema
      $scope.name = response.data.cinema.name
      $scope.content = response.data.cinema.content
      $scope.genre = response.data.cinema.genre
      $scope.formTitle = 'Sửa phim'
      $scope.buttonTitle = 'Lưu phim'
      $('#datepicker').data('DateTimePicker').destroy()
      $('#datepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        date: new Date(response.data.cinema.releaseDate)
      })
      $('.loader').fadeOut(500)
    },
    function (error) {
      console.log(error)
    }
    )
  } else {
    $scope.genre = $scope.genres[0]
    $scope.formTitle = 'Tạo phim mới'
    $scope.buttonTitle = 'Tạo phim'
  }
  let token = common.getCookie('token')
  if (token) {
    apiService.getUser({ token: token })
      .then(function (response) {
        $scope.user = response.data
      })
  }
  $scope.validationOptions = {
    rules: {
      name: {
        required: true
      },
      genre: {
        required: true
      },
      content: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Vui lòng nhập tên bộ phim'
      },
      genre: {
        required: 'Vui lòng chọn thể loại phim'
      },
      content: {
        required: 'Vui lòng nhập chi tiết phim'
      }
    }
  }
  $scope.createMovie = function () {
    if ($scope.createForm.validate()) {
      if (filmId) {
        postData()
      } else if ($('#inputFile').val() !== '') {
        postData()
      } else {
        alert('Vui lòng chọn hình')
      }
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
  $scope.returnHome = function () {
    window.location.href = '/'
  }
  $('#inputFile').change(function (e) {
    $scope.file = e.target.files[0]
    if ($scope.file !== undefined) {
      $('.lds-dual-ring').fadeIn(500, function () {
        $('.lds-dual-ring').fadeOut(100)
        $('#movie-image').attr('src', URL.createObjectURL($scope.file))
      })
    }
  })

  $('.loader').fadeOut(500)
}])
