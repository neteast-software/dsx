<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/login/logo.png" alt=""></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <!-- <view class="form">
            <view class="tel"> <input type="text" placeholder="请输入手机号" /> </view>
            <view class="verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </view>
            <view> <input type="text" placeholder="设置登录密码(6-20位数字或字母)" /> </view>
            <view> <input type="text" placeholder="请输入邀请码" /> </view>
        </view> -->
        <uni-forms ref="form" :modelValue="formData" :rules="formRules">
            <uni-forms-item class="form-item" name="phoneNumber">
                <input v-model="formData.phoneNumber" class="form-item__input" type="text" placeholder="请输入手机号" />
                <!-- <uni-easyinput type="text" v-model="formData.phoneNumber" placeholder="请输入手机号"></uni-easyinput> -->
            </uni-forms-item>
        </uni-forms>
        <button class="btn-register" @click="register">注册</button>
    </view>
</template>

<script setup lang="ts">
import uniForms from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import uniFormsItem from "@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue";
import uniEasyinput from "@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue";
import { reactive, ref } from "vue";
const formData = reactive({
    phoneNumber: "",
    verifyCode: "",
    password: "",
    inviteCode: ""
});
const formRules = reactive({
    phoneNumber: {
        rules: [
            {
                required: true,
                errorMessage: "请输入姓名"
            },
            {
                minLength: 3,
                maxLength: 5,
                errorMessage: "姓名长度在 {minLength} 到 {maxLength} 个字符"
            }
        ]
    }
});
const form = ref<any>(null);
function register() {
    console.log("表单元素", form.value);
    form.value.validate();
    console.log(formData);
}
</script>

<style scoped lang="scss">
.form-item {
    width: 100%;
    height: 98rpx;
    border-radius: 999rpx;
    background: #f5f5f5;
}
.form-item__input {
    background-color: transparent;
    height: 100%;
}
.wel {
    position: relative;
    margin-top: 70rpx;
    image {
        width: 76rpx;
        height: 76rpx;
    }
    .text {
        position: absolute;
        top: 0;
        left: 98rpx;
        line-height: 76rpx;
        font-size: 44rpx;
        color: $uni-text-color;
        // font-weight: bold;
    }
}
.btn-register {
    margin-top: 334rpx;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-inverse;
    // background: $uni-color-primary;
    background: #9e8eaf;
    border-radius: 454rpx;
    padding: 25rpx 290rpx;
}
</style>
