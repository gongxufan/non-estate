// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'common'])

  .run(function ($ionicPlatform, $ionicHistory, $ionicPopup, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      //延迟设置isVisible为false，防止第三方输入法返回退出当前页面
      window.addEventListener('native.keyboardhide', function (e) {
        cordova.plugins.Keyboard.isVisible = true;
        $timeout(function () {
          cordova.plugins.Keyboard.isVisible = false;
        }, 100);
      });
    });

    $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
      if ($ionicHistory.backView()) {
        if (cordova.plugins.Keyboard.isVisible) {
          cordova.plugins.Keyboard.close();
        } else {
          $ionicHistory.goBack();
        }
      } else {
        ionic.Platform.exitApp();
      }
      return false;
    }, 101);
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    //下面为不同平台的外观配置
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    //禁用顶部返回导航箭头后的文字
    $ionicConfigProvider.backButton.previousTitleText(false);

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
      })

      // Each tab has its own nav history stack:
      //首页功能入口
      .state('tab.index', {
        url: '/index',
        views: {
          'tab-index': {
            templateUrl: 'templates/tab-index.html',
            controller: 'IndexCtrl'
          }
        }
      })
      //预约
      .state('tab.preOrder', {
        url: '/preOrder',
        views: {
          'tab-preOrder': {
            templateUrl: 'templates/tab-preOrder.html',
            controller: 'PreOrderCtrl'
          }
        }
      })
      //公告
      .state('tab.announce', {
        url: '/announce',
        views: {
          'tab-announce': {
            templateUrl: 'templates/tab-announce.html',
            controller: 'AnnounceCtrl'
          }
        }
      })
      //我的个人信息路由
      .state('tab.person', {
        url: '/person',
        views: {
          'tab-person': {
            templateUrl: 'templates/tab-person.html',
            controller: 'PersonCtrl'
          }
        }
      })
      //区域选择路由
      .state('tab.selectArea', {
        url: '/selectArea',
        views: {
          'tab-index': {
            templateUrl: 'templates/area-select.html',
            controller: 'SelectAreaCtrl'
          }
        }
      })
      //指引分类
      .state('tab.guides', {
        url: '/guides',
        views: {
          'tab-index': {
            templateUrl: 'templates/guide-subject.html',
            controller: 'GuideCtrl'
          }
        }
      })
      //预约协议须知
      .state('tab.notice', {
        url: '/notice',
        views: {
          'tab-preOrder': {
            templateUrl: 'templates/notice.html',
            controller: 'PreOrderCtrl'
          }
        }
      })
      //预约登记
      .state('tab.editPerson', {
        url: '/editPerson',
        views: {
          'tab-person': {
            templateUrl: 'templates/editPerson.html',
            controller: 'EditPersonCtrl'
          }
        }
      })
      //我的预约信息
      .state('tab.myPreOrder', {
        url: '/myPreOrder',
        views: {
          'tab-person': {
            templateUrl: 'templates/my-preorder.html',
            controller: 'MyPreOrderCtrl'
          }
        }
      })
      //系统使用说明
      .state('tab.sysGuide', {
        url: '/sysGuide',
        views: {
          'tab-index': {
            templateUrl: 'templates/sys-guide.html',
            controller: 'GuideCtrl'
          }
        }
      })
      //系统使用说明
      .state('tab.requirement', {
        url: '/requirement',
        views: {
          'tab-index': {
            templateUrl: 'templates/requirements.html',
            controller: 'GuideCtrl'
          }
        }
      })
      //常见问题
      .state('tab.questions', {
        url: '/questions',
        views: {
          'tab-index': {
            templateUrl: 'templates/questions.html',
            controller: 'GuideCtrl'
          }
        }
      })
      //在线业务查询
      .state('tab.queryBiz', {
        url: '/queryBiz',
        views: {
          'tab-index': {
            templateUrl: 'templates/biz-query.html',
            controller: 'IndexCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location) {
      return '/tab/selectArea';
    });

  });
