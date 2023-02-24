<template>
    <swiper class="swiper-box" autoplay indicator-dots>
        <swiper-item v-for="banner in bannerList" :key="banner.id">
            <view class="swiper-item">
                <image class="banner" :src="baseURL + banner.image" mode="aspectFill" />
            </view>
        </swiper-item>
    </swiper>
</template>

<script setup lang="ts">
import { getBannerList } from "@/api/dsx/business";
import { ref, onMounted } from "vue";
import { baseURL } from "@/config/env";

const bannerList = ref<BannerInfo[]>([]);
async function initData() {
    const { data } = await getBannerList();
    bannerList.value = data;
}
onMounted(initData);
</script>

<style scoped lang="scss">
.swiper-box {
    width: 686rpx;
    height: 337rpx;
    margin: 0 auto;
    border-radius: 40rpx;
    margin-top: 30rpx;
}
.swiper-item {
    height: 100%;
    border-radius: 40rpx;
    overflow: hidden;
    .banner {
        width: 100%;
        height: 100%;
    }
}
</style>
