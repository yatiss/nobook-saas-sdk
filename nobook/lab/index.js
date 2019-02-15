import { APPID_TEST, APPKEY_TEST } from './lab-config';
import { LabSDK } from './lab-sdk';
import { MESSAGE_TYPE, PID_TYPE } from '../config';
export { APPID_TEST, APPKEY_TEST, LabSDK, PID_TYPE, MESSAGE_TYPE };
if (typeof window === 'object') {
    window.NBSDK = {
        APPID_TEST: APPID_TEST,
        APPKEY_TEST: APPKEY_TEST,
        LabSDK: LabSDK,
        PID_TYPE: PID_TYPE,
        MESSAGE_TYPE: MESSAGE_TYPE
    };
}
