import { SDKBase } from '../base';
export declare class AdditionalSDK extends SDKBase {
    DEBUG: boolean;
    constructor();
    setConfig(config: {
        appid;
        pid;
        from;
        DEBUG?;
    }): void;
}
