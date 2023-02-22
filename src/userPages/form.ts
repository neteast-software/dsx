import { isMobile, isPassword } from "@/utils/validator";
import { ref } from "vue";
export const mobile = {
    rules: [
        {
            required: true,
            errorMessage: "请输入手机号"
        },
        {
            validateFunction: (rule, value: string) => isMobile(value),
            errorMessage: "请输入正确的手机号"
        }
    ]
};

export const password = {
    rules: [
        {
            required: true,
            errorMessage: "请输入密码"
        },
        {
            validateFunction: (rule, value: string) => isPassword(value),
            errorMessage: "密码应为6-20位数字或字母"
        }
    ]
};

export const captcha = {
    rules: [
        {
            required: true,
            errorMessage: "请输入验证码"
        }
    ]
};

export const inviteCode = {
    rules: [
        {
            required: true,
            errorMessage: "请输入邀请码"
        }
    ]
};

export function usePassword() {
    const showPassword = ref(false);
    function togglePasswordShow(show: boolean) {
        showPassword.value = show;
    }
    return {
        showPassword,
        togglePasswordShow
    };
}

export function useCountDown() {
    const countDown = ref(0);
    function startCountDown() {
        countDown.value = 60;
        const timer = setInterval(() => {
            countDown.value--;
            if (countDown.value <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }
    return {
        countDown,
        startCountDown
    };
}
