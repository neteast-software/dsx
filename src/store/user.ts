import { getUserInfo } from "@/api/dsx/user";
import { ref, reactive, toRaw } from "vue";
import storage from "@/utils/storage";
import { getCustomerQrcode } from "@/api/dsx/business";

class User {
    private _userInfo = reactive<UserInfo>({
        nickname: "",
        username: "",
        avatar: "",
        mobile: "",
        inviteNickname: "",
        inviteUserMobile: "",
        integral: 0,
        inviteCode: "",
        giftsPoints: 0,
        unreadMsgCount: 0,
        agencyStatus: "",
        agencyTime: "",
        vipLvl: 0,
        syntheticMagicIntegrals: 0
    });
    private _qrCode = ref("");
    private _token = ref("");
    get logined() {
        return !!this._userInfo.username;
    }
    get agencyStatus(): string {
        return this._userInfo.agencyStatus || "";
    }
    get agencyTime(): string {
        return this._userInfo.agencyTime || "";
    }
    get nickname() {
        return this._userInfo.nickname || "";
    }
    get avatar() {
        return this._userInfo.avatar || "";
    }
    get mobile() {
        return this._userInfo.mobile || "";
    }
    get inviteNickname() {
        return this._userInfo.inviteNickname || "";
    }
    get inviteUserMobile() {
        return this._userInfo.inviteUserMobile || "";
    }
    get integral() {
        return this._userInfo.integral || 0;
    }
    get inviteCode() {
        return this._userInfo.inviteCode || "";
    }
    get giftsPoints() {
        return this._userInfo.giftsPoints || 0;
    }
    get unreadMsgCount() {
        return this._userInfo.unreadMsgCount || 0;
    }
    get vipLvl() {
        return this._userInfo.vipLvl || 0;
    }
    get token() {
        return this._token.value || storage.get("token") || "";
    }
    set token(token: string) {
        this._token.value = token;
    }
    get qrCode() {
        return this._qrCode.value || "";
    }
    get syntheticMagicIntegrals() {
        return this._userInfo.syntheticMagicIntegrals || 0;
    }
    async initUserInfo() {
        const { data } = await getUserInfo();
        Object.keys(toRaw(this._userInfo)).forEach((key) => {
            this._userInfo[key] = data[key];
        });
        const { data: qrCode } = await getCustomerQrcode();
        this._qrCode.value = qrCode;
    }
}

export default new User();
