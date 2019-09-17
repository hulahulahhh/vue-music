<template>
  <div class="top">
      <div class="topList" v-for="(item, index) in topData" :key="index">
          <TopItem :topItemData="item" @topItemClick="goMusicDetail"></TopItem>
      </div>
  </div>
</template>

<script>
import TopItem from '@/components/TopListItem.vue'
import { getTopList, getTopMusic } from "@/utils/xhr";
import { log } from 'util';
import { mapMutations } from 'vuex';
import axios from "axios";
export default {
  data() {
    return {
      topData: [],
      topMusic: []
    };
  },
  components: {
      TopItem
  },
  created() {
    console.log("toplist");

    this.getTop();
  },
  methods: {
    ...mapMutations(['setTopMusic']),  
    async getTop() {
      const res = await getTopList();
      const { code, data, message } = res;

      if (code == 0) {
        this.topData = data.topList;
      }
    },
    async getMusic(topid) {
        const params = {topid};
        const {code, songlist, message} = await getTopMusic(params);
        
        songlist.forEach(song => {
            this.topMusic.push(song.data);
        });
        this.processTopMusic();
        this.$router.push('/topMusic');
    },
    goMusicDetail(topid) {
        this.getMusic(topid);
    },
    async processTopMusic() {
      //this.processSongsSrc(mids, types);
      const purls = await this.getSongsUrl(this.topMusic);

      console.log(purls);

      this.topMusic.filter(song => {
        const purl = purls[song.songmid];
        if (purl) {
          song.url =
            purl.indexOf("http") === -1
              ? `http://dl.stream.qqmusic.qq.com/${purl}`
              : purl;
        }
        song.isLiked = false;
      });
      
      this.setTopMusic(this.topMusic);
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

      console.log(mids);
      

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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/topList.scss";
</style>


