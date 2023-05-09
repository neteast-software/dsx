<template>
    <uni-popup ref="guide" type="center" @change="onChange">
        <view class="guide">
            <view class="title">{{ title }}</view>
            <view class="desc">请联系客服提升VIP等级</view>
            <view class="QRcode relative">
                <image class="pigeon" src="../assets/imgs/pigeon.png" mode="widthFix" />
                <image class="code-img" :src="user.qrCode" mode="aspectFit" />
            </view>
            <view class="btns">
                <button class="close" @tap="saveToAlbum(user.qrCode)">保存图片</button>
            </view>
            <button class="close-icon" @tap="close">x</button>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { onMounted } from "vue";
import { ref, computed, watch } from "vue";
import { saveImageToAlbum } from "@/utils/uniapi";
import { Toast } from "@/utils/uniapi";
import user from "@/store/user";
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "暂不支持合成"
    }
});
const emit = defineEmits(["save", "update:modelValue"]);
const actualModel = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});
const guide = ref<any>();
onMounted(() => {
    if (props.modelValue) {
        openDialog();
    }
});
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
function openDialog() {
    guide.value.open();
}
function closeDialog() {
    guide.value.close();
}
function close() {
    // guide.value.close();
    actualModel.value = false;
}
function saveToAlbum(url: string) {
    saveImageToAlbum(url)
        .then(() => {
            Toast("保存成功");
        })
        .catch(() => {
            Toast("保存失败");
        })
        .finally(() => {
            close();
        });
}
function onChange(e) {
    actualModel.value = e.show;
}
</script>

<style scoped lang="scss">
@import "./common.scss";
.QRcode {
    width: 388rpx;
    height: 388rpx;
    border-radius: 20rpx;
    background-color: #ffeed0;
    margin-bottom: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .pigeon {
        position: absolute;
        width: 144rpx;
        left: 0;
        bottom: 0;
        transform: translateX(-50%) translateY(20rpx);
    }
    .code-img {
        width: 332rpx;
        height: 332rpx;
        border-radius: 20rpx;
        overflow: hidden;
    }
}
</style>
