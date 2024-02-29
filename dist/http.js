"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Http {
    constructor(_config) {
        this.config = Object.assign({}, {
            baseUrl: "",
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
        }, _config);
        // 请求拦截器
    }
    // 请求体
    request(options) {
        let _config = Object.assign({}, this.config, options);
        return new Promise((resolve, reject) => {
            wx.request({
                url: _config.baseUrl + _config.url,
                method: _config.method,
                data: _config.data,
                header: _config.headers,
                success(res) {
                    resolve(res.data);
                },
                fail(err) {
                    reject(err);
                },
            });
        });
    }
}
exports.default = Http;
