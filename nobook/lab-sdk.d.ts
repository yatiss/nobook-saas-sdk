import * as EventEmitter from 'eventemitter3';
export declare class LabSDK extends EventEmitter {
    private _canDIY;
    private DEBUG;
    private EDITER_DEBUG;
    private PLAYER_DEBUG;
    uid: string;
    appid: string;
    from: string;
    pid: string;
    private docHost;
    private editHost;
    private playerHost;
    private token;
    private _saveData_resolve;
    private editEndName;
    private iconHost;
    constructor();
    setConfig(config: {
        appid;
        pid;
        from;
        DEBUG?;
        EDITER_DEBUG?;
        PLAYER_DEBUG?;
        EDIT_HOST_DEBUG_PORT?;
        PLAYER_HOST_DEBUG_PORT?;
        PLAYER_HOST_DEBUG?;
    }): void;
    private freshPidConfig();
    private addListeners();
    login(param: {
        uid;
        sign;
        timestamp;
        nickname;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    switchSubject(param: {
        pid;
    }): void;
    private _secondLogin();
    sendFeedback(param: {
        title;
        content;
        source;
        pics?;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    deleteData(labId: string): Promise<{
        success;
        msg;
    }>;
    saveData(config: {
        iframeWindow;
        title?;
    }): Promise<{
        success;
        msg;
    }>;
    renameData(labId: string, title: string): Promise<{
        success;
        msg?;
    }>;
    getChapter(): Promise<{
        success;
        data;
        msg?;
    }>;
    getClassificationsList(): Promise<{
        success;
        data;
        msg?;
    }>;
    getLabList(typename: string): Promise<{
        success;
        data;
        msg?;
    }>;
    getMyLabList(): Promise<{
        success;
        data;
        msg?;
    }>;
    getLabDetail(labId: string): Promise<{
        success;
        data;
        msg?;
    }>;
    freshEditerScreen(config: {
        iframeWindow;
    }): void;
    getEditerURL(labId?: string, fromOfficia?: boolean): string;
    getPlayerURL(labId: string): string;
    getOfficiaIconURL(icon: any): string;
    getMyIconURL(iconURL: any): string;
    private jsonObj(data);
    readonly canDIY: boolean;
}
