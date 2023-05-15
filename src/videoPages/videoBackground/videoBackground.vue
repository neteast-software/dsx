<template>
    <view class="background-list-container">
        <view class="background-list-content">
            <view class="background-detail" @tap="handleSelectBackground({ url: '' })">
                <view class="background-media border-dashed" />
                <view class="background-text">无背景</view>
            </view>
            <view
                class="background-detail"
                v-for="item in backgroundList"
                :key="item.id"
                @tap="handleSelectBackground(item)"
            >
                <video
                    v-if="item.url.includes('.mp4')"
                    :muted="true"
                    :controls="false"
                    :show-fullscreen-btn="false"
                    :show-center-play-btn="false"
                    :enable-progress-gesture="false"
                    :loop="true"
                    :autoplay="true"
                    :src="item.url"
                    object-fit="fill"
                    class="background-media relative"
                >
                    <cover-view class="video-mask" @tap="handleSelectBackground(item)"></cover-view>
                </video>
                <image v-else class="background-media" :src="item.url" mode="scaleToFill" />
                <view class="background-text">{{ item.name }}</view>
                <!-- <cover-view class="background-mask"></cover-view> -->
            </view>
        </view>
        <view class="nomore" v-if="nomore">-- 没有更多了 --</view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import { usePaginator } from "@/utils/util";
import { onReady, onReachBottom } from "@dcloudio/uni-app";
import { ref, nextTick, toRaw, getCurrentInstance } from "vue";
import { getVideoMaterialList } from "@/api/dsx/business";
import { useDebounceFn, useThrottleFn } from "@vueuse/core";
const { list: backgroundList, initList, nextList, nomore } = usePaginator<BackgroundInfo>(getVideoMaterialList);
let eventChannel: any = null;
onReady(async () => {
    uni.showLoading({ title: "加载中..." });
    const _this = getCurrentInstance()?.proxy as any;
    eventChannel = _this.getOpenerEventChannel();
    console.log(eventChannel);
    await initList();
    uni.hideLoading();
});
const handleSelectBackground = useDebounceFn(async (selectedBackground) => {
    console.log("选择背景", selectedBackground);
    if (typeof eventChannel.on !== "function") return;
    eventChannel.emit("setBackground", selectedBackground.url);
    await router.back();
}, 50);

const throttleNextList = useThrottleFn(nextList, 300);
onReachBottom(() => {
    console.log("到底部");
    throttleNextList({ type: 1 });
});
function Noop() {
    console.log("Noop");
}
</script>

<style>
page {
    background-color: #000;
}
</style>
<style scoped lang="scss">
@import "./videoBackground.scss";
</style>
