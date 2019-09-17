let backendServer = 'http://192.168.1.102:3000'

export default {
    test: `${backendServer}/test`,
    getRecomList: `${backendServer}/getDiscList`,
    getListDetail: `${backendServer}/getListDetail`,
    getSwiperImage: `${backendServer}/getSwiperImg`,
    getSongsUrl: `${backendServer}/getSongsUrl`,
    getTopList: `${backendServer}/getTopList`,
    getMusicList: `${backendServer}/getMusicList`,
    getHotKey: `${backendServer}/getHotKey`,
    getSongsBySearch: `${backendServer}/getSongsBySearch`
}