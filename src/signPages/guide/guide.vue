<template>
    <view class="container">
        <img class="profile" src="@/static/guide/profile.png" alt="" mode="aspectFill" />
        <view class="btn-tutorial">确认签约教程</view>
        <view class="text1">抖省心</view>
        <view class="text2"> 您将签约绑定上方抖音账号 </view>
        <view class="step">
            <view class="ring"><view>第一步</view></view>
            <view class="dashed"></view>
            <view class="ring"><view>第二步</view></view>
            <view class="dashed"></view>
            <view class="ring"><view>第三步</view></view>
        </view>
        <view class="tutorial">
            <view>
                <view class="num">1</view>
                <view>进入抖音app—消息</view>
            </view>
            <view>
                <view class="num">2</view>
                <view>进入“商家服务”通知确认</view>
            </view>
            <img src="@/static/guide/example.png" alt="" />
        </view>
        <view class="btn-confirm">我已确认签约绑定</view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
}
//头像
.profile {
    margin-top: 36rpx;
    width: 204rpx;
    height: 204rpx;
}
.btn-tutorial {
    position: absolute;
    top: 106rpx;
    right: 0;
    padding: 16rpx 20rpx;
    border-radius: 931rpx 0 0 931rpx;
    background: rgba($color: $uni-color-primary, $alpha: 0.2);
    color: $uni-color-primary;
    font-size: $uni-font-size-sm;
}
.text1 {
    margin-top: 40rpx;
    font-size: 40rpx;
    color: $uni-color-primary;
    font-weight: bold;
}
.text2 {
    height: 76rpx;
    line-height: 76rpx;
    font-size: $uni-font-size-base;
    color: $uni-text-color-placeholder;
}
//步骤
.step {
    display: flex;
    justify-content: space-evenly;
    margin-top: 62rpx;
}
.ring {
    position: relative;
    width: 40rpx;
    height: 40rpx;
    border-radius: 48rpx;
    margin-bottom: 8rpx;
    border: 10rpx solid #d0bcc5;
    background: $uni-text-color-inverse;
}
.step > :first-child {
    border: 10rpx solid $uni-color-primary;
}
.ring > view {
    position: absolute;
    top: 30rpx;
    left: 50%;
    transform: translateX(-50%);
    line-height: 24px;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-placeholder;
    font-size: $uni-font-size-base;
    white-space: nowrap;
    letter-spacing: 4rpx;
}
.dashed {
    width: 212rpx;
    height: 2rpx;
    margin-top: 15rpx;
    border: 2rpx dashed #b9c2ce;
}
.tutorial {
    position: relative;
    background: #f0f2f5;
    margin-top: 100rpx;
    border-radius: 32rpx;
}
.tutorial::before {
    content: "";
    width: 0;
    height: 0;
    border: 50rpx solid transparent;
    border-bottom: 50rpx solid #f0f2f5;
    position: absolute;
    top: -75rpx;
    left: 25rpx;
}
.tutorial > view {
    display: flex;
    flex-direction: row;
    margin: 70rpx 40rpx;
}
.num {
    width: 38rpx;
    height: 38rpx;
    border-radius: 48px;
    text-align: center;
    line-height: 38rpx;
    font-size: $uni-font-size-sm;
    background: $uni-color-primary;
    color: $uni-text-color-inverse;
    margin-right: 12rpx;
}
.tutorial img {
    width: 548rpx;
    height: 300rpx;
    margin: 0 40rpx 44rpx 40rpx;
}
.btn-confirm {
    margin-top: 62rpx;
    padding: 26rpx 74rpx;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    font-size: $uni-font-size-base;
    text-align: center;
    border-radius: 783rpx;
    z-index: 1;
}
</style>
