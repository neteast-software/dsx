<template>
    <view class="wrap">
        <view class="wel"> 请开始设置新密码 </view>
        <uni-forms class="form" ref="form" :modelValue="formData" :rules="formRules">
            <uni-forms-item class="item" name="phoneNumber">
                <input v-model="formData.phoneNumber" type="text" placeholder="请输入手机号" />
                <!-- <uni-easyinput type="text" v-model="formData.phoneNumber" placeholder="请输入手机号"></uni-easyinput> -->
            </uni-forms-item>
            <uni-forms-item class="item verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </uni-forms-item>
            <uni-forms-item class="item password">
                <input password type="text" placeholder="设置登录密码(6-20位数字或字母)" />
                <img src="@/static/user/invisible.png" alt="" />
            </uni-forms-item>
        </uni-forms>
        <button class="btn-submit" @click="register">确定</button>
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
    position: relative;
    margin-top: 120rpx;
    line-height: 76rpx;
    font-size: 44rpx;
    color: $uni-text-color;
    // font-weight: bold;
}
.password {
    position: relative;
}
.password img {
    position: absolute;
    top: 50%;
    right: 32rpx;
    transform: translateY(-50%);
    width: 56rpx;
    height: 56rpx;

    z-index: 2;
}
.btn-submit {
    margin-top: 228rpx;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-inverse;
    // background: $uni-color-primary;
    background: #9e8eaf;
    border-radius: 454rpx;
    height: 98rpx;
    line-height: 98rpx;
}
</style>
