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
import { PID_TYPE } from '../config';
import { GLOBAL_HOST, GLOBAL_DOCURL } from '../config';
import { extend } from 'lodash';
var SDKBase = (function (_super) {
    __extends(SDKBase, _super);
    function SDKBase() {
        var _this = _super.call(this) || this;
        _this.DEBUG = false;
        _this.token = null;
        return _this;
    }
    SDKBase.prototype.setConfig = function (config) {
        this.docHost = this.DEBUG ? GLOBAL_HOST.DOC_HOST_DEBUG : GLOBAL_HOST.DOC_HOST;
        for (var _i = 0, _a = Object.keys(GLOBAL_DOCURL); _i < _a.length; _i++) {
            var key = _a[_i];
            GLOBAL_DOCURL[key] = this.docHost + GLOBAL_DOCURL[key];
        }
    };
    SDKBase.prototype.login = function (param) {
        var _this = this;
        var allNeedParam = extend({
            pid: this.pid,
            appid: this.appid
        }, param);
        return new Promise(function (resolve, reject) {
            if (_this.pid === PID_TYPE.BIOLOGICAL1 || _this.pid === PID_TYPE.BIOLOGICAL2) {
            }
            $.get(GLOBAL_DOCURL.loginURL, allNeedParam, function (data, status) {
                if (status === 'success') {
                    data = _this.jsonObj(data);
                    if (data.code === 200) {
                        _this.token = data.data.token;
                        _this.uid = data.data.uid;
                        var reData_1 = data.data;
                        _this._secondLogin().then(function (data) {
                            if (data.code === 200) {
                                resolve({
                                    success: true,
                                    data: reData_1
                                });
                            }
                            else {
                                reject({
                                    success: false,
                                    msg: data.msg
                                });
                            }
                        }).catch(function (err) {
                            resolve({
                                success: true,
                                data: reData_1
                            });
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
    SDKBase.prototype._secondLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                data: {
                    token: _this.token
                },
                async: false,
                url: GLOBAL_DOCURL.loginSecondURL,
                dataType: "jsonp",
                jsonp: "jsonpcallback",
                crossDomain: true,
                success: function (data, status) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    };
    SDKBase.prototype.logout = function (param) {
        return new Promise(function (resolve, reject) { });
    };
    SDKBase.prototype.jsonObj = function (data) {
        return Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data;
    };
    return SDKBase;
}(EventEmitter));
export { SDKBase };
