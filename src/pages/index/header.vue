<template>
    <view class="header">
        <!-- #ifdef APP-PLUS -->
        <image class="profile" v-if="user.avatar" :src="user.avatar" mode="aspectFill" />
        <image class="profile" v-else src="@/assets/imgs/avatar.png" mode="aspectFill" />
        <view class="search" @tap="toSearch">
            <view class="mask"><image class="icon-search" src="@/static/index/seearch.svg" />搜索</view>
        </view>
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
        <view class="weapp-search" @tap="toSearch">
            <view class="mask"><image class="icon-search" src="@/static/index/seearch.svg" />搜c 索</view>
        </view>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import user from "@/store/user";
import router from "@/utils/router";
function toNews() {
    router.push("news");
}
function toSearch() {
    router.push("search");
}
</script>

<style scoped lang="scss">
.header {
    margin: 6rpx 0;
    height: 66rpx;
    display: flex;
    padding: 0 33rpx;
    align-items: center;

    // & > * {
    //     height: 100%;
    // }
    .search {
        height: 100%;
    }
    .weapp-search {
        width: 374rpx;
        height: 66rpx;
        margin: 0 50rpx;
        position: relative;
        background-color: #f3eded;
        border-radius: 500rpx;
        .icon-search {
            width: 28rpx;
            margin-right: 10rpx;
        }
        .mask {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: #847978;
            font-weight: 400;
        }
    }

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
}
.search {
    flex: 1;
    margin: 0 25rpx;
    position: relative;
    background-color: #f3eded;
    border-radius: 500rpx;
    // &.weapp {
    //     width: 374rpx;
    //     flex-grow: 1;
    // }
    .icon-search {
        width: 28rpx;
        margin-right: 10rpx;
    }
    .mask {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #847978;
        font-weight: 400;
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
