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
interface RegisterParams extends ResetParams {
    inviteCode: string;
}
export function registerCount(params: RegisterParams) {
    return http.post("/mobile/register", params);
}

// 重置密码
interface ResetParams {
    mobile: string;
    password: string;
    captcha: string;
}
export function resetPassword(params: ResetParams) {
    return http.post("/mobile/resetPassword", params);
}

// 重置密码短信发送
export function sendResetSms(mobile: string) {
    return http.get("/mobile/forgetPasswordSms", { mobile });
}

// 登出
export function logOut() {
    return http.get("/mobile/logout");
}

// 修改用户昵称和头像
interface UpdateUserInfoParams {
    nickname?: string;
    avatar?: string;
}
export function updateUserInfo(params: UpdateUserInfoParams) {
    return http.put("/mobile/my/updateInfo", params);
}

// 获取个人信息
export function getUserInfo() {
    return http.get<GetUserInfoResult>("/mobile/my/myInfo");
}
