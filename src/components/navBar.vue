<template>
    <view class="navigator" :class="[extClass ? extClass : '']">
        <status-bar></status-bar>
        <!-- <view class="navbar">
            <view class="navbar-left">
                <view class="navbar-left-icon" @tap="back">
                    <uni-icons type="back" size="32" color="#ffffff"></uni-icons>
                </view>
            </view>
        </view> -->
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import statusBar from "./statusBar.vue";
const props = defineProps({
    extClass: String
});
function back() {
    router.back();
}
</script>

<style scoped lang="scss">
.navigator {
    position: sticky;
    top: 0;
    height: 176rpx;
    position: 9999;
    background: #fff linear-gradient(180deg, #fde4d8 3%, rgba(253, 228, 216, 0) 76%);
}
.navbar {
    padding: 16rpx 32rpx;
    display: flex;
}
.navbar-left-icon {
    width: 36rpx;
    height: 36rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
}
</style>
