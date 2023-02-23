import { getUserInfo } from "@/api/dsx/user";
import { ref } from "vue";
import { baseURL } from "@/config/env";

class User {
    private _nickname = ref("");
    private _avatar = ref("");
    private _mobile = ref("");
    get nickname() {
        return this._nickname.value || "";
    }
    get avatar() {
        return this._avatar.value ? `${baseURL}${this._avatar.value}` : "";
    }
    get mobile() {
        return this._mobile.value || "";
    }
    async initUserInfo() {
        const { data } = await getUserInfo();
        const { nickname, avatar, mobile } = data;
        this._nickname.value = nickname;
        this._avatar.value = avatar;
        this._mobile.value = mobile;
    }
}

export default new User();
