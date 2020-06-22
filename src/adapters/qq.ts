// https://open.mobile.qq.com

const qqAdapter: ShareAdapter = {
  sdkSrc: '//open.mobile.qq.com/sdk/qqapi.js',
  isReady () {
    return !!window.mqq
  },
  setShareInfo (config) {
    return new Promise((resolve, reject) => {
      window.mqq.data.setShareInfo({
        title: config.title,
        desc: config.desc,
        share_url: config.url,
        image_url: config.imageUrl
      })
      resolve()
    })
  }
}

export default qqAdapter
