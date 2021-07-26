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
                <el-menu-item index="1-1" @click="toHere('shake')">我是震动</el-menu-item>
                <el-menu-item index="1-2" @click="toHere('twinkle')">我是闪烁</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>进入动画</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toHere('slipIn')">我是飞入</el-menu-item>
                <el-menu-item index="2-2"  @click="toHere('easeIn')">我是渐入</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>退出动画</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="toHere('slipOut')">我是滑出</el-menu-item>
                <el-menu-item index="3-2" @click="toHere('fadeOut')">我是淡出</el-menu-item>
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
              <li>创建一个类MyElement，包含元素id、动画配置（包含起止时间、动画类型、回调函数等等）等信息（私有成员），设置<strong>默认配置</strong></li>
              <li>编写各类动画实现的<strong>公共方法</strong></li>
              <li>编写<strong>全局的默认配置</strong></li>
            </ol>
          </li>

          <li>在vue实例中，引入anime.js
            <ol>
              <li>对各个要使用的动画DOM元素获取id，并创建一个新的`MyElement`对象</li>
              <li>可以手动配置</li>
            </ol>
          </li>
        </ul>
        <el-button @click="activeIndex='anime'" class="primary">一起来看看吧</el-button>
      </div>
      <div v-show="activeIndex=='anime'">
        <div><span id="shake" @click="setHighLight('shake')">这是震动</span></div>
        <el-divider></el-divider>
        <div><span id="s2" @click="dance">这是跳动</span></div>
        <el-divider></el-divider>
        <div><span id="twinkle" @click="setHighLight('twinkle')">这是闪烁</span></div>
        <el-divider></el-divider>
        <div><span id="slipIn" @click="setEnter('slipIn')">这是飞入</span></div>
        <el-divider></el-divider>
        <div><span id="easeIn" @click="setEnter('easeIn')">这是渐入</span></div>
        <el-divider></el-divider>
        <div><span id="slipOut" @click="setExit('slipOut')">这是滑出</span></div>
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
      animeTemplate:[
        ``,
      ],
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
          objList[i].print();//打印信息
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHere(loc){
      document.getElementById(loc).scrollIntoView();
    },
    //缺省参数event，可以在target中获取id
    setHighLight(anime){
      this.animeList[event.target.id].setViewType(anime);
      this.animeList[event.target.id].print();
    },
    dance(){
      this.animeList[event.target.id].print();
    },
    setEnter(anime){
      this.animeList[event.target.id].setEnterType(anime);
      this.animeList[event.target.id].print();
    },
    setExit(anime){
      this.animeList[event.target.id].setExitType(anime);
      this.animeList[event.target.id].print();
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
  width: 40%;
  overflow: hidden;
}
#animeShow div{
  margin-top: 20%;
}
#animeShow div span{
  padding: 30px;
  display: inline-block;
}
</style>
