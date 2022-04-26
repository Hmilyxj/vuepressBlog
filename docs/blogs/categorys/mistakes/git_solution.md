---
title: 我和git的恩怨情仇
date: 2021-12-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 避坑指南
tags: 
  - git
  - 前端
  - 错误合集
---

:::tip
这是一些git报错的解决办法
:::
<!-- more -->
:::warn
git clone 时报错：fatal: unable to access 'https://github.com/xxx.git/': Failed to connect to github.com port 443 after 21099 ms: Timed out
:::

## 解决：
取消代理：

git config --global --unset http.proxy

git config --global --unset https.proxy

:::warn
git push 时报错：fatal: unable to access 'https://github.com/xxx.git/': OpenSSL SSL_read: Connection was reset, errno 10054
:::

## 解决：
产生原因：一般是这是因为服务器的SSL证书没有经过第三方机构的签署，所以才报错
解除ssl验证后，再次git即可
解决办法输入此条git命令：git config --global http.sslVerify "false"
