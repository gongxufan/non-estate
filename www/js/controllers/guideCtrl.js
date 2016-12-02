angular.module('starter.controllers').controller('GuideCtrl',
  function($rootScope,$scope,$state,$location,API) {
    $scope.showGuide = function () {
      $state.go('tab.sysGuide');
    }
    $scope.showRequirement = function () {
      $state.go('tab.requirement');
    }
    $scope.showQuestions = function () {
      $state.go('tab.questions');
    }
  });
