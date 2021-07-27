<template>
  <div id="home">

    <div id="nav">
      <el-row class="tac">
        <el-col :span="12">
          <h1>{{ title }}</h1>
          <h2>{{ msg }}</h2>
          <el-menu
            default-active="1"
            class="=el-menu-vertical-demo"
            background-color="#303133"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="0" @click="activeIndex='profile'">
              <template slot="title">
                <span>简介</span>
              </template>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <span>强调动画</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="toHere('shake','highlight')">我是震动</el-menu-item>
                <el-menu-item index="1-2" @click="toHere('twinkle','highlight')">我是闪烁</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>进入动画</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toHere('slipIn','enter')">我是飞入</el-menu-item>
                <el-menu-item index="2-2"  @click="toHere('easeIn','enter')">我是渐入</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>退出动画</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="toHere('slipOut','exit')">我是滑出</el-menu-item>
                <el-menu-item index="3-2" @click="toHere('fadeOut','exit')">我是淡出</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div id="animeShow">
      <div v-show="activeIndex=='profile'">
        <h2>我的Anime.js展示页面</h2>
        <p>实习期间内，我的课题是实现一个JS动画库。</p>
        <p>要求有：</p>
        <ul>
          <li>可以配置动画类型</li>
          <li>可以配置动画时间</li>
          <li>可以配置动画开始和结束的回调函数</li>
        </ul>
        <h2>我的实现思路</h2>
        <ul>
          <li>
            在anime.js中
            <ol>
              <li>创建一个类MyElement，包含元素id、动画配置（包含起止时间、动画类型、回调函数等等）等信息（私有成员），设置默认配置</li>
              <li>编写各类动画实现的公共方法</li>
              <li>编写全局的默认配置</li>
            </ol>
          </li>

          <li>在vue实例中，引入anime.js
            <ol>
              <li>对各个要使用的动画DOM元素获取id，并创建一个新的MyElement对象</li>
              <li>可以手动配置</li>
            </ol>
          </li>
        </ul>
        <el-button @click="activeIndex='highlight'" plain style="float:right;">
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>

<!--      正文-->
      <div v-show="activeIndex=='highlight'">
        <div>
          <span id="shake" @click="setHighLight('shake')">这是震动</span>
          <span class="example"><strong>示例用法：</strong>
            <p>//anime: 'shake'</p>
            <div>
              <p>shake(){</p>
              <p>MyElementList[elementID].setViewType({type: anime, distance: 10, onStart: "startCall", onComplete: "endCall"});</p>
              <p>},</p>
            </div>
          </span>
        </div>
        <el-divider></el-divider>

        <div><span id="s2" @click="dance">这是跳动</span></div>
        <el-divider></el-divider>
        <div>
          <span id="twinkle" @click="setHighLight('twinkle')">这是闪烁</span>
          <span class="example"><strong>示例用法：</strong>
            <p>//anime: 'twinkle'</p>
            <div>
              <p>twinkle(){</p>
              <p>MyElementList[elementID].setViewType({type: anime, onStart: "startCall", onComplete: "endCall"});</p>
              <p>},</p>
            </div>
          </span>
        </div>
        <el-divider></el-divider>

      </div>
      <div v-show="activeIndex=='enter'">
        <div>
          <span id="slipIn" @click="setEnter('slipIn')">这是飞入</span>
          <span class="example"><strong>示例用法：</strong>
            <p>//anime: 'slipIn'</p>
            <div>
              slipIn(){
              <p>MyElementList[elementID].setEnterType({type: 'slipIn', speed: 5,onStart: "startCall", onComplete: "endCall"});</p>
              <p>},</p>
            </div>
          </span>
        </div>
        <el-divider></el-divider>

        <div>
          <span id="easeIn" @click="setEnter('easeIn')">这是渐入</span>
          <span class="example"><strong>示例用法：</strong>
            <p>//anime: 'easeIn'</p>
            <div>
              easeIn(){
              <p>MyElementList[elementID].setEnterType({type: 'slipIn', speed: 5,onStart: "startCall", onComplete: "endCall"});</p>
              <p>},</p>
            </div>
          </span>
        </div>
        <el-divider></el-divider>

      </div>
      <div v-show="activeIndex=='exit'">
        <div>
          <span id="slipOut" @click="setExit('slipOut')">这是滑出</span>
          <span class="example"><strong>示例用法：</strong>
            <p>//anime: 'easeIn'</p>
            <div>
              easeIn(){
              <p>MyElementList[elementID].setEnterType({type: 'slipIn', speed: 5,onStart: "startCall", onComplete: "endCall"});</p>
              <p>},</p>
            </div>
          </span>
        </div>
        <el-divider></el-divider>

        <div><span id="fadeOut" @click="setExit('fadeOut')">这是淡出</span></div>
        <el-divider></el-divider>
      </div>

    </div>



  </div>

