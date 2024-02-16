
import axios from 'axios'

export function loadNo(body) {
    return axios.request({
        method: 'get',
        url: 'http://127.0.0.1:8888/region/no',

    })
}

export function query(model, body) {
    debugger
    return axios.request({
        method: 'post',
        url: 'http://127.0.0.1:8888/lql/' + model + '/query',
        data: body

    })
}
export function update(model, body) {
    debugger
    return axios.request({
        method: 'post',
        url: 'http://127.0.0.1:8888/lql/' + model + '/save',
        data: body

    })
}
export function addRegion(body) {
    debugger
    return axios.request({
        method: 'post',
        url: 'http://127.0.0.1:8888/region/add',
        data: body

    })
}
