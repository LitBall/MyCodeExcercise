<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ msg }}</h2>
    <p id="p1">这是p1</p>
    <p id="p2">这是p2</p>
  </div>

</template>

<script>
import MyElement from  "../assets/anime"
export default {
  name: "Home",
  data (){
    return{
      title:"这是我的动画展示页",
      msg:"谢谢你来看我！:D",
    }
  },
  methods:{
    onStart(){
      // let test = require("../assets/anime");
      // // var h = new header2;
      // test.set("1");
      // let test2 = require("../assets/anime");
      // test2.set("2");
      // console.log(test === test2);
      // test.print();
      // test2.print();
      let test = new MyElement("p1");
      let test2 = new MyElement("p2");
      test.settings.enterType =
      test.print();
      test2.print();
      // console.log(test);
      // console.log(test2);

    }
  },
  created() {
    this.onStart();
  }
}
</script>

<style scoped>

</style>
