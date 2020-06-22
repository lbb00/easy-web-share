import platforms from './constants/platforms'
import loadJs from './utils/loadJs'
import syncMeta from './/utils/syncMeta'

function trueInfo (info: any) {
  return !info || typeof info !== 'object'
}

export function createWebShare (globalShareInfo: ShareInfo | null, options: WebShareOptions = {}) {
  let gShareInfo = globalShareInfo
  let shareInfo: ShareInfo | null = null

  const UA = navigator.userAgent

  const platformName = Object.keys(platforms).find((name) => platforms[name] && platforms[name].uaRegex.test(UA))

  const platformConfig = platformName ? platforms[platformName] : null

  return {
    setGlobalShareInfo (info: ShareInfo | null) {
      gShareInfo = info
    },

    getGlobalShareInfo () {
      return gShareInfo
    },

    async setShareInfo (info: ShareInfo) {
      if (!trueInfo(info) && !trueInfo(globalShareInfo)) {
        return Promise.reject(new Error('必须传入有效的shareInfo，或者设置有效的globalShareInfo'))
      }
      shareInfo = info
      const currentShareInfo = info
      syncMeta(currentShareInfo, options.syncMeta)
      if (platformConfig) {
        await loadJs(platformConfig.adapter.sdkSrc, platformConfig.adapter.isReady)
        if (currentShareInfo !== shareInfo) return
        await platformConfig.adapter.setShareInfo(shareInfo)
      }
    },

    getShareInfo () {
      return shareInfo
    }
  }
}

export default createWebShare
