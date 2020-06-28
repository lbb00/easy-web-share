interface ShareInfo {
  url: string
  title: string
  desc: string
  imageUrl: string
}

interface WebShareOptions {
  syncMeta?: SyncMetaConfig
}

interface SyncMetaConfig {
  url?: boolean
  title?: boolean
  desc?: boolean
  imageUrl?: boolean
}

interface Platform {
  uaRegex: RegExp

  adapter: ShareAdapter
}

interface ShareAdapter {
  sdkSrc: string
  isReady: () => boolean
  setShareInfo: (shareInfo: ShareInfo) => Promise<any>
}

interface Window {
  mqq: any
}

interface CreateWebShare {
  (option?: WebShareOptions): {
    setGlobalShareInfo: (info?: ShareInfo) => void
    getGlobalShareInfo: () => ShareInfo | undefined
    setShareInfo: (info?: ShareInfo) => Promise<any>
    getShareInfo: () => ShareInfo | undefined
  }
}
