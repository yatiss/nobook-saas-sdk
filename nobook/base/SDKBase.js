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
import * as EventEmitter from 'eventemitter3';
import * as $ from 'jquery';
import { LAB_TYPE_GRADE, PID_TYPE } from '../config';
import { GLOBAL_HOST, GLOBAL_DOCURL } from '../config';
import { get } from 'lodash';
var SDKBase = (function (_super) {
    __extends(SDKBase, _super);
    function SDKBase() {
        var _this = _super.call(this) || this;
        _this.DOC_DEBUG = false;
        _this.token = null;
        return _this;
    }
    SDKBase.prototype.setConfig = function (config) {
        this.debugSettings = config.debugSettings || {};
        this.DOC_DEBUG = get(config, 'debugSettings.DOC_DEBUG', false);
        this.appKey = config.appKey;
        this.pidType = config.pidType;
        this.docHost = this.DOC_DEBUG ? GLOBAL_HOST.DOC_HOST_DEBUG : GLOBAL_HOST.DOC_HOST;
        for (var _i = 0, _a = Object.keys(GLOBAL_DOCURL); _i < _a.length; _i++) {
            var key = _a[_i];
            GLOBAL_DOCURL[key] = this.docHost + GLOBAL_DOCURL[key];
        }
    };
    SDKBase.prototype.login = function (param) {
        var _this = this;
        this.nickname = param.nickname;
        var allNeedParam = {
            appKey: this.appKey,
            uniqueId: param.uniqueId,
            timestamp: param.timestamp,
            sign: param.sign,
            nickname: param.nickname,
            pidScope: param.pidScope,
            usertype: 0
        };
        return this.$post(GLOBAL_DOCURL.loginURL, allNeedParam).then(function (obj) {
            var dataObj = obj.data;
            _this.token = dataObj.token;
            _this.uid = dataObj.userinfo.userid;
            return obj;
        });
    };
    SDKBase.prototype.logout = function () {
        return this.$post(GLOBAL_DOCURL.logoutURL, { token: this.token });
    };
    SDKBase.prototype.$get = function (url, param) {
        return this.$server({
            method: 'get',
            url: url,
            param: param
        });
    };
    SDKBase.prototype.$post = function (url, param) {
        return this.$server({
            method: 'post',
            url: url,
            param: param
        });
    };
    SDKBase.prototype.$server = function (param) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $[param.method](param.url, param.param, function (dataStr, status) {
                if (status === 'success') {
                    var data = _this.jsonObj(dataStr);
                    if (data.code === 0) {
                        var dataObj = data.data;
                        resolve({
                            success: true,
                            data: dataObj
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
    SDKBase.prototype.jsonObj = function (data) {
        return Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data;
    };
    SDKBase.prototype.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    Object.defineProperty(SDKBase.prototype, "grade", {
        get: function () {
            return LAB_TYPE_GRADE[this.pidType];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDKBase.prototype, "xkType", {
        get: function () {
            if (this.isPhysical()) {
                return 'PHYSICAL';
            }
            else if (this.isChemical()) {
                return 'CHEMICAL';
            }
            else if (this.isBiological()) {
                return 'BIOLOGICAL';
            }
            else if (this.isPhysicalAdd()) {
                return 'PHYSICAL_ADD';
            }
            else if (this.isChemicalAdd()) {
                return 'CHEMICAL_ADD';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    SDKBase.prototype.isPhysical = function () {
        return this.pidType === PID_TYPE.PHYSICAL1 || this.pidType === PID_TYPE.PHYSICAL2;
    };
    SDKBase.prototype.isChemical = function () {
        return this.pidType === PID_TYPE.CHEMICAL1 || this.pidType === PID_TYPE.CHEMICAL2;
    };
    SDKBase.prototype.isBiological = function () {
        return this.pidType === PID_TYPE.BIOLOGICAL1 || this.pidType === PID_TYPE.BIOLOGICAL2;
    };
    SDKBase.prototype.isPhysicalAdd = function () {
        return this.pidType === PID_TYPE.PHYSICAL_ADD;
    };
    SDKBase.prototype.isChemicalAdd = function () {
        return this.pidType === PID_TYPE.CHEMICAL_ADD;
    };
    Object.defineProperty(SDKBase.prototype, "xkDebugSettings", {
        get: function () {
            return this.debugSettings[this.xkType];
        },
        enumerable: true,
        configurable: true
    });
    return SDKBase;
}(EventEmitter));
export { SDKBase };
