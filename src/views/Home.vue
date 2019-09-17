<template>
  <keep-alive>
    <div class="home">
      <div class="content">
        <swiper class="swiper" :options="swiperOption">
          <swiperSlide v-for="(item, index) in swiperData" :key="index">
            <img :src="item.pic_info.url">
          </swiperSlide>
        </swiper>
        <div class="musicList" v-for="(item, index) in recomMusic" :key="index">
          <MusicInfo :musicData="item" @goDetail="toDetail(item)"></MusicInfo>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
// @ is an alias to /src
import Tab from "@/components/Tab.vue";
// 引入musicinfo组件
import MusicInfo from "@/components/MusicInfo.vue";
import { getRecomList, getSwiperImage } from "@/utils/xhr.js";
/*组件方式引用*/
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "home",
  components: {
    Tab,
    // MiniAudio,
    MusicInfo,
    swiper,
    swiperSlide
  },
  data() {
    return {
      tabData: ["推荐歌单", "排行榜", "搜索"],
      recomMusic: [],
      swiperOption: {
        speed: 3000
      },
      swiperData: []
    };
  },
  created() {
    this.getRecom();
    this.getSwiper();
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: "./playSquare",
        query: { disstid: item.content_id }
      });
    },
    async getRecom() {
      const res = await getRecomList();
      const { code, data, message } = res;

      if (code === 0) {
        this.recomMusic = data.v_hot;
      } else {
        console.log(message);
      }
    },
    async getSwiper() {
      const res = await getSwiperImage();
      const { code, data, message } = res;

      if (code === 0) {
        this.swiperData = data.content;
      } else {
        console.log(message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/home.scss";
</style>

