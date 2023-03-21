<template>
    <view class="search" @tap="toSearch">
        <view class="mask"><image class="icon-search" src="@/static/index/seearch.svg" />搜索</view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
function toSearch() {
    router.push("search");
}
</script>

<style scoped lang="scss">
.search {
    // flex: 1;
    margin-top: 32rpx;
    height: 66rpx;
    width: 100%;
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
</style>
