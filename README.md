## 基于Vue的仿网易云音乐播放器-静听音乐

本项目是为了加深Vue框架学习的仿网易云音乐播放器项目，目前实现了基本音乐功能，还在进一步完善优化。后端使用[开源网易云音乐NodeJS版Api](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)。

**仅供个人学习练手！**

[预览地址](http://8.130.100.213/#/personalrecom)

功能展示于文末





## 使用步骤

1.运行后端仓库

api：使用开源的nodejs封装的网易云音乐api [地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

```
# 下载后端仓库
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
# 安装依赖
$ npm install
# 运行
$ node app.js
```

2.运行本项目

```
# 下载
$ git clone 本项目地址
# 安装依赖
$ npm install
# 开启本地服务运行项目
npm run dev
```



## 技术栈

- Vue、Vuex，VueCli，Vue-router

- axios

- ElementUi

- ES6

- Less

  

## 已实现功能

- [x] 歌曲播放器：歌曲信息，换歌，进度条控制

- [x] 最近播放（本地存储，不是云端的播放记录）

- [x] 歌曲页面：歌词滚动，评论

- [x] 发现页推荐、歌单、歌手、排行榜

- [x] 歌曲列表：专辑入口，歌手入口，当前播放音乐行

- [x] 歌单页：歌曲列表、歌单页搜索、加载完整歌单、收藏、评论

- [x] 专辑页：歌曲列表、搜索、收藏、评论、专辑详情

- [x] 歌手页：专辑列表、歌手描述、MV、相似歌手

- [x] M详情页：视频播放、相似视频推荐、 MV 播放、评论

- [x] 用户页：基本信息、创建的歌单、收藏的歌单

- [x] 搜索功能：热搜榜，搜索推荐，搜索页面，分类搜索结果

- [x] 用户登录：手机密码登录，验证码登录账号，二维码登录

- [x] 用户功能：点赞、回复、评论，收藏

- [x] 我的收藏和我建立的歌单：用户收藏的专辑、MV、歌手及筛选功能

- [x] 使用 Vuex 进行组件间通信，管理组件状态

- 优化
  - [x] el-skeleton实现骨架屏（skeleton），提高首屏加载时的用户体验
  
    移动端适配
  
    - [x] 移动端轮播图不使用立体效果
  
  - [x] 路由懒加载及代码分块
  
  - [x] 未登录情况下的路由守卫



## 目标功能

- [ ] 视频和MV的推荐页面
- [ ] 私人FM页面
- [ ] 直播页面
- [ ] 播放模式切换功能（单曲循环、列表循环等）
- [ ] 音乐下载功能
- [ ] 分享功能
- [ ] 用户更改信息功能
- [ ] 给用户私信功能
- [ ] 评论页面的更多精彩评论
- [ ] 更多的优化功能





## 部分功能展示

<table style="border=0">
    <tr>
        <td>发现音乐-个性推荐</td>
        <td>发现音乐-歌单</td>
    </tr>
    <tr>
        <td>
            <img src=images/发现音乐-个性推荐.png border=0>
        </td>
        <td>
            <img src=images/发现音乐-歌单.png border=0>
        </td>
    </tr>
    <tr>
        <td>发现音乐-排行榜</td>
        <td>发现音乐-歌手</td>
    </tr>
	<tr>
		<td>
            <img src=images/发现音乐-排行榜.png border=0>
        </td>
        <td>
            <img src=images/发现音乐-歌手.png border=0>
        </td>
    </tr>
    <tr>
        <td>歌单详情页</td>
        <td>歌手详情页</td>
    </tr>
	<tr>
		<td>
            <img src=images/歌单详情页.png>
        </td>
        <td>
            <img src=images/歌手详情页.png>
        </td>
    </tr>
    <tr>
        <td>专辑详情页</td>
        <td>专辑评论页</td>
    </tr>
	<tr>
		<td>
            <img src=images/专辑详情页.png border=0>
        </td>
        <td>
            <img src=images/专辑评论页.png border=0>
        </td>
    </tr>
    <tr>
        <td>最近播放</td>
        <td>登录页面</td>
    </tr>
	<tr>
		<td>
            <img src=images/最近播放.png border=0>
        </td>
        <td>
            <img src=images/登录页面.png border=0>
        </td>
    </tr>
    <tr>
        <td>歌曲播放页面</td>
        <td>登录后-每日推荐</td>
    </tr>
	<tr>
		<td>
            <img src=images/歌曲播放页面.png border=0>
        </td>
        <td>
            <img src=images/登录后-每日推荐.png border=0>
        </td>
    </tr>
    <tr>
        <td>登录后-收藏页面</td>
        <td>登录后-个人歌单</td>
    </tr>
	<tr>
		<td>
            <img src=images/登录后-收藏页面.png border=0>
        </td>
        <td>
            <img src=images/登录后-个人歌单.png border=0>
        </td>
    </tr>
</table>

