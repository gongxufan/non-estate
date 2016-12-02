/**
 * 这里多个路由对应同一个视图，根据URL做单独的处理
 */
angular.module('starter.controllers').controller('PreOrderCtrl',
  function ($rootScope, $scope, $state, $location,API,common) {
    //进入登记协议
    if ($location.url() == "/tab/notice") {
      //同意进入预约界面
      $scope.accept = function () {
        if($rootScope.selectedArea){
          //判断是否绑定了个人信息
          if(!API.getUserInfo()){
            common.showAlert('第一次使用预约功能，需要完善个人信息.','补全信息','确定');
            $state.go("tab.editPerson");
          }
          else
            $state.go("tab.preOrder");
        }
        else
          $state.go("tab.selectArea");
      }
      //不同意跳转到区域选择
      $scope.disAgree = function () {
        $state.go("tab.selectArea");
      }
    }
    //进入登记主界面
    if ($location.url() == "/tab/preOrder") {
        $scope.$on('$ionicView.enter', function (e) {
          $scope.user = API.getUserInfo();
          $scope.bizType = API.getBizType();
          $scope.subBizType = [];
          $scope.bizDate = API.getBizDate();
          $scope.bizTime = [];
        });

      $scope.selectBizType = function (type) {
        $scope.subBizType = API.getSubBizType(type.typeId)
      }
      $scope.selectDate = function (date) {
        $scope.bizTime = API.getBizTime(date);
      }
    }
  });
