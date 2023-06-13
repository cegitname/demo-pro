
import Echart from '../buildChart/index'

export default {
  data() {
    return {
      Instance: null
    }
  },
  mounted() {
    const chartDiv = this.$refs.chartDom
    this.Instance = new Echart(chartDiv)
  }
}

