"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.systemInfo = exports.toast = exports.confirm = exports.alert = exports.decodeURI = exports.urlEncode = exports.checkUpdateVersion = exports.previewImage = exports.clearStorage = exports.removeStorage = exports.getStorage = exports.setStorage = exports.formatNumber = exports.isPhoneNumber = exports.tapInfo = exports.formatRichText = exports.gourl = void 0;
const moment_1 = __importDefault(require("moment"));
/**
 * @param path 跳转地址
 * @description 跳转页面
 * @returns void
 * @example gourl("/pages/index/index")
 * @example gourl("/pages/index/index?name=123")
 * @example gourl("https://www.baidu.com")
 */
const gourl = (path) => {
    if (!path || path.length == 0) {
        console.info("没有跳转地址");
        return false;
    }
    if (path.includes("https")) {
        wx.navigateTo({
            url: "/pages/webview/webview?url=" + encodeURIComponent(path),
        });
        return false;
    }
    wx.navigateTo({
        url: path,
        fail: (err) => {
            console.log(err);
            wx.switchTab({
                url: path,
                fail: (err) => {
                    console.log(err);
                },
            });
        },
    });
};
exports.gourl = gourl;
/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.修改所有style里的width属性为max-width:100%
 * 3.img标签添加style属性：max-width:100%;height:auto
 * 4.去掉<br/>标签
 * @param html
 * @return string
 */
const formatRichText = (html) => {
    // 去掉img标签里的style、width、height属性
    let newContent = html.replace(/<img[^>]*>/gi, function (match) {
        match = match.replace(/style="[^"]+"/gi, "").replace(/style='[^']+'/gi, "");
        match = match.replace(/width="[^"]+"/gi, "").replace(/width='[^']+'/gi, "");
        match = match.replace(/height="[^"]+"/gi, "").replace(/height='[^']+'/gi, "");
        return match;
    });
    // 修改所有style里的width属性为max-width:100%
    newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
        match = match.replace(/width:[^;]+;/gi, "max-width:100%;").replace(/width:[^;]+;/gi, "max-width:100%;");
        return match;
    });
    // 去掉<br/>标签
    // newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    // img标签添加style属性：max-width:100%;height:auto
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
    return newContent;
};
exports.formatRichText = formatRichText;
/**
 * @param e 事件对象
 * @description 获取事件对象的dataset
 * @returns object
 * @example tapInfo(e)
 */
const tapInfo = (e) => {
    return e.currentTarget.dataset;
};
exports.tapInfo = tapInfo;
/**
 * @desc   判断是否为手机号
 * @param  {String|Number} phone
 * @return {Boolean}
 */
const isPhoneNumber = (phone) => {
    phone = phone.toString();
    if (phone.length != 11) {
        return false;
    }
    return /^1[3456789]\d{9}$/.test(phone);
};
exports.isPhoneNumber = isPhoneNumber;
/**
 * @desc   小于10的数字补0
 * @param {string|number} n
 * @return {String}
 */
const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
};
exports.formatNumber = formatNumber;
// 本地存储
const setStorage = (key, value, _expireDate) => {
    // 添加过期时间
    if (_expireDate) {
        const { key, value } = _expireDate;
        const expireDate = (0, moment_1.default)().add(value, key).format("YYYY-MM-DD HH:mm:ss");
        wx.setStorageSync(key, JSON.stringify({ value, expireDate }));
        return false;
    }
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    wx.setStorageSync(key, value);
};
exports.setStorage = setStorage;
const getStorage = (key) => {
    const value = wx.getStorageSync(key);
    if (!value) {
        return null;
    }
    const json = JSON.parse(value);
    if (json.expireDate) {
        if ((0, moment_1.default)().isAfter(json.expireDate)) {
            (0, exports.removeStorage)(key);
            return null;
        }
        return json.value;
    }
    return value;
};
exports.getStorage = getStorage;
const removeStorage = (key) => {
    wx.removeStorageSync(key);
};
exports.removeStorage = removeStorage;
const clearStorage = () => {
    wx.clearStorageSync();
};
exports.clearStorage = clearStorage;
/**
 * 需要预览的图片
 * @param current 当前预览的图片
 * @param urls 所有图片 不存在就是 当前预览图片
 */
