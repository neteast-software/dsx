<template>
    <view class="wrap">
        <view class="wel">欢迎您</view>
        <view class="bind">进行绑定签约抖音账号流程</view>
        <uni-forms class="form" ref="form" :modelValue="formData" :rules="formRules">
            <uni-forms-item class="item" name="phoneNumber">
                <input v-model="formData.phoneNumber" type="text" placeholder="请输入手机号" />
                <!-- <uni-easyinput type="text" v-model="formData.phoneNumber" placeholder="请输入手机号"></uni-easyinput> -->
            </uni-forms-item>
            <uni-forms-item class="item verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </uni-forms-item>
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
                errorMessage: "请输入手机号"
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
.wel {
    margin-top: 104rpx;
    color: $uni-text-color;
    font-size: 56rpx;
    line-height: 76rpx;
}
.bind {
    margin-top: 14rpx;
    font-size: 40rpx;
    line-height: 76rpx;
    color: $uni-text-color-placeholder;
}

.btn-next {
    margin: 57rpx auto;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    font-size: 36rpx;
    text-align: center;
    line-height: 104rpx;
    border-radius: 783rpx;
    z-index: 1;
    width: 400rpx;
}
.picture {
    position: relative;
    height: 262rpx;
    background: #e6f1fc;
    border-radius: 44rpx;
    margin-top: 172rpx;
}
.img-text {
    position: absolute;
    left: 60rpx;
    top: 40rpx;
    width: 150rpx;
}
.picture view {
    position: absolute;
    top: 104rpx;
    left: 60rpx;
    font-size: 28rpx;
    color: $uni-text-color;
}
.picture button {
    position: absolute;
    top: 172rpx;
    left: 60rpx;
    width: 134rpx;
    height: 50rpx;
    font-size: 24rpx;
    border-radius: 448px;
    background: #037beb;
    color: $uni-text-color-inverse;
    line-height: 50rpx;
}
.img-logo {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 262rpx;
}
</style>
