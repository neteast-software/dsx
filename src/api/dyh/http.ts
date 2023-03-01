import Requestor from "@/utils/requestor";
import { Toast } from "@/utils/uniapi";

const dyh = new Requestor({
    baseURL: "https://service.dyhculture.com",
    timeout: 30000
});
dyh.interceptor.response = (response) => {
    const res = response.data as ResponseData;
    const { code, msg, ...ret } = res;
    let result;
    switch (code) {
        case 20000:
            result = ret;
            break;
        default:
            Toast(msg || "未知错误");
            result = Promise.reject(msg);
            break;
    }
    return result;
};
export default dyh;
