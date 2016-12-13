/**
 * 我的预约逻辑处理
 */
angular.module('starter.controllers').controller('MyPreOrderCtrl',
  function ($rootScope, $scope, $state, $location,API) {
    //每次激活页面重新拉取数据
    $scope.$on('$ionicView.enter', function (e) {
      $scope.orders = API.getMyOrders('100001');
    });
    //取消预约
    $scope.cancleOrder = function (order) {
      API.cancleOrder(order.orderId);
      //更改状态为取消
      order.status = "1";
    }
  });
