<template>
    <view class="wrap">
        <view class="wel"> 请开始设置新密码 </view>
        <view class="form">
            <view class="tel"> <input type="tel" placeholder="请输入手机号" /> </view>
            <view class="verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </view>
            <view class="password"> <input password type="text" placeholder="设置登录密码(6-20位数字或字母)" /> </view>
        </view>
        <view class="btn-submit">确定</view>
    </view>
</template>

<script setup lang="ts"></script>

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
.password::after {
    content: "";
    top: 50%;
    right: 32rpx;
    transform: translateY(-50%);
    background: url("@/static/user/invisible.png") no-repeat bottom right / 56rpx 56rpx;
    // background: url("@/static/user/visible.png") no-repeat bottom right / 56rpx 56rpx;
    width: 56rpx;
    height: 56rpx;
    position: absolute;
    z-index: 2;
}
.btn-submit {
    margin-top: 228rpx;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-inverse;
    // background: $uni-color-primary;
    background: #9e8eaf;
    border-radius: 454rpx;
    padding: 25rpx 290rpx;
}
</style>
