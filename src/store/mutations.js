import { stat } from "fs";

const mutations = {
    setSinger(state, singer) {
        state.singer = singer;
    },
    setPlaying(state, playing) {
        state.playing = playing;
    },
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen;
    },
    setPlaylist(state, playlist) {
        state.playlist = playlist;
    },
    setSequenceList(state, sequenceList) {
        state.sequenceList = sequenceList;
    },
    setMode(state, mode) {
        state.mode = mode;
    },
    setCurrIndex(state, currIndex) {
        state.currIndex = currIndex; 
    },
    setTopMusic(state, topMusic) {
        state.topMusic = topMusic;
    },
    setFavoraiteList(state, item) {
        state.favoraiteList.unshift(item);
    },
    setIsLiked(state) {
        state.playlist[state.currIndex].isLiked = true;
    },
    setRecentList(state, list) {
        if (state.recentList.length > 10) {
            state.recentList.pop();
        }
        state.recentList.unshift(list[state.currIndex]);
    }
}

export default mutations;