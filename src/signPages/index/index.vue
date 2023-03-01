<template>
    <view class="wrap">
        <view class="wel">欢迎您</view>
        <view class="bind">进行绑定签约抖音账号流程</view>
        <uni-forms class="form" ref="form" :modelValue="formData" :rules="formRules">
            <view class="item-wrap">
                <uni-forms-item class="item" name="mobile">
                    <input v-model="formData.mobile" type="text" placeholder="请输入手机号" />
                </uni-forms-item>
            </view>
            <view class="item-wrap">
                <uni-forms-item class="item verify" name="captcha">
                    <input type="text" v-model="formData.captcha" placeholder="请输入验证码" />
                </uni-forms-item>
                <view v-if="countDown" class="btn-obtain" style="color: #7b7379">剩余{{ countDown }}s</view>
                <button v-else class="btn-obtain" @tap="sendCaptcha">获取验证码</button>
            </view>
        </uni-forms>
        <view class="btn-next" @click="register">下一步</view>
        <view class="picture">
            <img class="img-text" src="@/static/signIndex/text.png" alt="" />
            <view>绑定签约抖音账号教程</view>
            <button>点击查看</button>
            <img class="img-logo" src="@/static/signIndex/logo.png" alt="" />
        </view>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
import uniEasyinput from "@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue";
import { reactive, ref, computed, toRaw } from "vue";
import { formRules } from "./index";
import { usePassword, useCountDown } from "../form";
import { sendSms, registerCount } from "@/api/dsx/user";
import router from "@/utils/router";
const formData = reactive({
    mobile: "",
    captcha: "",
    password: "",
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
const form = ref<any>(null);

async function register() {
    await form.value.validate();
    if (!isFormAllFilled.value) return;
    await registerCount(toRaw(formData));
    router.push("login", { query: { mobile: formData.mobile, password: formData.password } });
}
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";
@import "./index.scss";
</style>
