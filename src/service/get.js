import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'api/'
/* 项目大部分为get请求，封装一个统一的处理错误、传递参数和url的get方法 */
export default (url, params) => {
    return axios.get(url, { params })
        .then(res => res.data)
        .catch(err => err)
}

export const uploadPlayListImg = ({ id, imgSize, data, imgX = 0, imgY = 0 }) =>
    axios({
        method: 'post',
        url: `/playlist/cover/update?id=${id}&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    }).then((res) => res.data).catch(err => err)

/* 更新用户头像 */
export const uploadAvatar = ({ imgSize, data, imgX = 0, imgY = 0 }) => axios({
    method: 'post',
    url: `/avatar/upload?&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    data,
}).then((res) => res.data).catch(err => err)