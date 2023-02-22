<template>
    <view class="wrap grey pt">
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar1.png" mode="aspectFill"></image>
            <view class="message1">
                <text class="name">点点种草记</text>
                <text class="data">2023-03-01 22:24:12 授权到期</text>
            </view>
        </view>
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar2.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">上古白帝山</text>
                <view class="state state1">签约中</view>
            </view>
            <view class="look">
                <text class="check">查看签约信息</text>
                <image class="img-check" mode="aspectFill" src="@/static/manage/check.png"></image>
            </view>
        </view>
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar3.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">兔兔花严选</text>
                <view class="state state2">已签约</view>
            </view>
        </view>
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar4.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">点点种草记</text>
                <view class="state state3">已授权</view>
            </view>
            <button class="btn-bind">进行结算绑定</button>
        </view>
        <button class="btn-add">新增签约账号</button>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.account {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: 40rpx;
    border-radius: 24rpx;
    background: $uni-bg-color;
    padding: 36rpx 32rpx;
    .avatar {
        width: 100rpx;
        height: 100rpx;
        margin-right: 25rpx;
    }
    .message1 {
        display: flex;
        flex-wrap: wrap;
    }
    .message {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        flex: 1;
        .state {
            padding: 6rpx 14rpx;
            border-radius: 14rpx 2rpx 14rpx 14rpx;
            // box-sizing: border-box;
            font-size: 12rpx;
            transform: scale(0.8);
            margin-top: -30rpx;
        }
    }
    .name {
        width: 160rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 32rpx;
        color: #2a2b2c;
        margin-right: 8rpx;
    }
    .data {
        margin-top: 9rpx;
        font-size: $uni-font-size-sm;
        color: #7b7379;
    }
}
.state1 {
    background: rgba(36, 219, 90, 0.1);
    border: 1rpx solid #4dc591;
    color: #4dc591;
}
.state2 {
    background: rgba(94, 153, 254, 0.1);
    border: 1rpx solid #5e99fe;
    color: #5e99fe;
}
.state3 {
    background: rgba(254, 118, 94, 0.1);
    border: 1rpx solid #fe765e;
    color: #fe765e;
}
.look {
    position: absolute;
    right: 24rpx;
    top: 50%;
    transform: translateY(-50%);
    .check {
        color: #7b7379;
        font-size: $uni-font-size-sm;
    }
    .img-check {
        width: 17rpx;
        height: 17rpx;
        margin-right: 6rpx;
        vertical-align: middle;
    }
}

.btn-bind {
    background: linear-gradient(270deg, #ff7a60 0%, #f14747 100%);
    border-radius: 479px;
    color: $uni-text-color-inverse;
    font-size: 22rpx;
    // padding: 15rpx 21rpx 13rpx 20rpx;
    width: 175rpx;
    height: 58rpx;
    line-height: 58rpx;
    position: absolute;
    right: 24rpx;
    top: 50%;
    transform: translateY(-50%);
}
.btn-add {
    color: $uni-text-color-inverse;
    background: $uni-color-primary;
    // padding: 20rpx 116rpx;
    width: 447rpx;
    height: 90rpx;
    font-size: $uni-font-size-lg;
    border-radius: 454rpx;
    position: fixed;
    bottom: 84rpx;
    left: 50%;
    transform: translateX(-50%);
}
</style>
