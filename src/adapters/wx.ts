// https://open.mobile.qq.com

const wxAdapter: ShareAdapter = {
  sdkSrc: '//res.wx.qq.com/open/js/jweixin-1.6.0.js',
  isReady () {
    return !!window.wx
  },
  async setShareInfo (config) {
    wx.ready(() => {
      wx.updateAppMessageShareData({
        title: config.title,
        desc: config.desc,
        imgUrl: config.imageUrl,
        link: config.url
      })
    })
  }
}

export default wxAdapter
