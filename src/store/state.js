import { playMode } from '@/utils/config.js'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [], // 支持多种播放模式
    mode: playMode.sequence,
    currIndex: -1,
    topMusic: [],
    favoraiteList: [],
    recentList: []
}

export default state;