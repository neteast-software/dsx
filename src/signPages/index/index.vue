<template>
    <view class="wrap">
        <view class="wel">欢迎您</view>
        <view class="bind">进行绑定签约抖音账号流程</view>
        <view class="form">
            <view class="tel"> <input type="text" placeholder="手机号" /> </view>
            <view class="verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </view>
        </view>
        <view class="btn-next">下一步</view>
        <view class="picture">
            <img class="img-text" src="@/static/signIndex/text.png" alt="" />
            <view>绑定签约抖音账号教程</view>
            <button>点击查看</button>
            <img class="img-logo" src="@/static/signIndex/logo.png" alt="" />
        </view>
    </view>
</template>

<script setup lang="ts"></script>

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
.form {
    width: 662rpx;
    margin-top: 136rpx;
    font-size: 36rpx;
    > view {
        width: 100%;
        background-color: #f0f2f5;
        margin-bottom: 44rpx;
        border-radius: 60rpx;
        padding: 22rpx 64rpx;
        > input {
            height: 76rpx;
            line-height: 76rpx;
            color: $uni-text-color-grey;
        }
    }
}
.verify {
    position: relative;
}
.form button {
    position: absolute;
    right: 50rpx;
    top: 10rpx;
    color: $uni-color-primary;
}
.btn-next {
    margin: 57rpx auto;
    // margin-top: 57rpx;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    font-size: 36rpx;
    text-align: center;
    line-height: 104rpx;
    border-radius: 783rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    z-index: 1;
    width: 400rpx;
    height: 104rpx;
}
.picture {
    position: relative;
    width: 696rpx;
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
    z-index: 99;
}
</style>
