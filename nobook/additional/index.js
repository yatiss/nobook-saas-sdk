import { AdditionalSDK } from './additional-sdk';
export { AdditionalSDK };
if (typeof window === 'object') {
    window.NB_SDK_ADDITIONAL = {
        AdditionalSDK: AdditionalSDK
    };
}
