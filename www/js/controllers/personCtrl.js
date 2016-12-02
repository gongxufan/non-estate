angular.module('starter.controllers').controller('PersonCtrl',
  function($rootScope,$scope,$state,$location,API) {
    //每次进入页面获取一次最新的用户数据
    $scope.$on('$ionicView.enter', function (e) {
      $scope.user = API.getUserInfo();
    });
    //编辑个人信息
    $scope.editPerson = function () {
      $state.go('tab.editPerson');
    };
    //查看我的预约信息
    $scope.myPreOrders = function () {
      $state.go('tab.myPreOrder');
    }
  });
