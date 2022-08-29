import * as uaRegex from './uaRegex'

import qqAdapter from '../adapters/qq'
import wxAdapter from '../adapters/wx'
interface Platform {
  uaRegex: RegExp

  adapter: ShareAdapter
}

const platforms: {
  [key: string]: Platform
} = {
  qq: {
    uaRegex: uaRegex.isQQ,
    adapter: qqAdapter
  },
  qzone: {
    uaRegex: uaRegex.isQzone,
    adapter: qqAdapter
  },
  wx: {
    uaRegex: uaRegex.isWx,
    adapter: wxAdapter
  }
}

export default platforms
