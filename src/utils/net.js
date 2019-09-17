import axios from 'axios'
import { resolve } from 'path';

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then((res) => {
            const result = res.data;

            if (result.code == 0) {
                result.code = 0;
                resolve(result);
            } else {
                resolve({
                    code: result.code,
                    data: result.data,
                    message: result.message || result.codeMsg || '出错， 请稍后重试'
                })
            }
        }).catch((err) => {
            console.error(`xhr error : ${url}, err: ` + err);
            reject(err)
        })
    })
}

export const post = (url, params) => {
    //json 序列化一下value,方便dwf接受post的数据
    // const keys = Object.keys(params);
    // for (var idx = 0; idx < keys.length; idx++) {
    //     let key = keys[idx];
    //     if (typeof params[key] === "object") {
    //         params[key] = JSON.stringify(params[key]);
    //     }
    // }
    
    return new Promise((resolve, reject) => {
        axios
            .post(url, params).then(
                (res) => {
                    let result = res.data
                    if (result.code.toString() === '0') {
                        result.code = 0
                        resolve(result)
                    } else {
                        resolve({
                            code: result.code.toString(),
                            message: result.message || result.codeMsg || '出错，请稍后重试'
                        })
                    }
                }
            )
            .catch(
                (err) => {
                    console.error(`xhr error url: ${url} , err: ` + err)
                    reject(err)
                }
            )
    })
}