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
import { get, merge } from 'lodash';
import { MESSAGE_TYPE, PID_TYPE, PID_VALUE } from '../config';
import { docURL, host } from './lab-config';
import { Base64 } from 'js-base64';
import { SDKBase } from '../base';
var LabSDK = (function (_super) {
    __extends(LabSDK, _super);
    function LabSDK() {
        var _this = _super.call(this) || this;
        _this._saveData_resolve = null;
        _this._getSaveContent_resolve = null;
        _this._canDIY = false;
        _this.addListeners();
        return _this;
    }
    LabSDK.prototype.setConfig = function (config) {
        _super.prototype.setConfig.call(this, config);
        this.from = config.from;
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
        if (this.DOC_DEBUG) {
            this.iconHost = this.iconHost.replace('https', 'http');
            this.iconHost = this.iconHost.replace('.com', '.cc');
        }
        if (this.settingsEditerHost.length) {
            this.editHost = this.settingsEditerHost;
            this.editHost = this.editHost.replace('https', 'http');
        }
        else {
            this.editHost = host[this.pidType].EDIT_HOST;
        }
        if (this.debugPlayerHost.length) {
            this.playerHost = this.debugPlayerHost;
            this.playerHost = this.playerHost.replace('https', 'http');
        }
        else {
            this.playerHost = host[this.pidType].PLAYER_HOST;
            if (this.isPhysical() && this.isMobile) {
                this.playerHost = 'https://mwuliplayercdn.nobook.com';
            }
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
            else if (data.type === MESSAGE_TYPE.DATA_REQUEST_RESPONSE) {
                _this._getSaveContent_resolve(data.result);
                _this._getSaveContent_resolve = null;
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
    LabSDK.prototype.getSaveContent = function (config) {
        var _this = this;
        if (this._getSaveContent_resolve) {
            return Promise.resolve({
                success: false,
                msg: '获取实验内容接口正在执行'
            });
        }
        return new Promise(function (resolve) {
            _this._getSaveContent_resolve = resolve;
            var data = { type: MESSAGE_TYPE.DATA_REQUEST };
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
    LabSDK.prototype.migration = function (param) {
        return this.$post(docURL.migrationURL, {
            pid: PID_VALUE[this.pidType].lab,
            token: this.token,
            toUniqueId: param.toUniqueId
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
            keyword: param.keyword,
            versionId: param.versionId,
            textbookId: param.textbookId,
            chapterId: param.chapterId,
            sectionId: param.sectionId,
            categoryId: param.categoryId,
            perPage: param.perPage,
            page: param.page
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
    LabSDK.prototype.copyResources = function (param) {
        return this.$post(docURL.copyResourcesURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].source,
            id: param.labId,
            title: param.title
        });
    };
    LabSDK.prototype.copyDIY = function (param) {
        return this.$post(docURL.copyDIYURL, {
            token: this.token,
            pid: PID_VALUE[this.pidType].lab,
            id: param.labId,
            title: param.title
        });
    };
    LabSDK.prototype.freshEditerScreen = function (config) {
        config.iframeWindow.postMessage({ type: MESSAGE_TYPE.PHYSICS_SDK_INTERFACE_FRESH_DATA }, '*');
    };
    LabSDK.prototype.getEditerURL = function (config) {
        var labId = get(config, 'labId', '');
        var editURL = this.editHost + "/#/" + this.editEndName + "?token=" + this.token + "&uid=" + this.uid + "&labid=" + labId;
        if (this.editerDoc) {
            editURL += '&EDITER_DEBUG=1';
        }
        if (config && config.hasOwnProperty('fromOfficia')) {
            editURL += '&sourcefrom=1';
        }
        editURL += '&grade=' + this.grade;
        editURL += '&sdkv1=1';
        editURL += '&pidtype=' + this.pidType;
        return editURL;
    };
    LabSDK.prototype.getPlayerURL = function (config) {
        if (this.isBiological()) {
            var url = this.playerHost + "/?sourceid=" + config.labId + "&token=" + this.token + "&type=" + this.from;
            return url;
        }
        var playerURL = this.playerHost + "?type=" + this.from + "&sourceid=" + config.labId;
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
    Object.defineProperty(LabSDK.prototype, "settingsEditerHost", {
        get: function () {
            return "" + get(this.xkHostSettings, 'EDITER', '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabSDK.prototype, "debugPlayerHost", {
        get: function () {
            return "" + get(this.xkHostSettings, 'PLAYER', '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabSDK.prototype, "editerDoc", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return LabSDK;
}(SDKBase));
export { LabSDK };
