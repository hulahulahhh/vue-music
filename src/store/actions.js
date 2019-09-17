export const selectPlay = function ({commit}, {list, index}) {
    commit('setPlaylist', list);
    commit('setSequenceList', list);
    commit('setCurrIndex', index);
    commit('setPlaying', true);
    commit('setFullScreen', true);
    commit('setRecentList', list);
}