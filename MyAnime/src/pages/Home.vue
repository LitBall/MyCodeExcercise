<template>
  <div id="home">
    <h1>{{ title }}</h1>
    <h2>{{ msg }}</h2>
    <div id="animeShow">
      <p id="p1" @click="shake">这是震动</p>
      <p id="p2" @click="dance">这是跳动</p>
      <p id="p3" @click="twinkle">这是闪烁</p>

      <p id="p4" @click="slipIn">这是滑入</p>
      <p id="p5" @click="slipOut">这是滑出</p>
    </div>

  </div>

</template>

<script>
import MyElement from  "../assets/anime"
export default {
  name: "Home",
  data (){
    return{
      title:"你好！这是我的动画展示页",
      msg:"谢谢你来看我！:D",
      animeList: {},

    }
  },
  methods:{
    onStart(){
      console.log("onStart");
      //$nextTick(): 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      //HTML中的dom树还没建起来，JS代码就加载了，此时页面上还是空的，不然dom元素的获取要放在window.onload里面
      this.$nextTick(() => {
        let eList = document.getElementsByTagName("p");
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
    shake(){
      //缺省参数event，可以在target中获取id
      //console.log("bb",this.animeList);
      //console.log(event);
      //this.animeList[event.target.id].print();
      this.animeList[event.target.id].setViewType("shake");
      this.animeList[event.target.id].print();
    },
    dance(){
      this.animeList[event.target.id].print();
    },
    twinkle(){
      this.animeList[event.target.id].setViewType("twinkle");
      this.animeList[event.target.id].print();
    },
    slipIn(){
      this.animeList[event.target.id].setEnterType("slipIn");
      this.animeList[event.target.id].print();
    },
    slipOut(){
      this.animeList[event.target.id].setExitType("slipOut");
      this.animeList[event.target.id].print();
    }
  },
  mounted() {
    this.onStart();
  }
}
</script>

<style scoped>
#home{
  margin-top: 50px;
  margin-left: 20px;
}
#animeShow{
  margin-left: 25%;
}
</style>
