<template>
    <view class="wrap">
        <view class="wel">
            <image src="@/static/login/logo.png" alt=""></image>
            <view class="text">欢迎来到抖省心</view>
        </view>
        <view class="form">
            <view class="tel"> <input type="text" placeholder="请输入手机号" /> </view>
            <view class="verify">
                <input type="text" placeholder="请输入验证码" />
                <button class="btn-obtain">获取验证码</button>
            </view>
        </view>
        <view class="method">
            <button>密码登陆</button>
        </view>
        <!-- <view class="method">
            <button>忘记密码</button>
            <button>验证码登录</button>
        </view> -->
        <view class="btn-login">登陆</view>
        <view class="agree">
            <view class="hook">✔</view>
            <view>请您阅读并同意“用户协议”和“隐私政策”</view>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// .content {
//     padding: 0 49rpx;
// }
.wel {
    position: relative;
    margin-top: 120rpx;
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
    }
}

.method {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 147rpx;
    padding: 0 45rpx;
    button {
        color: #7b7379;
        font-size: $uni-font-size-base;
    }
}
.btn-login {
    margin-top: 47rpx;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-inverse;
    background: $uni-color-primary;
    border-radius: 454rpx;
    padding: 25rpx 290rpx;
}
.agree {
    display: flex;
    margin-top: 66rpx;
    font-size: $uni-font-size-sm;
    justify-content: center;
    .hook {
        width: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        background: #cbbfcb;
        // background: $uni-color-primary;
        color: $uni-text-color-inverse;
        border-radius: 50%;
    }
    :last-child {
        color: #6c7276;
        margin-left: 10rpx;
    }
}
</style>
