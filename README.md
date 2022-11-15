# WebShare - 网页分享 SDK

[![Npm](https://badgen.net/npm/v/easy-web-share)](https://www.npmjs.com/package/easy-web-share)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/easy-web-share)](https://bundlephobia.com/result?p=easy-web-share)

网页端经常遇到的场景：点击右上角转发给好友或直接调起原生 APP 的分享。为了让分享后等到比较好的展示效果，比如标题、简略图片、描述等，开发者部的不对每个平台进行配置。由于但平台众多，每个平台都不一致，让人十分头疼。

## 支持平台

- web social
- QQ
- QQ 空间
- 微信

## Usage

```javascript
import webShare from 'easy-web-share'


// 创建并配置全局分享信息
const webShare = createWebShare({
  url: '分享地址',
  title: '分享标题',
  desc: '分享描述',
  imageUrl: '分享图片地址
})

// 更新分享信息，在需要的页面调用
webShare.setShareInfo({
  url: '分享地址',
  title: '分享标题',
  desc: '分享描述',
  imageUrl: '分享图片地址
})

```

> 在需要 SDK 才能设置分享内容的环境中，如微信、QQ ，如果没有加载对应的 jssdk，本项目会自动加载对应的 jssdk。

### 特殊配置

#### 微信

在微信内分享必须借助微信 jssdk,且获取相应的接口权限，因此需要在页面加载时调用 wx.config 初始化 SDK.

```javascript
wx.config({
  debugger: false,
  appId: 'your appId',
  timestamp,
  nonceStr: noncestr,
  signature,
  jsApiList: ['updateAppMessageShareData'],
})
```

## API

### setGlobalShareInfo

### getGlobalShareInfo

### setShareInfo

### getShareInfo
