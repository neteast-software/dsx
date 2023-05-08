<template>
    <view class="wrap small grey">
        <view class="integra-tip" v-if="!selectedVideo?.thumbTempFilePath">
            <view class="flex-center">
                <image class="integra-icon" src="/videoPages/static/icons/integra.png" mode="widthFix"></image>
                <text class="font-middle">视频消耗积分</text>
            </view>
            <view class="integra-context">
                <view class="integra-text">2</view>
                <view>/次</view>
            </view>
        </view>
        <view class="add-video-container" v-if="!selectedVideo?.thumbTempFilePath">
            <image class="video-icon" src="/videoPages/static/icons/video-icon.png" mode="widthFix"></image>
            <view class="add-video-button btn" @tap="handleChooseVideo">点击添加视频</view>
        </view>
        <view class="selected-video-container" v-if="selectedVideo?.thumbTempFilePath">
            <image class="video-thumb" :src="selectedVideo.thumbTempFilePath" mode="aspectFit"></image>
        </view>
        <view class="footer-bar">
            <view class="choose-btn btn" @tap="handleChooseVideo">选择视频 </view>
            <!-- disabled-btn -->
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

const selectedVideo = ref<any>(null);

async function handleChooseVideo() {
    const { tempFiles } = await chooseVideoByAlbum();
    selectedVideo.value = tempFiles[0];
    Toast.success("添加成功");
    console.log(selectedVideo.value);
}
async function toHandleVideo() {
    if (selectedVideo.value && selectedVideo.value.tempFilePath) {
        const res = await router.push("videoProcess", {
            events: {
                acceptVideoInfo: function (data) {}
            }
        });
        res.eventChannel.emit("acceptVideoInfo", toRaw(selectedVideo.value));
    }
}
</script>

<style scoped lang="scss">
@import "./videoChoose.scss";
</style>
