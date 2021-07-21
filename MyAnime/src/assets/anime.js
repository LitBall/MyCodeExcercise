//实现一个简单的的js库
// 1. 可以配置动画类型
// 2. 可以配置动画时间
// 3. 可以配置动画开始和结束的回调函数

//默认配置
var defaultInstanceSettings = {
  begin: null,//开始时间
  end: null,//结束时间
  last: null,//持续时间
  loop: false,//循环播放
  enterType: null,//进入动画
  exitType: null,//退出动画
  viewType: null,//进入后，显示状态
  autoplay: false,//自动播放,
  beginCallBack: null,//动画开始的回调函数
  endCallBack: null,
}
var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  round: 0,//循环次数
}
export default class MyElement{
  constructor(id) {
    this.id = id;
    this.settings = defaultInstanceSettings;
  }
  print(){
    console.log(this);
    //console.log(this.settings);

  }
}

//进入动画
//滑入
function slipIn(){

}
//浮现
function emerge(){

}
//退出动画
//滑出
function slipOut(){

}
//淡出
function fadeOut(){

}
//显示动画
//闪烁
function twinkle(){

}
//震动
/*
* e: 元素id
* distance: 震动距离，默认5px
* time: 震动时间，默认500ms
* */
function shake(e,distance=5,time=500){
  if(typeof e === "string") {e = document.getElementById(e);}
  //1.获取元素
  //2.保存原style
  //3.调用动画函数，动画函数之内修改css
}
//跳动
function dance(){

}


// let anime = {
//   msg: "This is my anime export!",
//   id: "",
//   print: function () {
//     console.log(this.id);
//   },
//   set(i){
//     this.id = i;
//   }
// };
//
// module.exports = anime;

