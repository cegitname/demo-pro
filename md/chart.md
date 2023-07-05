# 20230703 
1. 各资金来源研发投入执行分布情况 label 修改
2. 各单位研发人员全职/兼职人员统计 叠加图改双柱图
3. 各单位研发人员全职/兼职人员统计 去掉人员
4. 报工人员基本信息 toolTip 字号修改 $font-size 在个别浏览器显示异常
5. 报工工时 切换表格/table 时数据联动了
6. 切换单位 亿/万 后， 不分图标单位未改变 
7. 报工人员基本信息，tooltip 只有全部时显示研发人员总数


```javascript

    isEmpty(body, valname) {
      if (!body) return true
      const type = typeof body
      const isArray = Array.isArray(body)
      if (type === 'string') {
        const isNan = isNaN(Number(body))
        if (!isNan) {
          return Number(body) !== 0
        }
      }
      if (isArray) {
        if (!body.length) return true
      } else if (type === 'object') {
        console.log(body, 'is Object')
        // eslint-disable-next-line
        if (JSON.stringify(body) == '{}') return true
        const emptyLength = Object.keys(body).reduce((prevflg, curkey) => {
          const resFlg = this.isEmpty(body[curkey])
          return prevflg + resFlg
        }, 0)
        console.log(emptyLength, 'emptyLength')
      }
      return false
    }
```


# 2023 7-4 待改问题

1. 在首页修改日期后，进入下钻页，有重复请求，可能导致数据覆盖
2. 日期切换 2022 、 2023 研发投入==》 费用类别在2023时没有自动选择全部
3. 全下钻页，暂无数据逻辑修改，暂无数据类型包括以下类型：
  - {}
  - []
  - null
  - 操作错误
  - [
      x:[name1,name2,nam23.....],
      y1:['0','0.00'.......],
      y2:['0','0.00'.......],
      y3:['0','0.00'.......]
    ]
  - [
      {name:'name1',rankval:'0.00'},
      {name:'name2',rankval:'0.00'},
      {name:'name3',rankval:'0.00'},
    ]
  - {
      key1: '0',
      key2: '0',
      key3: '0',
      key4: '0',
      key5: '0',
    }
 4. 每次进入下钻页，默认单位 万
