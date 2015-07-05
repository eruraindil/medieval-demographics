angular.module('myApp', []).controller('appController', function($scope, $http) {
  $http.get('values.json').then(function(res){
    $scope.values = res.data;
  });
  // Returns a random integer between min (included) and max (included)
  $scope.randNum = function(min,max) {
    //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
