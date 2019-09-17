<template>
  <div class="playSquare">
    <div class="back" v-show="showBack">
      <BackPage :title="title" :style="opacityStyle"></BackPage>
    </div>
    <img :src="cover" alt="加载中">
    <div class="list" v-for="(item, index) in songList" :key="index">
      <MusicInfo :musicData="item" @goDetail="toPlayer(index)"></MusicInfo>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import MusicInfo from "@/components/MusicInfo.vue";
import BackPage from "@/components/BackPage.vue";
import { getListDetail, getSongsSrc } from "@/utils/xhr.js";
import { log } from "util";
export default {
  name: 'PlaySquare',
  components: {
    MusicInfo,
    BackPage
  },
  data() {
    return {
      songList: [],
      cover: "",
      title: "",
      showBack: true,
      opacityStyle: {
        opacity: 0.4
      }
    };
  },
  created() {
    this.getAlbumDetail();
    console.log('created');
    
  },
  mounted() {
    let vm = this;
    window.onscroll = function() {
      if (
        document.documentElement.scrollTop > 40 &&
        document.documentElement.scrollTop < 180
      ) {
        let opacity = document.documentElement.scrollTop / 180;
        opacity = opacity > 1 ? 1 : opacity;
        vm.showBack = true;
        vm.opacityStyle = { opacity };
      } else if (
        document.documentElement.scrollTop > 180 &&
        document.documentElement.scrollTop < 360
      ) {
        let opacity = (360 - document.documentElement.scrollTop) / 180;
        opacity = opacity > 1 ? 1 : opacity;
        vm.showBack = true;
        vm.opacityStyle = { opacity };
      } else {
        vm.showAbs = false;
      }
    };
  },
  methods: {
    ...mapActions(["selectPlay"]),
    async getAlbumDetail() {
      const disstid = this.$route.query.disstid;
      const params = { disstid };
      const res = await getListDetail(params);
      let { code, data, message } = res;

      if (code == 0) {
        //this.processSongsSrc(mids, types);
        const purls = await this.getSongsUrl(data.songlist);
        console.log(purls);

        this.songList = data.songlist;

        this.songList.filter(song => {
          const purl = purls[song.songmid];
          if (purl) {
            song.url =
              purl.indexOf("http") === -1
                ? `http://dl.stream.qqmusic.qq.com/${purl}`
                : purl;
          }
          song.isLiked = false;
        });

        console.log(this.songList);

        this.cover = data.logo;
        this.title = data.desc;
      } else {
        console.log(message);
      }
    },
    getSongsUrl(songs) {
      const url = "http://192.168.1.102:3000/getSongsUrl";

      let mids = [];
      let types = [];

      songs.forEach(song => {
        mids.push(song.songmid);
        types.push(0);
      });

      const urlMid = this.genUrlMid(mids, types);

      const data = {
        format: "json",
        g_tk: 5381,
        inCharset: "utf-8",
        needNewCode: 1,
        notice: 0,
        outCharset: "utf-8",
        platform: "h5",
        uin: 0
      };

      return new Promise((resolve, reject) => {
        let tryTime = 3;

        function request() {
          return axios
            .post(url, {
              comm: data,
              req_0: urlMid
            })
            .then(response => {
              const res = response.data;
              if (res.code === 0) {
                let urlMid = res.req_0;
                if (urlMid && urlMid.code === 0) {
                  const purlMap = {};
                  urlMid.data.midurlinfo.forEach(item => {
                    if (item.purl) {
                      purlMap[item.songmid] = item.purl;
                    }
                  });
                  if (Object.keys(purlMap).length > 0) {
                    resolve(purlMap);
                  } else {
                    retry();
                  }
                } else {
                  retry();
                }
              } else {
                retry();
              }
            });
        }

        function retry() {
          if (--tryTime >= 0) {
            request();
          } else {
            reject(new Error("Can not get the songs url"));
          }
        }

        request();
      });
    },
    genUrlMid(mids, types) {
      const guid = this.getUid();
      return {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
          guid,
          songmid: mids,
          songtype: types,
          uin: "0",
          loginflag: 0,
          platform: "23"
        }
      };
    },
    getUid() {
      const t = new Date().getUTCMilliseconds();
      const _uid = "" + ((Math.round(2147483647 * Math.random()) * t) % 1e10);

      return _uid;
    },
    toPlayer(index) {
      // 1.设置playlist和sequencelist
      // 2.设置currindex
      // 3.设置播放状态
      // 4.设置是否全屏
      this.selectPlay({
        list: this.songList,
        index
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/playSquare.scss";
</style>

