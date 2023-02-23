import Requestor from "@/utils/requestor";
import storage from "@/utils/storage";
import { Toast } from "@/utils/uniapi";
import { baseURL } from "@/config/env";
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
http.interceptor.response = (response) => {
    const res = response.data as ResponseData;
    const { code, msg, ...ret } = res;
    let result;
    switch (code) {
        case 200:
            result = ret;
            break;
        case 401:
            break;
        case 500:
            Toast(msg || "服务器错误");
            result = Promise.reject(msg);
            break;
        default:
            break;
    }
    return result;
};
export default http;
