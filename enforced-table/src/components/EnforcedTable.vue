<template lang="pug">
el-table(:data="tableData" v-loading="isLoad" stripe v-bind="tableConfig" @sort-change="changeSort" @selection-change="changeSelectRows")
  template(v-for="colConfig in colConfigs")
    //- 循环每一项 有slot的单独渲染
    slot(v-if="colConfig.slot" :name="colConfig.slot")
    //- 有component的单独渲染
    component(v-else-if="colConfig.component" :is="colConfig.component" :col-config="colConfig")
    el-table-column(v-else v-bind="colConfig")
</template>

<script>
/**
 * 思路 https://juejin.im/post/5a100d09f265da4324800807#heading-2
 * demo https://codesandbox.io/s/klpzy7l1o
 * 本地demo 我直接放在home那边了
 *  <enhanced-table :tableData="tableData" :col-configs="colConfigs">
      <el-table-column slot="options" label="操作">
        <el-button size="mini" slot-scope="{ row }">查看{{row.date}}</el-button>
      </el-table-column>
    </enhanced-table>
  data () {
    return {
      colConfigs: [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' },
        { prop: 'change', label: '变化', component: PrefixPlusText },
        { prop: 'trend', label: '趋势' },
        { slot: 'options', message: 'message' }
      ],
      tableData: [{
        id: '1',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        change: '12%',
        trend: '10%'
      }]
    }
  }
 */
export default {
  props: { colConfigs: Array, tableData: Array, tableConfig: Object, isLoad: Boolean },
  methods: {

    // 只有老师的表格有
    changeSort ({ column, prop, order }) {
      this.$emit('sort-change', column, prop, order)
    },
    // 复选框选了哪些row
    changeSelectRows (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
