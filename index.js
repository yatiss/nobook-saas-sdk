import { host } from './nobook/lab-config';
import { LabSDK } from "./nobook/lab-sdk";
import { MESSAGE_TYPE, PID_TYPE } from "./config";
export { LabSDK } from './nobook/lab-sdk';
export { PID_TYPE, MESSAGE_TYPE } from './config';
export var comon = {
    ICON_HOST: host.ICON_HOST
};
if (typeof window === 'object') {
    window.NBSDK = {
        LabSDK: LabSDK,
        PID_TYPE: PID_TYPE,
        MESSAGE_TYPE: MESSAGE_TYPE,
        ICON_HOST: host.ICON_HOST
    };
}
