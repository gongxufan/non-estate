/**
 * 进入系统主页加载tabs.html时的控制逻辑写在这
 */
angular.module('starter.controllers').controller('TabCtrl',
  function ($rootScope, $scope, $state, API, $timeout,common) {
    //点击个人信息tab需要判断是否填写了个人信息
    $scope.goJudgePerson = function () {
      if (!API.getUserInfo()) {
        common.showAlert('第一次使用预约功能，需要完善个人信息.','补全信息','确定');
        $timeout(function () {
          $state.go('tab.editPerson');
        }, 1000);
      } else {
        $state.go('tab.person');
      }
    }
  });
