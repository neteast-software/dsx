<template>
    <view class="header">
        <!-- #ifdef APP-PLUS -->
        <image class="profile" v-if="user.avatar" :src="user.avatar" mode="aspectFill" />
        <image class="profile" v-else src="@/assets/imgs/avatar.png" mode="aspectFill" />
        <image class="logo-img" src="@/assets/imgs/top-logo.svg" mode="widthFix" />
        <view class="msg" @tap="toNews">
            <view class="news" v-if="user.unreadMsgCount"></view>
            <image src="@/static/index/msg.svg" mode="widthFix" />
            消息
        </view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="msg" @tap="toNews">
            <view class="news" v-if="user.unreadMsgCount"></view>
            <image src="@/static/index/msg.svg" mode="widthFix" />
            消息
        </view>
        <image class="logo-img" src="@/assets/imgs/top-logo.svg" mode="widthFix" />
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import user from "@/store/user";
import router from "@/utils/router";
function toNews() {
    router.push("news");
}
</script>

<style scoped lang="scss">
.header {
    margin: 6rpx 0;
    height: 66rpx;
    display: flex;
    padding: 0 33rpx;
    align-items: center;
    justify-content: space-between;

    // & > * {
    //     height: 100%;
    // }
    .profile {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        background-color: #dfe2e1;
        text-align: center;
        overflow: hidden;
        // image {
        //     margin-top: 17rpx;
        //     width: 100%;
        //     height: 100%;
        // }
    }
    .logo-img {
        width: 218rpx;
        height: 58rpx;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}

.msg {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 20rpx;
    position: relative;
    .news {
        position: absolute;
        top: 5rpx;
        right: 5rpx;
        background: #f03737;
        box-sizing: border-box;
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        border-radius: 200rpx;
        z-index: 100;
    }
    image {
        width: 48rpx;
        height: 48rpx;
    }
}
</style>
