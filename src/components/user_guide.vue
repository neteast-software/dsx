<template>
    <uni-popup ref="guide" type="center">
        <view class="guide">
            <view class="title"> 新手带货指南 </view>
            <view class="desc"> 下载视频前请先将商品添加至橱窗哦 </view>
            <view class="content">
                <swiper class="swiper" circular :autoplay="false" @change="swiperChange">
                    <swiper-item v-for="(item, index) in tips" :key="index">
                        <view class="swiper-item uni-bg-red">
                            <view class="step">第{{ item.step }}步</view>
                            <view class="action">{{ item.action }}</view>
                        </view>
                    </swiper-item>
                </swiper>
                <image
                    mode="aspectFit"
                    class="duck"
                    @animationend="aniRemove"
                    :class="{ active: aniPlay }"
                    src="https://dsxmanager.huoyuanyouxuan.com/dsx/assets/Flipper.png"
                ></image>
            </view>

            <view class="dots">
                <view v-for="(item, index) in tips" :key="index" class="dot" :class="{ active: swiperIndex == index }">
                </view>
            </view>
            <button class="close" @tap="close">我知道了</button>
            <button class="close-icon" @tap="close">x</button>
        </view>
    </uni-popup>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
const guide = ref<any>(null);
const swiperIndex = ref<number>(1);
const aniPlay = ref<boolean>(false);
onMounted(() => {
    guide.value.open();
});
onShow(() => {
    guide.value.open();
});
const tips = ref<Array<Record<string, string>>>([
    { step: "一", action: "点击商品橱窗" },
    { step: "二", action: "点击选品广场" },
    { step: "三", action: "在搜索栏粘贴商品链接" },
    { step: "四", action: "点几查看详情查看商品" },
    { step: "五", action: "点击加橱窗，把商品加到自己的抖音橱窗" }
]);
function swiperChange(e) {
    swiperIndex.value = e.detail.current;
    aniPlay.value = true;
}
function aniRemove() {
    aniPlay.value = false;
}
function close() {
    guide.value.close();
}
</script>
<style lang="scss">
.guide {
    width: 607rpx;
    border-radius: 36rpx;
    background: #fff;
    z-index: 9999;
    padding: 74rpx;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    .content {
        display: flex;
        justify-content: center;
        padding-top: 11rpx;
        position: relative;
        width: 412rpx;
        height: 289rpx;
        overflow: hidden;
        background-color: #f6f6f6;
        border-radius: 30rpx;
        .step {
            font-size: $uni-font-size-middle;
            color: #4c2e1d;
            padding: 27rpx 0;
        }
        .action {
            font-size: $uni-font-size-base;
            color: #8c6c32;
            font-weight: 300;
        }
    }
    .dots {
        display: flex;
        justify-content: center;
        margin-top: 41rpx;
        margin-bottom: 74rpx;
        .dot {
            background-color: #b5ab9b;
            width: 12rpx;
            height: 12rpx;
            margin: 0 11rpx;
            border-radius: 50%;
            transition: all 0.5s ease-in-out;

            &.active {
                width: 30rpx;
                background-color: #db9d39;
                border-radius: 50rpx;
            }
        }
    }

    .swiper {
        width: 388rpx;
        height: 210rpx;
        background-color: #ffeed0;
        border-radius: 20rpx;
    }
    .duck {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 32%;
        height: 52%;
        transform: translateY(25rpx);
        transform-origin: center 200rpx;
        &.active {
            animation: duck-duck 1s ease-in-out forwards;
        }
    }
    @keyframes duck-duck {
        0% {
            transform: rotate(0) translateY(25rpx);
        }
        20% {
            transform: rotate(36deg) translateY(25rpx);
        }
        40% {
            transform: rotate(-18deg) translateY(25rpx);
        }
        60% {
            transform: rotate(12deg) translateY(25rpx);
        }
        80% {
            transform: rotate(-6deg) translateY(25rpx);
        }
        100% {
            transform: rotate(0) translateY(25rpx);
        }
    }

    .title {
        font-size: 42rpx;
        color: #2a2b2c;
    }
    .desc {
        font-size: $uni-font-size-base;
        color: #7b7379;
        margin-top: 25rpx;
        margin-bottom: 46rpx;
    }
    .close-icon {
        font-size: 34rpx;
        font-weight: 300;
        width: 60rpx;
        height: 60rpx;
        line-height: 50rpx;
        position: absolute;
        right: 0;
        top: -80rpx;
        border: 1rpx #fff solid;
        border-radius: 50%;
    }
    .close {
        width: 315rpx;
        height: 94rpx;
        line-height: 94rpx;
        border-radius: 522px;
        margin: 0 auto;
        color: #4c2e1d;
        background: linear-gradient(180deg, #ffe6bd 0%, #fcd697 100%);
    }
}
</style>

