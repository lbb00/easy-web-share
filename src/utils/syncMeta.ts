const META_CONFIG = {
  url: {
    itemprop: 'url',
    property: 'og:url'
  },
  title: {
    itemprop: 'name',
    property: 'og:title'
  },
  desc: {
    itemprop: 'description',
    property: 'og:description'
  },
  imageUrl: {
    itemprop: 'image',
    property: 'og:image'
  }
}
function syncMeta (shareInfo: ShareInfo, syncConfig?: SyncMetaConfig): void {
  if (syncConfig === false) return
  Object.keys(META_CONFIG).forEach((key) => {
    const { itemprop, property } = META_CONFIG[key]
    const config = syncConfig?.[key]
    const allowed = !config || typeof config === 'undefined' ? true : !!config
    if (allowed) {
      const el = document.querySelector(`meta[property="${property}"]`)
      const nEl = el ?? document.createElement('meta')
      nEl.setAttribute('itemprop', itemprop)
      nEl.setAttribute('property', property)
      nEl.setAttribute('content', shareInfo[key])
      if (!el) document.head.appendChild(nEl)
    }
  })
}

export default syncMeta
