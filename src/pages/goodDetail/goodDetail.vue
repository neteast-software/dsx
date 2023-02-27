<template>
    <view class="stage">
        <template v-if="goodInfo">
            <view class="flex-rest-height content-wrap">
                <view class="swiper-wrap relative">
                    <!-- <nav-bar ext-class="absoluteNav"></nav-bar> -->
                    <view class="nav">
                        <status-bar></status-bar>
                        <view class="nav-bar">
                            <image class="back-icon" src="@/assets/icons/back.png" mode="widthFix" @tap="back"></image>
                        </view>
                    </view>
                    <swiper class="swiper-box" :current="current" autoplay circular>
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
                        <view class="poster-wrap relative">
                            <image class="poster" :src="goodInfo.templateImage" mode="aspectFill"></image>
                            <image class="icon-play" src="@/assets/icons/play.png" mode="widthFix"></image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="footer relative">
                <button class="video-btn font-middle" @tap="toExport(goodInfo?.id)">视频合成</button>
                <button class="add-btn font-middle" @tap="copyToClipboard(goodInfo?.coalitionUrl)">添加至橱窗</button>
            </view>
        </template>
        <Dialog
            :show="showDialog"
            :content="dialogContent"
            confirm-text="立即前往"
            @cancel="hideDialog"
            @confirm="hideDialog"
        ></Dialog>
    </view>
</template>

<script setup lang="ts">
import { getGoodsDetail } from "@/api/dsx/business";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Dialog from "@/components/dialog.vue";
import router from "@/utils/router";
import statusBar from "@/components/statusBar.vue";
onLoad((options) => {
    initData(options?.id || 0);
});
const goodInfo = ref<GoodDetail>();
async function initData(id = 0) {
    const { data } = await getGoodsDetail(id);
    goodInfo.value = data;
    console.log(data);
}

const current = ref(0);
const showDialog = ref(false);
const dialogContent = ref("您已复制商品链接\n是否立刻前往抖音加入橱窗");
function copyToClipboard(coalitionUrl = "") {
    uni.setClipboardData({
        data: coalitionUrl,
        showToast: false,
        success: () => {
            showDialog.value = true;
        }
    });
}
function hideDialog() {
    showDialog.value = false;
}
function toExport(id = 0) {
    router.push("export", { query: { id } });
}
function back() {
    router.back();
}
</script>

<style scoped lang="scss">
@import "./goodDetail.scss";
</style>
