import * as echarts from 'echarts';
import * as cutils from './echart-utils'
// const isEmptyObj = (target) => Object.getOwnPropertyNames(target).length === 0
export default class EchartDemo {
  constructor(chartId, opt = {}) {
    if (!chartId) {
      throw new Error('缺少容器 dom')
    }
    this.Ele = chartId
    this.chartInstance = null
    this.opt = opt
    this.init()
  }

  initDefault() {

  }

  setOption() {
    if (!this.chartInstance) return
    this.chartInstance.setOption(this.opt)
    return this
  }

  init() {
    console.log()
    if (!this.Ele) return
    // 基于准备好的dom，初始化echarts实例
    this.chartInstance = echarts.init(this.Ele)
  }

  setGrid(opt = {}) {
    const { grid } = cutils
    this.opt.grid = grid(opt)
    return this
  }

  setxAxis(opt = [], xData) {
    if (opt && opt.length) {
      this.opt.xAxis = opt
      return this
    }
    const { axisLabel, axisPointer, axisTick, axisLine } = cutils

    this.opt.xAxis = [{
      type: 'category',
      data: xData,
      axisLabel: axisLabel(),
      axisPointer: axisPointer(),
      axisTick: axisTick(),
      axisLine: axisLine()
    }]
    return this
  }

  setyAxis(opt = []) {
    if (opt && opt.length) {
      this.opt.yAxis = opt
      return this
    }
    const { splitLine, axisLabel } = cutils
    this.opt.yAxis = [{
      type: 'value',
      splitLine: splitLine(),
      axisLabel: axisLabel(),
      minInterval: 1
    }]
    return this
  }
  setSeries(index, setCallback) {
    if (!index && index !== 0) {
      this.throwError('setSeries 方法缺少下标')
    }
    if (!setCallback) {
      this.throwError(`setSeries 方法第 ${index} 项 缺少 set 函数`)
    }
    const { itemStyle, emphasis } = cutils
    const seriesItem = setCallback({ itemStyle, emphasis })
    if (!seriesItem) {
      this.throwError(`setSeries 的参数3 setCallback 缺少返回值`)
    }
    this.opt.series[index] = seriesItem
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

  throwError(msg) {
    throw new Error(msg)
  }
}

