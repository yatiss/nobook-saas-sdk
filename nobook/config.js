export var APPKEY_TEST = '111';
export var APPSECRET_TEST = 'weqwew';
export var PID_TYPE = {
    PHYSICAL1: 'PHYSICAL1',
    PHYSICAL2: 'PHYSICAL2',
    CHEMICAL1: 'CHEMICAL1',
    CHEMICAL2: 'CHEMICAL2',
    BIOLOGICAL1: 'BIOLOGICAL1',
    BIOLOGICAL2: 'BIOLOGICAL2',
    PHYSICAL_ADD: 'PHYSICAL_ADD',
    CHEMICAL_ADD: 'CHEMICAL_ADD'
};
export var LAB_TYPE_GRADE = {
    PHYSICAL1: 1,
    PHYSICAL2: 2,
    CHEMICAL1: 1,
    CHEMICAL2: 2,
    BIOLOGICAL1: 1,
    BIOLOGICAL2: 2
};
export var PID_VALUE = {
    PHYSICAL1: {
        lab: 'CZWlTE4lVgz9',
        source: 'RESCZWLEeqji'
    },
    PHYSICAL2: {
        lab: 'GZWLcJQXfD9W',
        source: 'RESGZWLZoxY5'
    },
    CHEMICAL1: {
        lab: 'CZHXNDZHTa75',
        source: 'RESCZHX8afQ1'
    },
    CHEMICAL2: {
        lab: 'GZHXXV8IClkO',
        source: 'RESGZHX54req'
    },
    BIOLOGICAL1: {
        source: 'JuFhE84jRhEh'
    },
    BIOLOGICAL2: {
        source: 'EjEViMk33jNr'
    },
    PHYSICAL_ADD: 'EXAMQGWLuC5K',
    CHEMICAL_ADD: 'EXAMQGHXuC5K'
};
export var MESSAGE_TYPE = {
    SAVE_DATA: 'PHYSICS_SDK_INTERFACE_SAVE',
    SAVE_DATA_RESPONSE: 'PHYSICS_SDK_INTERFACE_SAVE_RESPONSE',
    NOBOOK_SUBMIT: 'nobook.submit',
    NOBOOK_SUBMIT_RESPONSE: 'nobook.submit_response',
    NOBOOK_ONE_STEP: 'nobook.oneStepCorrect',
    NOBOOK_PRACICE_ONE_TITLE: 'nobook.oneStepTitle',
    NOBOOK_PRACICE_ONE_COMPLETE: 'nobook.oneStepComplete',
    NOBOOK_PRACICE_ONE_PROGRESS: 'nobook.oneStepProgress',
    PHYSICS_SDK_INTERFACE_FRESH_DATA: 'PHYSICS_SDK_INTERFACE_FRESH_DATA',
    ON_LOAD: 'onload'
};
export var GLOBAL_HOST = {
    DOC_HOST: 'https://resourceapi.nobook.com',
    DOC_HOST_DEBUG: 'http://resourceapi.nobook.cc',
};
export var GLOBAL_DOCURL = {
    loginURL: '/api/v1/login',
    logoutURL: '/api/v1/logout'
};
