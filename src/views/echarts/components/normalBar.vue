<template>
  <div class="echartWrapper" ref="chartDom"></div>
</template>

<script>
import mixins from './mixins'
export default {
  mixins:[mixins],
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.Instance,'sss')
    this.Instance
      .setGrid()
      .setyAxis()
      .setxAxis(null,['这个', '那个'])
      .setSeries(0, this.setSeries)
      .setOption()
  },
  methods: {
    setSeries() {
    }
  }
}
</script>

<style scoped>
.echartWrapper {
  width: 400px;
  height: 220px;
  border: 1px solid #ddd;
  margin: 8px;
}
</style>