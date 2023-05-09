<template>
    <page-meta page-style="height: 100%"></page-meta>
    <view class="stage h-full relative">
        <view class="integra-tip" v-if="!selectedVideo?.tempFilePath">
            <view class="flex-center">
                <image class="integra-icon" src="/videoPages/static/icons/integra.png" mode="widthFix"></image>
                <text class="font-middle">视频消耗积分</text>
            </view>
            <view class="integra-context flex-center">
                <view class="integra-text">{{ user.syntheticMagicIntegrals }}</view>
                <view>/次</view>
            </view>
        </view>
        <view class="add-video-container" v-if="!selectedVideo?.tempFilePath">
            <image class="video-icon" src="/videoPages/static/icons/video-icon.png" mode="widthFix"></image>
            <view class="add-video-button btn" @tap="handleChooseVideo">点击添加视频</view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <view class="selected-video-container" v-if="selectedVideo?.tempFilePath">
            <video id="myVideo" class="video-thumb" :src="selectedVideo.tempFilePath" mode="aspectFit"></video>
        </view>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <view class="selected-video-container" v-if="selectedVideo?.tempFilePath">
            <video
                id="myVideo"
                class="video-thumb"
                autoplay
                :src="selectedVideo.tempFilePath"
                mode="aspectFit"
                :muted="!first"
                @timeupdate="pauseVideo"
            ></video>
        </view>
        <!-- #endif -->
        <view class="footer-bar">
            <view class="choose-btn btn" @tap="handleChooseVideo">选择视频 </view>
            <view class="next-btn btn" :class="{ 'disabled-btn': !selectedVideo?.tempFilePath }" @tap="toHandleVideo">
                下一步</view
            >
        </view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import { Toast, chooseVideoByAlbum } from "@/utils/uniapi";
import { toRaw } from "vue";
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import user from "@/store/user";

const selectedVideo = ref<any>(null);

async function handleChooseVideo() {
    const data = await chooseVideoByAlbum();
    console.log("选择视频", data, data.tempFilePath);
    selectedVideo.value = data;
    var context = uni.createCanvasContext("firstCanvas");
    context.drawImage(selectedVideo.value, 0, 0, 150, 100);
    // Toast.success("添加成功");
    // console.log(selectedVideo.value);
}
async function toHandleVideo() {
    if (selectedVideo.value && selectedVideo.value.tempFilePath) {
        const res = await router.push("videoProcess", {
            events: {
                acceptVideoInfo: function (data) {}
            }
        });
        res.eventChannel.emit("acceptVideoInfo", toRaw(selectedVideo.value));
        selectedVideo.value = null;
    }
}
const first = ref(false);
function pauseVideo(e) {
    if (!first.value && e.detail.currentTime) {
        first.value = true;
        const ctx = uni.createVideoContext("myVideo");
        ctx.pause();
    }
}
</script>

<style>
page {
    height: 100%;
    background: #f7f8fa !important;
}
</style>
<style scoped lang="scss">
@import "./videoChoose.scss";
</style>
