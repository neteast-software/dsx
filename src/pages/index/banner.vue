<template>
    <view>
        <swiper
            class="swiper-box"
            @change="swipeChange"
        >
            <swiper-item
                v-for="(item, index) in info"
                :key="index"
            >
                <view class="swiper-item">
                    <image
                        :src="item.src"
                        mode="aspectFit"
                    />
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
//swipe
const current = ref(0);
const swipeChange = function () {};

const info = reactive([
    { content: "你好", src: "/static/index/ad1.png" },
    { content: "我好", src: "/static/index/ad1.png" },
    { content: "大家好", src: "/static/index/ad1.png" }
]);
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
    image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
