<template lang="pug">
section
  //- 表单区域
  enhanced-form.app-query-form(ref="queryForm" :form-config="formConfig" :form-attr="formAttr")
    template(v-slot:districtName="{config,form}")
      el-form-item(:label="config.label" prop="districtName")
        el-select(v-model="form.props.districtName" v-bind="config" @change="changeDistrict(form.props.districtName)")
          el-option(v-for="item in config.options" :key="item.value" :value="item.value" :label="item.label" )
    template(#btns)
      el-form-item.app-btns-box
        el-button.btn(type='primary', @click='clickSearchBtn') 查询
        el-button.btn(type='primary', @click='clickResetBtn', plain='') 重置
        el-button.btn(type='warning',plain='', @click='clickExportBtn') 导出
  //- 表格区域
  enhanced-table(:is-load='isShowTableLoading', :table-data='tableData', :col-configs='colConfigs')
    //- 跳转链接 这边注意需要在tableKeys那边加slot
    el-table-column(slot='className', label='班级名称', align='center')
      a(slot-scope='{ row }',class="link",href="javascript:;" @click="clickClassName(row)") {{row.className}}
  //- 分页 没有数据的时候不显示
  .pagination-box
    el-pagination(@current-change='changeTablePage', :current-page.sync='otherParams.pageIndex', :page-size='otherParams.pageSize', layout='prev, pager, next, jumper', :total='dataLength')
</template>
<script>
import Query from '@/mixins/Query'

export default {
  mixins: [Query],
  data () {
    const formConfig = {
      year: { label: '年份', category: 'date-picker', default: (new Date()).getFullYear() + '', type: 'year', format: 'yyyy', valueFormat: 'yyyy' },
      term: { label: '季度', category: 'select', options: [{ value: '春', label: '春' }, { value: '夏', label: '夏' }, { value: '秋', label: '秋' }, { value: '冬', label: '冬' }] },
      area: { label: '大区', category: 'select', filterable: true, default: '', options: null },
      name: { label: '姓名', category: 'input' },
      code: { label: '编号', category: 'input' }
    }

    const colConfigs = [
      { prop: 'orderNumber', label: '序号', sortable: false, align: 'center' },
      { slot: 'projectName', prop: 'projectName', label: '教研组', sortable: false, align: 'center' },
      { prop: 'teacherCount', label: '教师数量', sortable: false, align: 'center' },
      { prop: 'lessonCount', label: '总课次', sortable: false, align: 'center' },
      { prop: 'uploadPercent', label: '上传率', sortable: false, align: 'center' },
      { prop: 'passPercent', label: '合格率', sortable: false, align: 'center' }
    ]
    const ajaxApis = {
      query: 'AjaxQuery',
      export: 'AjaxExport'
    }
    return {
      // 查询表单项的配置
      formConfig,
      // 表格每列的配置
      colConfigs,
      // 这个是 请求的方法，不同页面的请求方法名肯定是不一样的 需要配置
      ajaxApis
    }
  },
  computed: {
    // 处理之后的数据
    tableData () {
      return this.tableDataNative
    }
  },
  methods: {
    // 页面加载执行的方法
    async init () {
      // 这个有异步操作，需要用await
      await this.setAreaOptions()
      this.getTableData()
    },
    async setAreaOptions () {
      let res = await this.$api.AjaxGetAreas()
      let options = res.data.data
      this.setSingleFormItem({ prop: 'area', attr: 'options', value: options })
      this.setSingleFormItem({ prop: 'area', attr: 'default', value: options[1].value })
    }
  }

}
</script>
<style>
.el-table{
  border:1px solid #e8e8e8;
  width: 90%;
  margin: auto;
}
.pagination-box{
  margin-top: 20px;
  text-align: center;
}

</style>
