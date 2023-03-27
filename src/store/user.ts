import { getUserInfo } from "@/api/dsx/user";
import { ref } from "vue";
import { baseURL } from "@/config/env";

class User {
    private _nickname = ref("");
    private _avatar = ref("");
    private _mobile = ref("");
    private _inviteNickname = ref("");
    private _inviteUserMobile = ref("");
    private _integral = ref(0);
    private _inviteCode = ref("");
    private _giftsPoints = ref(0);
    private _unreadMsgCount = ref(0);
    private _agencyStatus = ref<string>("");
    private _agencyTime = ref<string>("");
    get logined() {
        return !!this._nickname.value;
    }
    get agencyStatus(): string {
        return this._agencyStatus.value || "";
    }
    get agencyTime(): string {
        return this._agencyTime.value || "";
    }
    get nickname() {
        return this._nickname.value || "";
    }
    get avatar() {
        return this._avatar.value || "";
    }
    get mobile() {
        return this._mobile.value || "";
    }
    get inviteNickname() {
        return this._inviteNickname.value || "";
    }
    get inviteUserMobile() {
        return this._inviteUserMobile.value || "";
    }
    get integral() {
        return this._integral.value || 0;
    }
    get inviteCode() {
        return this._inviteCode.value || "";
    }
    get giftsPoints() {
        return this._giftsPoints.value || 0;
    }
    get unreadMsgCount() {
        return this._unreadMsgCount.value || 0;
    }
    async initUserInfo() {
        const { data } = await getUserInfo();
        const {
            nickname,
            agencyStatus,
            agencyTime,
            avatar,
            mobile,
            inviteNickname,
            inviteUserMobile,
            integral,
            inviteCode,
            giftsPoints,
            unreadMsgCount
        } = data;

        this._agencyStatus.value = agencyStatus;
        this._agencyTime.value = agencyTime;
        this._nickname.value = nickname;
        this._avatar.value = avatar;
        this._mobile.value = mobile;
        this._inviteNickname.value = inviteNickname;
        this._inviteUserMobile.value = inviteUserMobile;
        this._integral.value = integral;
        this._inviteCode.value = inviteCode;
        this._giftsPoints.value = giftsPoints;
        this._unreadMsgCount.value = unreadMsgCount;
    }
}

export default new User();
