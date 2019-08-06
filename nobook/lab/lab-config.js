import { merge } from 'lodash';
var sdkConfig = window.__nb_saas_sdk_config;
export var host = {
    'PHYSICAL1': {
        EDIT_END_NAME: 'physics-courseware',
        ICON_HOST: 'https://wuli.nobook.com',
        EDIT_HOST: 'https://wuli.nobook.com',
        PLAYER_HOST: 'https://wuliplayercdn.nobook.com'
    },
    'PHYSICAL2': {
        EDIT_END_NAME: 'physics-courseware',
        ICON_HOST: 'https://wuli.nobook.com',
        EDIT_HOST: 'https://wuli.nobook.com',
        PLAYER_HOST: 'https://wuliplayercdn.nobook.com'
    },
    'CHEMICAL1': {
        EDIT_END_NAME: 'chemical-courseware',
        ICON_HOST: 'https://huaxue.nobook.com',
        EDIT_HOST: 'https://huaxue.nobook.com',
        PLAYER_HOST: 'https://huaxueplayercdn.nobook.com'
    },
    'CHEMICAL2': {
        EDIT_END_NAME: 'chemical-courseware',
        ICON_HOST: 'https://huaxue.nobook.com',
        EDIT_HOST: 'https://huaxue.nobook.com',
        PLAYER_HOST: 'https://huaxueplayercdn.nobook.com'
    },
    'BIOLOGICAL1': {
        ICON_HOST: 'https://res-api.nobook.com/sw/cz/libs/biology',
        PLAYER_HOST: 'https://shengwuv2-cz.nobook.com/libs/biology',
        PLAYER_HOST_DEBUG: 'http://shengwu-cz.nobook.cc/libs/biology'
    },
    'BIOLOGICAL2': {
        ICON_HOST: 'https://res-api.nobook.com/sw/gz/libs/biology',
        PLAYER_HOST: 'https://shengwuv2-gz.nobook.com/libs/biology',
        PLAYER_HOST_DEBUG: 'http://shengwu-gz.nobook.cc/libs/biology'
    }
};
if (sdkConfig && sdkConfig.host) {
    merge(host, sdkConfig.host);
}
export var docURL = {
    searchDIYURL: "/api/v1/myexperiment/search",
    getListDIYURL: "/api/v1/myexperiment/get",
    delLabDataDIYURL: "/api/v1/myexperiment/del",
    renameDIYURL: "/api/v1/myexperiment/rename",
    shareDIYURL: "/api/v1/myexperiment/share",
    getInfoDIYURL: "/api/v1/myexperiment/info",
    clearRedisURL: '/api/v1/myexperiment/clearCache',
    migrationURL: '/api/v1/myexperiment/migration',
    getResourcesByChapterURL: "/api/v1/resources/listbychapterid",
    getResourcesByCategoryURL: "/api/v1/resources/listbycategoryid",
    getChapterURL: "/api/v1/resources/chapter",
    classificationsURL: "/api/v1/resources/experimentcategory",
    searchResourcesURL: "/api/v1/resources/search",
    getInfoResourcesURL: "/api/v1/resources/info"
};
