<template>
    <page-meta page-style="height: 100%;background: #000"></page-meta>
    <view class="stage h-full flex-column" style="background-color: #000">
        <!-- <nav-bar title="视频处理" background-color="#000000" color="#ffffff" /> -->
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
import navBar from "@/components/navBar.vue";
import { ref } from "vue";
import { saveVideoToAlbumDebounce, publishToDouyin } from "@/utils/uniapi";
const videoUrl = ref("");
onLoad((options) => {
    videoUrl.value = options?.url || "";
});
</script>

<style>
page {
    background-color: #000;
}
</style>
<style scoped lang="scss">
@import "./videoPlay.scss";
</style>
