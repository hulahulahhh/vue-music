import { get, post } from './net.js'
import Api from '../api'
import axios from 'axios';

export const test = () => {
    return get(Api.test, {})
}

export const getRecomList = () => {
    return get(Api.getRecomList, {})
}

export const getListDetail = (params) => {
    return get(Api.getListDetail, params)
}

export const getSwiperImage = () => {
    return get(Api.getSwiperImage, {})
}

export const getSongsSrc = (params) => {
    return axios.post(Api.getSongsUrl, params)
}

export const getTopList = () => {
    return get(Api.getTopList)
}

export const getTopMusic = (params) => {
    return get(Api.getMusicList, params);
}

export const getHotKey = () => {
    return get(Api.getHotKey)
}

export const login = (params) => {
    return post(Api.login, params)
}

export const getSongsBySearch = (params) => {
    return get(Api.getSongsBySearch, params)
}
