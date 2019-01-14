import * as EventEmitter from 'eventemitter3';
export declare class LabSDK extends EventEmitter {
    private DEBUG;
    private EDITER_DEBUG;
    private PLAYER_DEBUG;
    private uid;
    private appid;
    private from;
    private pid;
    private docHost;
    private editHost;
    private playerHost;
    private token;
    private _saveData_resolve;
    private isHTTPS;
    constructor();
    /**
     * 设置
     * appid  应用id,可传入前端使用,由nobook提供
     * pid 产品参数,由 PID_TYPE 对象选取
     * from 来源公司名称
     * @param config
     */
    setConfig(config: {
        appid;
        pid;
        from;
        DEBUG?;
        EDITER_DEBUG?;
        PLAYER_DEBUG?;
        isHTTPS?;
    }): void;
    /**
     * window message 交互
     */
    private addListeners();
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
    login(param: {
        uid;
        sign;
        timestamp;
        nickname;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    /**
     * 反馈
     * @param param
     * @returns Promise<{data, success, msg?}>
     */
    sendFeedback(param: {
        title;
        content;
        source;
        pics?;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    /**
     * 删除实验
     * @param labId  实验id
     * @returns Promise<{success, msg?}>
     */
    deleteData(labId: string): Promise<{
        success;
        msg;
    }>;
    /**
     * 保存实验数据
     * @param config {iframe的Window对象, 实验标题(可选)}
     * @returns Promise<{data, success, msg?}>
     */
    saveData(config: {
        iframeWindow;
        title?;
    }): Promise<{
        success;
        msg;
    }>;
    /**
     * 重命名
     * @param labId
     * @param title
     * @returns Promise<{success, msg?}>
     */
    renameData(labId: string, title: string): Promise<{
        success;
        msg?;
    }>;
    /**
     * 获取获取资源类别接口
     * @returns Promise<{success, data, msg?}>
     */
    getClassificationsList(): Promise<{
        success;
        data;
        msg?;
    }>;
    /**
     * 获取精品资源实验列表
     * @param typename 类型名称
     * @returns Promise<{success, data, msg?}>
     */
    getLabList(typename: string): Promise<{
        success;
        data;
        msg?;
    }>;
    /**
     * 获取我的实验列表
     * @returns Promise<{success, data, msg?}>
     */
    getMyLabList(): Promise<{
        success;
        data;
        msg?;
    }>;
    /**
     * 获取单个实验详细信息的接口
     * @param labId
     * @returns Promise<{success, data, msg?}>
     */
    getLabDetail(labId: string): Promise<{
        success;
        data;
        msg?;
    }>;
    /**
     * 刷新实验场景(如果修改数据了)
     * @param config
     */
    freshEditerScreen(config: {
        iframeWindow;
    }): void;
    /**
     * 获取编辑器地址
     * @param labId 实验id,为空则代表新建实验
     * @param fromOfficia 是否来自于官方精品资源
     * @returns string 编辑器地址
     */
    getEditerURL(labId?: string, fromOfficia?: boolean): string;
    /**
     * 获取播放器地址
     * @param labId 实验id,不可为空
     * @returns string 播放器地址
     */
    getPlayerURL(labId: string): string;
    /**
     * 返回官方精品资源图标的完整路径
     * @param icon 图标名称(xxx.jpg)
     * @returns string
     */
    getOfficiaIconURL(icon: any): string;
    /**
     * 返回我的资源图标的完整路径
     * @param iconURL 图标相对路径
     */
    getMyIconURL(iconURL: any): string;
}
