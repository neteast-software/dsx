<template>
    <view class="background-list-container">
        <scroll-view class="scroller" scroll-y="true" @scrolltolower="nextList">
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
                        :show-fullscreen-btn="false"
                        :loop="true"
                        :autoplay="true"
                        :src="item.url"
                        class="background-media"
                    ></video>
                    <image v-else class="background-media" :src="item.url" mode="scaleToFill" />
                    <view class="background-text">{{ item.name }}</view>
                </view>
            </view>
            <view class="nomore" v-if="nomore">-- 没有更多了 --</view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import { usePaginator } from "@/utils/util";
import { onReady } from "@dcloudio/uni-app";
import { ref, nextTick, toRaw, getCurrentInstance } from "vue";
import { getVideoBackgroundList } from "@/api/dsx/business";
const { list: backgroundList, initList, nextList, nomore } = usePaginator<BackgroundInfo>(getVideoBackgroundList);
let eventChannel: any = null;
onReady(async () => {
    const _this = getCurrentInstance()?.proxy as any;
    eventChannel = _this.getOpenerEventChannel();
    console.log(eventChannel);
    await initList();
});
async function handleSelectBackground(selectedBackground) {
    if (selectedBackground.url.includes(".mp4")) {
        const uploadTask = uni.downloadFile({
            url: selectedBackground.url,
            success: (res) => {
                console.log(1111);
                if (res.statusCode === 200) {
                    console.log("下载成功");
                    console.log(res);
                }
            },
            fail: (err) => {
                console.log(err);
            }
        });
        uploadTask.onProgressUpdate((res) => {
            console.log("下载进度" + res.progress);
        });
    }
    if (typeof eventChannel.on !== "function") return;

    eventChannel.emit("setBackground", selectedBackground);
    const res = await router.back();
}
</script>

<style scoped lang="scss">
@import "./videoBackground.scss";
</style>
