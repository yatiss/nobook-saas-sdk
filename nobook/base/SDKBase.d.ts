import * as EventEmitter from 'eventemitter3';
export declare class SDKBase extends EventEmitter {
    DEBUG: boolean;
    uid: string;
    appid: string;
    from: string;
    pid: string;
    token: any;
    protected docHost: string;
    constructor();
    setConfig(config: {
        appid;
        pid;
        from;
        DEBUG?;
    }): void;
    outerLogin(param: {
        token;
        nobookUid;
    }): Promise<any>;
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
    secondLogin(): Promise<any>;
    logout(param: {
        uid;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    protected jsonObj(data: any): any;
}
