<template>
  <div id="app">
    <h4 class="title">
      <img src="./assets/open.png" alt @click="goUserCenter">
      custom music
    </h4>
    <Tab :text="tabData" @tabClick="goPage"></Tab>
    <keep-alive :exclude="['TopMusic', 'PlaySquare']">
      <router-view/>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Tab from "@/components/Tab.vue";
import Player from "@/views/Player.vue";
export default {
  components: {
    Tab,
    Player
  },
  data() {
    return {
      tabData: ["推荐", "排行榜", "搜索"]
    };
  },
  methods: {
    goPage(index) {
      if (index == 0) {
        this.$router.push("/");
      } else if (index == 1) {
        this.$router.push("/topList");
      } else if (index == 2) {
        this.$router.push("/search");
      }
    },
    goUserCenter() {
      this.$router.push("/userCenter")
    }
  }
};
</script>

<style lang="scss">
@import "./views/style/reset.scss";
#app {
  .title {
    height: 80px;
    line-height: 80px;
    text-align: center;
    img {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 10px;
      left: 20px;
    }
  }
}
</style>
