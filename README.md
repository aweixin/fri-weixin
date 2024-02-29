# fri-weixin
微信小程序常用工具函数

### Server 类
> Method 支持 "POST" | "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"

#### post请求示例
```js
import { Server } from 'fri-weixin';
const res = await Server.post('https://api.example.com/user', {
      appid:'xxxxxxxxxxxxxxxx',
})
```

### 阿里云oss 上传类
#### 上传文件示例
```js
import { aliyunOss } from 'fri-weixin';
const res = await aliyunOss('https://example.com/example.png', "阿里云OSS认证信息" );
```
### Utils 工具类
> import { Utils } from 'fri-weixin';


#### 跳转页面
> (网址需要在小程序开发工具中配置白名单，并且需要创建/pages/webview/webview页面 作为载体)

```js
Utils.gourl("/pages/index/index")
Utils.gourl("/pages/index/index?name=123")
Utils.gourl("https://www.baidu.com")
```

#### 适配后台富文本HTML内容
>处理富文本里的图片宽度自适应 <br/>
>去掉img标签里的style、width、height属性<br/>
>修改所有style里的width属性为max-width:100%<br/>
>img标签添加style属性：max-width:100%;height:auto<br/>
>返回值：处理后的HTML内容
```js
Utils.formatRichText('<div></div>')
```

#### 点击事件
> 获取点击事件信息
```html
<button bindtap="submit" data-id="666">点击事件</button>
```

```js
submit(e) {
  const btn = Utils.tapInfo(e)
  console.log(btn.id) >> 666
}
```

#### 判断是否手机号
```js
Utils.isPhoneNumber('13812345678') >> true
```
#### 小于10的数字前面补0
```js
Utils.formatNumber(8) >> 08
```

#### 设置本地存储
```js
Utils.setStorage('key', 'value')
// 设置过期时间

Utils.setStorage('key', 'value', {
      key:'hours', // "years" | "quarters" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"
      value:1
})
```
#### 获取本地存储
```js
Utils.getStorage('key') >> 'value'
```
#### 删除本地存储
```js
Utils.removeStorage('key')
```
#### 清空本地存储
```js
Utils.clearStorage()
```

#### 预览图片
```js
Utils.previewImage("https://www.baidu.com/img/bd_logo1.png")
// 多个图片
Utils.previewImage("https://www.baidu.com/img/bd_logo1.png","https://www.baidu.com/img/bd_logo1.png", "https://www.baidu.com/img/bd_logo1.png"])
```
#### 检查小程序是否需要更新
```js
Utils.checkUpdate()
```
#### object 转 query
```js
Utils.urlEncode({a:1,b:2}) >> a=1&b=2
```

#### URL解码
```js
Utils.decodeURI('https%3A%2F%2Fwww.baidu.com') >> 'https://www.baidu.com'
```

#### 弹窗提示
```js
Utils.alert('提示')
```

#### 弹窗提示
```js
Utils.confirm('提示')
```

#### 弹窗提示
> icon   "success" | "error" | "none" | "loading"
```js
Utils.toast('提示')
```

#### 系统信息 systemInfo
> 设备信息：`systemInfo`， 胶囊信息：`menu` ，状态栏高度： `statusHeight`， 导航栏高度：`navHeight` ，顶部高度：`topHeight` 都以本地存储的形式存储到本地
```js
Utils.systemInfo()
```