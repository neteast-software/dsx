import http from "./http";

// 密码登录
export function loginByPassword(mobile: string, password: string) {
    return http.post<LoginByPasswordResult>("/mobile/login", { mobile, password });
}

// 发送短信验证码
export function sendSms(mobile: string) {
    return http.get("/mobile/sendSms", { mobile });
}

// 用户注册
interface RegisterParams {
    mobile: string;
    password: string;
    captcha: string;
    inviteCode: string;
}
export function registerCount(params: RegisterParams) {
    return http.post("/mobile/register", params);
}
