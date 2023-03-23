<template>
    <view class="flex-between">
        <view class="" @tap="toList('lightning')">
            <image class="icons-img" src="@/assets/imgs/spike.png" mode="widthFix"></image>
            <view class="icons-text">秒杀专区</view>
        </view>
        <view class="" @tap="toList('direct')">
            <image class="icons-img" src="@/assets/imgs/directSales.png" mode="widthFix"></image>
            <view class="icons-text">产地直销</view>
        </view>
        <view class="" @tap="toList('goods')">
            <image class="icons-img" src="@/assets/imgs/goodStuff.png" mode="widthFix"></image>
            <view class="icons-text">团长好货</view>
        </view>
        <view class="" @tap="toCourse">
            <image class="icons-img" src="@/assets/imgs/teaching.png" mode="widthFix"></image>
            <view class="icons-text">视频教学</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import type { ListType } from "@/api/dsx/business";

function toCourse() {
    router.switchTab("course");
}
function toList(listType: ListType) {
    router.push("list", { query: { listType } });
}
</script>

<style scoped lang="scss">
.icons-img {
    width: 90rpx;
    height: 90rpx;
    margin-bottom: 7rpx;
}
.icons-text {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-tip;
}
</style>
