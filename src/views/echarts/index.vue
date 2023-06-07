<template>
  <div>
    <div id="chart1" class="chart1"></div>
  </div>
</template>
<script>
import Chart from './index'
export default {
  data() {
    return {
      chart1: null,
      chart1Option: {
        /*标题组件，包含主标题和副标题。*/
        title: {
          id: /*组件ID, 默认不指定。指定则可用于option 或者 API 中引用*/ '',
          show: /*是否显示标题*/ true,
          text: '主标题文本',
          link: /*主标题文本超链*/ 'https://echarts.apache.org/zh/option.html#title.text',
          target: /*blank | self*/ 'blank',
          textStyle: {
            //
          }
        },
        legend: /* 图例组件 */ {
          /**
           * @图例类型 type
           *  - plain 普通图例。缺省就是普通图例
           *  - scroll 可滚动翻页的图例。当图例较多时可使用
           * @是否显示 show
           * @zlevel  用于 canvas 分层， zlevel 大的在上面
           * @z 组件所有图形的 z 值，控制图形的前后顺序。z 小的会被 z 大的覆盖
           * @left
           *  - 图例距离容器左侧的距离
           *  - 可选值：auto | left |  center | right | 20 | 20%
           *
           */
        },
        // grid 直角坐标系网格
        xAxis: {
          /**
           * 直角坐标系的 X 轴，一般情况 单个 grid 最多只能放2个 x轴，
           * 多个 x 轴需要通过配置 offset 属性防止多个 x 重叠
           *
           * */
        },
        yAxis: {}
      }
    }
  },
  mounted() {
    this.chart1 = new Chart({ chartName: 'chart1' })
    this.chart1.setOption(this.chart1Option).init()
    console.log(this.chart1, ' this.chart1')
  }
}
</script>
<style lang="less" scoped>
#chart1 {
  width: 500px;
  height: 400px;
}
</style>
