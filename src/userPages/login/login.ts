// import { isMobile, isPassword } from "@/utils/validator";
import { mobile, password } from "../form";
import { reactive, ref } from "vue";
export const formRules = reactive({
    mobile,
    password
});
