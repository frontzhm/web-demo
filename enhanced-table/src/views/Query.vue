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
        el-button.btn(type='warning',plain='', @click='clickExportBtn("AjaxExportClassAssistantEvaluateList")') 导出
  //- 表格区域

</template>
<script>
import EnhancedTable from '@/components/EnhancedTable'
import EnhancedForm from '@/components/EnhancedForm'

export default {
  components: { EnhancedTable, EnhancedForm },

  data () {
    const formConfig = {
      year: { label: '年份', category: 'date-picker', type: 'year', format: 'yyyy', valueFormat: 'yyyy', clearable: false },
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
    return {
      formConfig,
      formAttr
    }
  }

}
</script>
