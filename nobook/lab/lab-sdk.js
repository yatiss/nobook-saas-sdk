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
import * as $ from 'jquery';
import { get } from 'lodash';
import { PID_TYPE, MESSAGE_TYPE } from '../config';
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
        return _this;
    }
    LabSDK.prototype.setConfig = function (config) {
        _super.prototype.setConfig.call(this, config);
        this.DEBUG = config.DEBUG;
        this.EDITER_DEBUG = config.EDITER_DEBUG;
        this.PLAYER_DEBUG = config.PLAYER_DEBUG;
        this.from = config.from;
        this.pid = config.pid;
        if (config.hasOwnProperty('EDIT_HOST_DEBUG')) {
            host.EDIT_HOST_DEBUG = config.EDIT_HOST_DEBUG;
        }
        if (config.hasOwnProperty('EDIT_HOST_DEBUG_PORT')) {
            host.EDIT_HOST_DEBUG_PORT = config.EDIT_HOST_DEBUG_PORT;
        }
        if (config.hasOwnProperty('PLAYER_HOST_DEBUG')) {
            host.PLAYER_HOST_DEBUG = config.PLAYER_HOST_DEBUG;
        }
        if (config.hasOwnProperty('PLAYER_HOST_DEBUG_PORT')) {
            host.PLAYER_HOST_DEBUG_PORT = config.PLAYER_HOST_DEBUG_PORT;
        }
        this.appid = config.appid;
        this.freshPidConfig();
        for (var _i = 0, _a = Object.keys(docURL); _i < _a.length; _i++) {
            var key = _a[_i];
            docURL[key] = this.docHost + docURL[key];
        }
        this.addListeners();
    };
    LabSDK.prototype.freshPidConfig = function () {
        this._canDIY = this.pid === PID_TYPE.PHYSICAL || this.pid === PID_TYPE.CHEMISTRY;
        this.editEndName = host[this.pid].EDIT_END_NAME;
        this.iconHost = host[this.pid].ICON_HOST;
        if (this.DEBUG) {
            this.iconHost = this.iconHost.replace('https', 'http');
            this.iconHost = this.iconHost.replace('.com', '.cc');
        }
        if (!this.EDITER_DEBUG) {
            this.editHost = host[this.pid].EDIT_HOST;
        }
        else {
            this.editHost = host.EDIT_HOST_DEBUG + ":" + host.EDIT_HOST_DEBUG_PORT;
            this.editHost = this.editHost.replace('https', 'http');
        }
        if (!this.PLAYER_DEBUG) {
            this.playerHost = host[this.pid].PLAYER_HOST;
        }
        else {
            this.playerHost = host.PLAYER_HOST_DEBUG + ":" + host.PLAYER_HOST_DEBUG_PORT;
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
        this.pid = param.pid;
        this.freshPidConfig();
        return this.login({
            uid: param.uid,
            sign: param.sign,
            timestamp: param.timestamp,
            nickname: param.nickname,
        });
    };
    LabSDK.prototype.sendFeedback = function (param) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.post(docURL.feedbackURL, {
                title: param.title,
                content: param.content,
                pid: _this.pid,
                source: param.source,
                pics: param.pics
            }, function (data, status) {
                if (status === 'success') {
                    data = _this.jsonObj(data);
                    if (data.code === 200) {
                        resolve({
                            success: true,
                            data: data
                        });
                    }
                    else {
                        reject({
                            success: false,
                            msg: data.msg
                        });
                    }
                }
                else {
                    reject({
                        success: false,
                        msg: status
                    });
                }
            });
        });
    };
    LabSDK.prototype.deleteData = function (labId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.post(docURL.delLabDataURL, {
                pid: _this.pid,
                token: _this.token,
                id: labId
            }, function (data) {
                data = _this.jsonObj(data);
                resolve({
                    success: data.code === 200,
                    msg: data.msg
                });
            });
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
    LabSDK.prototype.renameData = function (labId, title) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.post(docURL.renameLabDataURL, {
                pid: _this.pid,
                token: _this.token,
                id: labId,
                title: title
            }, function (data) {
                data = _this.jsonObj(data);
                resolve({
                    success: data.code === 200,
                    msg: data.msg
                });
            });
        });
    };
    LabSDK.prototype.getChapter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.get(docURL.getChapterURL, {
                pid: _this.pid,
                token: _this.token
            }, function (data) {
                data = _this.jsonObj(data);
                if (data.code === 200) {
                    resolve({
                        success: true,
                        data: data.data
                    });
                }
                else {
                    reject({
                        success: false,
                        msg: data.msg
                    });
                }
            });
        });
    };
    LabSDK.prototype.getClassificationsList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.get(docURL.classificationsURL, {
                pid: _this.pid,
                token: _this.token
            }, function (data) {
                data = _this.jsonObj(data);
                if (data.code === 200) {
                    resolve({
                        success: true,
                        data: data.data
                    });
                }
                else {
                    reject({
                        success: false,
                        msg: data.msg
                    });
                }
            });
        });
    };
    LabSDK.prototype.getLabList = function (typename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.get(docURL.getListURL, {
                pid: _this.pid,
                token: _this.token,
                type: 'classification',
                typename: typename
            }, function (data) {
                data = _this.jsonObj(data);
                if (data.code === 200) {
                    if (_this.pid === PID_TYPE.BIOLOGICAL2 || _this.pid === PID_TYPE.BIOLOGICAL1) {
                        if (data.data && data.data.length) {
                            data.data.forEach(function (item) {
                                item.id = Base64.encode(item.url);
                            });
                        }
                    }
                    resolve({
                        success: true,
                        data: data.data
                    });
                }
                else {
                    reject({
                        success: false,
                        msg: data.msg
                    });
                }
            });
        });
    };
    LabSDK.prototype.getMyLabList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._canDIY) {
                reject({
                    success: false,
                    msg: '只有可DIY学科才有我的实验目录'
                });
                return;
            }
            $.get(docURL.getMyLabDataURL, {
                pid: _this.pid,
                token: _this.token,
                type: 'classification'
            }, function (data) {
                data = _this.jsonObj(data);
                if (data.code === 200) {
                    resolve({
                        success: true,
                        data: data.data.data
                    });
                }
                else {
                    reject({
                        success: false,
                        msg: data.msg
                    });
                }
            });
        });
    };
    LabSDK.prototype.getLabDetail = function (labId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.get(docURL.checkInfoURL, {
                id: labId,
                pid: _this.pid,
                type: 'share'
            }, function (data) {
                data = _this.jsonObj(data);
                if (data.code === 200) {
                    if (data.data) {
                        if (!data.data.hasOwnProperty('containsVipequ') && _this.pid === PID_TYPE.PHYSICAL) {
                            data.data.containsVipequ = get(data.data, 'content.phyData.properties.data.containsVipequ', false);
                        }
                    }
                    resolve({
                        success: true,
                        data: data.data
                    });
                }
                else {
                    reject({
                        success: false,
                        msg: data.msg
                    });
                }
            });
        });
    };
    LabSDK.prototype.freshEditerScreen = function (config) {
        config.iframeWindow.postMessage({ type: MESSAGE_TYPE.PHYSICS_SDK_INTERFACE_FRESH_DATA }, '*');
    };
    LabSDK.prototype.getEditerURL = function (labId, fromOfficia) {
        if (labId === void 0) { labId = ''; }
        if (fromOfficia === void 0) { fromOfficia = false; }
        var editURL = this.editHost + "/#/" + this.editEndName + "?token=" + this.token + "&uid=" + this.uid + "&labid=" + labId;
        if (fromOfficia) {
            editURL += '&sourcefrom=1';
        }
        return editURL;
    };
    LabSDK.prototype.getPlayerURL = function (labId) {
        if (this.pid === PID_TYPE.BIOLOGICAL2 || this.pid === PID_TYPE.BIOLOGICAL1) {
            if (this.PLAYER_DEBUG) {
                return "http://res-api.nobook.cc/sw/gz/libs/biology/" + Base64.decode(labId);
            }
            return "" + host[this.pid].PLAYER_HOST + Base64.decode(labId);
        }
        var playerURL = this.playerHost + "?type=" + this.from + "&sourceid=" + labId;
        return playerURL;
    };
    LabSDK.prototype.getOfficiaIconURL = function (icon) {
        if (/^http/ig.test(icon)) {
            return icon;
        }
        if (this.pid === PID_TYPE.BIOLOGICAL1 || this.pid === PID_TYPE.BIOLOGICAL2) {
            return host[this.pid].ICON_HOST + "/" + icon;
        }
        return this.iconHost + "/assets/model/uploads/" + icon;
    };
    LabSDK.prototype.getMyIconURL = function (iconURL) {
        if (/^http/ig.test(iconURL)) {
            return iconURL;
        }
        return "" + this.iconHost + iconURL;
    };
    Object.defineProperty(LabSDK.prototype, "canDIY", {
        get: function () {
            return this._canDIY;
        },
        enumerable: true,
        configurable: true
    });
    return LabSDK;
}(SDKBase));
export { LabSDK };
