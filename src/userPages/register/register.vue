<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/user/logo.png" alt=""></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <view class="form">
            <uni-forms class="form" ref="form" :modelValue="formData" :rules="formRules">
                <view class="item-wrap">
                    <uni-forms-item class="item" name="mobile">
                        <input class="form-input" v-model="formData.mobile" type="text" placeholder="请输入手机号" />
                    </uni-forms-item>
                </view>
                <view class="item-wrap" style="padding-right: 200rpx">
                    <uni-forms-item class="item verify" name="captcha">
                        <input class="form-input" type="text" v-model="formData.captcha" placeholder="请输入验证码" />
                    </uni-forms-item>
                    <view v-if="countDown" class="btn-obtain" style="color: #7b7379">剩余{{ countDown }}s</view>
                    <button v-else class="btn-obtain" @tap="sendCaptcha">获取验证码</button>
                </view>
                <view v-if="showPassword" class="item-wrap">
                    <uni-forms-item class="item password" name="password">
                        <input
                            class="form-input"
                            type="text"
                            v-model="formData.password"
                            placeholder="设置登录密码(6-20位数字或字母)"
                    /></uni-forms-item>
                    <image
                        class="eye"
                        src="@/static/user/visible.png"
                        mode="widthFix"
                        @tap="togglePasswordShow(false)"
                    ></image>
                </view>
                <view v-else class="item-wrap">
                    <uni-forms-item class="item password" name="password">
                        <input
                            class="form-input"
                            password
                            type="text"
                            v-model="formData.password"
                            placeholder="设置登录密码(6-20位数字或字母)"
                        />
                    </uni-forms-item>
                    <image
                        class="eye"
                        src="@/static/user/invisible.png"
                        mode="widthFix"
                        @tap="togglePasswordShow(true)"
                    ></image>
                </view>
                <view class="item-wrap">
                    <uni-forms-item class="item" name="inviteCode">
                        <input
                            class="form-input"
                            type="text"
                            v-model="formData.inviteCode"
                            placeholder="请输入邀请码"
                        />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <button class="btn-register" :class="{ active: isFormAllFilled }" @click="register">注册</button>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
// import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { reactive, ref, computed, toRaw } from "vue";
import { formRules } from "./register";
import { usePassword, useCountDown } from "../form";
import { sendSms, registerCount } from "@/api/dsx/user";
import router from "@/utils/router";
const form = ref<any>(null);
const formData = reactive({
    mobile: "",
    password: "",
    captcha: "",
    inviteCode: ""
});
const { showPassword, togglePasswordShow } = usePassword();
const { countDown, startCountDown } = useCountDown();
const isFormAllFilled = computed(() => {
    return formData.mobile && formData.password && formData.captcha && formData.inviteCode;
});

async function sendCaptcha() {
    if (!form.value) return;
    await form.value.validateField(["mobile"]);
    await sendSms(formData.mobile);
    startCountDown();
}

async function register() {
    await form.value.validate();
    if (!isFormAllFilled.value) return;
    await registerCount(toRaw(formData));
    router.push("login", { query: { mobile: formData.mobile, password: formData.password } });
}
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";
@import "./register.scss";
</style>
