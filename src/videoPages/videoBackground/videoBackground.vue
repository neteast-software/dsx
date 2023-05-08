<template>
    <view class="background-list-container">
        <scroll-view class="scroller" scroll-y="true" @scrolltolower="nextList">
            <view class="background-list-content">
                <view class="background-detail" @tap="handleSelectBackground({ url: '' })">
                    <view class="background-img border-dashed" />
                    <view class="background-text">无背景</view>
                </view>
                <view
                    class="background-detail"
                    v-for="item in backgroundList"
                    :key="item.id"
                    @tap="handleSelectBackground(item)"
                >
                    <image class="background-img" :src="item.url" mode="scaleToFill" />
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
    if (typeof eventChannel.on !== "function") return;
    eventChannel.emit("setBackground", selectedBackground);
    const res = await router.back();
}
</script>

<style scoped lang="scss">
@import "./videoBackground.scss";
</style>
