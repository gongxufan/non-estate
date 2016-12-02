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
