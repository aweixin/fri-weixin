interface optionsType {
      method: "POST" | "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
      data: any
      header?: Object
}

interface returnType {
      code: number
      data: any
      msg: string
      message: string
}

const request = (url: string, options: optionsType) => {
      return new Promise<returnType>((resolve, reject) => {
            let header = {
                  "content-type": "application/json",
            }

            wx.request({
                  url: url,
                  method: options.method,
                  data: options.method === "GET" ? options.data : JSON.stringify(options.data),
                  header: Object.assign(header, options.header),
                  success(request: any) {
                        if (request.statusCode === 200) {
                              resolve(request.data)
                        } else {
                              console.log("请求状态错误：", request.data)
                              reject(request.data)
                        }
                  },
                  fail(error: any) {
                        console.log(error.data)
                        reject(error.data)
                  },
            })
      })
}

/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送POST请求
 */
export const post = (url: string, data: any, header?: Object) => {
      return request(url, { method: "POST", data, header })
}
/**
 * @param url 请求地址
 * @param data 请求数据
 * @param header 请求头
 * @returns Promise<returnType>
 * @description 发送GET请求
 */
export const get = (url: string, data: any, header?: Object) => {
      return request(url, { method: "GET", data, header })
}
export const put = (url: string, data: any, header?: Object) => {
      return request(url, { method: "PUT", data, header })
}
export const del = (url: string, data: any, header?: Object) => {
      return request(url, { method: "DELETE", data, header })
}
export const options = (url: string, data: any, header?: Object) => {
      return request(url, { method: "OPTIONS", data, header })
}
export const head = (url: string, data: any, header?: Object) => {
      return request(url, { method: "HEAD", data, header })
}
export const trace = (url: string, data: any, header?: Object) => {
      return request(url, { method: "TRACE", data, header })
}
export const connect = (url: string, data: any, header?: Object) => {
      return request(url, { method: "CONNECT", data, header })
}
