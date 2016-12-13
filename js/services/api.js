angular.module('starter.services')
  .service("API", function (common) {
    var userInfo;
    var areas = [];
    var orders = [];
    return {
      getAreas:function () {
        areas = [{areaName:"县级市","cities":[["芒市","瑞丽市"]]},
          {areaName:"县","cities":[["陇川县","梁河县","盈江县"]]}];
        return areas;
      },
      getUserInfo: function () {
        return userInfo;
      },
      saveUserInfo: function (user) {
        if(!user.name){
          common.showAlert("请输入姓名","提示","确定");
          return false;
        }
        if(!user.cid){
          common.showAlert("请输入身份证号码","提示","确定");
          return false;
        }else if(!common.identityCodeValid(user.cid)){
          common.showAlert("身份证号格式非法，请重新输入","提示","确定");
          return false;
        }
        if(!user.phone){
          common.showAlert("请输入预约手机号码","提示","确定");
          return false;
        }else if(!common.validatePhone(user.phone)){
          common.showAlert("预约手机号码格式非法，请重新输入","提示","确定");
          return false;
        }
        userInfo = user;
        return true;
      },
      getMyOrders: function (userId) {
       /* orders =  [
          {
            "orderId": "10001",
            "time": "2016-10-27 09:00-10:00",
            "position": "芒市",
            "bizType": "新建商品房买卖(新房办房本)",
            "org": "芒市不动产登记事务中心",
            "status": "0"
          },
          {
            "orderId": "10002",
            "time": "2016-10-27 09:00-10:00",
            "position": "梁河县",
            "bizType": "新建商品房买卖(新房办房本)",
            "org": "梁河县不动产登记事务中心",
            "status": "1"
          }
        ];*/
        return orders;
      },
      saveOrder : function (order) {
        orders.unshift(order);
      },
      cancleOrder: function (orderId) {
        console.log("取消预约：" + orderId);
      },
      getBizType: function () {
        return [{"typeName": "预告登记", "typeId": "1"},
            {"typeName": "抵押登记", "typeId": "2"},
            {"typeName": "转移登记", "typeId": "3"},
            {"typeName": "二手房买卖交易", "typeId": "4"}]
      },
      getSubBizType: function (bizTypeId) {
        var subBizType = [];
        if (bizTypeId == "1")
          subBizType = ["预告协议办理"];
        else if (bizTypeId == "2")
          subBizType = ["抵押注销协议"];
        else if (bizTypeId == "3")
          subBizType = ["转移登记协议"];
        else
          subBizType = ["二手房买卖交易"];
        return subBizType;
      },
      getBizDate: function () {
        return ["2016-10-31", "2016-11-01", "2016-11-04", "2016-11-05"]
      },
      getBizTime: function (bizDate) {
        var bizTime = [];
        if (bizDate == "2016-10-31")
          bizTime = ["09:00-11:00(剩余28)", "13:00-14:00(剩余10)"];
        else if (bizDate == "2016-11-01")
          bizTime = ["09:00-11:00(剩余58)", "13:00-14:00(剩余60)", "15:00-16:00(剩余90)"];
        else if (bizDate == "2016-11-04")
          bizTime = ["09:00-11:00(剩余18)", "13:00-14:00(剩余30)"];
        else
          bizTime = ["10:00-11:00(剩余8)", "14:00-15:00(剩余11)"];
        return bizTime
      }
    };
  });
