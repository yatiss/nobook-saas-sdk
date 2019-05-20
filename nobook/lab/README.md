## 基础实验SDK
### API
```javascript
// 监听场景初始化完成
addListener(MESSAGE_TYPE.ON_LOAD, (event)=>{
    // 编辑器或播放器实验场景初始化成功时触发
});

/**
 * 参数设置
 * config: {
 *  appKey  应用id,可传入前端使用,由nobook提供
 *  pidType 产品学科,由 PID_TYPE 对象选取
 *  from      来源公司名称
 *  debugSettings      nobook内部调试使用,对接用户忽略
 * }
 * @param config
 */
public setConfig(config: { appKey, pidType, from, debugSettings? }): void

/**
 * 用户登录
 * uniqueId 第三方用户账户,必填
 * timestamp 时间戳: 为后端生成,规则为 new Date().getTime().toString().substring(0, 10)
 * sign 签名: 为后端生成,规则为 md5(appKey appkey nickname pid timestamp uniqueId)
 * nickname 用户昵称,选填
 * pidScope 用逗号隔开的pid字符串
 * 其中 appkey 在后台使用,不可在前端暴露
 * @param param
 * @returns Promise<{data, success, msg?}>
 */
public login(param: { uniqueId, timestamp, sign, nickname, pidScope }): Promise<{ data, success, msg? }>

/**
 * 退出
 * @param param
 */
public logout(): Promise<{ data, success, msg? }>

/**
 * 切换学科
 * 注: 此接口调用了login,进行了二次登录
 * @param param 参考登录接口login
 */
public switchSubject(param: { pidType }): void

/**
 * 删除实验
 * @param param: { labId: 实验id }
 * @returns Promise<{success, msg?}>
 */
public deleteData(param: { labId }): Promise<{ data, success, msg? }>

/**
 * 保存实验
 * @param config {iframe的Window对象, 实验标题(可选)}
 * @returns Promise<{data, success, msg?}>
 */
public saveData(config: { iframeWindow, title? }): Promise<{ success, msg }>

/**
 * 重命名
 * @param labId
 * @param param {labId: 实验id, newTitle: 新标题}
 * @returns Promise<{success, msg?}>
 */
public renameData(param: {labId, newTitle}): Promise<{ data, success, msg? }>

/**
 * 获取章节接口
 * @returns Promise<{success, data, msg?}>
 */
public getChapter(): Promise<{ success, data, msg? }>

/**
 * 清除Redis缓存
 * @returns Promise<{success, data, msg?}>
 */
public clearRedis(): Promise<{ success, data, msg? }>

/**
 * 实验数据迁移
 * @param param: { toUniqueId: 第三方用户唯一标识 }
 * @returns Promise<{success, data, msg?}>
 */
public migration(param: { toUniqueId }): Promise<{ success, data, msg? }>

/**
 * 获取资源类别接口
 * @returns Promise<{success, data, msg?}>
 */
public getClassificationsList(): Promise<{ success, data, msg? }>

/**
 * 按模块分类, 获取精品资源实验列表
 * @param param: { categoryId: 类型名称 }
 * @returns Promise<{success, data, msg?}>
 */
public getResourcesByCategory(param: { categoryId }): Promise<{ success, data, msg? }>

/**
 * 搜索DIY实验(我的实验)
 * @param param { keyword: 搜索关键字 }
 * @returns Promise<{success, data, msg?}>
 */
public searchDIY(param: { keyword }): Promise<{ success, data, msg? }>

/**
 * 搜索官方资源
 * @param param { keyword: 搜索关键字 }
 * @returns Promise<{success, data, msg?}>
 */
public searchResources(param: { keyword }): Promise<{ success, data, msg? }>

/**
 * 按章节分类, 获取精品资源实验列表
 * 分级显示右侧内容
 * 结构: 年级-学科-版本-教材-章-节
 * 传参只传后4项: 版本-教材-章-节       textbookId-versionId-chapterId-sectionId
 * @param param: { textbookId: 版本, versionId: 教材, chapterId: 章, sectionId: 节 }
 * @returns Promise<{success, data, msg?}>
 */
public getResourcesByChapter(param: { textbookId, versionId, chapterId, sectionId }): Promise<{ success, data, msg? }>

/**
 * 获取DIY实验列表
 * @param param?:{page:页码【默认第一页】, perPage:每页显示条数【默认10条数据，最大不超过50条数据】}
 * @returns Promise<{success, data, msg?}>
 */
public getDIYLabList(param: { page?, perPage? }): Promise<{ success, data, page?, perPage?, total?, msg? }>

/**
 * 获取精品实验详细信息的接口
 * @param param: {labId: 实验id}
 * @returns Promise<{success, data, msg?}>
 */
public getInfoResources(param: {labId}): Promise<{ success, data, msg? }>

/**
 * 获取DIY实验详细信息的接口
 * @param param: {labId: 实验id}
 * @returns Promise<{success, data, msg?}>
 */
public getInfoDIY(param: {labId}): Promise<{ success, data, msg? }>

/**
 * 实验分享
 * @param param: { uniqueId: 分享指向的用户, labId: 实验id }
 * @param param
 */
public shareDIY(param: { uniqueId, labId }): Promise<{ success, data, msg? }>

/**
 * 刷新编辑器场景(如果编辑器数据修改了)
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
 * 返回DIY资源图标的完整路径
 * @param iconURL 图标相对路径
 */
public getDIYIconURL(iconURL): string

/**
 * 获取物理、化学、生物所有资源与DIY产品ID
 */
public getAllLabPidScope(): string

/**
 * 当前场景是否可DIY
 */
public get canDIY(): boolean

/**
 * 当前场景是否为物理场景
 */
public isPhysical(): boolean

/**
 * 当前场景是否为化学场景
 */
public isChemical(): boolean

/**
 * 当前场景是否为生物场景
 */
public isBiological(): boolean
```
## Demo
```javascript
// 1、es6 或 ts 引用方式
import {
    LabSDK,
    MESSAGE_TYPE
} from 'nobook-saas-sdk';

/*
2、页面直接引用方式
<script src="virtual-experiment.min.js"></script>
并通过 window 提取SDK
const {
    LabSDK,
    MESSAGE_TYPE,
    PID_TYPE
} = window.NBSDK;
3、es5引用方式
const NBSDK = require('nobook-saas-sdk/virtual-experiment.min.js');
 */

const labSDK = new LabSDK();

$(() => {
    // 先添加设置
    this.labSDK.setConfig({
        pidType: xxxxx, // nobook 提供
        appKey: xxxxx,
        from: xxxxx
    });
    // 登录部分(所有操作必须登陆后执行)
    this.labSDK.login({
        uniqueId: xxxxx,
        nickname: xxxxx,
        timestamp: xxxxx,
        sign: xxxxx,
        pidScope: xxxxx
    }).then((data) => {
        console.log('~登录成功:', data);
        // TODO init
    }).catch((err) => {
        console.warn(err);
    });
});
```
