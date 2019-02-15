## 实验加试SDK
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
```