import * as EventEmitter from 'eventemitter3';
export declare class SDKBase extends EventEmitter {
    debugSettings: any;
    DOC_DEBUG: boolean;
    uniqueId: string;
    nickname: string;
    uid: string;
    appKey: string;
    from: string;
    pidType: string;
    isMobile: boolean;
    token: any;
    protected docHost: string;
    protected editHost: string;
    protected playerHost: string;
    constructor();
    setConfig(config: {
        appKey;
        pidType;
        from;
        isMobile?;
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
    readonly grade: number;
    readonly xkType: string;
    isPhysical(): boolean;
    isChemical(): boolean;
    isBiological(): boolean;
    isPhysicalAdd(): boolean;
    isChemicalAdd(): boolean;
    protected readonly xkDebugSettings: any;
}
