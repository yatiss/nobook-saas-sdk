import * as EventEmitter from 'eventemitter3';
export declare class SDKBase extends EventEmitter {
    debugSettings: any;
    DEBUG: boolean;
    uniqueId: string;
    nickname: string;
    uid: string;
    appKey: string;
    from: string;
    pidType: string;
    token: any;
    protected docHost: string;
    constructor();
    setConfig(config: {
        appKey;
        pidType;
        from;
        debugSettings?;
    }): void;
    login(param: {
        uniqueId;
        timestamp;
        sign;
        nickname;
        pidScope;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    logout(): Promise<{
        data;
        success;
        msg?;
    }>;
    $get(url: any, param: any): Promise<{
        data;
        success;
        msg?;
    }>;
    $post(url: any, param: any): Promise<{
        data;
        success;
        msg?;
    }>;
    private $server(param);
    protected jsonObj(data: any): any;
    protected isArray(obj: any): boolean;
}
