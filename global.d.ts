interface ShareInfo {
  url: string
  title: string
  desc: string
  imageUrl: string
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

// eslint-disable-next-line
interface Window {
  mqq: any
}
