<template>
    <view class="navigator" :style="extStyle" :class="[extClass ? extClass : '']">
        <status-bar></status-bar>
        <slot v-if="defaultSlot"></slot>
        <uni-nav-bar
            v-else
            left-icon="left"
            :title="title"
            :border="false"
            :background-color="backgroundColor"
            :color="color"
            @clickLeft="back"
        ></uni-nav-bar>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import statusBar from "./statusBar.vue";
import uniNavBar from "@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue";
import { useSlots } from "vue";
const { default: defaultSlot } = useSlots();
const props = defineProps({
    extClass: String,
    extStyle: Object,
    title: String,
    backgroundColor: {
        type: String,
        default: "#ffffff"
    },
    color: {
        type: String,
        default: "#000000"
    }
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
