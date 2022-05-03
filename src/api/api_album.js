import get from '@/service/get'

/* 获取专辑内容 */
export const getAlbumDetail = (id) => get('/album', { id })

/* 获取专辑动态内容，评论收藏等 */
export const getAlbumDynamic = (id) => get('/album/detail/dynamic', { id, timestamp: Date.now() })

/* login 收藏/取消收藏专辑 t : 类型,1:收藏,2:取消收藏 */
export const setAlbumSub = (id, t) => get('/album/sub', { id, t ,timestamp:Date.now()})

/*login 收藏的专辑列表  */
export const getSubAlbum = (offset = 0, limit = 25) => get('/album/sublist', { offset, limit,timestamp:Date.now() })