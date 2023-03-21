<template>
    <view class="stage">
        <template v-if="goodInfo">
            <view class="flex-rest-height content-wrap">
                <view class="nav">
                    <status-bar></status-bar>
                    <view class="nav-bar">
                        <view class="back-wrap">
                            <image class="back-icon" src="@/assets/icons/back.png" mode="widthFix" @tap="back"></image>
                        </view>
                    </view>
                </view>
                <view class="swiper-wrap relative">
                    <!-- <nav-bar ext-class="absoluteNav"></nav-bar> -->
                    <swiper class="swiper-box" autoplay circular @change="onSwiperChange">
                        <swiper-item v-for="image in goodInfo.imageList" :key="image">
                            <view class="swiper-item">
                                <image class="banner" :src="image" mode="aspectFill" />
                            </view>
                        </swiper-item>
                    </swiper>
                    <view class="swiper-tip">{{ current }}/{{ goodInfo.imageList.length || 0 }}</view>
                </view>
                <view class="content">
                    <view class="info">
                        <view class="good-name font-middle">{{ goodInfo.name }}</view>
                        <view class="good-tags">
                            <view v-if="goodInfo.isHigh" class="tag-high relative">
                                <image class="bg" src="@/assets/imgs/high.png" mode="widthFix"></image>
                                <text class="relative text">高佣{{ goodInfo.commissionRatio }}%</text>
                            </view>
                            <view class="tag-obtain">赚 {{ (goodInfo.price * goodInfo.commissionRatio) / 100 }}</view>
                        </view>
                        <view class="good-price">{{ goodInfo.price }}</view>
                        <view class="shop flex-center">
                            <image class="icon-shop" src="@/assets/icons/shop.png" mode="widthFix"></image>
                            {{ goodInfo.makers }}
                        </view>
                    </view>
                    <view class="video-wrap">
                        <view class="font-middle title">范本视频</view>
                        <view class="poster-wrap relative" @tap="showVideo">
                            <image class="poster" :src="goodInfo.templateImage" mode="aspectFill"></image>
                            <image class="icon-play" src="@/assets/icons/play.png" mode="widthFix"></image>
                            <video
                                id="myVideo"
                                v-if="goodInfo.templateVideo"
                                :src="goodInfo.templateVideo"
                                :direction="0"
                                :show-fullscreen-btn="false"
                                @fullscreenchange="exitVideo"
                            ></video>
                        </view>
                    </view>
                </view>
            </view>
            <view class="footer relative">
                <button class="video-btn font-middle" @tap="showConfirm">视频合成</button>
                <button class="add-btn font-middle" @tap="copyToClipboard(goodInfo?.coalitionUrl)">添加至橱窗</button>
            </view>
        </template>
        <Dialog
            :show="showDialog"
            :content="dialogContent"
            confirm-text="立即前往"
            @cancel="hideDialog"
            @confirm="toDouyin"
        ></Dialog>
        <Dialog
            :show="isShowConfirm"
            content="合成视频要扣除1个积分"
            @cancel="hideConfirm"
            @confirm="toExport(goodInfo?.id, goodInfo?.description)"
        ></Dialog>
        <userGuide
            ref="ug"
            :confirm="true"
            :title="'带货指南'"
            :text="'您已复制商品链接，请前往添加至橱窗'"
            @confirm="toDouyin"
        ></userGuide>
    </view>
</template>

<script setup lang="ts">
import { getGoodsDetail, getProcessVideo } from "@/api/dsx/business";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Dialog from "@/components/dialog.vue";
import router from "@/utils/router";
import statusBar from "@/components/statusBar.vue";
import user from "@/store/user";
import { Toast } from "@/utils/uniapi";
import { goDouyin, timeoutPromise } from "@/utils/util";
import userGuide from "@/components/user_guide.vue";

onLoad((options) => {
    initData(options?.id || 0);
});
const goodInfo = ref<GoodDetail>();
async function initData(id = 0) {
    const { data } = await getGoodsDetail(id);
    goodInfo.value = data;
}

const ug = ref<any>();

const current = ref(0);
const showDialog = ref(false);
const dialogContent = ref("您已复制商品链接\n是否立刻前往抖音加入橱窗");
function copyToClipboard(coalitionUrl = "") {
    uni.setClipboardData({
        data: coalitionUrl,
        showToast: false,
        success: () => {
            // showDialog.value = true;
            (ug.value as DuckActions).show();
        }
    });
}
function onSwiperChange(e) {
    current.value = e.detail.current + 1;
}
function toDouyin() {
    // #ifdef APP-PLUS
    goDouyin();
    // #endif
    showDialog.value = false;
    (ug.value as DuckActions).hide();
}
function hideDialog() {
    showDialog.value = false;
}
// 获取合成视频的token
let retryCount = 0;
async function getVideoProcessToken(id) {
    try {
        const { data } = await getProcessVideo(id);
        console.log(data);
        const { task: taskId, token } = data;
        retryCount = 0;
        return { taskId, token };
    } catch (error) {
        if (error !== "retry") return;
        if (retryCount < 10) {
            console.log("retry", retryCount);
            await timeoutPromise(100);
            retryCount++;
            return await getVideoProcessToken(id);
        } else {
            Toast("获取合成视频token失败");
            retryCount = 0;
        }
    }
}
async function toExport(id = 0, description = "") {
    uni.showLoading({ title: "加载中..." });
    try {
        const { taskId, token } = await getVideoProcessToken(id);
        hideConfirm();
        router.push("export", { query: { id, description, taskId, token } });
    } finally {
        uni.hideLoading();
    }
}
function back() {
    router.back();
}
// function showVideo() {
//     const video = uni.createVideoContext("myVideo");
//     video.requestFullScreen({ direction: 0 });
//     video.play();
// }
let videoContext: MaybeNull<UniApp.VideoContext> = null;
function showVideo() {
    videoContext = uni.createVideoContext("myVideo");
    console.log(videoContext);
    if (!videoContext) return;
    videoContext.requestFullScreen({ direction: 0 });
    videoContext.play();
}

function exitVideo(e) {
    if (e.detail?.fullScreen) return;
    if (!videoContext) return;
    videoContext.seek(0);
    videoContext.pause();
}

const isShowConfirm = ref(false);
function hideConfirm() {
    isShowConfirm.value = false;
}
function showConfirm() {
    if (user.integral === 0) {
        Toast("积分不足");
        return;
    }
    isShowConfirm.value = true;
}
</script>

<style scoped lang="scss">
@import "./goodDetail.scss";
#myVideo {
    width: 0;
    height: 0;
    // display: none;
}
</style>
