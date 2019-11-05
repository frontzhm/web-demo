<template lang="pug">
  enforced-table(:tableData="tableData" :col-configs="colConfigs")
    template(#options)
      el-table-column( label="操作")
        template(v-slot="{row}")
          el-button(size="mini") 查看{{row.date}}

</template>

<script>
// @ is an alias to /src
import EnforcedTable from '@/components/EnforcedTable.vue'

export default {
  name: 'home',
  components: {
    EnforcedTable
  },
  data () {
    return {
      colConfigs: [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' },
        // { prop: 'change', label: '变化', component: PrefixPlusText },
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
}
</script>
