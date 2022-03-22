import Vue from "vue"
import VueRouter from "vue-router"
import store from '../store/index'
/* 路由懒加载 */
/* 首页 */
const Layout = () => import( /* webpackChunkName: "group-home" */ '../views/Layout.vue')
const HomePage = () => import( /* webpackChunkName: "group-home" */ '../views/home/HomePage.vue')
const PersonalRecom = () => import( /* webpackChunkName: "group-home" */ '../views/home/homepageview/PersonalRecom.vue')
/* 登录 和 404*/
const Login = () => import( /* webpackChunkName: "group-login" */ '../views/Login.vue')
const NotFound = () => import( /* webpackChunkName: "group-login" */ '../views/NotFound.vue')
/* 发现页内容 */
const TopList = () => import( /* webpackChunkName: "group-homepage" */ '../views/home/homepageview/TopList.vue')
const PlayList = () => import( /* webpackChunkName: "group-homepage" */ '../views/home/homepageview/PlayList.vue')
const ArtistList = () => import( /* webpackChunkName: "group-homepage" */ '../views/home/homepageview/ArtistList.vue')
/* 历史播放 */
const HistoryPlay = () => import( /* webpackChunkName: "group-hisplay" */ '../views/historyplay/HistoryPlay.vue')
/* 需登录后才能进入的页面 */
const RecommendSong = () => import( /* webpackChunkName: "group-user" */ '../views/user/RecommendSong.vue')
const SubScribeView = () => import( /* webpackChunkName: "group-user" */ '../views/user/subscribe/SubScribeView.vue')
const SubAlbum = () => import( /* webpackChunkName: "group-user" */ '../views/user/subscribe/SubAlbum.vue')
const SubArtists = () => import( /* webpackChunkName: "group-user" */ '../views/user/subscribe/SubArtists.vue')
const SubMv = () => import( /* webpackChunkName: "group-user" */ '../views/user/subscribe/SubMv.vue')
/* 搜索相关 */
const SearchList = () => import( /* webpackChunkName: "group-search" */ '../views/search/SearchList.vue')
/* 各大详情页 */
const PlayListDetail = () => import( /* webpackChunkName: "group-detail" */ '../views/playlist/PlayListDetail.vue')
const ArtistDetail = () => import( /* webpackChunkName: "group-detail" */ '../views/artist/ArtistDetail.vue')
const AlbumDetail = () => import( /* webpackChunkName: "group-detail" */ '../views/album/AlbumDetail.vue')
const VideoDetail = () => import( /* webpackChunkName: "group-detail" */ '../views/video/VideoDetail.vue')
const UserDetail = () => import( /* webpackChunkName: "group-detail" */ '../views/user/UserDetail.vue')

Vue.use(VueRouter);

const routes = [{
		path: "/",
		component: Layout,
		redirect: 'homepage',
		children: [
			/* 发现音乐页 */
			{
				path: "homepage",
				component: HomePage,
				redirect: "/personalrecom",
				children: [
					{ path: "/personalrecom", component: PersonalRecom, meta: { title: '个性推荐' } }, //个性推荐
					{ path: '/toplist', component: TopList, meta: { title: '排行榜' } }, //排行榜
					{ path: '/playlist', component: PlayList, meta: { title: '歌单列表' } }, //歌单列表页
					{ path: '/artistlist', component: ArtistList, meta: { title: '歌手列表' } }, //歌手页
				],
			},
			/* 收藏页 */
			{
				path: 'subscribe',
				component: SubScribeView,
				redirect: '/sub-album',
				meta: { check: true },
				children: [
					{ path: '/sub-album', component: SubAlbum, meta: { check: true, title: '收藏的专辑' } },
					{ path: '/sub-artists', component: SubArtists, meta: { check: true, title: '收藏的歌手' } },
					{ path: '/sub-mv', component: SubMv, meta: { check: true, title: '收藏的MV' } }
				]
			},
			{ path: "search/:key", component: SearchList, props: true, meta: { title: '搜索结果' } }, // 搜索展示页
			{ path: "playlistdetail/:id", component: PlayListDetail, props: true, meta: { title: '歌单' } }, //歌单详情页
			{ path: "artistdetail/:id", component: ArtistDetail, props: true, meta: { title: '歌手主页' } }, //歌手详情页
			{ path: "albumdetail/:id", component: AlbumDetail, props: true, meta: { title: '专辑' } }, //专辑详情页
			{ path: "videodetail/:type/:id", component: VideoDetail, meta: { title: '视频' },  props: true }, //视频和MV详情页 type v:video mv:mv
			{ path: "userdetail/:id", component: UserDetail, props: true, meta: { title: '用户主页' } }, //用户详情页
			{ path: 'recomsongs', component: RecommendSong, meta: { check: true, title: '每日推荐' } }, //每日推荐歌曲页
			{ path: 'historyplay', component: HistoryPlay, meta: { title: '最近播放' } }, //最近播放页
		],
	},
	{ path: '/login', component: Login, meta: { check: false, title: '登录' } }, //login
	{ path: '*', component: NotFound, meta: { title: 'NotFound' } } //404
]

const router = new VueRouter({
	mode: "hash",
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.meta.check === true) {
		if (store.state.isLogin === true) next()
		else {
			Vue.prototype.$message.error('需要登录')
			next('/login')
		}

	} else {
		next()
	}
})
router.afterEach((to) => {
	if (to?.meta?.title) {
		document.title = to.meta.title
	} else {
		document.title = 'NetEasyMusic'
	}
})

export default router