angular.module('starter.controllers', ['ionic.native']);
angular.module('starter.services',[]);
/**
 * 通用的一些UI交互
 */
angular.module('common',['ionic.native'])
  .factory('common',function ( $cordovaDialogs,$ionicPopup) {
    return {
      showAlert : function (message,title,buttonName) {
        //使用原生UI
        if (window.cordova && window.cordova.plugins)
          $cordovaDialogs.alert(message, title, buttonName);
        else
          $ionicPopup.alert({
            title: title,
            template: message,
            okText: buttonName
          });
      },
      /*
       根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
       地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
       出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
       顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
       校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

       出生日期计算方法。
       15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
       2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
       下面是正则表达式:
       出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
       身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
       15位校验规则 6位地址编码+6位出生日期+3位顺序号
       18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

       校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
       公式(1)中：
       i----表示号码字符从由至左包括校验码在内的位置序号；
       ai----表示第i位置上的号码字符值；
       Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
       i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
       Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

       */
      //身份证号合法性验证
      //支持15位和18位身份证号
      //支持地址编码、出生日期、校验位验证
      identityCodeValid:function (code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
          tip = "身份证号格式错误";
          pass = false;
        }

        else if(!city[code.substr(0,2)]){
          tip = "地址编码错误";
          pass = false;
        }
        else{
          //18位身份证需要验证最后一位校验位
          if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
              tip = "校验位错误";
              pass =false;
            }
          }
        }
        return pass;
      },
      validatePhone : function(phone){
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        return reg.test(phone);
      }

    }
  });
angular.module('starter.controllers').controller('AnnounceCtrl',
  function($rootScope,$scope,$state,$location,index,API,$log) {
    $scope.$on('$ionicView.enter', function (e) {
      $log.debug(API.getUserInfo());
    });
  });
/**
 * 个人信息维护逻辑处理
 * 1、入口调用接口getUserInfo获取用户信息，在修改个人信息界面显示
 * 2、确定修改跳转到预约界面，需要判断用户是否已经选择好预约区域
 */
angular.module('starter.controllers').controller('EditPersonCtrl',
  function ($rootScope,$scope, API, $state) {
    $scope.user = API.getUserInfo();
    if (!$scope.user) {
      $scope.user = {
        name: "",
        cid: "",
        phone: ""
      }
      $scope.confirmEdit = function () {
        if(!API.saveUserInfo($scope.user))
          return;
        if($rootScope.selectedArea)
          $state.go('tab.preOrder');
        else
          $state.go('tab.selectArea');
      }
    }
  });
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
angular.module('starter.controllers').controller('IndexCtrl',
  function ($rootScope, $scope, $state, $location, index) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function (e) {
      console.log("page actived");
    });
    $scope.title = index.title;
    $scope.banner = index.banner;
    $scope.iconImgs = index.iconImgs;
    $scope.iconImgs = index.iconImgs;

    $scope.goToPage = function (url) {
      $state.go(url);
    }
  });
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
angular.module('starter.controllers').controller('SelectAreaCtrl',
  function($rootScope,$scope,$state,index,API) {
    $scope.goToIndex = function (area) {
      $rootScope.selectedArea = area;
      $state.go("tab.index");
    }
    $scope.areaIco = 'img/areaIco.png';
    $scope.areas = API.getAreas();
  });
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
angular.module('starter.services')
  .service("API", function (common) {
    var userInfo;
    var areas = [];
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
        return [
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
        ]
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
angular.module('starter.services')
  .service('index',function () {
    //首页九宫格
    var iconImgs = ['img/indexIco1.png','img/indexIco2.png','img/indexIco3.png','img/indexIco4.png','img/indexIco6_null.png',
      'img/indexIco5_null.png'];
    var banner = "img/banner.jpg";
    var title = "首页";
    //是否已经选择区域
    var isSelectedArea = false;
    return {
      iconImgs:iconImgs,
      banner:banner,
      title:title,
      isSelectedArea:isSelectedArea
    };
  });
