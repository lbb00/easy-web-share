interface WebShareOptions {
  syncMeta?: SyncMetaConfig
}

interface SyncMetaConfig {
  url?: boolean
  title?: boolean
  desc?: boolean
  imageUrl?: boolean
}

interface ShareAdapter {
  sdkSrc: string
  isReady: () => boolean
  setShareInfo: (shareInfo: ShareInfo) => Promise<any>
}

interface Window {
  mqq: any
  wx: any
}

interface CreateWebShare {
  (option?: WebShareOptions): {
    setGlobalShareInfo: (info?: ShareInfo) => void
    getGlobalShareInfo: () => ShareInfo | undefined
    setShareInfo: (info?: ShareInfo) => Promise<any>
    getShareInfo: () => ShareInfo | undefined
  }
}

declare const createWebShare: CreateWebShare
