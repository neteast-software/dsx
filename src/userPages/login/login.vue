<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/user/logo.png" mode="widthFix"></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <view class="form">
            <uni-forms ref="form" :modelValue="formData" :rules="formRules">
                <view class="item-wrap">
                    <uni-forms-item class="item" name="mobile">
                        <input class="form-input" v-model="formData.mobile" type="text" placeholder="请输入手机号" />
                    </uni-forms-item>
                </view>
                <view v-if="showPassword" class="item-wrap">
                    <uni-forms-item class="item relative" name="password">
                        <input class="form-input" v-model="formData.password" type="text" placeholder="请输入密码" />
                    </uni-forms-item>
                    <image
                        class="eye"
                        src="@/static/user/visible.png"
                        mode="widthFix"
                        @tap="togglePasswordShow(false)"
                    ></image>
                </view>
                <view v-else class="item-wrap">
                    <uni-forms-item class="item relative" name="password">
                        <input
                            class="form-input"
                            v-model="formData.password"
                            password
                            type="text"
                            placeholder="请输入密码"
                        />
                    </uni-forms-item>
                    <image
                        class="eye"
                        src="@/static/user/invisible.png"
                        mode="widthFix"
                        @tap="togglePasswordShow(true)"
                    ></image>
                </view>
                <!-- <uni-forms-item class="item verify">
                    <input type="text" placeholder="请输入验证码" />
                    <button class="btn-obtain">获取验证码</button>
                </uni-forms-item> -->
            </uni-forms>
        </view>
        <!-- <view class="method">
            <button>密码登陆</button>
        </view> -->
        <view class="method">
            <button @tap="toModify">忘记密码?</button>
            <!-- <button>验证码登录</button> -->
        </view>
        <button class="btn-login" @click="login">登录</button>
        <view class="agree flex-center">
            <view>
                <uni-icons
                    v-if="isAgree"
                    type="checkbox-filled"
                    size="32"
                    color="#EA3598"
                    @tap="toogleAgree(false)"
                ></uni-icons>
                <uni-icons v-else type="checkbox-filled" size="32" color="#cbbfcb" @tap="toogleAgree(true)"></uni-icons>
            </view>
            <view class="agreement flex-center"
                >请您阅读并同意<view class="font-bold" @tap="toServieProtocol">“用户协议”</view>和<view
                    class="font-bold"
                    @tap="toPrivacyProtocol"
                    >“隐私政策”</view
                ></view
            >
        </view>
        <view class="router" @tap="toRegister">
            去注册
            <image class="router-icon" src="@/assets/icons/go.png" mode="widthFix"></image>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
import { reactive, ref } from "vue";
import { loginByPassword, bindAccount } from "@/api/dsx/user";
import storage from "@/utils/storage";
import router from "@/utils/router";
import { formRules } from "./login";
import { usePassword } from "../form";
import { onLoad } from "@dcloudio/uni-app";
import { Toast } from "@/utils/uniapi";
import user from "@/store/user";
import { useDebounceFn } from "@vueuse/shared";
const form = ref<any>(null);
const formData = reactive({
    mobile: "",
    password: ""
});
function initFormData(options: AnyObject = {}) {
    const { mobile = "", password = "" } = options || {};
    formData.mobile = mobile;
    formData.password = password;
}
onLoad((options) => {
    initFormData(options);
});
function toogleAgree(flag: boolean) {
    isAgree.value = flag;
}
const isAgree = ref(false);
const { showPassword, togglePasswordShow } = usePassword();
const login = useDebounceFn(async () => {
    if (!isAgree.value) {
        Toast("请阅读协议并同意");
        return;
    }
    if (!form.value) return;
    await form.value.validate();
    const { mobile, password } = formData;
    let token = "";
    // #ifdef APP-PLUS
    const { data: appToken } = await loginByPassword(mobile, password);
    token = appToken;
    // #endif
    // #ifdef MP-WEIXIN
    const openid = storage.get<string>("openid");
    const { data } = await bindAccount(mobile, password, openid);
    const { token: wxToken } = data;
    token = wxToken;
    // #endif
    storage.set("token", token);
    user.initUserInfo();
    router.switchTab("index");
}, 300);

function toRegister() {
    router.push("register");
}
function toModify() {
    router.push("modify");
}
function toServieProtocol() {
    router.push("serviceProtocol");
}
function toPrivacyProtocol() {
    router.push("privacyProtocol");
}
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
