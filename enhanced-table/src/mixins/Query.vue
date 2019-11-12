
<script>
/* 此页面最适合 上面是简单的表单，下面是表格，主要是查询 翻页 重置 导出功能

1. mixins写入此文件，import Query from 'xx';mixins:[Query]
2. formConfig colConfigs ajaxApis均需要特定配置，其他的根据情况吧
3. init里面一般是当前页面具体的初始化，一般需要重写
4. computed:tableData一般是需要重新写的
5. 放好html，基本可以玩起来了
*/
/**
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
 */
import EnhancedTable from '@/components/EnhancedTable'
import EnhancedForm from '@/components/EnhancedForm'

export default {
  components: { EnhancedTable, EnhancedForm },

  data () {
    const formConfig = {
      year: { label: '年份', category: 'date-picker', default: (new Date()).getFullYear() + '', type: 'year', format: 'yyyy', valueFormat: 'yyyy' },
      term: { label: '季度', category: 'select', options: [{ value: '春', label: '春' }, { value: '夏', label: '夏' }, { value: '秋', label: '秋' }, { value: '冬', label: '冬' }] },
      area: { label: '大区', category: 'select', filterable: true, default: '', options: null },
      name: { label: '姓名', category: 'input' },
      code: { label: '编号', category: 'input' }
    }
    const formAttr = {
      // 行内显示
      inline: true,
      // 每个label宽
      labelWidth: '100px',
      // label右对齐
      labelPosition: 'right'
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
      // 整个表单的统一配置
      formAttr,
      // 表格每列的配置
      colConfigs,
      // 这个是 请求的方法，不同页面的请求方法名肯定是不一样的 需要配置
      ajaxApis,
      // 表格的加载图标
      isShowTableLoading: false,
      // 表格请求的原始数据
      tableDataNative: [],
      // 有数据就意味着可能分页
      otherParams: {
        pageIndex: 0,
        pageSize: 10,
        isAsc: '',
        sortBy: ''
      },
      // 数据总长度，基本只给分页组件用的
      dataLength: 0,
      // 为了方便重置，将首次请求表格数据的参数保存
      initialParams: null

    }
  },
  computed: {
    // 处理之后的数据
    tableData () {
      return this.tableDataNative
    }
  },
  mounted () {
    this.init()
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
    },
    clickSearchBtn () {
      // 重置页数的相关参数,这个是，比如你在点击第二页之后，pageIndex=2,但是当点击查询的时候，需要重新重置
      this.otherParams = this.initialParams.otherParams
      this.getTableData()
    },
    clickExportBtn () {
      // 导出的参数和查询的参数基本一样，但是数据不分页
      let params = { ...this.getAjaxQueryParams() }
      params.pageSize = 0
      this.$api[this.ajaxApis.export](params)
    },
    clickResetBtn () {
      // 重置表单
      this.setFormData(this.initialParams.formParams)
      // 重置页数的相关参数
      this.otherParams = this.initialParams.otherParams
      // 查询
      this.getTableData()
    },
    // ajax请求表格数据，并赋值，因为后端的数据很多时候前端需要处理下，在computed那边加一层过滤
    async ajaxQuery (params) {
      // 显示表单加载
      this.isShowTableLoading = true
      let res = await this.$api[this.ajaxApis.query](params)
      this.isShowTableLoading = false
      this.tableDataNative = res.data.data
      this.dataLength = res.data.dataCount
    },

    // 将表单元素设置成特定的值,params  = {year:2019,...}
    setFormData (params, refForm = 'queryForm') {
      // 表单
      for (let key in params) {
        this.$refs[refForm].$data.form.props[key] = params[key]
      }
    },
    // 得到表单各项的值
    getFormData (refForm = 'queryForm') {
      return this.$refs[refForm].$data.form.props
    },
    // 设置单个表单元素的属性，除了默认值，常用的是options
    setSingleFormItem ({ prop, attr, value, formConfig = 'formConfig', refForm = 'queryForm' }) {
      this[formConfig][prop][attr] = value
      // 默认值的话 需要变动form的属性
      if (attr === 'default') {
        this.$refs[refForm].$data.form.props[prop] = value
      }
    },
    getTableData () {
      let params = this.getAjaxQueryParams()
      this.ajaxQuery(params)
    },
    // 请求的参数 包括表单和页数相关的数据
    getAjaxQueryParams () {
      let formParams = this.getFormData()
      let params = { ...this.otherParams, ...formParams }
      // 设置首次查询的参数,这里注意对象是引用，必须深度复制下
      this.initialParams || (this.initialParams = { formParams: { ...formParams }, otherParams: { ...this.otherParams } })
      console.log(this.initialParams)
      return params
    },
    // 改变页数
    changeTablePage (page) {
      this.otherParams.pageIndex = page
      this.getTableData()
    }
  }

}
</script>
