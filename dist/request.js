"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.trace = exports.head = exports.options = exports.del = exports.put = exports.get = exports.post = void 0;
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        let header = {
            "content-type": "application/json",
        };
        wx.request({
            url: url,
            method: options.method,
            data: options.method === "GET" ? options.data : JSON.stringify(options.data),
            header: Object.assign(header, options.header),
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data);
                }
                else {
                    console.log("请求状态错误：", request.data);
                    reject(request.data);
                }
            },
            fail(error) {
                console.log(error.data);
                reject(error.data);
            },
        });
    });
};
/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送POST请求
 */
const post = (url, data, header) => {
    return request(url, { method: "POST", data, header });
};
exports.post = post;
/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送GET请求
 */
const get = (url, data, header) => {
    return request(url, { method: "GET", data, header });
};
exports.get = get;
const put = (url, data, header) => {
    return request(url, { method: "PUT", data, header });
};
exports.put = put;
const del = (url, data, header) => {
    return request(url, { method: "DELETE", data, header });
};
exports.del = del;
const options = (url, data, header) => {
    return request(url, { method: "OPTIONS", data, header });
};
exports.options = options;
const head = (url, data, header) => {
    return request(url, { method: "HEAD", data, header });
};
exports.head = head;
const trace = (url, data, header) => {
    return request(url, { method: "TRACE", data, header });
};
exports.trace = trace;
const connect = (url, data, header) => {
    return request(url, { method: "CONNECT", data, header });
};
exports.connect = connect;
