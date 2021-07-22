//实现一个简单的的js库
// 1. 可以配置动画类型
// (已实现手动传参，后续在前端添加交互选择）
// 2. 可以配置动画时间
// 3. 可以配置动画开始和结束的回调函数

//默认配置
const defaultInstanceSettings = {
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
const defaultTweenSettings = {
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

  //1.获取元素
  //2.保存原style
  //3.调用动画函数，动画函数之内修改css

  //设置进入动画类型
  setEnterType(type){
    this.settings.enterType = type;
    let that = this;
    let enterAnime = {
      //滑入：改变元素绝对定位的left right top bottom等属性，修改位置
      /*
      * @param: speed: 元素运动速度，默认20
      * @param: direction: 方向，默认左边
      * */
      slipIn: function (speed= 20){
        console.log("slipIn on");
        let e = document.getElementById(that.id);
        //let originalStyle = e.style.cssText;
        //e.style.position = "relative"; //使其相对定位
        //let startTime = (new Date()).getTime();//动画开始时间
        let initLeft = e.offsetLeft;
        console.log(initLeft);
        clearInterval(e.timeID);
        e.timeID = setInterval(() => {
          //从左边进入
          e.style.left = '0px';
          let currLeft = e.offsetLeft;
          //边界检测
          let isLeft = currLeft <= initLeft? true:false;
          isLeft?currLeft += speed : currLeft -= speed;
          e.style.left = currLeft.toString() + 'px';

          if(isLeft?currLeft >= initLeft:currLeft <= initLeft) {
            //(1)停止定时器
            clearInterval(e.timeID);
            //(2)元素复位
            e.style.left = initLeft + 'px';
          }
        },10)
        // animeOn();
        // function animeOn(){
        //
        // }
      }
    };
    enterAnime[type]();
  }
  //设置退出动画类型
  setExitType(type){
    this.settings.exitType = type;
    let that = this;
    let exitAnime = {};
    exitAnime[type]();
  }
  //设置强调动画类型
  setViewType(type){
    this.settings.viewType = type;
    let that = this;
    let viewAnime = {
      /*
      * e: 元素id
      * time: 时间，默认500ms
      * onComplete: 动画完成后的回调函数
      * */

      //震动
      // distance: 震动距离，默认5px
      shake: function (distance=5,time=500){
        console.log("shake on");
        let e = document.getElementById(that.id);
        let originalStyle = e.style.cssText;
        e.style.position = "relative"; //使其相对定位
        let startTime = (new Date()).getTime();//动画开始时间
        animeOn();
        function animeOn(){
          let nowTime = (new Date()).getTime();
          let pastTime = nowTime - startTime;
          let fraction = pastTime / time;
          if(fraction < 1){
            let x = distance * Math.sin(fraction*4*Math.PI);
            e.style.left = x.toString() + "px";
            setTimeout(animeOn, Math.min(25, time - pastTime));
          } else {
            e.style.cssText = originalStyle;//恢复原状
            // if(onComplete) onComplete(e);//动画结束，回调函数
          }
        }
      },
      //闪烁
      twinkle: function (time=500){
        console.log("twinkle on");
        let e = document.getElementById(that.id);
        let originalStyle = e.style.cssText;
        //e.style.position = "relative"; //使其相对定位
        let startTime = (new Date()).getTime();//动画开始时间
        animeOn();
        function animeOn(){
          let nowTime = (new Date()).getTime();
          let pastTime = nowTime - startTime;
          let fraction = pastTime / time;
          if(fraction < 1){
            let alpha = Math.sin(fraction*4*Math.PI);
            e.style.opacity = alpha;
            setTimeout(animeOn, Math.min(25, time - pastTime));
          } else {
            e.style.cssText = originalStyle;//恢复原状
            // if(onComplete) onComplete(e);//动画结束，回调函数
          }
        }
      },

      // //跳动
      // /*
      // * e: 元素id
      // * time: 时间，默认500ms
      // * onComplete: 动画完成后的回调函数
      // * */
      // dance(){
      //   console.log("dance on");
      //   let e = document.getElementById(this.id);
      //   let originalStyle = e.style.cssText;
      //   e.style.position = "relative"; //使其相对定位
      //   let startTime = (new Date()).getTime();//动画开始时间
      //   animeOn();
      //   function animeOn(){
      //     //
      //   }
      // }
    };
    viewAnime[type]();
  }




}

//进入动画

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



