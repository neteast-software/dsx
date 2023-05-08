<template>
    <view class="flex-column h-full bg-black">
        <nav-bar title="视频处理" background-color="#000000" color="#ffffff" />
        <view class="flex-rest-height flex-column">
            <view class="bg-chooser flex-between">
                <view class="left flex-center">
                    <image class="icon-frame" src="/videoPages/static/icons/frame-bg.svg" mode="widthFix" />
                    边框背景
                </view>
                <view class="right flex-center">
                    更换背景图
                    <uni-icons class="icon-forward" type="forward" size="20" color="#fff"></uni-icons>
                </view>
            </view>
            <view class="video-preview flex-rest-height">
                <image class="cover" :src="mediaFile?.thumbTempFilePath" mode="aspectFit" />
            </view>
            <view class="drawer flex-column">
                <view class="handler"></view>
                <template v-if="true">
                    <scroll-view
                        class="scroller"
                        :class="{ isSmall: isSmall }"
                        scroll-y
                        :show-scrollbar="false"
                        enable-flex
                        style="margin-bottom: 54rpx"
                    >
                        <view class="op-list">
                            <view class="op flex-column-center flex-shrink-0" v-for="item in 13" :key="item">
                                <view class="icon-wrap flex-all-center">
                                    <image class="icon-op" src="/videoPages/static/op/frame.svg" mode="scaleToFill" />
                                </view>
                                <text class="op-name">魔法边框</text>
                            </view>
                        </view>
                    </scroll-view>
                    <button class="btn btn--primary btn--round upload-btn">上传并处理视频</button>
                </template>
                <template v-else>
                    <scroll-view class="scroller" :class="{ isSmall }" scroll-y>
                        <view class="stickers">
                            <view class="sticker flex-all-center" v-for="item in 12" :key="item">
                                <image class="img" src="/videoPages/static/icons/frame-bg.svg" mode="scaleToFill" />
                            </view>
                        </view>
                    </scroll-view>
                    <view class="check-btn-list flex-between">
                        <view class="check-btn no flex-all-center">
                            <uni-icons type="closeempty" color="#fff" :size="28" />
                        </view>
                        <view class="check-btn yes flex-all-center">
                            <uni-icons type="checkmarkempty" color="#fff" :size="28" />
                        </view>
                    </view>
                </template>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { ref, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { getVideoProcessBtnList } from "@/api/dsx/business";
import { getNodeInfo } from "@/utils/uniapi";
import { useDebounceFn } from "@vueuse/core";
import { on } from "events";
import { computed } from "vue";

const { windowWidth, windowHeight } = uni.getSystemInfoSync();
const ratio = windowWidth / 750;
console.log("windowHeight", windowHeight);
const isSmall = computed(() => windowHeight < 750);
// 初始化视频信息
const mediaFile = ref<UniApp.MediaFile>();
onReady(() => {
    const _this = getCurrentInstance()?.proxy as any;
    const eventChannel = _this.getOpenerEventChannel();
    if (typeof eventChannel.on !== "function") return;
    eventChannel.on("acceptVideoInfo", function (data: UniApp.MediaFile) {
        mediaFile.value = data;
    });
});
// 初始化操作按钮
async function initBtnList() {
    const data = await getVideoProcessBtnList();
    console.log(data);
}
onReady(initBtnList);

// 改变高度, 暂时不要
const maxDrawerHeight = 445;
const minDrawerHeight = maxDrawerHeight - 384 * ratio;
const drawerHeight = ref(maxDrawerHeight);
let _startY = 0;
let _moveY = 0;
function onTouchStart(e: TouchEvent) {
    console.log(e);
    _startY = e.changedTouches[0].pageY;
}

function onTouchMove(e: TouchEvent) {
    const { pageY } = e.changedTouches[0];
    const moveY = pageY - _startY;
    const offsetY = moveY - _moveY;
    _moveY = moveY;
    drawerHeight.value = Math.min(Math.max(drawerHeight.value - offsetY, minDrawerHeight), maxDrawerHeight);
    console.log(drawerHeight.value);
}
const onTouchMoveDebounce = useDebounceFn((e: TouchEvent) => {
    onTouchMove(e);
}, 20);
function onTouchEnd(e: TouchEvent) {
    _startY = 0;
    _moveY = 0;
}
</script>

<style scoped lang="scss">
@import "./videoProcess.scss";
</style>
