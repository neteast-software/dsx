import http from "./http";
import { APPID } from "@/config/env";
import storage from "@/utils/storage";
// 上传
export function uploadFile(file: string) {
    return http.upload<UploadFileResult>("/mobile/common/upload", file);
}

// 微信登录
export function wxLogin(code: string) {
    const p = http.post<WxLoginResult>(`/wechat/login/${APPID.WEAPP}/${code}`);
    p.then((res) => {
        const { openid } = res.data;
        storage.set("openid", openid);
    });
    return p;
}
