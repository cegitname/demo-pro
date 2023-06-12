import * as echarts from 'echarts';
import * as cutils from './echart-utils'
// const isEmptyObj = (target) => Object.getOwnPropertyNames(target).length === 0
export default class EchartDemo {
  constructor(chartId, opt = {}) {
    if (!chartId) {
      throw new Error('缺少容器 dom')
    }
    this.Ele = document.getElementById(chartId)
    this.chartInstance = null
    this.opt = opt
  }
  initDefault() {

  }
  setOption(option) {
    this.option = option
    return this
  }
  init() {
    if (!this.Ele)
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance = echarts.init(this.Ele)
  }
  setGrid(opt = {}) {
    const { grid } = cutils
    this.opt.grid = grid(opt)
    return this
  }
  // 柱状图
  useBar(opt) {
    this.chartInstance.setOption(opt)
  }
  // 饼图
  usePie(opt) {
    this.chartInstance.setOption(opt)
  }
}

