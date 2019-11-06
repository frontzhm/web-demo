---
title: 优雅的使用 element-ui 中的 table 组件之升级版
tags: js
categories: js
---

原文在这里，[优雅的使用 element-ui 中的 table 组件](https://juejin.im/post/5a100d09f265da4324800807)，@ywwhack作者写的很棒，我在项目里也广泛使用，很好用，使用过程中，因为需要其他的功能，我在作者原有的基础上，升级了原组件，主要增加了以下功能

* `slot-scope`统一替换成`v-slot`
* 自定义排序
* 可勾选
* 加载状态

先贴上源码，我喜欢用pug，其实就是去掉成对的标签，属性在括号里，通过缩进表达嵌套关系。让项目能用pug的话，`npm install pug pug-cli pug-plain-loader -D`即可。

```pug
<template lang="pug">
el-table(:data="tableData" v-loading="isLoad" stripe v-bind="tableConfig" @sort-change="changeSort" @selection-change="changeSelectRows")
  template(v-for="colConfig in colConfigs")
    //- 循环每一项 有slot的单独渲染
    slot(v-if="colConfig.slot" :name="colConfig.slot" :col-config="colConfig")
    //- 有component的单独渲染
    component(v-else-if="colConfig.component" :is="colConfig.component" :col-config="colConfig")
    //- 普通项
    el-table-column(v-else v-bind="colConfig")
</template>

<script>
export default {
  props: { colConfigs: Array, tableData: Array, tableConfig: Object, isLoad: Boolean },
  methods: {
    // 提前先定义排序事件，需要用的时候直接在父组件使用
    changeSort ({ column, prop, order }) {
      this.$emit('sort-change', column, prop, order)
    },
    // 提前先定义排序事件，需要用的时候直接父组件使用
    changeSelectRows (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
```

综合使用的demo

```pug
<template lang="pug">
ul
  li
    h2(id="#basic") 基本表格
    enhanced-table(:tableData="tableData" :col-configs="basicTableConfigs")
  li
    h2 特殊行用slot的表格
    enhanced-table(:tableData="tableData" :col-configs="slotTableConfigs")
      template(v-slot:options="{colConfig}")
        el-table-column(v-bind="colConfig")
          template(v-slot="{row}")
            el-button(size="mini") 查看{{row.date}}
  li
    h2 特殊行用component的表格
    enhanced-table(:tableData="tableData" :col-configs="componentTableConfigs")
  li
    h2 有排序的表格
    enhanced-table(:tableData="tableData" :col-configs="sortedTableConfigs",@sort-change='changeCustomSort')
  li
    h2 可以勾选行的表格
    enhanced-table(:tableData="tableData" :col-configs="selectRowTableConfigs",@selection-change="selectDeleteRows")
  li(id="#loading")
    h2 有加载状态的表格
    enhanced-table(:is-load='isShowTableLoading' :tableData="tableData" :col-configs="selectRowTableConfigs")
</template>

<script>
// @ is an alias to /src
import EnhancedTable from '@/components/EnhancedTable.vue'
import PrefixPlusText from '@/components/PrefixPlusText.vue'

export default {
  name: 'home',
  components: {
    EnhancedTable,
    PrefixPlusText
  },
  data () {
    let basicTableConfigs = [
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      { prop: 'trend', label: '趋势' }
    ]
    let slotTableConfigs = [
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      { prop: 'trend', label: '趋势' },
      { slot: 'options', label: 'slot的操作', message: 'message' }
    ]
    let componentTableConfigs = [
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      { component: PrefixPlusText, prop: 'change', label: 'component的变化' },
      { prop: 'trend', label: '趋势' }
    ]
    let sortedTableConfigs = [
      { prop: 'date', label: '有排序的日期，不是自定义的不需要加事件', sortable: true },
      { prop: 'name', label: '自定义排序的姓名，需要加事件', sortable: 'custom' },
      { prop: 'address', label: '地址' },
      { prop: 'trend', label: '趋势' }
    ]
    let selectRowTableConfigs = [
      { prop: '随便', type: 'selection', label: '日期' },
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      { prop: 'trend', label: '趋势' }
    ]
    let loadingTableConfigs = [
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' },
      { prop: 'trend', label: '趋势' }
    ]
    return {
      basicTableConfigs,
      slotTableConfigs,
      componentTableConfigs,
      sortedTableConfigs,
      // 下面rowsToDelete在勾选事件的时候能是数组，每项就是row
      selectRowTableConfigs,
      rowsToDelete: [],
      // 下面的isShowTableLoading就是加载的flag
      loadingTableConfigs,
      isShowTableLoading: true,

      tableData: [{
        id: '1',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        change: '12%',
        trend: '10%'
      }]
    }
  },
  mounted () {
    setTimeout(() => {
      this.isShowTableLoading = false
    }, 1000)
  },
  methods: {
    changeCustomSort (column, prop, order) {
      console.log(arguments)
      let isAsc
      order === null && (isAsc = '')
      order === 'ascending' && (isAsc = true)
      order === 'descending' && (isAsc = false)
      this.sortBy = prop
      this.isAsc = isAsc
    },
    selectDeleteRows (val) {
      console.log(arguments)
      this.rowsToDelete = val
    }
  }
}
</script>

```




















```sh
# 连接服务器
ssh han
# 创建一个文件夹专门放一些包
mkdir package
cd package
# 下载和解压node
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz
xz -d node-v10.15.3-linux-x64.tar.xz
tar -xvf node-v10.15.3-linux-x64.tar
# 让node能全局使用
cd node-v10.15.3-linux-x64
pwd
ln -s pwd的路径/bin/node /usr/local/bin/node
ln -s ~/package/node-v10.15.3-linux-x64/bin/npm /usr/local/bin/npm
ln -s pwd的路径/bin/npx /usr/local/bin/npx

```

```js
// npm i express body-parser
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 设置跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // 让options请求快速返回
  req.method === 'OPTIONS' ? res.sendStatus(200) : next()
})
app.listen(3333,()=>{console.log('端口3333已启动')})
app.get('/',(req,res)=>{res.json({ok:1})})
```
