const moment = require('moment');
moment.locale("zh-cn") //显示中国的时间格式

module.exports = {
  "title": "Hmliystar",
  "description": "a blog build on vuepress",
  "head": [
    ["link", { "rel": "icon", "href": "/favicon.ico" }],
    ["meta", { "name": "viewport", "content": "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  base: '/', // 这是部署到github相关的配置
  "theme": "reco",
  "mode": 'light',
  "markdown": {
    "lineNumbers": true
  },
  plugins: [
    //一键复制代码插件: "vuepress-plugin-code-copy": "^1.0.6",
    ["vuepress-plugin-code-copy", true],
    // 阅读进度条: "vuepress-plugin-reading-progress": "^1.0.10",
    ["reading-progress", true],
    // 最后更改时间插件(内置)+moment 格式化为中国地区的样式
    [
      '@vuepress/last-updated', {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ],
    //看板娘
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang', {
        theme: [
          'wanko', 'blackCat', 'whiteCat'
        ],
        clean: false,
        messages: {
          welcome: '欢迎来到我的博客', home: '心里的花，我想要带你回家。', theme: '好吧，希望你能喜欢我的其他小伙伴。', close: '你不喜欢我了吗？痴痴地望着你。'
        },
        messageStyle: { right: '68px', bottom: '290px' },
        width: 250,
        height: 320
      }
    ],
    //公告
    [
      '@vuepress-reco/vuepress-plugin-bulletin-popover', {
        title: '公告',
        body: [
          {
            type: 'title',
            content: '欢迎加我的QQ 🎉🎉🎉',
            style: 'text-aligin: center;',
          },
          {
            type: 'text',
            content: 'QQ：970398843',
            style: 'text-align: center;'
          },
          {
            type: 'text',
            content: '友链或疑问均可在留言板给我留言',
            style: 'text-align: center;'
          }
        ],
        footer: [
          {
            type: 'button',
            text: 'click',
            link: '/'
          },
        ]
      }],
    //音乐播放器
    [
      "@vuepress-reco/vuepress-plugin-bgm-player", {
        audios: [
          {
            name: 'アイロニ',
            artist: '4yen',
            url: '/bgm2.mp3',
            cover: '/bgm2.jpg'
          },
          {
            name: '去依赖',
            artist: '庆怜',
            url: '/bgm1.mp3',
            cover: '/bgm1.jpg'
          },
          {
            name: '我们俩',
            artist: '郭顶',
            url: '/bgm3.mp3',
            cover: '/bgm3.jpg'
          },
          {
            name: '강남역 4번 출구',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
          {
            name: '用胳膊当枕头',
            artist: '최낙타',
            url: 'https://assets.smallsunnyfox.com/music/3.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
          }
        ]
      }
    ],
    //鼠标点击特效
    [
      "vuepress-plugin-cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: 'circle',  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
  ],
  "themeConfig": {
    //评论
    valineConfig: {
      appId: 'uyN1iaTGcqhpBGMT5GkD0Ji4-gzGzoHsz',// your appId
      appKey: 'ocDEWQwrc3nNWgajIUI60HSC', // your appKey
    },
    "nav": [
      { "text": "首页", "link": "/", "icon": "reco-home" },
      {
        "text": "项目", "icon": "reco-menu",
        "items": [
          { "text": "移动端购物商城", "link": "/blogs/project/supermall" },
          { "text": "仿网易云音乐客户端", "link": "/blogs/project/cloudmusic" }
        ]
      },
      {
        "text": "工具箱", "icon": "reco-up",
        "items": [
          { "text": "在线PS", "link": "https://ps.gaoding.com/#/" },
          { "text": "奶牛快传", "link": "https://cowtransfer.com/" },
        ]
      },
      { "text": "时间线", "link": "/timeline/", "icon": "reco-date" },
      { "text": "留言板", "link": "/blogs/message/message", "icon": "reco-suggestion" },
      {
        "text": "关于", "icon": "reco-message",
        "items": [
          { "text": "关于我", "link": "/blogs/about/about", "icon": "reco-account" },
          { "text": "Github", "link": "https://github.com/Hmilyxj", "icon": "reco-github" }
        ],
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",//导航栏左侧logo
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "最近更新于",
    "author": "Hmilystar",
    "authorAvatar": "/avatar.png",//头像
    "record": "湘ICP1225备号",
    "startYear": "2021",
    "codeTheme": 'tomorrow', // default 'tomorrow'
    "subSidebar": 'auto'//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
  },
};