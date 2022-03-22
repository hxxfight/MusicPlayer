import Vue from "vue";
import Vuex from 'vuex'
import { getLikeIdList } from '@/api/api_music'
import { getAcount, logout, getUserPlayList } from '@/api/api_user'

Vue.use(Vuex)

const state = {
    /* 播放列表 */
    musicList: [],
    /* 播放状态 */
    isPlay: false,
    /* 当前播放的id */
    currenMusicId: 0,
    /* 当前播放的列表下标 */
    currenIndex: 0,
    /* 播放列表抽屉的状态 */
    drawerMusicList: false,
    /* 播放音乐的总时间和当前时间 */
    currenMusicInfo: {
        totalTime: 0,
        currenTime: 0
    },
    /* 登录 */
    isLogin: window.sessionStorage.getItem('isLogin') !== 'true' ? false : true,
    /* 账号信息 */
    account: {},
    /* 用户信息 */
    profile: {},
    /* 最近播放列表 */
    historyList: [],
    /* 是否为移动设备 */
    isPhone: false,
    /* 喜欢的音乐列表 */
    likeIdList: [],
    /* 播放类型 */
    playType: 'music',//music,personalFm
    /* 我的歌单，包括创建、收藏 */
    myPlayList: []
}
const actions = {
    /* music */
    playMusic({ commit }, payload) {
        /* payload :{list,id} */
        commit('setMusicList', payload.list)
        commit('setCurrenMusicId', payload.id)
        let index = payload.list.findIndex((item) => item.id == payload.id)
        commit('setCurrenIndex', index)
        commit('setPlayType', 'music')
        commit('setPlayState', true)
    },
    async getAcount({ commit, dispatch }) {
        /* 获取登录信息 */
        const res = await getAcount()
        if (res.code !== 200) return
        if (res.account !== null) {
            console.log('登录成功')
            commit('setLoginInfo', res)
            commit('setIsLogin', true)
            dispatch('getMyPlayList')
            dispatch('getLikeList')
        } else {
            commit('setLoginInfo', { account: {}, profile: {} })
            commit('setIsLogin', false)
            console.log('未登录')
            Vue.prototype.$notify({
                title: '提示',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                message:
                    `<section>本网站使用开源网易云API，部分页面在使用网易云账户登录后才显示。点击头像可以登录，本网站不会收集用户信息。</section>
                    <section>效果图展示<a href="https://github.com/hxxfight/MusicPlayer.git" target="_blank">Github</a></section>
                    `,
            })
        }
    },
    logout({ commit, state }) {
        /* 退出登录 */
        if (!state.isLogin) return Vue.prototype.$message.warning('点头像登录吧')
        Vue.prototype.$confirm('将要退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(async () => {
                const res = await logout()
                if (res.code !== 200) return
                Vue.prototype.$message.success('退出成功')
                commit('setLoginInfo', { account: null, profile: null })
                commit('setIsLogin', false)
                Vue.prototype.$router.push('/personalrecom')
            })
            .catch(() => {
                Vue.prototype.$message({
                    type: 'info',
                    message: '已取消'
                })
            })

    },
    /* 获取喜欢的音乐列表 */
    async getLikeList({ commit, state }) {
        const res = await getLikeIdList(state.profile.userId)
        if (res.code !== 200) return
        if (res.ids instanceof Array) {
            commit('setLikeIdList', {
                type: 'get',
                data: res.ids
            })
        }
    },
    /* 获取个人歌单 */
    async getMyPlayList({ commit, state }) {
        if (!state.isLogin) return
        const res = await getUserPlayList(state.profile.userId)
        if (res.code !== 200) return
        commit('setMyPlayList', res.playlist)
    }
}

const mutations = {
    setMusicList(state, musicList) {
        state.musicList = musicList
    },
    setPlayState(state, isPlay) {
        state.isPlay = isPlay
    },
    setCurrenMusicId(state, currenMusicId) {
        state.currenMusicId = currenMusicId
    },
    setCurrenIndex(state, currenIndex) {
        state.currenIndex = currenIndex
    },
    setDrawerMusicList(state, drawerMusicList) {
        state.drawerMusicList = drawerMusicList
    },
    setTotalTime(state, totalTime) {
        state.currenMusicInfo.totalTime = totalTime
    },
    setCurrenTime(state, currenTime) {
        state.currenMusicInfo.currenTime = currenTime
    },
    setIsPhone(state, isPhone) {
        state.isPhone = isPhone
    },
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin
        if (isLogin) {
            window.sessionStorage.setItem('isLogin', true)
        } else {
            window.sessionStorage.removeItem('isLogin')
        }

    },
    setLoginInfo(state, loginInfo) {
        state.account = loginInfo.account
        state.profile = loginInfo.profile
    },
    setHistoryList(state, payload) {
        if (payload.type === 'unshift') {
            if (state.historyList.findIndex((item) => item.id == payload.data.id) !== -1)
                return
            state.historyList.unshift(payload.data)
            if (state.historyList.length > 50) {
                state.historyList.splice(-1, 1)
                console.log(state.historyList.length);
            }

            window.localStorage.setItem(
                'historylist',
                JSON.stringify(state.historyList)
            )
            return
        }
        else if (payload.type === 'get') {
            state.historyList = payload.data
            return
        }
        else if (payload.type === 'clear') {
            state.historyList = []
            window.localStorage.removeItem('historylist')
            return
        }
    },
    setLikeIdList(state, payload) {
        if (payload.type === 'get') {
            state.likeIdList = payload.data
        } else if (payload.type === 'unshift') {
            state.likeIdList.unshift(payload.data)
        } else if (payload.type === 'remove') {
            state.likeIdList.splice(
                state.likeIdList.indexOf(payload.data), 1
            )
        }
    },
    setPersonalFm(state, payload) {
        if (payload.type === 'set') {
            state.musicList = payload.data
            state.currenIndex = 0
            state.currenMusicId = payload.data[0].id

        } else if (payload.type === 'next') {
            state.currenIndex++
            state.currenMusicId = state.musicList[state.currenIndex].id
        }
    },
    setPlayType(state, playType) {
        if (playType === 'music' || playType === 'personalFm') {
            state.playType = playType
        }
    },
    setMyPlayList(state, list) {
        state.myPlayList = list
    }

}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store