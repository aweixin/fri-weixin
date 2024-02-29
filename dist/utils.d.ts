/**
 * @param path 跳转地址
 * @description 跳转页面
 * @returns void
 * @example gourl("/pages/index/index")
 * @example gourl("/pages/index/index?name=123")
 * @example gourl("https://www.baidu.com")
 */
export declare const gourl: (path: string) => false | undefined;
/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.修改所有style里的width属性为max-width:100%
 * 3.img标签添加style属性：max-width:100%;height:auto
 * 4.去掉<br/>标签
 * @param html
 * @return string
 */
export declare const formatRichText: (html: string) => string;
/**
 * @param e 事件对象
 * @description 获取事件对象的dataset
 * @returns object
 * @example tapInfo(e)
 */
export declare const tapInfo: (e: any) => any;
/**
 * @desc   判断是否为手机号
 * @param  {String|Number} phone
 * @return {Boolean}
 */
export declare const isPhoneNumber: (phone: string | number) => boolean;
/**
 * @desc   小于10的数字补0
 * @param {string|number} n
 * @return {String}
 */
export declare const formatNumber: (n: string | number) => string;
interface expireDateType {
    key: "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds";
    value: number;
}
export declare const setStorage: (key: string, value: any, _expireDate?: expireDateType) => false | undefined;
export declare const getStorage: (key: string) => any;
export declare const removeStorage: (key: string) => void;
export declare const clearStorage: () => void;
/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片 不存在就是 当前预览图片
 */
export declare const previewImage: (current: string, urls?: string[]) => void;
/**
 * 检测当前的小程序
 * 版本自动更新
 */
export declare const checkUpdateVersion: () => void;
/**
 * @param data 请求数据
 * @description 将对象转为url参数
 * @returns string
 * @example urlEncode({name: "123", age: 18})
 * @example urlEncode({name: "123", age: [18, 19]})
 */
export declare const urlEncode: (data?: any) => string;
/**
 * URL 解码
 * @param {string} url encodeURIComponent 编码后的URL
 * @returns {string} 解码后的URL
 */
export declare const decodeURI: (url: string) => string;
/**
 * 弹窗提示
 * @param {string} content 提示内容
 * @returns {Promise} Promise
 */
export declare const alert: (content: string) => Promise<WechatMiniprogram.ShowModalSuccessCallbackResult>;
interface optionsType {
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
}
/**
 * 确认弹窗
 * @param {string} msg 提示内容
 * @param {object} options
 * @returns {Promise} Promise
 */
export declare const confirm: (msg: string, options?: optionsType) => Promise<WechatMiniprogram.ShowModalSuccessCallbackResult>;
/**
 * 消息提示
 * @param title 提示内容
 * @param icon 图标     "success" | "error"
 * @param duration 显示时长
 * @param mask 是否显示透明蒙层，防止触摸穿透
 * @returns Promise
 */
export declare const toast: (title: string, icon?: "success" | "error" | "none" | "loading", duration?: number) => Promise<boolean>;
export declare const systemInfo: () => void;
/**
 * @param min 最小值
 * @param max 最大值
 * @description 生成随机数
 * @returns number
 */
export declare const random: (min: number, max: number) => number;
export {};
