<template>
  <div class="userCenter">
    <div class="switchWrapper">
        <div class="back" @click="goBack"></div>
      <div
        v-for="(item, index) in switchData"
        :key="index"
        class="switch"
        :class="[{active: currIndex == index}]"
        @click="switchTab(index)"
      >{{item.text}}</div>
    </div>
    <div class="musicList" v-for="(item, index) in musicList" :key="index+'list'">
        <MusicInfo :musicData="item" @goDetail="toPlayer(index)"></MusicInfo>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MusicInfo from "@/components/MusicInfo.vue";
import { log } from "util";
export default {
    components: {
        MusicInfo
    },
  data() {
    return {
      switchData: [
        {
          text: "我喜欢的"
        },
        {
          text: "最近听的"
        }
      ],
      currIndex: 0,
      musicList: []
    };
  },
  computed: {
    ...mapGetters(["favoraiteList", "recentList"])
  },
  created() {
    this.musicList = this.favoraiteList;
    console.log(this.musicList);
  },
  methods: {
    ...mapActions(['selectPlay']),
    switchTab(index) {
      if (index == 0) {
        this.musicList = this.favoraiteList;
      } else {
        this.musicList = this.recentList;
      }
      this.currIndex = index;
    },
    toPlayer(index) {
      this.selectPlay({
        list: this.musicList,
        index
      });
    },
    goBack() {
        this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/userCenter.scss";
</style>


