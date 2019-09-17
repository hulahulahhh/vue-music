<template>
  <div class="search">
    <div class="searchBox">
      <input type="search" v-model="searchWord" placeholder="搜索歌曲、歌手">
    </div>
    <div class="searchKey">
      <h4>热门搜索</h4>
      <div class="keyWrapper">
        <div
          class="key"
          v-for="(item, index) in searchKeys"
          :key="index"
          @click="hotClick(item.k)"
        >{{item.k}}</div>
      </div>
    </div>
    <div class="searchResult" v-show="result.length > 0 && searchWord">
      <div
        class="result"
        v-for="(item, index) in result"
        :key="index"
        @click="toPlayer(index)"
      >{{item.songname}}-{{item.singer[0].name}}</div>
    </div>
  </div>
</template>

<script>
import { getHotKey, getSongsBySearch } from "@/utils/xhr";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      searchKeys: ["aa", "bb"],
      searchWord: "",
      result: []
    };
  },
  created() {
    this.$watch(
      "searchWord",
      this.debounce(newQuery => {
        if (this.searchWord.length > 0) {
          this._getSongsBySearch();
        }
      }, 200)
    );
    this._getHotKey();
  },
  methods: {
    ...mapActions(["selectPlay"]),
    async _getHotKey() {
      const res = await getHotKey();
      const { code, data, message } = res;

      if (code == 0) {
        this.searchKeys = data.hotkey;
      }
    },
    async _getSongsBySearch() {
      const params = {
        key: this.searchWord
      };
      const res = await getSongsBySearch(params);
      const { code, data, message } = res;

      if (code == 0) {
        this.result = data.song.list;
        this.processTopMusic();
      }
    },
    hotClick(key) {
      this.searchWord = key;
      this.result = [];
      this._getSongsBySearch();
    },
    toPlayer(index) {
      this.selectPlay({ list: this.result, index });
    },
    debounce(func, delay) {
      let timer;

      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    async processTopMusic() {
      //this.processSongsSrc(mids, types);
      const purls = await this.getSongsUrl(this.result);

      console.log(purls);

      this.result.filter(song => {
        const purl = purls[song.songmid];
        if (purl) {
          song.url =
            purl.indexOf("http") === -1
              ? `http://dl.stream.qqmusic.qq.com/${purl}`
              : purl;
        }
        song.isLiked = false;
      });
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
@import "./style/search.scss";
</style>


