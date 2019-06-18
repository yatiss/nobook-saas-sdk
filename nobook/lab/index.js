import { LabSDK } from './lab-sdk';
import { APPKEY_TEST, APPSECRET_TEST, MESSAGE_TYPE, PID_TYPE } from '../config';
export { APPKEY_TEST, APPSECRET_TEST, LabSDK, PID_TYPE, MESSAGE_TYPE };
if (typeof window === 'object') {
    window.NB_SDK_LAB = {
        APPKEY_TEST: APPKEY_TEST,
        APPSECRET_TEST: APPSECRET_TEST,
        LabSDK: LabSDK,
        PID_TYPE: PID_TYPE,
        MESSAGE_TYPE: MESSAGE_TYPE
    };
}
