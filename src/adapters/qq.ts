// https://open.mobile.qq.com

const qqAdapter: ShareAdapter = {
  sdkSrc: '//qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js',
  isReady () {
    return !!window.mqq
  },
  setShareInfo (config) {
    return new Promise((resolve, reject) => {
      window.mqq.ui.setOnShareHandler(function (type: any) {
        window.mqq.ui.shareMessage({
          title: config.title,
          desc: config.desc,
          share_type: type,
          share_url: config.url,
          image_url: config.imageUrl,
          back: true
        })
      })
      resolve()
    })
  }
}

export default qqAdapter
