<template>
  <div class="echartWrapper" :elmId="elmId"></div>
</template>

<script>
import Echart from './index'
export default {
  props: {
    elmId: {
      type: String,
      default: ''
    },
    chartType: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const chartInstance = new Echart(this.$props.elmId)
    console.log(chartInstance,'chartInstance')
  }
}
</script>

<style scoped>
.echartWrapper {
  width: 250px;
  height: 200px;
  border: 1px solid #ddd;
  margin: 8px;
}
</style>