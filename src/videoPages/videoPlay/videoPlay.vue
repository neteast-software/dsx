<template>
    <view class="wrap flex-column">
        <view class="flex-rest-height">
            <video class="video" :src="videoUrl" autoplay></video>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button class="btn btn--primary btn--round save-btn" @tap="saveVideoToAlbumDebounce(videoUrl)">
            保存到相册
        </button>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <button class="btn btn--primary btn--round save-btn" @tap="publishToDouyin(videoUrl)">发布到抖音</button>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { saveVideoToAlbumDebounce, publishToDouyin } from "@/utils/uniapi";
const videoUrl = ref("");
onLoad((options) => {
    videoUrl.value = options?.url || "";
});
</script>

<style scoped lang="scss">
@import "./videoPlay.scss";
</style>
