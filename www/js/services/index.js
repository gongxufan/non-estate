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
