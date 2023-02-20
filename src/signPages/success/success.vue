<template>
    <view class="container">
        <img src="@/static/success/logo.png" alt="" />
        <view class="text">您已签约绑定以下抖音账号</view>
        <view class="btn">去结算绑定</view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
img {
    margin-top: 72.68rpx;
    width: 239.56rpx;
    height: 216.64rpx;
}
.text {
    margin-top: 70.68rpx;
    color: $uni-text-color;
    font-size: $uni-font-size-lg;
}
.btn {
    font-size: $uni-font-size-lg;
    margin-top: 508.84rpx;
    padding: 26rpx 74rpx;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    text-align: center;
    border-radius: 783rpx;
    z-index: 1;
}
</style>
