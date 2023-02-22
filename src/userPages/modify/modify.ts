import { reactive, ref } from "vue";
import { mobile, password, captcha, inviteCode } from "../form";
export const formRules = reactive({
    mobile,
    password,
    captcha,
    inviteCode
});