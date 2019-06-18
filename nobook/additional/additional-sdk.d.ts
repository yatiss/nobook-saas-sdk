import { SDKBase } from '../base';
export declare class AdditionalSDK extends SDKBase {
    DEBUG: boolean;
    pid: any;
    appKey: string;
    private addDocHost;
    private iconHost;
    private _saveExam_resolve;
    constructor();
    setConfig(config: {
        appKey;
        pidType;
        from;
        debugSettings?;
    }): void;
    freshPidConfig(): void;
    switchSubject(param: {
        pidType;
    }): void;
    private addListeners();
    saveExam(config: {
        iframeWindow;
        timeLength;
        examSn;
    }): Promise<{
        success;
        msg;
    }>;
    getAllLabPidScope(): string;
    getCourseList(param: {
        page?;
        limit?;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    publishExam(param: {
        examName;
        courseIds;
    }): Promise<{
        data: any;
        success: any;
        msg?: any;
    }>;
    pubLishList(): Promise<{
        data;
        success;
        msg?;
    }>;
    getCourseInfo(param: {
        courseId;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    saveExamResult(param: {
        examSn;
        courseRelationId;
        usedTime;
        steps;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    getStudentExamList(param: {
        examSn;
        courseRelationId;
        page?;
        limit?;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    getStudentExamInfo(param: {
        testId;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    getExamViewURL(param: {
        courseId;
        isexam?;
    }): string;
    protected readonly debugPlayerHost: string;
    protected readonly playerDoc: boolean;
}
