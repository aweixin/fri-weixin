interface configType {
      baseUrl: string
      url?: string
      method: string
      data: any
      headers?: any
      timeout?: number
      responseType: string
}

interface interceptorsType {
      request?: Function
      response?: Function
}

class Http {
      config: configType
      interceptors: interceptorsType
      constructor(_config: configType) {
            this.config = Object.assign(
                  {},
                  {
                        baseUrl: "", // 请求的根域名
                        header: { "content-type": "application/json" }, // 默认的请求头
                        method: "POST",
                        dataType: "json",
                        responseType: "text",
                  },
                  _config
            )

            // 请求拦截器
      }

      // 请求体
      request(options: configType) {
            let _config = Object.assign({}, this.config, options)
            return new Promise((resolve, reject) => {
                  wx.request({
                        url: _config.baseUrl + _config.url,
                        method: _config.method,
                        data: _config.data,
                        header: _config.headers,
                        success(res: any) {
                              resolve(res.data)
                        },
                        fail(err: any) {
                              reject(err)
                        },
                  })
            })
      }
}

export default Http
