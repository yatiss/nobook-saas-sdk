# NOBOOK SDK
### Require install
```bash
$ npm i --save git+ssh://git@github.com:yatiss/nobook-saas-sdk.git#1.0.18
```

### API
```javascript
// 监听场景初始化完成
addListener(MESSAGE_TYPE.ON_LOAD, (event)=>{
    // 编辑器或播放器实验场景初始化成功时触发
});

/**
 * 设置环境参数
 * appid  应用id,可传入前端使用,由nobook提供
 * pid 产品参数,由 PID_TYPE 对象选取
 * from 来源公司名称
 * @param config
 */
public setConfig(config: { appid, pid, from, DEBUG?, EDITER_DEBUG?, PLAYER_DEBUG? }): void

/**
 * 用户登录
 * uid 用户账户,必填
 * timestamp 时间戳: 为后端生成,规则为 new Date().getTime().toString().substring(0, 10)
 * sign 签名: 为后端生成,规则为 md5(appid appkey nickname pid timestamp uid)
 * nickname 用户昵称,选填
 * 其中 appkey 在后台使用,不可在前端暴露
 * @param param
 * @returns Promise<{data, success, msg?}>
 */
public login(param: { uid, sign, timestamp, nickname }): Promise<{ data, success, msg? }>

/**
 * 切换学科
 * @param param
 */
public switchSubject(param: {pid}): void

/**
 * 反馈
 * @param param
 * @returns Promise<{data, success, msg?}>
 */
public sendFeedback(param: { title, content, source, pics? }): Promise<{ data, success, msg? }>;

/**
 * 删除指定实验
 * @param labId  实验id
 * @returns Promise<{success, msg?}>
 */
public deleteData(labId: string): Promise<{ success, msg }>

/**
 * 保存实验
 * @param config {iframe的Window对象, 实验标题(可选)}
 * @returns Promise<{data, success, msg?}>
 */
public saveData(config: { iframeWindow, title? }): Promise<{ success, msg }>

/**
 * 重命名实验
 * @param labId
 * @param title
 * @returns Promise<{success, msg?}>
 */
public renameData(labId: string, title: string): Promise<{ success, msg? }>

/**
 * 获取获取资源类别接口
 * @returns Promise<{success, data, msg?}>
 */
public getClassificationsList(): Promise<{ success, data, msg? }>

/**
 * 获取精品资源实验列表
 * @param typename 类型名称
 * @returns Promise<{success, data, msg?}>
 */
public getLabList(typename: string): Promise<{ success, data, msg? }>

/**
 * 获取我的实验列表
 * @returns Promise<{success, data, msg?}>
 */
public getMyLabList(): Promise<{ success, data, msg? }>

/**
 * 获取单个实验详细信息的接口
 * @param labId
 * @returns Promise<{success, data, msg?}>
 */
public getLabDetail(labId: string): Promise<{ success, data, msg? }>

/**
 * 刷新实验场景(如果修改数据了)
 * @param config
 */
public freshEditerScreen(config: { iframeWindow }): void

/**
 * 获取编辑器地址
 * @param labId 实验id,为空则代表新建实验
 * @param fromOfficia 是否来自于官方精品资源
 * @returns string 编辑器地址
 */
public getEditerURL(labId: string = '', fromOfficia: boolean = false): string

/**
 * 获取播放器地址
 * @param labId 实验id,不可为空
 * @returns string 播放器地址
 */
public getPlayerURL(labId: string): string

/**
 * 返回官方精品资源图标的完整路径
 * @param icon 图标名称(xxx.jpg)
 * @returns string
 */
public getOfficiaIconURL(icon): string

/**
 * 返回我的资源图标的完整路径
 * @param iconURL 图标相对路径
 */
public getMyIconURL(iconURL): string
```
## Demo
```javascript
import {
    LabSDK,
    MESSAGE_TYPE
} from 'nobook-saas-sdk';

const labSDK = new LabSDK();

$(() => {
    // 先添加设置
    this.labSDK.setConfig({
        appid: xxxxx, // nobook 提供
        pid: xxxxx,
        from: xxxxx
    });
    // 登录部分(所有操作必须登陆后执行)
    this.labSDK.login({
        uid: xxxxx,
        nickname: xxxxx,
        timestamp: xxxxx,
        sign: xxxxx
    }).then((data) => {
        console.log('~登录成功:', data);
        // TODO init
    }).catch((err) => {
        console.warn(err);
    });
});
```

## Requirement
* jquery >= 3.0
* lodash >= 4.0