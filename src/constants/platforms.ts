import * as uaRegex from './uaRegex'

import qqAdapter from '../adapters/qq'

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
  }
}

export default platforms
