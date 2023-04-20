<template>
    <uni-popup ref="guide" type="center" @change="onChange">
        <view class="guide">
            <view class="title">获取更多课程</view>
            <view class="desc">请联系客服或下载星选直播</view>
            <view class="QRcode relative">
                <image class="pigeon" src="../assets/imgs/pigeon.png" mode="widthFix" />
                <image class="code-img" :src="xxzbUrl" mode="aspectFit" />
                <text class="code-text" style="margin-bottom: 42rpx">扫码下载 星选直播</text>
                <image class="code-img" :src="user.qrCode" mode="aspectFit" />
                <text class="code-text">客服微信</text>
            </view>
            <view class="btns">
                <button class="close" @tap="saveAll">保存图片</button>
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
const xxzbUrl = ref("https://dsxmanager.huoyuanyouxuan.com/profile/upload/2023/04/20/xxzb_20230420182816A002.png");
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
async function saveAll() {
    const p1 = saveImageToAlbum(xxzbUrl.value);
    const p2 = saveImageToAlbum(user.qrCode);
    // close();
    Promise.all([p1, p2]).finally(() => {
        close();
    });
    //     .then(() => {
    //         Toast("保存成功");
    //     })
    //     .catch(() => {
    //         Toast("保存失败");
    //     })
    //     .finally(() => {
    //         close();
    //     });
}
// function saveToAlbum(url: string) {
//     saveImageToAlbum(url)
//         .then(() => {
//             Toast("保存成功");
//         })
//         .catch(() => {
//             Toast("保存失败");
//         })
//         .finally(() => {
//             close();
//         });
// }
function onChange(e) {
    actualModel.value = e.show;
}
</script>

<style scoped lang="scss">
@import "./common.scss";
.QRcode {
    width: 388rpx;
    // height: 388rpx;
    border-radius: 20rpx;
    background-color: #ffeed0;
    margin-bottom: 50rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 50rpx 0;
    // justify-content: center;
    .pigeon {
        position: absolute;
        width: 144rpx;
        left: 0;
        bottom: 0;
        transform: translateX(-50%) translateY(20rpx);
    }
    .code-img {
        width: 196rpx;
        height: 196rpx;
        border-radius: 20rpx;
        overflow: hidden;
    }
    .code-text {
        font-size: 28rpx;
        line-height: 42rpx;
        color: #7b7379;
        margin-top: 10rpx;
    }
}
</style>
