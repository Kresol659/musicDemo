
//显示侧边栏
export function ShowDraw(val) {
    return {
        type: 'CHANGE_DRAW',
        val
    }
}
//保存session
export function saveSession(val) {
    return {
        type: 'SAVE_SESSION',
        val
    }
}
//我的歌曲传参
export function myMusic(obj) {
    return {
        type: 'MY_MUSIC',
        obj
    }
}
//本地音乐
export function localMusic(val) {
    return {
        type: 'LOCAL_MUSIC',
        val
    }
}
//最近音乐
export function recentMusic(val) {
    return {
        type: 'RECENT_MUSIC',
        val
    }
}