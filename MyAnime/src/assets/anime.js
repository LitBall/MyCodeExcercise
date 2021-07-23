//实现一个简单的的js库
// 1. 可以配置动画类型
// (已实现手动传参，后续在前端添加交互选择）
// 2. 可以配置动画时间
//速度、起止时间……
// 3. 可以配置动画开始和结束的回调函数

//默认配置
const DefaultInstanceSettings = {
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
const DefaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  round: 0,//循环次数
}
export default class MyElement{
  constructor(id) {
    this.id = id;
    this.settings = DefaultInstanceSettings;
  }
  print(){
    console.log(this);
    //console.log(this.settings);
  }

  //1.获取元素
  //2.保存原style
  //3.调用动画函数，动画函数之内修改css

  //问题：根据浏览器窗口尺寸计算的一些动画，在改变窗口尺寸（拉伸...）后，怎么处理？

  //设置进入动画类型
  setEnterType(type){
    this.settings.enterType = type;
    let that = this;
    let enterAnime = {
      //滑入：改变元素relative定位的left right top bottom等属性，修改位置
      /*
      * @param: speed: 元素运动速度，默认15
      * @param: direction: 方向，默认左边
      * */
      slipIn: function (speed=15,direction="left"){
        console.log("slip in");
        let e = document.getElementById(that.id);
        e.style.position = "relative"; //使其相对定位
        let slip = {
          left: function (){
            let initLeft = e.offsetLeft;
            let initWidth = e.offsetWidth;
            let offset = initLeft + initWidth;
            console.log(initLeft, ' / ', initWidth);
            clearInterval(e.timeID);
            //从左边进入
            e.style.right = offset + 'px';
            e.timeID = setInterval(() => {
              //获取当前位置。因为css值是带单位的string，所以需要处理
              let currLeft = Number(e.style.right.slice(0,-2));
              //console.log(typeof currLeft);
              //开始移动，判断位置
              let isLeft = currLeft >= 0? true:false;
              isLeft? currLeft -= speed : currLeft += speed;
              e.style.right = currLeft.toString() + 'px';
              //边界检测
              if(isLeft?currLeft <= 0:currLeft >= 0) {
                //停止定时器
                clearInterval(e.timeID);
                //元素复位
                e.style.right = '0px';
              }
            },10)
          }
        }
        slip[direction]();

      }
    };
    enterAnime[type]();
  }
  //设置退出动画类型
  setExitType(type){
    this.settings.exitType = type;
    let that = this;
    let exitAnime = {
      //滑出：和滑入类似
      /*
      * @param: speed: 元素运动速度，默认15
      * @param: direction: 方向，默认左边
      * */
      slipOut: function (speed=15,direction="right"){
        console.log("slip out");
        let e = document.getElementById(that.id);
        e.style.position = "relative"; //使其相对定位
        let slip = {
          right: function (){
            let browserWidth = window.innerWidth;//浏览器窗口宽度
            console.log(window.innerWidth);
            let initLeft = e.offsetLeft;
            let target = browserWidth - initLeft;
            console.log(initLeft, ' / ', target);
            clearInterval(e.timeID);
            //从右边退出
            e.style.left = '0px';
            e.timeID = setInterval(() => {
              //获取当前位置。因为css值是带单位的string，所以需要处理
              let currLeft = Number(e.style.left.slice(0,-2));
              //开始移动，判断位置
              let isLeft = currLeft <= target ? true:false;
              isLeft? currLeft += speed : currLeft -= speed;
              e.style.left = currLeft.toString() + 'px';
              //边界检测
              if(isLeft? currLeft >= target : currLeft <= target) {
                //停止定时器
                clearInterval(e.timeID);
                //元素复位
                e.style.left = target + 'px';
              }
            },10)
          }
        }
        slip[direction]();
      }
    };
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
        async function asyncAnime(){
          let r1 = await CallBack["startCall"]();
          let r2 = await animeOn();
        }
        function animeOn(){
          console.log("aa")
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
        // //可扩展回调函数
        // asyncAnime().then(() => {
        //   CallBack["endCall"]();//动画结束的回调函数
        // });
        // asyncAnime().catch({});
        animeOn();
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

//回调函数，可扩展
let CallBack = {
  startCall: async function(){
    console.log("start call");
    const a = await new Promise(resolve => {
      setTimeout(() => {
        resolve("done");
        console.log("async start after 500ms!");
      },500)
    })
  },
  endCall: async function(){
    console.log("end call");
    const a = await new Promise(resolve => {
      setTimeout(() => {
        resolve("done");
        console.log("async end after 500ms!");
      },500)
    })
  },
}


