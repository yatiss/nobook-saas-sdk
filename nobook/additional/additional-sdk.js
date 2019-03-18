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
import { extend, get } from 'lodash';
import { host, docURL } from './additional-config';
import { SDKBase } from '../base';
import { MESSAGE_TYPE, PID_TYPE, PID_VALUE } from '../config';
var AdditionalSDK = (function (_super) {
    __extends(AdditionalSDK, _super);
    function AdditionalSDK() {
        var _this = _super.call(this) || this;
        _this.DEBUG = false;
        _this.addListeners();
        return _this;
    }
    AdditionalSDK.prototype.setConfig = function (config) {
        _super.prototype.setConfig.call(this, extend(config));
        this.addDocHost = config.DEBUG ? host.ADD_DOC_HOST_DEBUG : host.ADD_DOC_HOST;
        this.freshPidConfig();
        for (var _i = 0, _a = Object.keys(docURL); _i < _a.length; _i++) {
            var key = _a[_i];
            docURL[key] = this.addDocHost + docURL[key];
        }
        if (config.EXAM_VIEW_HOST_DEBUG) {
            this.examViewHost = config.EXAM_VIEW_HOST_DEBUG;
        }
        else {
            this.examViewHost = host.EXAM_VIEW_HOST;
        }
    };
    AdditionalSDK.prototype.freshPidConfig = function () {
        this.pid = PID_VALUE[this.pidType];
        this.iconHost = host[this.pidType].ICON_HOST;
    };
    AdditionalSDK.prototype.switchSubject = function (param) {
        this.pidType = param.pidType;
        this.freshPidConfig();
    };
    AdditionalSDK.prototype.addListeners = function () {
        var _this = this;
        window.addEventListener('message', function (event) {
            var data = event.data || {};
            switch (data.type) {
                case MESSAGE_TYPE.NOBOOK_SUBMIT_RESPONSE:
                    if (_this._saveExam_resolve) {
                        _this._saveExam_resolve(data.result);
                        _this._saveExam_resolve = null;
                    }
                    break;
                case MESSAGE_TYPE.NOBOOK_ONE_STEP:
                case MESSAGE_TYPE.NOBOOK_PRACICE_ONE_TITLE:
                case MESSAGE_TYPE.NOBOOK_PRACICE_ONE_COMPLETE:
                case MESSAGE_TYPE.NOBOOK_PRACICE_ONE_PROGRESS:
                    _this.emit(data.type, event);
                    break;
                default: break;
            }
        });
    };
    AdditionalSDK.prototype.saveExam = function (config) {
        var _this = this;
        if (this._saveExam_resolve) {
            return Promise.resolve({
                success: false,
                msg: '已有提交请求处于队列中，此次提交失败'
            });
        }
        return new Promise(function (resolve) {
            _this._saveExam_resolve = resolve;
            var data = { type: MESSAGE_TYPE.NOBOOK_SUBMIT };
            data.params = {
                time_length: config.timeLength,
                exam_sn: config.examSn
            };
            config.iframeWindow.postMessage(data, '*');
        });
    };
    AdditionalSDK.prototype.getAllLabPidScope = function () {
        var list = [];
        [
            PID_TYPE.PHYSICAL_ADD,
            PID_TYPE.CHEMICAL_ADD
        ].forEach(function (item) {
            list.push(PID_VALUE[item]);
        });
        return list.join(',');
    };
    AdditionalSDK.prototype.getCourseList = function (param) {
        var _this = this;
        param = param || {};
        return this.$get(docURL.courseListURL, {
            token: this.token,
            pid: this.pid,
            page: param.page,
            limit: param.limit
        }).then(function (obj) {
            var list = get(obj, 'data.data');
            if (Object.prototype.toString.call(list) === "[object Array]") {
                list.forEach(function (item) {
                    item.thumbnailfull = _this.iconHost + '/' + item.thumbnail;
                });
            }
            return obj;
        });
    };
    AdditionalSDK.prototype.publishExam = function (param) {
        return this.$post(docURL.publishExamURL, {
            token: this.token,
            pid: this.pid,
            exam_name: param.examName,
            course_ids: param.courseIds
        });
    };
    AdditionalSDK.prototype.pubLishList = function () {
        return this.$get(docURL.pubLishListURL, {
            token: this.token,
            pid: this.pid
        });
    };
    AdditionalSDK.prototype.getCourseInfo = function (param) {
        return this.$get(docURL.courseInfoURL, {
            token: this.token,
            pid: this.pid,
            course_id: param.courseId
        });
    };
    AdditionalSDK.prototype.saveExamResult = function (param) {
        return this.$post(docURL.saveExamResultURL, {
            token: this.token,
            pid: this.pid,
            exam_sn: param.examSn,
            course_relation_id: param.courseRelationId,
            used_time: param.usedTime,
            steps: param.steps
        });
    };
    AdditionalSDK.prototype.getStudentExamList = function (param) {
        return this.$get(docURL.studentExamListURL, {
            token: this.token,
            pid: this.pid,
            exam_sn: param.examSn,
            course_relation_id: param.courseRelationId,
            page: param.page,
            limit: param.limit
        });
    };
    AdditionalSDK.prototype.getStudentExamInfo = function (param) {
        return this.$get(docURL.studentExamInfoURL, {
            token: this.token,
            test_id: param.testId
        });
    };
    AdditionalSDK.prototype.getExamViewURL = function (param) {
        if (!param.hasOwnProperty('isexam'))
            param.isexam = 1;
        return this.examViewHost + "?relationid=" + param.courseId + "&token=" + this.token + "&isexam=" + param.isexam + "&pid=" + this.pid;
    };
    return AdditionalSDK;
}(SDKBase));
export { AdditionalSDK };
