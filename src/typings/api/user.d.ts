interface LoginByPasswordResult {
    data: string;
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
}
interface GetUserInfoResult {
    data: UserInfo;
}
