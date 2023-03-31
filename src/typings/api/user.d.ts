interface LoginByPasswordResult {
    data: string;
}
interface BindAccountResult {
    data: {
        openid: string;
        token: string;
    };
}
interface UserInfo {
    avatar: string;
    mobile: string;
    nickname: string;
    username: string;
    mobile: string;
    integral: number;
    inviteCode: string;
    inviteNickname: string;
    inviteUserMobile: string;
    giftsPoints: number;
    unreadMsgCount: number;
    agencyTime: string;
    agencyStatus: string;
}
interface GetUserInfoResult {
    data: UserInfo;
}
