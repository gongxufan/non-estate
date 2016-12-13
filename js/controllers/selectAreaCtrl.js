angular.module('starter.controllers').controller('SelectAreaCtrl',
  function($rootScope,$scope,$state,index,API) {
    $scope.goToIndex = function (area) {
      $rootScope.selectedArea = area;
      $state.go("tab.index");
    }
    $scope.areaIco = 'img/areaIco.png';
    $scope.areas = API.getAreas();
  });
