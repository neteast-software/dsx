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
                <image class="cover" src="/videoPages/static/op/cover.png" mode="aspectFit" />
            </view>
            <view class="drawer">
                <view class="handler"></view>
                <scroll-view scroll-y :show-scrollbar="false" enable-flex style="margin-bottom: 54rpx">
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
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { ref } from "vue";
const drawerHeight = ref(0);
</script>

<style scoped lang="scss">
@import "./videoProcess.scss";
</style>
