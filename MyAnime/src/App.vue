<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <h1>Hello!</h1>
<!--    <p>-->
<!--      &lt;!&ndash; 使用 router-link 组件来导航. &ndash;&gt;-->
<!--      &lt;!&ndash; 通过传入 `to` 属性指定链接. &ndash;&gt;-->
<!--      &lt;!&ndash; <router-link> 默认会被渲染成一个 `<a>` 标签 &ndash;&gt;-->
<!--      <router-link to="/bar">Go to Bar</router-link>-->
<!--    </p>-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
