import { AdditionalSDK } from './additional-sdk';
import { APPKEY_TEST, APPSECRET_TEST, PID_TYPE, MESSAGE_TYPE } from '../config';
export { APPKEY_TEST, APPSECRET_TEST, AdditionalSDK, PID_TYPE, MESSAGE_TYPE };
if (typeof window === 'object') {
    window.NB_SDK_ADDITIONAL = {
        APPKEY_TEST: APPKEY_TEST,
        APPSECRET_TEST: APPSECRET_TEST,
        AdditionalSDK: AdditionalSDK,
        MESSAGE_TYPE: MESSAGE_TYPE
    };
}
