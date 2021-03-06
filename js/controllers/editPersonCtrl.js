/**
 * 个人信息维护逻辑处理
 * 1、入口调用接口getUserInfo获取用户信息，在修改个人信息界面显示
 * 2、确定修改跳转到预约界面，需要判断用户是否已经选择好预约区域
 */
angular.module('starter.controllers').controller('EditPersonCtrl',
  function ($rootScope,$scope, API, $state,$document) {
    $scope.user = API.getUserInfo();
    if (!$scope.user) {
      $scope.user = {
        name: "",
        cid: "",
        phone: ""
      }
      $scope.confirmEdit = function () {
        //确认时先让所有输入框失去焦点，触发模型更新
        angular.forEach($document.find("input"),function (node) {
          node.blur();
        })
        if(!API.saveUserInfo($scope.user))
          return;
        if($rootScope.selectedArea)
          $state.go('tab.preOrder');
        else
          $state.go('tab.selectArea');
      }
    }
  });
