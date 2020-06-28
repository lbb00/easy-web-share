import platforms from './constants/platforms'
import loadJs from './utils/loadJs'
import syncMeta from './utils/syncMeta'

function trueInfo (info: any): info is ShareInfo {
  return !!info && typeof info === 'object'
}

export const createWebShare: CreateWebShare = (options) => {
  let globalShareInfo: ShareInfo | undefined
  let shareInfo: ShareInfo | undefined

  const UA = navigator.userAgent

  const platformName = Object.keys(platforms).find((name) => platforms[name]?.uaRegex?.test(UA))

  const platformConfig = platformName ? platforms[platformName] : null

  return {
    setGlobalShareInfo (info) {
      globalShareInfo = info
    },

    getGlobalShareInfo () {
      return globalShareInfo
    },

    async setShareInfo (info) {
      shareInfo = info ?? globalShareInfo
      if (!trueInfo(shareInfo)) {
        return await Promise.reject(new Error('必须传入有效的shareInfo，或者设置有效的globalShareInfo'))
      }
      const currentShareInfo = shareInfo
      syncMeta(currentShareInfo, options?.syncMeta)
      if (platformConfig) {
        await loadJs(platformConfig.adapter.sdkSrc, platformConfig.adapter.isReady)
        if (currentShareInfo !== shareInfo) return
        await platformConfig.adapter.setShareInfo(currentShareInfo)
      }
    },

    getShareInfo () {
      return shareInfo
    }
  }
}

export default createWebShare
