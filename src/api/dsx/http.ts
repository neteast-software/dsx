import Requestor from "@/utils/requestor";
import storage from "@/utils/storage";
const http = new Requestor({
    baseURL: "/api",
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
    console.log("响应", response);
    const res = response.data as ResponseData;
    const { code, msg, ...ret } = res;
    let result;
    switch (code) {
        case 200:
            result = ret;
            break;
        case 401:
            break;
        default:
            break;
    }
    return result;
};
export default http;
