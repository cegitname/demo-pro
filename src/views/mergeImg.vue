<template>
  <div class="warpper">
    <button @click="download">生成图片</button>
    <div class="hello" ref="sfz">
      <img style="margin-bottom: 16px" :src="info.forward" alt="" />
      <img class="b" :src="info.back" alt="" />
    </div>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
export default {
  name: 'HelloWorld',
  data() {
    return {
      info: {
        forward: require('./imgs/1.jpg'),
        back: require('./imgs/2.jpg')
      }
    }
  },
  methods: {
    async createMergeImg() {
      const res = await this.getJpg(this.$refs.sfz)
      console.log(res, 'resss')
    },
    getJpg(dom) {
      return new Promise((resolve) => {
        html2Canvas(dom).then((canvas) => {
          const jpg = canvas.toDataURL('image/jpg', 1.0)
          resolve(this.base64ToFile(jpg))
        })
      })
    },
    base64ToFile(urlData) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1])
      let n = bytes.length
      const ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], 'jpg', { type: mime })
    },
    async download() {
      const ref = this.$refs.sfz // 截图区域
      html2Canvas(ref, {
        backgroundColor: '#e8f4ff',
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png')
        const creatDom = document.createElement('a')
        document.body.appendChild(creatDom)
        creatDom.href = dataURL
        creatDom.download = '图片'
        creatDom.click()
      })
    }
  }
}
</script>

<style scoped>
.warpper {
  width: 100vw;
  height: 100vh;
  background: #ddd;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hello {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  width: 474px;
  height: 300px;
}
</style>