</template>

<script>
import MyElement from  "../assets/anime"
export default {
  name: "Home",
  data (){
    return{
      title:"Hello World",
      msg:"My Anime.js",
      activeIndex: "profile",
      animeList: {},
    }
  },
  methods:{
    onStart(){
      console.log("onStart");
      //$nextTick(): 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      //HTML中的dom树还没建起来，JS代码就加载了，此时页面上还是空的，不然dom元素的获取要放在window.onload里面
      this.$nextTick(() => {
        let eList = document.getElementsByTagName("span");
        let objList = {};
        //使用键值对保存节点 key:id value:动画对象
        for (let i = 0; i < eList.length; i++) {
          let id = eList.item(i).id;
          objList[id] = new MyElement(eList.item(i).id);
        }
        this.animeList = objList;
        //console.log("aa",this.animeList);
        for(let i in objList){
          //objList[i].print();//打印信息
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHere(loc,type){
      this.activeIndex = type;
      document.getElementById(loc).scrollIntoView();
    },
    //缺省参数event，可以在target中获取id
    setHighLight(anime){
      switch (anime){
        case "shake":
          //震动的使用方法
          this.animeList[event.target.id].setViewType({type: anime, distance: 15, onStart: "startCall", onComplete: "endCall"});
          break;
        case "twinkle":
          //闪烁的使用方法
          this.animeList[event.target.id].setViewType({type: anime, onStart: "startCall", onComplete: "endCall"});
          break;
      }
      //this.animeList[event.target.id].print();
    },
    dance(){
      this.animeList[event.target.id].print();
    },
    setEnter(anime){
      //slipIn: speed越大，速度越快
      //easeIn: speed越大，速度越慢
      this.animeList[event.target.id].setEnterType({type: anime, speed: 20, direction: "left", onStart: "startCall", onComplete: "endCall"});
      //this.animeList[event.target.id].print();
    },
    setExit(anime){
      switch (anime){
        case "slipOut":
          //slipOut: speed越大，速度越快
          this.animeList[event.target.id].setExitType({type: anime, speed: 10, direction: "right", onStart: "startCall", onComplete: "endCall"});
          break;
        case "fadeOut":
          //fadeOut: speed越大，速度越慢，透明度递减
          this.animeList[event.target.id].setExitType({type: anime, speed: 0.95,onStart: "startCall", onComplete: "endCall"});
          break;
      }

      //this.animeList[event.target.id].print();
    },
  },
  mounted() {
    this.onStart();
  }
}
</script>

<style scoped>
#home{
  margin-top: 5%;
  margin-left: 5%;
  color: #ffffff;
}
#nav{
  width: 45%;
  position: fixed;

}
#animeShow{
  padding-left: 35%;
  width: 45%;
  overflow: hidden;
}
#animeShow:first-child{
  margin-top: 20%;
}
#animeShow div span{
  padding: 30px;
  display: inline-block;
}
.example{
  margin-left: 5%;
  border-top: 1px dotted;
}
</style>
