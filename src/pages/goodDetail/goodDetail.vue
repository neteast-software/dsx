<template>
    <view class="stage">
        <template v-if="goodInfo">
            <view class="flex-rest-height content-wrap">
                <view class="swiper-wrap relative">
                    <swiper class="swiper-box" :current="current" autoplay circular>
                        <swiper-item v-for="image in goodInfo.imageList" :key="image">
                            <view class="swiper-item">
                                <image class="banner" :src="image" mode="aspectFill" />
                            </view>
                        </swiper-item>
                    </swiper>
                    <view class="swiper-tip">{{ current }}</view>
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
                <button class="video-btn font-middle">视频合成</button>
                <button class="add-btn font-middle">添加至橱窗</button>
            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
import { getGoodsDetail } from "@/api/dsx/business";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
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
</script>

<style scoped lang="scss">
@import "./goodDetail.scss";
</style>
