<template lang="pug">
//- v-bind会自动将form的配置属性赋值过来，特别棒的一个指令
el-form(:model='form.props', :rules='form.rules', v-bind='form.attrs')
  template(v-for='(config, prop) in form.configs')
    slot(v-if='config.slotName', :name='config.slotName', :form='form', :config='config')
    //- 表单的每项都是一个组件，用法参照 https://element.eleme.cn/#/zh-CN/component/form
    el-form-item(v-else='', :label='config.label', :key='prop', :prop='prop')
      //- 文本框 类
      component(v-if=" config.category === 'input' || config.category === 'input-number' || config.category === 'time-picker' || config.category === 'date-picker' ", :is="'el-' + config.category", v-model='form.props[prop]', :key='config.component', v-bind='config')
      //- 选择框类
      el-radio-group(v-if="config.category === 'radio-group'", v-model='form.props[prop]', v-bind='config')
        el-radio(v-for='item in config.options', :key='item.value', :label='item.value') {{ item.label }}
      el-checkbox-group(v-if="config.category === 'checkbox-group'", v-model='form.props[prop]', v-bind='config')
        el-checkbox(v-for='item in config.options', :key='item.value', :label='item.value') {{ item.label }}
      el-select(v-if="config.category === 'select'", v-model='form.props[prop]', v-bind='config')
        el-option(v-for='item in config.options', :key='item.value', :value='item.value', :label='item.label')
  slot(name='btns')
</template>
<script>
export default {
  props: ['formConfig', 'formAttr'],
  data () {
    let form = {
      configs: this.formConfig,
      attrs: this.formAttr,
      // el-form的model的值
      props: {},
      rules: {}
    }
    Object.keys(this.formConfig).forEach(prop => {
      // 这里如果设置了默认项就是默认值，没有就是undefined
      form.props[prop] = this.formConfig[prop].default
      form.rules[prop] = this.formConfig[prop].rules
    })
    return {
      form
    }
  }

}
</script>
