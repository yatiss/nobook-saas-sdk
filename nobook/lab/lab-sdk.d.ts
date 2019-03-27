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
        appKey;
        pidType;
        from;
        DEBUG?;
        EDITER_DEBUG?;
        PLAYER_DEBUG?;
        PLAYER_HOST_DEBUG?;
        EDIT_HOST_DEBUG?;
    }): void;
    private freshPidConfig();
    private addListeners();
    switchSubject(param: {
        pidType;
    }): void;
    deleteData(param: {
        labId;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    saveData(config: {
        iframeWindow;
        title?;
    }): Promise<{
        success;
        msg;
    }>;
    renameData(param: {
        labId;
        newTitle;
    }): Promise<{
        data;
        success;
        msg?;
    }>;
    getChapter(): Promise<{
        success;
        data;
        msg?;
    }>;
    clearRedis(): Promise<{
        success;
        data;
        msg?;
    }>;
    getClassificationsList(): Promise<{
        success;
        data;
        msg?;
    }>;
    getResourcesByCategory(param: {
        categoryId;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    searchDIY(param: {
        keyword;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    searchResources(param: {
        keyword;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    getResourcesByChapter(param: {
        textbookId;
        versionId;
        chapterId;
        sectionId;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    getDIYLabList(param: {
        page?;
        perPage?;
    }): Promise<{
        success;
        data;
        page?;
        perPage?;
        total?;
        msg?;
    }>;
    getInfoResources(param: {
        labId;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    getInfoDIY(param: {
        labId;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    shareDIY(param: {
        uniqueId;
        labId;
    }): Promise<{
        success;
        data;
        msg?;
    }>;
    freshEditerScreen(config: {
        iframeWindow;
    }): void;
    getEditerURL(config: {
        labId?;
        fromOfficia?;
    }): string;
    getPlayerURL(config: {
        labId;
    }): string;
    getOfficiaIconURL(icon: any): string;
    getDIYIconURL(iconURL: any): string;
    getAllLabPidScope(): string;
    readonly canDIY: boolean;
    isPhysical(): boolean;
    isChemical(): boolean;
    isBiological(): boolean;
    readonly grade: number;
}
