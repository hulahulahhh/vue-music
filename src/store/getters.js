export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state =>  state.fullScreen;

export const playlist = state =>  state.playlist;

export const sequenceList = state =>  state.sequenceList;

export const mode = state =>  state.mode;

export const currIndex = state =>  state.currIndex;

export const currentSong = (state) =>  { 
    return state.playlist[state.currIndex] || {};
};

export const topMusic = state => state.topMusic;

export const favoraiteList = state => state.favoraiteList;

export const recentList = state => state.recentList;



