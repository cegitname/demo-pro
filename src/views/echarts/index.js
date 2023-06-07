import * as echarts from 'echarts';

export default class EchartDemo {
  constructor(opt) {
    this.chartName = opt.chartName || 'main'
    this.chart = null
  }
  setOption(option) {
    this.option = option
    return this
  }
  init() {
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(document.getElementById(this.chartName));
    // 绘制图表
    this.chart.setOption(this.option);
  }
}

