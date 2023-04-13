<template>
    <uni-popup ref="guide" type="center">
        <view class="guide">
            <view class="title"> {{ props.title }} </view>
            <view class="desc">{{ props.text }} </view>
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
            <view class="btns">
                <button class="close" @tap="close">我知道了</button>
                <template v-if="props.confirm">
                    <button class="close" @tap="confirm">{{ props.confirm_text }}</button>
                </template>
            </view>
            <button class="close-icon" @tap="close">x</button>
        </view>
    </uni-popup>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
const guide = ref<any>(null);
const swiperIndex = ref<number>(0);
const aniPlay = ref<boolean>(false);
const tips = ref<Array<Record<string, string>>>([
    { step: "一", action: "点击商品橱窗" },
    { step: "二", action: "点击选品广场" },
    { step: "三", action: "在搜索栏粘贴商品链接" },
    { step: "四", action: "点击查看详情查看商品" },
    { step: "五", action: "点击加橱窗，把商品加到自己的抖音橱窗" }
]);

const emit = defineEmits(["confirm", "update:modelValue"]);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "新手带货指南"
    },
    text: {
        type: String,
        default: "下载视频前请先将商品添加至橱窗哦"
    },
    confirm_text: {
        type: String,
        default: "立即前往"
    },
    confirm: {
        type: Boolean,
        default: false
    }
});
const actualModel = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});
// const actureShow = computed()
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            openDialog();
        } else {
            closeDialog();
        }
    }
);

function swiperChange(e) {
    swiperIndex.value = e.detail.current;
    aniPlay.value = true;
}
function aniRemove() {
    aniPlay.value = false;
}
function confirm() {
    emit("confirm");
    close();
}
function close() {
    guide.value.close();
    actualModel.value = false;
}
function openDialog() {
    guide.value.open();
}
function closeDialog() {
    guide.value.close();
}
defineExpose({
    show: () => {
        guide.value.open();
    },
    hide: () => {
        guide.value.close();
    }
});
</script>
<style scoped lang="scss">
@import "./common.scss";
</style>
