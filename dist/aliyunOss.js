"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliyunOss = void 0;
/*
 * @Author: Mr.xu
 * @Date: 2022-12-07 16:33:31
 * @LastEditors: Mr.xu
 * @LastEditTime: 2022-12-07 16:45:01
 * @Description:
 */
const crypto_js_1 = __importDefault(require("crypto-js"));
const js_base64_1 = require("js-base64");
// 计算签名。
const computeSignature = (accessKeySecret, canonicalString) => {
    return crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.HmacSHA1(canonicalString, accessKeySecret));
};
/**
 * 上传文件到阿里云OSS
 * @param filePath 文件路径
 * @param OssAuthInfo 阿里云OSS认证信息
 * @param fileName 文件名
 * @returns Promise<string>
 * @example aliyunOss("filePath",  OssAuthInfo)
 */
const aliyunOss = (filePath, OssAuthInfo, fileName = "file") => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const policyText = {
        expiration: date.toISOString(),
        conditions: [
            // 限制上传大小。
            ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
    };
    const policy = js_base64_1.Base64.encode(JSON.stringify(policyText)); // policy必须为base64的string。
    const signature = computeSignature(OssAuthInfo.accessKeySecret, policy);
    const formData = {
        key: OssAuthInfo.filePath + filePath.split("/").reverse()[0],
        OSSAccessKeyId: OssAuthInfo.accessKeyId,
        signature,
        policy,
        "x-oss-security-token": OssAuthInfo.stsToken,
    };
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: OssAuthInfo.host,
            filePath: filePath,
            header: {},
            name: fileName,
            formData: formData,
            success: (res) => {
                // console.log(res);
                if (res.statusCode === 204) {
                    console.log("上传成功", `${OssAuthInfo.endpoint}/${formData.key}`);
                    resolve(`${OssAuthInfo.endpoint}/${formData.key}`);
                }
            },
            fail: (err) => {
                console.log(err);
                reject(err);
            },
        });
    });
};
exports.aliyunOss = aliyunOss;
