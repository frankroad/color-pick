## color-picker
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0) [![chrome web store](https://img.shields.io/chrome-web-store/v/gkgaemflnhefahffachgkbpklfgggamn.svg)](https://chrome.google.com/webstore/detail/gkgaemflnhefahffachgkbpklfgggamn) [![extension downloads](https://img.shields.io/chrome-web-store/users/gkgaemflnhefahffachgkbpklfgggamn.svg?label=users)](https://chrome.google.com/webstore/detail/gkgaemflnhefahffachgkbpklfgggamn)

> 独立开发的第一款浏览器插件

谷歌商店：[下载地址](https://chrome.google.com/webstore/detail/gkgaemflnhefahffachgkbpklfgggamn)

不能翻墙地址：[下载地址](https://chrome.pictureknow.com/extension?id=392421d7d55d4969a93f8d15b6f37789)

----
## 功能设计

- [x] 页面截图后根据鼠标坐标分析canvas像素点
- [x] 点击复制当前Hex格式颜色


## 技术要点

### webpack

开发之基石，基本配置都一样，由于插件开发及打包的特殊性，配置了同步版本及合并各模块中国际化文件的脚本。

### react

移动鼠标使用 Chrome 浏览器提供的接口截图，通过 Canvas 获取所在鼠标像素。

### content-script & popup & background 通信

三处脚本的数据交换可谓是插件开发的关键点，也是最容易混乱的地方，后续要整合下事件流
