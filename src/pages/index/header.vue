<template>
    <view class="header">
        <view class="profile">
            <image
                src="@/static/index/avatar.png"
                mode="aspectFit"
            />
        </view>

        <view class="search">
            <input
                type="text"
                v-model="searchValue"
            />
            <mask v-show="searchValue == ''"> <image src="@/static/index/seearch.svg" />搜索</mask>
        </view>
        <view class="msg">
            <image
                src="@/static/index/msg.svg"
                alt=""
            />
            消息
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const searchValue = ref("");
</script>

<style scoped lang="scss">
.header {
    margin: 10rpx 0;
    height: 88rpx;
    display: flex;
    padding: 0 33rpx;
    align-items: center;

    & > * {
        height: 100%;
    }

    .profile {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        background-color: #dfe2e1;
        text-align: center;
        overflow: hidden;
        image {
            margin-top: 17rpx;
            width: 100%;
            height: 100%;
        }
    }
}
.search {
    flex: 1;
    margin: 0 25rpx;
    position: relative;
    input {
        background-color: #f3eded;
        border-radius: 500rpx;
        height: 100%;
        font-size: 28rpx;
        text-align: center;
    }
    image {
        width: 28rpx;
        margin-right: 10rpx;
    }
    mask {
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

    image {
        width: 48rpx;
        height: 48rpx;
    }
}
</style>
