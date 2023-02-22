<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/user/logo.png" mode="widthFix"></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <uni-forms class="form" ref="form" :modelValue="formData" :rules="formRules">
            <uni-forms-item class="item" name="mobile">
                <input v-model="formData.mobile" type="text" placeholder="请输入手机号" />
            </uni-forms-item>
            <uni-forms-item v-if="showPassword" class="item relative" name="password">
                <input v-model="formData.password" type="text" placeholder="请输入密码" />
                <image
                    class="eye"
                    src="@/static/user/visible.png"
                    mode="widthFix"
                    @tap="togglePasswordShow(false)"
                ></image>
            </uni-forms-item>
            <uni-forms-item v-else class="item relative" name="password">
                <input v-model="formData.password" password type="text" placeholder="请输入密码" />
                <image
                    class="eye"
                    src="@/static/user/invisible.png"
                    mode="widthFix"
                    @tap="togglePasswordShow(true)"
                ></image>
            </uni-forms-item>
            <!-- <uni-forms-item class="item verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </uni-forms-item> -->
        </uni-forms>
        <!-- <view class="method">
            <button>密码登陆</button>
        </view> -->
        <!-- <view class="method">
            <button>忘记密码</button>
            <button>验证码登录</button>
        </view> -->
        <button class="btn-login" @click="login">登录</button>
        <view class="agree">
            <view class="hook">✔</view>
            <view>请您阅读并同意“用户协议”和“隐私政策”</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
import { reactive, ref } from "vue";
import { loginByPassword } from "@/api/dsx/user";
import storage from "@/utils/storage";
import router from "@/utils/router";
import { formRules } from "./login";
import { usePassword } from "../form";
import { onLoad } from "@dcloudio/uni-app";

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
const { showPassword, togglePasswordShow } = usePassword();
async function login() {
    if (!form.value) return;
    await form.value.validate();
    const { mobile, password } = formData;
    console.log(mobile, password);
    const { data: token } = await loginByPassword(mobile, password);
    storage.set("token", token);
    router.replace("index");
}
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
