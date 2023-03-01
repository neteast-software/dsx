<template>
    <view class="wrap">
        <view class="wel"> 请开始设置新密码 </view>
        <view class="form">
            <uni-forms ref="form" :modelValue="formData" :rules="formRules">
                <view class="item-wrap">
                    <uni-forms-item class="item" name="mobile">
                        <input class="form-input" v-model="formData.mobile" type="text" placeholder="请输入手机号" />
                        <!-- <uni-easyinput type="text" v-model="formData.phoneNumber" placeholder="请输入手机号"></uni-easyinput> -->
                    </uni-forms-item>
                </view>
                <view class="item-wrap">
                    <uni-forms-item class="item verify" name="captcha">
                        <input class="form-input" type="text" v-model="formData.captcha" placeholder="请输入验证码" />
                    </uni-forms-item>
                    <view v-if="countDown" class="btn-obtain" style="color: #7b7379">剩余{{ countDown }}s</view>
                    <button v-else class="btn-obtain" @tap="sendCaptcha">获取验证码</button>
                </view>
                <view v-if="showPassword" class="item-wrap">
                    <uni-forms-item class="item password">
                        <input
                            class="form-input"
                            type="text"
                            v-model="formData.password"
                            placeholder="设置登录密码(6-20位数字或字母)"
                        />
                    </uni-forms-item>
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
            </uni-forms>
        </view>
        <button class="btn-submit" :class="{ active: isFormAllFilled }" @click="reset">确定</button>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
import { reactive, ref, computed, toRaw } from "vue";
import { formRules } from "./modify";
import { usePassword, useCountDown } from "../form";
import { sendResetSms, resetPassword } from "@/api/dsx/user";
import router from "@/utils/router";
import { Toast } from "@/utils/uniapi";
const form = ref<any>(null);
const formData = reactive({
    mobile: "",
    captcha: "",
    password: ""
});
const { showPassword, togglePasswordShow } = usePassword();
const { countDown, startCountDown } = useCountDown();
const isFormAllFilled = computed(() => {
    return formData.mobile && formData.password && formData.captcha;
});

async function sendCaptcha() {
    if (!form.value) return;
    await form.value.validateField(["mobile"]);
    await sendResetSms(formData.mobile);
    startCountDown();
}

function resetCountDown() {
    countDown.value = 0;
}

async function reset() {
    await form.value.validate();
    if (!isFormAllFilled.value) return;
    await resetPassword(toRaw(formData));
    Toast("密码重置成功");
    resetCountDown();
    router.back();
}
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";
@import "./modify.scss";
</style>
