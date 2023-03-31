interface UploadFileResult {
    fileName: string;
    newFileName: string;
    originalFileName: string;
    url: string;
}
interface ResponseData {
    code?: number;
    msg?: string;
    [key: string]: any;
}
interface WxLoginResult {
    data: {
        openid: string;
        sessionkey: string;
        token: string | null;
    };
}
