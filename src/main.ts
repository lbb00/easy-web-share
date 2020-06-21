import platforms from './constants/platforms'
import loadJs from './utils/loadJs'

function trueInfo (info: any) {
  return !info || typeof info !== 'object'
}

export function createWebShare (globalShareInfo: ShareInfo | null) {
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
    setShareInfo (info: ShareInfo) {
      if (!trueInfo(info) && !trueInfo(globalShareInfo)) {
        return Promise.reject(new Error('必须传入有效的shareInfo，或者设置有效的globalShareInfo'))
      }
      shareInfo = info
      const currentShareInfo = info

      if (platformConfig) {
        return new Promise((resolve, reject) => {
          loadJs(platformConfig.adapter.sdkSrc, platformConfig.adapter.isReady)
            .then(async (_) => {
              if (currentShareInfo !== shareInfo) return
              try {
                const res = await platformConfig.adapter.setShareInfo(shareInfo)
                resolve(res)
              } catch (e) {
                reject(e)
              }
            })
            .catch(reject)
        })
      } else {
        console.warn('当前平台暂不支持webShare')
        return Promise.resolve()
      }
    },
    getShareInfo () {
      return shareInfo
    }
  }
}

export default createWebShare
