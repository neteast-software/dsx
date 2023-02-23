import { getUserInfo } from "@/api/dsx/user";
import { ref } from "vue";
import { baseURL } from "@/config/env";

class User {
    private _nickname = ref("");
    private _avatar = ref("");
    private _mobile = ref("");
    private _inviteNickname = ref("");
    private _inviteUserMobile = ref("");
    get nickname() {
        return this._nickname.value || "";
    }
    get avatar() {
        return this._avatar.value ? `${baseURL}${this._avatar.value}` : "";
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
    async initUserInfo() {
        const { data } = await getUserInfo();
        const { nickname, avatar, mobile, inviteNickname, inviteUserMobile } = data;
        this._nickname.value = nickname;
        this._avatar.value = avatar;
        this._mobile.value = mobile;
        this._inviteNickname.value = inviteNickname;
        this._inviteUserMobile.value = inviteUserMobile;
    }
}

export default new User();
