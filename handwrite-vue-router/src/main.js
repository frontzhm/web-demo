import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
let selfPlugin = function() {
  console.log("fn");
};
selfPlugin.install = function() {
  // 其实就是将this.options和这里的mixin里的参数合并
  // 一般在所有组件的生命周期里混入一些功能
  // 这段代码在main.js写完之后，会出现三次，因为首先new Vue一次，App.vue一次，helloworld一次
  Vue.mixin({
    created() {
      console.log("i am created");
      console.log(this);
      // 组件其实根本上也是vue实例，是vue的类，通过`new Vue(options)`得到的，vue提供`this.$options`让我们拿到当前vue实例的`options`。
      // this.$options也是写插件时候的常用项
      console.log(this.$options);
    }
  });
};
Vue.use(selfPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
