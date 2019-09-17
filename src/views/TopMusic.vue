<template>
  <div class="topMusic">
    <div class="list" v-for="(item, index) in topMusic" :key="index">
      <MusicInfo :musicData="item" @goDetail="toPlayer(index)"></MusicInfo>
    </div>
  </div>
</template>

<script>
import MusicInfo from "@/components/MusicInfo.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: 'TopMusic',
  components: {
    MusicInfo
  },
  computed: {
    ...mapGetters(["topMusic"])
  },
  methods: {
    ...mapActions(["selectPlay"]),
    toPlayer(index) {
      console.log(this.topMusic);
      this.selectPlay({list: this.topMusic, index});
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./style/topMusic.scss";
</style>


