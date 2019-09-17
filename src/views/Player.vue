<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal">
      <div class="normalPlayer" v-show="fullScreen">
        <div
          class="background"
          :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentSong.albummid}.jpg?max_age=2592000)`}"
        ></div>
        <div class="top">
          <div class="back">
            <img src="@/assets/close.png" class="icon-back" @click="closeOrOpen">
            <h1 class="title">{{currentSong.songname}}</h1>
            <h2 class="subTitle">{{currentSong.songname}}</h2>
          </div>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <div
                  ref="cdImg"
                  class="cdImg playing"
                  :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentSong.albummid}.jpg?max_age=2592000)`}"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{formatTime(currTime)}}</span>
            <div class="progress-bar" ref="bar">
              <div class="bar-inner">
                <div class="progress" ref="progress"></div>
                <div class="progress-btn-wrapper">
                  <div class="progress-btn" ref="progressBtn"></div>
                </div>
              </div>
            </div>
            <span class="time time-r">{{formatTime(currentSong.interval)}}</span>
          </div>
          <div class="operators">
            <div class="operateItem" @click="switchMode">
              <img :src="mode===0 ? loopImg : singleLoopImg" alt>
            </div>
            <div class="operateItem" @click="prevSong">
              <img :src="playerControl[1].imgUrl" alt>
            </div>
            <div class="operateItem" @click="pauseOrPlay">
              <img :src="playImg" alt>
            </div>
            <div class="operateItem" @click="nextSong">
              <img :src="playerControl[3].imgUrl" alt>
            </div>
            <div class="operateItem" @click="likeSong">
              <img :src="currentSong.isLiked ? likeImg :unlikeImg" alt>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="miniPlayer" v-show="!fullScreen" @click="closeOrOpen">
        <div
          ref="miniIcon"
          class="icon playing"
          :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentSong.albummid}.jpg?max_age=2592000)`}"
        ></div>
        <div class="title">
          <h1 class="song">{{currentSong.songname}}</h1>
          <h2 class="singer"></h2>
        </div>
        <img src="@/assets/list.png" alt>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" autoplay @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script>
import Next from "@/assets/next.png";
import Prev from "@/assets/prev.png";
import Pause from "@/assets/pause.png";
import Play from "@/assets/play.png";
import Cycle from "@/assets/cycle.png";
import Like from "@/assets/like.png";
import Liked from "@/assets/liked.png";
import List from "@/assets/list.png";
import SingleLoop from "@/assets/singleLoop.png";

import { mapGetters, mapMutations } from "vuex";

import { playMode } from "@/utils/config.js";
export default {
  data() {
    return {
      playerControl: [
        { imgUrl: Cycle },
        { imgUrl: Prev },
        { imgUrl: Pause },
        { imgUrl: Next },
        { imgUrl: Like }
      ],
      currTime: 0,
      progressPercent: 0,
      likeImg: Liked,
      unlikeImg: Like,
      loopImg: Cycle,
      singleLoopImg: SingleLoop
    };
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playlist",
      "currentSong",
      "playing",
      "currIndex",
      "favoraiteList",
      "mode"
    ]),
    playImg() {
      return this.playing ? Play : Pause;
    },
    // isLiked() {
    //   return this.currentSong.isLiked;
    // },
    // likeImg() {
    //   return this.currentSong.isLiked ? Liked : Like;
    // }
  },
  watch: {
    playing(newVal) {
      if (newVal) {
        this.$refs.audio.play();
        this.$refs.cdImg.style.webkitAnimationPlayState = "running";
        this.$refs.miniIcon.style.webkitAnimationPlayState = "running";
      } else {
        this.$refs.audio.pause();
        this.$refs.cdImg.style.webkitAnimationPlayState = "paused";
        this.$refs.miniIcon.style.webkitAnimationPlayState = "paused";
        //   this.playerControl[2].imgUrl == Pause;
      }
    },
    progressPercent(newVal) {
        if (newVal > 0) {
            const barWidth = this.$refs.bar.clientWidth;
            const offsetWidth = barWidth * newVal;
            this.$refs.progress.style.width = `${offsetWidth}px`;
            this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth-3}px, 0, 0)`
        }
    }
  },
  methods: {
    ...mapMutations(["setPlaying", "setCurrIndex", "setFullScreen", "setFavoraiteList", "setIsLiked", "setRecentList", "setMode"]),
    pauseOrPlay() {
      this.setPlaying(!this.playing);
      //   if (this.playing) {
      //       this.$refs.audio.play();
      //   } else {
      //       this.$refs.audio.pause();
      //   }
      //   this.playerControl[2].imgUrl =
      //     this.playerControl[2].imgUrl == Play ? Pause : Play;
    },
    prevSong() {
      this.setPlaying(true);
      if (this.currIndex == 0) {
        const index = this.playlist.length - 1;
        this.setCurrIndex(index);
      } else {
        const index = this.currIndex - 1;
        this.setCurrIndex(index);
      }

      this.setRecentList(this.playlist);
    },
    nextSong() {
      this.setPlaying(true);
      if (this.currIndex == this.playlist.length - 1) {
        const index = 0;
        this.setCurrIndex(index);
      } else {
        const index = this.currIndex + 1;
        this.setCurrIndex(index);
      }

      this.setRecentList(this.playlist);
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    closeOrOpen() {
      this.setFullScreen(!this.fullScreen);
    },
    likeSong() {
      if (this.currentSong.isLiked) {
        return ;
      }

      this.setIsLiked();
      this.setFavoraiteList(this.currentSong);
    },
    switchMode() {
      if (this.mode == 0) {
        this.setMode(playMode.loop)
      } else {
        this.setMode(playMode.sequence)
      }
    },
    // enter(el, done) {

    // },
    // afterEnter() {

    // },
    // leave(el, done) {

    // },
    // afterLeave() {

    // },
    // ready() {

    // },
    // error() {

    // },
    updateTime(e) {
      // e.target为audio标签
      this.currTime = e.target.currentTime; // 可读写的属性
      this.progressPercent = this.currTime / this.currentSong.interval;
    },
    end() {
      this.currTime = 0; 
      if (this.mode == 1) {
        this.loop()
      } else {
        this.nextSong();  
      }
    },
    formatTime(interval) {
      interval = interval | 0; // 向下取整
      const minute = this._pad((interval / 60) | 0);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/player.scss";
</style>


