## 实验加试SDK
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
 * }
 * @param config
 */
public setConfig(config: { appKey, pidType, from, DEBUG? }): void

/**
 * 获取物理、化学加试 PidScope
 */
public getAllLabPidScope(): string

/**
 * 获取实验列表
 * @param param {page?: 起始页, limit?: 每页数量}
 */
public getCourseList(param: { page?, limit? }): Promise<{ data, success, msg? }>

/**
 * 发布考试
 * @param param {examName: 考试名称, courseIds: 实验id,多个用逗号分开}
 */
public publishExam(param: { examName, courseIds })

/**
 * 发布考试列表
 * @param param
 */
public pubLishList(): Promise<{ data, success, msg? }>

/**
 * 获取考试实验详情
 * @param param {courseId: 实验id}
 */
public getCourseInfo(param: { courseId }): Promise<{ data, success, msg? }>

/**
 * 上传考试结果
 * @param param {examSn: 考试编号, courseRelationId: 实验关联id, usedTime: 考试时长, steps: 实验步骤}
 */
public saveExamResult(param: { examSn, courseRelationId, usedTime, steps }): Promise<{ data, success, msg? }>

/**
 * 获取考试实验下的学生列表
 * @param param {examSn: 考试编号, courseId: 实验id, page?: 起始页, limit?: 每页数量}
 */
public getStudentExamList(param: { examSn, courseId, page?, limit? }): Promise<{ data, success, msg? }>

/**
 * 获取单个学生单个考试的实验结果
 * @param param {testId: 考试纪录的id}
 */
public getStudentExamInfo(param: { testId }): Promise<{ data, success, msg? }>

/**
 * 获取考试实验view地址(iframe嵌入的地址)
 * isexam: 1为考试,0为练习
 * @param param
 */
public getExamViewURL(param: {courseId, isexam?}): string
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