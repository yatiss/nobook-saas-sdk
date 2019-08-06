export var host = {
    'PHYSICAL1': {
        EDIT_END_NAME: 'physics-courseware',
        ICON_HOST: 'http://192.168.1.6:84',
        EDIT_HOST: 'http://192.168.1.6:84',
        PLAYER_HOST: 'http://192.168.1.6:85'
    },
    'PHYSICAL2': {
        EDIT_END_NAME: 'physics-courseware',
        ICON_HOST: 'http://192.168.1.6:84',
        EDIT_HOST: 'http://192.168.1.6:84',
        PLAYER_HOST: 'http://192.168.1.6:85'
    },
    'CHEMICAL1': {
        EDIT_END_NAME: 'chemical-courseware',
        ICON_HOST: 'http://192.168.1.6:86',
        EDIT_HOST: 'http://192.168.1.6:86',
        PLAYER_HOST: 'http://192.168.1.6:87'
    },
    'CHEMICAL2': {
        EDIT_END_NAME: 'chemical-courseware',
        ICON_HOST: 'http://192.168.1.6:86',
        EDIT_HOST: 'http://192.168.1.6:86',
        PLAYER_HOST: 'http://192.168.1.6:87'
    },
    'BIOLOGICAL1': {
        ICON_HOST: 'http://192.168.1.6:82/sw/cz/libs/biology',
        PLAYER_HOST: 'http://192.168.1.6:82/libs/biology'
    },
    'BIOLOGICAL2': {
        ICON_HOST: 'http://192.168.1.6:83/sw/gz/libs/biology',
        PLAYER_HOST: 'http://192.168.1.6:83/libs/biology'
    }
};
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
