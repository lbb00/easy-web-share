// https://open.mobile.qq.com

const qqAdapter: ShareAdapter = {
  sdkSrc: '//open.mobile.qq.com/sdk/qqapi.js',
  isReady () {
    return !!window.mqq
  },
  async setShareInfo (config) {
    window.mqq.data.setShareInfo({
      title: config.title,
      desc: config.desc,
      share_url: config.url,
      image_url: config.imageUrl
    })
  }
}

export default qqAdapter
