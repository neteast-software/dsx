<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/user/logo.png" alt=""></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <view class="form">
            <view class="tel"> <input type="text" placeholder="请输入手机号" /> </view>
            <view class="verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </view>
            <view> <input type="text" placeholder="设置登录密码(6-20位数字或字母)" /> </view>
            <view> <input type="text" placeholder="请输入邀请码" /> </view>
        </view>
        <view class="btn-register">注册</view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
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
