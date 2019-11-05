<template lang="pug">
el-table-column(v-bind="colConfig")
  template(v-slot="{row}")
    span {{ parseInt(row[colConfig.prop]) > 0 ? '+' + row[colConfig.prop] : row[colConfig.prop] }}
</template>

<script>
export default {
  props: ['colConfig']
}
</script>

<style>
</style>
