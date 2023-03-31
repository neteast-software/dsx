import Requestor from "@/utils/requestor";
import storage from "@/utils/storage";
import { Toast } from "@/utils/uniapi";
import { baseURL } from "@/config/env";
import router from "@/utils/router";
import session from "@/weapp/session";
import type { RequestConfigWithUrl } from "@/utils/requestor";
const http = new Requestor({
    baseURL,
    timeout: 30000
});
http.interceptor.request = (config) => {
    const token = storage.get("token");
    if (token && config.header) {
        config.header.AppAuthorization = token;
    }
    return config;
};
http.interceptor.response = async (response, requestConfig) => {
    const res = response.data as ResponseData;
    const { code, msg, ...ret } = res;
    let result;
    switch (code) {
        case 200:
            result = ret;
            break;
        case 401:
            // #ifdef MP-WEIXIN
            handleWeapp401(requestConfig);
            // #endif
            // #ifdef APP-PLUS
            result = Promise.reject(msg);
            router.reLaunch("login");
            // #endif
            break;
        case 500:
            Toast(msg || "服务器错误");
            result = Promise.reject(msg);
            break;
        case 700:
            result = Promise.reject("retry");
            break;
        default:
            Toast(msg || "未知错误");
            result = Promise.reject(msg);
            break;
    }
    return result;
};

async function handleWeapp401(requestConfig: RequestConfigWithUrl) {
    const { data } = await session.refreshLogin();
    const { token } = data;
    if (!token) {
        router.reLaunch("login");
        return Promise.reject("静默登录失败");
    }
    storage.set("token", token);
    return await http.request(requestConfig);
}
export default http;
