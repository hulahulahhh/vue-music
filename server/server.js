var express = require('express');
var app = express(); // app为express的实例
var axios = require('axios');
const bodyParser = require('body-parser');

// 配置跨域
app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    } else {
        next();
    }
});

// function为路由匹配时执行的函数
app.get('/test', function (req, res) {
    res.json({ code: 0 });
})

app.get('/getDiscList', function (req, res) {
    let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
        },
        params: {
            '-': 'recom05587420198588622',
            g_tk: 817361846,
            loginUin: 1002340239,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf - 8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            data: { "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "newsong.NewSongServer", "method": "get_new_song_info", "param": { "type": 5 } }, "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "sin": 0, "num": 10 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": {} }, "toplist": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {} }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} } }
        }
    }).then((response) => {
        res.json(response.data.recomPlaylist)
    })
})

app.get('/getSwiperImg', function (req, res) {
    let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
        },
        params: {
            '-': 'recom05587420198588622',
            g_tk: 817361846,
            loginUin: 1002340239,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf - 8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            data: { "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "newsong.NewSongServer", "method": "get_new_song_info", "param": { "type": 5 } }, "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "sin": 0, "num": 10 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": {} }, "toplist": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {} }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} } }
        }
    }).then((response) => {
        res.json(response.data.focus);
    })
})

app.get('/getListDetail', function (req, res) {
    let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

    console.log(req.query);



    axios.get(url, {
        headers: {
            host: 'c.y.qq.com',
            referer: 'https://c.y.qq.com/'
        },
        params: {
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            disstid: req.query.disstid,
            g_tk: 805754852,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0
        }
    }).then((response) => {
        let encodeRes = {
            code: 0,
            data: response.data.cdlist[0]
        }

        res.json(encodeRes);
    }).catch((err) => {
        console.error(err);
    })
})

app.post('/getSongsUrl', bodyParser.json(), function (req, res) {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';

    axios.post(
        url, req.body, {
            headers: {
                referer: 'https://y.qq.com/',
                origin: 'https://y.qq.com',
                'Content-type': 'application/x-www-form-urlencoded'
            },
            query: {
                '_': 1556798909434

            }
        }
    ).then((response) => {
        res.json(response.data)
    })
})

app.get('/getTopList', function (req, res) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    axios.get(url, {
        headers: {
            host: 'c.y.qq.com',
            referer: 'https://c.y.qq.com/'
        },
        params: {
            '_': 1556802497781,
            g_tk: 641320040,
            uin: 1002340239,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1
        }
    }).then((response) => {
        res.json(response.data);
    })
})

app.get('/getMusicList', function (req, res) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const topid = req.query.topid;

    const data = {
        topid,
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5',
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'json'
    }

    axios.get(url, {
        headers: {
            host: 'c.y.qq.com',
            referer: 'https://c.y.qq.com/'
        },
        params: data
    }).then((response) => {
        res.json(response.data)
    })
})

app.get('/getHotKey', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
    const params = {
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'json'
    }

    axios.get(url, {
        headers: {
            host: 'c.y.qq.com',
            referer: 'https://c.y.qq.com/'
        },
        params
    }).then((response) => {
        res.json(response.data);
    })
})

app.get('/getSongsBySearch', function (req, res) {
    const url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";

    const params = {
        '_': '1557821416580',
        g_tk: 914220761,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: req.query.key,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf - 8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: 1,
        remoteplace: 'txt.mqq.all'
    }

    axios.get(url, {
        headers: {
            host: 'c.y.qq.com',
            referer: 'https://c.y.qq.com/'
        },
        params
    }).then((response) => {
        res.json(response.data);
    })
})

app.listen(3000, function () {
    console.log('server listening on port 3000');
})