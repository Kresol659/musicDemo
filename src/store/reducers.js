import { combineReducers } from 'redux';

//·····································侧边栏····································//
function changeDraw(state = false, action) {
    switch (action.type) {
        case 'CHANGE_DRAW': return action.val;
        default: return state;
    }
}
//·····································session保存····································//
function getSession(state = '', action) {
    switch (action.type) {
        case 'SAVE_SESSION': return action.val;
        default: return state;
    }
}
//·····································我的歌曲传参····································//
function showMyMusic(state = [], action) {
    switch (action.type) {
        case 'MY_MUSIC': return action.obj;
        default: return state;
    }
}
//·····································本地歌曲····································//
function showLocalMusic(state = [], action) {
    switch (action.type) {
        case 'LOCAL_MUSIC': return action.val;
        default: return state;
    }
}
//·····································最近播放····································//
function showRecentMusic(state = [], action) {
    switch (action.type) {
        case 'RECENT_MUSIC': {
            let old = [action.val, ...state];
            let newState = new Set(old);
            return [...newState]
        }
        default: return state;
    }
}


//·····································导出····································//
export default combineReducers({
    changeDraw,
    getSession,
    showMyMusic,
    showLocalMusic,
    showRecentMusic
})