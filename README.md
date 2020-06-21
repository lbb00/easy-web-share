# WebShare - 网页分享 SDK

[![Npm](https://img.shields.io/npm/v/@climple/web-share.svg?style=flat-square)](https://www.npmjs.com/package/@climple/web-share)

网页端经常遇到的场景：点击右上角转发给好友或直接调起原生 APP 的分享。为了让分享后等到比较好的展示效果，比如标题、简略图片、描述等，开发者部的不对每个平台进行配置。由于但平台众多，每个平台都不一致，让人十分头疼。

事实上已有一个[native-share](https://github.com/fa-ge/NativeShare)项目，不过该项目 issue 已经有 40 多个，并且作者已经很久没有更新，于是决定重新写个轮子。

## 支持平台

- [x] QQ
- [x] QQ 空间
- [ ] QQ 浏览器
- [ ] 微信
- [ ] UC 浏览器

目前功能还不完善...

预计将在 20 年 7 月下旬补足大部分平台的支持

## Usage

```javascript
import { createWebShare } from '@climple/web-share'


// 创建并配置全局分享信息
const webShare = createWebShare({
  url: '分享地址',
  title: '分享标题',
  desc: '分享描述',
  imageUrl: '分享图片地址
})

// 更新分享信息，在每个页面调用一次
webShare.setShareInfo({
  url: '分享地址',
  title: '分享标题',
  desc: '分享描述',
  imageUrl: '分享图片地址
})

```

## API

### setGlobalShareInfo

### getGlobalShareInfo

### setShareInfo

### getShareInfo
