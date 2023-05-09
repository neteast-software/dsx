<template>
    <!-- 界面1 -->
    <view class="container">
        <!-- #ifdef APP-PLUS -->
        <image class="bj1 flex-shrink-0" src="@/assets/imgs/bj1.gif" mode="height" alt=""></image>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <!-- <view class="bj1-wrap flex-shrink-0"> -->
        <image
            class="bj1 flex-shrink-0"
            src="https://dsxmanager.huoyuanyouxuan.com/profile/upload/webImage/bj1.gif"
            mode="heightFix"
            alt=""
        ></image>
        <!-- </view> -->
        <!-- #endif -->
        <view class="content1">视频努力导出中{{ progress }}%</view>
        <view class="content2">您的专属视频生成中，请勿离开</view>
        <!-- 推荐商品 -->
        <view class="flex-rest-height"></view>
        <view class="moreproducts flex-column-all-center" v-if="sortGoods.length">
            <view class="flex-center">
                <image class="title-img" src="@/assets/icons/title.png" mode="scaleToFill"></image>
                <view class="title-text">更多同款商品</view>
                <image class="title-img" src="@/assets/icons/title.png" mode="scaleToFill"></image>
            </view>
            <view class="recommend">
                <view class="moreproducts-item" v-for="item in sortGoods" :key="item.id">
                    <view class="moreproducts-img">
                        <image class="bg" :src="item.images" mode="aspectFill"> </image>
                        <view class="moreproducts-text">{{ item.name }}</view>
                    </view>
                    <view class="sales">累计销量 {{ item.saleCount > 10000 ? "1w+" : item.saleCount }}</view>
                </view>
            </view>
        </view>
        <!-- 广告 -->
        <view class="adContainer" v-if="isAdShow && adList.length">
            <swiper class="swiper-banner" autoplay circular>
                <swiper-item class="swiper-item" v-for="ad in adList" :key="ad.id">
                    <image class="ad-img" :src="ad.image" mode="scaleToFill"></image>
                </swiper-item>
            </swiper>
            <view class="btn-close" @tap="closeAd">关闭</view>
        </view>
    </view>
    <!-- 界面2 -->
</template>

<script setup lang="ts">
import { getAdList, getGoodsList } from "@/api/dsx/business";
import { getVideoStats } from "@/api/dyh";
import { saveVideoToAlbum, Toast } from "@/utils/uniapi";
import { onLoad, onReady, onUnload } from "@dcloudio/uni-app";
import { douyinShareVideos } from "@/utils/douyin";
import { ref } from "vue";
import router from "@/utils/router";
const timer = ref<MaybeNull<NodeJS.Timer>>(null);
const progress = ref(0);
const videoUrl = ref("");
// const description = ref("");
const goodId = ref("");
onLoad((options) => {
    // description.value = options?.description || "";
    const taskId = options?.taskId || "";
    const token = options?.token || "";
    const typeId = options?.typeId || "";
    goodId.value = options?.id || "";
    updateVideoStat(taskId, token);
    if (typeId) {
        initSortGoods(typeId);
    }
});
const sortGoods = ref<GoodInfo[]>([]);
async function initSortGoods(id: string) {
    const { rows } = await getGoodsList(1, 4, { sortSaleCount: true, id });
    sortGoods.value = rows;
}
async function updateVideoStat(taskId: string, token: string) {
    const { data } = await getVideoStats(taskId, token);
    if (data.status === 5) {
        progress.value = data.data.progress;
    }
    if (data.status === 7) {
        videoUrl.value = data.data.res.fileUrl;
        clearTimer();
        if (goodId.value) {
            router.replace("videoPreview", { query: { url: videoUrl.value, id: goodId.value } });
        } else {
            router.replace("videoPlay", { query: { url: videoUrl.value } });
        }
        return;
    }
    timer.value = setTimeout(() => {
        updateVideoStat(taskId, token);
    }, 1000);
}
function clearTimer() {
    if (timer.value) {
        clearTimeout(timer.value);
    }
}
onUnload(() => {
    clearTimer();
});

// 广告
const isAdShow = ref(true);
const adList = ref<BannerInfo[]>([]);
function closeAd() {
    isAdShow.value = false;
}
async function initAdList() {
    const { data } = await getAdList();
    adList.value = data;
}
onReady(initAdList);
</script>
<style>
page {
    background-color: #000;
}
.container {
    padding-bottom: 32rpx;
    min-height: 100%;
    background-color: #000;
}
</style>
<style setup lang="scss">
@import "./export.scss";
</style>
