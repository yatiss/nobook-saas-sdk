import * as EventEmitter from 'eventemitter3';
export declare class SDKBase extends EventEmitter {
    DEBUG: boolean;
    uid: string;
    appid: string;
    from: string;
    pid: string;
    token: any;
    constructor();
    setConfig(config: {
        appid;
        pid;
        from;
        DEBUG?;
    }): void;
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
    private _secondLogin();
    protected jsonObj(data: any): any;
}
