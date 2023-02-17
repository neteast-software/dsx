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
            <img src="@/static/signIndex/text.png" alt="" />
            <view>绑定签约抖音账号教程</view>
            <button>点击查看</button>
            <img src="@/static/signIndex/logo.png" alt="" />
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
    top: 18rpx;
    color: $uni-color-primary;
}
.btn-next {
    margin-top: 57rpx;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    font-size: 36rpx;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    z-index: 1;
    width: 284rpx;
    height: 82rpx;
}
.picture {
    width: 696rpx;
    height: 262rpx;
    background: #e6f1fc;
    border-radius: 44rpx;
    margin-top: 172rpx;
}
</style>
