angular.module('starter.controllers').controller('AnnounceCtrl',
  function($rootScope,$scope,$state,$location,index,API,$log) {
    $scope.$on('$ionicView.enter', function (e) {
      $log.debug(API.getUserInfo());
    });
  });
