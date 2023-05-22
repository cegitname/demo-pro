const sliceText = (text = '') => {
  const limit = 15
  const len = text.length
  if (len > limit * 2) {
    return `${text.substring(0, limit)}...${text.substring(len - limit, len)}`
  }
  return text
}

function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

_buildLogData = (eventData) => {
  const option = {
    optParams:'',
    platform:'',
    sdk:'',
  }
  const { optParams, platform, sdk } = option
  const _data = {
    random: Math.random(),
    ...getQueryObject(window.location.href),
    ...getQueryObject(window.location.search)
  }
  return {
    ...optParams,
    ...platform,
    ...sdk,
    _event: 'track',
    _refer:
      window.location.href.split('#')[1].split('?')[0] + '?' + param(_data),
    // cuur_page: loc.href.split('#')[1],
    cuurr_page_title: window.document.title,
    // refer_page: ref,
    time: new Date().getTime(),
    ...eventData
  }
}

const getEvent = (e) => {
  const event = e || window.event
  // e.srcElement 兼容 IE
  const targetElement = event.target || event.srcElement
  return {
    event,
    targetElement
  }
}

// 获取要传递的内容
function getLogData(e, assignData = {}) {
  let eventData = {}
  const { targetElement, event } =
    getEvent(e)
  // 获取 nodeName 并且转为小写 'DIV' => 'div' 'LI'=>'li' ...
  const nodeName =
    (targetElement.nodeName && targetElement.nodeName.toLocaleLowerCase()) || ''
  const text = targetElement.innerText || targetElement.value
  const xpath = encodeURI(getXPath(targetElement)) || ''
  const rect = getBoundingClientRect(targetElement)
  const pageX = event.pageX || event.clientX + scrollX
  const pageY = event.pageY || event.clientY + scrollY
  const t = sliceText(text)

  eventData = {
    // event type
    event_type: 'onClick',
    // event desc
    event: 'onClick',

    _event: 'click',
    _click: t === '打电话' ? 'phone' : t === '加微信' ? 'wx' : '',

    element_desc: t,
    nodeName,
    xpath,
    offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
    offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
    pageX,
    pageY,
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  }
  const logData = this._buildLogData({
    ...eventData,
    ...assignData
  })
  return logData
}
