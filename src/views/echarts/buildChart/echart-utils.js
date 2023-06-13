/**
 * 常用颜色
*/
const useColor = {
  fontColor: '#CDE9FF',
  lineColor: '#29A4FF'
}

/**
 * @abstract 坐标轴分割线
 * @type 'solid' | 'dashed' | 'dotted'
 * */

const splitLine = (opt = {}) => ({
  show: true,
  lineStyle: {
    type: 'dashed',
    color: [useColor.fontColor]
  },
  ...opt
})


/**
 * @abstract 鼠标悬停在坐标轴时，当前刻度显示的高亮样式
 * @type  指示器类型。'line' 直线指示器 、'shadow' 阴影指示器、'none' 无指示器
 * */

const axisPointer = (opt = {}) => ({ type: 'shadow', ...opt })

/**
 * @abstract 坐标轴刻度相关配置 
 * */
const axisTick = (opt = {}) => ({ show: false, ...opt })

/**
 * @abstract 坐标系刻度标签
 * */
const axisLabel = (opt = {}) => ({ // 坐标轴刻度标签的相关设置
  color: useColor.fontColor,
  rotate: -20,
  ...opt
})

/**
 * @abstrac 坐标轴轴线相关配置
 * 
 * */
const axisLine = (opt = {}) => ({
  lineStyle: {
    color: useColor.lineColor,
  },
  ...opt
})

/**
 * 具体图形
 * */
const itemStyle = (opt = {}) => {
  return {
    bar: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(0,244,255,1)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(0,77,167,1)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    },
    ...opt
  }
}
/**
 * emphasis 
 * 高亮状态的扇区和标签样式。
 * */
const emphasis = (opt = {}) => ({
  itemStyle: {
    borderColor: 'rgba(42,208,255,.2)',
    borderWidth: 5
  },
  ...opt
})

/**
 * 坐标轴内的图形位置
 * */
const grid = (opt = {}) => ({
  top: '15%',
  bottom: '3%',
  left: '3%',
  right: '6%',
  containLabel: true,
  ...opt
})
export {
  useColor,
  splitLine,
  axisPointer,
  axisTick,
  axisLine,
  axisLabel,
  itemStyle,
  emphasis,
  grid
}