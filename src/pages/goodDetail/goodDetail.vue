<template>
    <view class="stage">
        <swiper class="swiper-box">
            <swiper-item>
                <view class="swiper-item">
                    <image class="banner" mode="aspectFill" />
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { getGoodsDetail } from "@/api/dsx/business";
import { onLoad } from "@dcloudio/uni-app";
onLoad((options) => {
    initData(options?.id || 0);
});
async function initData(id = 0) {
    const { data } = await getGoodsDetail(id);
    console.log(data);
}
</script>

<style scoped lang="scss">
@import "./goodDetail.scss";
</style>
