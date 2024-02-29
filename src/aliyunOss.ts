/*
 * @Author: Mr.xu
 * @Date: 2022-12-07 16:33:31
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-07 16:45:01
 * @Description:
 */
import crypto from "crypto-js"
import { Base64 } from "js-base64"
interface ossAuthInfoType {
      accessKeyId: string
      accessKeySecret: string
      bucket?: string
      endpoint: string
      filePath: string
      host: string
      region: string
      stsToken: string
}

// 计算签名。
const computeSignature = (accessKeySecret: string, canonicalString: string) => {
      return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret))
}

/**
 * 上传文件到阿里云OSS
 * @param filePath 文件路径
 * @param OssAuthInfo 阿里云OSS认证信息
 * @param fileName 文件名
 * @returns Promise<string>
 * @example aliyunOss("filePath",  OssAuthInfo)
 */
export const aliyunOss = (filePath: string, OssAuthInfo: ossAuthInfoType, fileName: string = "file") => {
      const date = new Date()
      date.setHours(date.getHours() + 1)
      const policyText = {
            expiration: date.toISOString(), // 设置policy过期时间。
            conditions: [
                  // 限制上传大小。
                  ["content-length-range", 0, 1024 * 1024 * 1024],
            ],
      }
      const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
      const signature = computeSignature(OssAuthInfo.accessKeySecret, policy)
      const formData = {
            key: OssAuthInfo.filePath + filePath.split("/").reverse()[0],
            OSSAccessKeyId: OssAuthInfo.accessKeyId,
            signature,
            policy,
            "x-oss-security-token": OssAuthInfo.stsToken,
      }

      return new Promise<string>((resolve, reject) => {
            wx.uploadFile({
                  url: OssAuthInfo.host, // 开发者服务器的URL。
                  filePath: filePath,
                  header: {},
                  name: fileName, // 必须填file。
                  formData: formData,
                  success: (res: any) => {
                        // console.log(res);
                        if (res.statusCode === 204) {
                              console.log("上传成功", `${OssAuthInfo.endpoint}/${formData.key}`)
                              resolve(`${OssAuthInfo.endpoint}/${formData.key}`)
                        }
                  },
                  fail: (err: any) => {
                        console.log(err)
                        reject(err)
                  },
            })
      })
}
