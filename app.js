var app = angular.module('myApp', []);

app.controller('appController', function($scope, $http) {
  $http.get('values.json').then(function(res){
    $scope.values = res.data;
  });
  // Returns a random integer between min (included) and max (included)
  $scope.randNum = function(min,max) {
    //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $scope.density = 0;
  $scope.cities = Array();

  $scope.calcDensity = function(multiplier) {
    density = 0;
    for(i = 0; i < 6; i++) {
      density = density + this.randNum(1,4);
    }
    Math.floor(density = density * multiplier / 2);

    if( density < 10 ) {
      density = 10;
    } else if (density > 45) {
      density = 45;
    }
    $scope.density = density;
    return density;
  }

  $scope.calcPop = function(i) {
    pop = i * $scope.density;
    $scope.cities = this.calcCities(pop);
    return pop;
  }

  $scope.calcCountrySize = function(i) {
    country = i * $scope.density;
    $scope.cities = this.calcCities(i);

    return country;
  }

  $scope.calcCities = function(pop) {
    p = Math.floor(Math.sqrt(pop));
    m = this.randNum(1,4) + this.randNum(1,4) + 10;

    remPop = pop;
    while( remPop > 8000) {
      largestCity = p * m;
      remPop -= largestCity;
      sLargestCity = largestCity * (this.randNum(1,4) + this.randNum(1,4)) * .1;
      remPop -= sLargestCity;

      cities = new Array();
      while(remPop > 8000) {
        cities.push(sLargestCity * (this.randNum(1,4) + this.randNum(1,4)) * .05);
        remPop -= cities[i];
      }

      return Array(largestCity, sLargestCity).concat(cities);
    }
  }
});

app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    var i = 0;
    angular.forEach(items, function(item, key) {
      filtered.push(item);
      filtered[i]['key'] = key;
      i++;
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});;
