var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { merge, get } from 'lodash';
import { PID_TYPE, PID_VALUE, MESSAGE_TYPE } from '../config';
import { host, docURL } from './lab-config';
import { Base64 } from 'js-base64';
import { SDKBase } from '../base';
var LabSDK = (function (_super) {
    __extends(LabSDK, _super);
    function LabSDK() {
        var _this = _super.call(this) || this;
        _this.EDITER_DEBUG = false;
        _this.PLAYER_DEBUG = false;
        _this._saveData_resolve = null;
        _this._canDIY = false;
        _this.addListeners();
        return _this;
    }
    LabSDK.prototype.setConfig = function (config) {
        _super.prototype.setConfig.call(this, config);
        this.EDITER_DEBUG = config.EDITER_DEBUG;
        this.PLAYER_DEBUG = config.PLAYER_DEBUG;
        this.from = config.from;
        if (config.hasOwnProperty('EDIT_HOST_DEBUG')) {
            host.EDIT_HOST_DEBUG = config.EDIT_HOST_DEBUG;
        }
        if (config.hasOwnProperty('PLAYER_HOST_DEBUG')) {
            host.PLAYER_HOST_DEBUG = config.PLAYER_HOST_DEBUG;
        }
        this.freshPidConfig();
        for (var _i = 0, _a = Object.keys(docURL); _i < _a.length; _i++) {
            var key = _a[_i];
            docURL[key] = this.docHost + docURL[key];
        }
    };
    LabSDK.prototype.freshPidConfig = function () {
        this._canDIY = this.isPhysical() || this.isChemical();
        this.editEndName = host[this.pidType].EDIT_END_NAME;
        this.iconHost = host[this.pidType].ICON_HOST;
        if (this.DEBUG) {
            this.iconHost = this.iconHost.replace('https', 'http');
            this.iconHost = this.iconHost.replace('.com', '.cc');
        }
        if (!this.EDITER_DEBUG) {
            this.editHost = host[this.pidType].EDIT_HOST;
        }
        else {
            this.editHost = "" + host.EDIT_HOST_DEBUG;
            this.editHost = this.editHost.replace('https', 'http');
        }
        if (!this.PLAYER_DEBUG) {
            this.playerHost = host[this.pidType].PLAYER_HOST;
        }
        else {
            this.playerHost = "" + host.PLAYER_HOST_DEBUG;
            this.playerHost = this.playerHost.replace('https', 'http');
        }
    };
    LabSDK.prototype.addListeners = function () {
        var _this = this;
        window.addEventListener('message', function (event) {
            var data = event.data || {};
            if (data.type === MESSAGE_TYPE.SAVE_DATA_RESPONSE) {
                _this._saveData_resolve(data.result);
                _this._saveData_resolve = null;
            }
            else if (data.type === MESSAGE_TYPE.ON_LOAD) {
                _this.emit(MESSAGE_TYPE.ON_LOAD, event);
            }
        });
    };
    LabSDK.prototype.switchSubject = function (param) {
        this.pidType = param.pidType;
        this.freshPidConfig();
    };
    LabSDK.prototype.deleteData = function (param) {
        return this.$post(docURL.delLabDataDIYURL, {
            pid: PID_VALUE[this.pidType].lab,
            token: this.token,
            id: param.labId
        });
    };
    LabSDK.prototype.saveData = function (config) {
        var _this = this;
        if (this._saveData_resolve) {
            return Promise.resolve({
                success: false,
                msg: '已有实验正在保存'
            });
        }
        return new Promise(function (resolve) {
            _this._saveData_resolve = resolve;
            var data = { type: MESSAGE_TYPE.SAVE_DATA };
            if (config && config.title) {
                data.title = config.title;
            }
            config.iframeWindow.postMessage(data, '*');
        });
    };
    LabSDK.prototype.renameData = function (param) {
        return this.$post(docURL.renameDIYURL, {
            pid: PID_VALUE[this.pidType].lab,
            token: this.token,
            id: param.labId,
            title: param.newTitle
        });
    };
    LabSDK.prototype.getChapter = function () {
        return this.$get(docURL.getChapterURL, {
            pid: PID_VALUE[this.pidType].source,
            token: this.token
        });
    };
    LabSDK.prototype.clearRedis = function () {
        return this.$post(docURL.clearRedisURL, {
            pid: PID_VALUE[this.pidType].lab,
            token: this.token
        });
    };
    LabSDK.prototype.getClassificationsList = function () {
        return this.$get(docURL.classificationsURL, {
            pid: PID_VALUE[this.pidType].source,
            token: this.token
        });
    };
    LabSDK.prototype.getResourcesByCategory = function (param) {
        var _this = this;
        return this.$get(docURL.getResourcesByCategoryURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].source,
            categoryId: param.categoryId
        }).then(function (obj) {
            if (_this.isBiological()) {
                var dataObj = obj.data;
                if (get(dataObj, 'data.length')) {
                    dataObj.data.forEach(function (item) {
                        item.id = Base64.encode(item.url);
                    });
                }
            }
            return obj;
        });
    };
    LabSDK.prototype.searchDIY = function (param) {
        var _this = this;
        return this.$get(docURL.searchDIYURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].lab,
            keyword: param.keyword
        }).then(function (obj) {
            if (_this.isBiological()) {
                var dataObj = obj.data;
                if (get(dataObj, 'data.length')) {
                    dataObj.data.forEach(function (item) {
                        item.id = Base64.encode(item.url);
                    });
                }
            }
            return obj;
        });
    };
    LabSDK.prototype.searchResources = function (param) {
        var _this = this;
        return this.$get(docURL.searchResourcesURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].source,
            keyword: param.keyword
        }).then(function (obj) {
            if (_this.isBiological()) {
                var dataObj = obj.data;
                if (get(dataObj, 'data.length')) {
                    dataObj.data.forEach(function (item) {
                        item.id = Base64.encode(item.url);
                    });
                }
            }
            return obj;
        });
    };
    LabSDK.prototype.getResourcesByChapter = function (param) {
        var _this = this;
        return this.$get(docURL.getResourcesByChapterURL, merge({
            token: this.token,
            pid: PID_VALUE[this.pidType].source
        }, param)).then(function (obj) {
            if (_this.isBiological()) {
                var dataObj = obj.data;
                if (get(dataObj, 'data.length')) {
                    dataObj.data.forEach(function (item) {
                        item.id = Base64.encode(item.url);
                    });
                }
            }
            return obj;
        });
    };
    LabSDK.prototype.getDIYLabList = function (param) {
        if (!this._canDIY) {
            return Promise.reject({
                success: false,
                msg: '只有可DIY学科才有我的实验目录'
            });
        }
        return this.$get(docURL.getListDIYURL, {
            pid: PID_VALUE[this.pidType].lab,
            token: this.token,
            page: param.page,
            perPage: param.perPage
        });
    };
    LabSDK.prototype.getInfoResources = function (param) {
        var _this = this;
        return this.$get(docURL.getInfoResourcesURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].source,
            id: param.labId
        }).then(function (obj) {
            var dataObj = obj.data;
            if (!dataObj.hasOwnProperty('containsVipequ') && _this.isPhysical()) {
                dataObj.containsVipequ = get(dataObj, 'content.phyData.properties.data.containsVipequ', false);
            }
            dataObj.iconfull = _this.getOfficiaIconURL(get(dataObj, 'properties.icon.url'));
            return obj;
        });
    };
    LabSDK.prototype.getInfoDIY = function (param) {
        var _this = this;
        return this.$get(docURL.getInfoDIYURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].lab,
            id: param.labId
        }).then(function (obj) {
            var dataObj = obj.data;
            if (!dataObj.hasOwnProperty('containsVipequ') && _this.isPhysical()) {
                dataObj.containsVipequ = get(dataObj, 'content.phyData.properties.data.containsVipequ', false);
            }
            dataObj.iconfull = _this.getOfficiaIconURL(get(dataObj, 'properties.icon.url'));
            return obj;
        });
    };
    LabSDK.prototype.shareDIY = function (param) {
        return this.$post(docURL.shareDIYURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].lab,
            uniqueId: param.uniqueId,
            id: param.labId
        });
    };
    LabSDK.prototype.freshEditerScreen = function (config) {
        config.iframeWindow.postMessage({ type: MESSAGE_TYPE.PHYSICS_SDK_INTERFACE_FRESH_DATA }, '*');
    };
    LabSDK.prototype.getEditerURL = function (labId, fromOfficia) {
        if (labId === void 0) { labId = ''; }
        if (fromOfficia === void 0) { fromOfficia = false; }
        var editURL = this.editHost + "/#/" + this.editEndName + "?token=" + this.token + "&uid=" + this.uid + "&labid=" + labId;
        if (this.EDITER_DEBUG) {
            editURL += '&EDITER_DEBUG=1';
        }
        if (fromOfficia) {
            editURL += '&sourcefrom=1';
        }
        editURL += '&sdkv1=1';
        editURL += '&pidtype=' + this.pidType;
        return editURL;
    };
    LabSDK.prototype.getPlayerURL = function (labId) {
        if (this.isBiological()) {
            if (this.PLAYER_DEBUG) {
                return "http://res-api.nobook.cc/sw/gz/libs/biology/" + Base64.decode(labId);
            }
            return "" + host[this.pidType].PLAYER_HOST + Base64.decode(labId);
        }
        var playerURL = this.playerHost + "?type=" + this.from + "&sourceid=" + labId;
        return playerURL;
    };
    LabSDK.prototype.getOfficiaIconURL = function (icon) {
        if (/^http/ig.test(icon)) {
            return icon;
        }
        if (this.isBiological()) {
            return host[this.pidType].ICON_HOST + "/" + icon;
        }
        return "" + this.iconHost + icon;
    };
    LabSDK.prototype.getDIYIconURL = function (iconURL) {
        if (/^http/ig.test(iconURL)) {
            return iconURL;
        }
        return "" + this.iconHost + iconURL;
    };
    LabSDK.prototype.getAllLabPidScope = function () {
        var list = [];
        [
            PID_TYPE.PHYSICAL1,
            PID_TYPE.PHYSICAL2,
            PID_TYPE.CHEMICAL1,
            PID_TYPE.CHEMICAL2,
            PID_TYPE.BIOLOGICAL1,
            PID_TYPE.BIOLOGICAL2
        ].forEach(function (item) {
            list.push(PID_VALUE[item].lab, PID_VALUE[item].source);
        });
        return list.join(',');
    };
    Object.defineProperty(LabSDK.prototype, "canDIY", {
        get: function () {
            return this._canDIY;
        },
        enumerable: true,
        configurable: true
    });
    LabSDK.prototype.isPhysical = function () {
        return this.pidType === PID_TYPE.PHYSICAL1 || this.pidType === PID_TYPE.PHYSICAL2;
    };
    LabSDK.prototype.isChemical = function () {
        return this.pidType === PID_TYPE.CHEMICAL1 || this.pidType === PID_TYPE.CHEMICAL2;
    };
    LabSDK.prototype.isBiological = function () {
        return this.pidType === PID_TYPE.BIOLOGICAL1 || this.pidType === PID_TYPE.BIOLOGICAL2;
    };
    return LabSDK;
}(SDKBase));
export { LabSDK };