const previewImage = (current, urls) => {
    wx.previewImage({
        current: current,
        urls: urls ? urls : [current], // 需要预览的图片 http 链接列表
    });
};
exports.previewImage = previewImage;
/**
 * 检测当前的小程序
 * 版本自动更新
 */
const checkUpdateVersion = () => {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse("getUpdateManager")) {
        //创建 UpdateManager 实例
        const updateManager = wx.getUpdateManager();
        //检测版本更新
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                //监听小程序有版本更新事件
                updateManager.onUpdateReady(function () {
                    //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
                    updateManager.applyUpdate();
                });
                updateManager.onUpdateFailed(function () {
                    // 新版本下载失败
                    wx.showModal({
                        title: "已经有新版本喽~",
                        content: "请您删除当前小程序，重新搜索打开哦~",
                    });
                });
            }
        });
    }
    else {
        //TODO 此时微信版本太低（一般而言版本都是支持的）
        wx.showModal({
            title: "溫馨提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
        });
    }
};
exports.checkUpdateVersion = checkUpdateVersion;
/**
 * @param data 请求数据
 * @description 将对象转为url参数
 * @returns string
 * @example urlEncode({name: "123", age: 18})
 * @example urlEncode({name: "123", age: [18, 19]})
 */
const urlEncode = (data = {}) => {
    var _result = [];
    for (var key in data) {
        var value = data[key];
        if (value.constructor == Array) {
            value.forEach(function (_value) {
                _result.push(key + "=" + _value);
            });
        }
        else {
            _result.push(key + "=" + value);
        }
    }
    return _result.join("&");
};
exports.urlEncode = urlEncode;
/**
 * URL 解码
 * @param {string} url encodeURIComponent 编码后的URL
 * @returns {string} 解码后的URL
 */
const decodeURI = (url) => {
    return decodeURIComponent(url);
};
exports.decodeURI = decodeURI;
/**
 * 弹窗提示
 * @param {string} content 提示内容
 * @returns {Promise} Promise
 */
const alert = (content) => {
    return wx.showModal({
        title: "提示",
        content: content,
        showCancel: false,
    });
};
exports.alert = alert;
/**
 * 确认弹窗
 * @param {string} msg 提示内容
 * @param {object} options
 * @returns {Promise} Promise
 */
const confirm = (msg, options) => {
    return wx.showModal(Object.assign({
        title: "提示",
        content: msg,
        showCancel: true,
    }, options));
};
exports.confirm = confirm;
/**
 * 消息提示
 * @param title 提示内容
 * @param icon 图标     "success" | "error"
 * @param duration 显示时长
 * @param mask 是否显示透明蒙层，防止触摸穿透
 * @returns Promise
 */
const toast = (title, icon = "none", duration = 1500) => {
    return new Promise((_resolve) => {
        wx.showToast({
            title: title,
            icon: icon,
            mask: true,
            duration: duration,
            success: () => {
                _resolve(true);
            },
        });
    });
};
exports.toast = toast;
// 系统信息
const systemInfo = () => {
    //获取设备信息
    let systemInfo = wx.getSystemInfoSync();
    (0, exports.setStorage)("systemInfo", systemInfo);
    //1rpx 像素值
    let pixelRatio = 750 / systemInfo.windowWidth;
    //胶囊信息
    let menu = wx.getMenuButtonBoundingClientRect();
    (0, exports.setStorage)("menu", menu);
    //状态栏高度
    let statusHeight = systemInfo.statusBarHeight;
    (0, exports.setStorage)("statusHeight", statusHeight * pixelRatio);
    //导航栏高度
    let navHeight = (menu.top - statusHeight) * 2 + menu.height;
    (0, exports.setStorage)("navHeight", navHeight * pixelRatio);
    //顶部高度 = 状态栏高度 + 导航栏高度
    (0, exports.setStorage)("topHeight", (statusHeight + navHeight) * pixelRatio);
};
exports.systemInfo = systemInfo;
/**
 * @param min 最小值
 * @param max 最大值
 * @description 生成随机数
 * @returns number
 */
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.random = random;
