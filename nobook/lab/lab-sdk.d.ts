import { SDKBase } from '../base';
export declare class LabSDK extends SDKBase {
    EDITER_DEBUG: boolean;
    PLAYER_DEBUG: boolean;
    private editHost;
    private playerHost;
    private _saveData_resolve;
    private editEndName;
    private iconHost;
    private _canDIY;
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
        EDIT_HOST_DEBUG;
    }): void;
    private freshPidConfig();
    private addListeners();
    switchSubject(param: {
        pid;
    }): void;
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
    readonly canDIY: boolean;
}
