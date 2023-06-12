<template>
  <div class="echarts-page-warpper">
    <EchartVue v-for="chart in chartArr" :key="chart.id" :elmId="chart.id"/>
  </div>
</template>
<script>
import EchartVue from './buildChart/echart.vue'

const chartArr = [
  {id: 'normalBar' },
]
export default {
  components:{ EchartVue },
  data() {
    return {
      chartArr
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.echarts-page-warpper{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
}
</style>
