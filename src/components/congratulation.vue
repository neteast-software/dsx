<template>
    <uni-popup ref="guide" type="center">
        <view class="guide">
            <image class="crown" src="@/assets/imgs/crown.png" mode="widthFix" />
            <view class="title">恭喜您成为VIP</view>
            <view class="desc">{{ desc }}</view>
            <view class="btns">
                <button class="close" @tap="close">我知道了</button>
            </view>
            <button class="close-icon" @tap="close">x</button>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { onMounted } from "vue";
import { ref, computed, watch } from "vue";
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});
const desc = `您已成功升级为尊贵的VIP会员，解锁以下权限
1、完全解锁视频合成，不受次数限制
2、可观看专属VIP课程，该权限只有VIP可以享受。`;
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
    guide.value.close();
    actualModel.value = false;
}
</script>

<style scoped lang="scss">
@import "./common.scss";
.guide {
    padding-top: 160rpx;
    padding-bottom: 106rpx;
}
.title {
    margin-bottom: 52rpx;
}
.desc {
    text-align: left;
    margin-bottom: 58rpx;
}
.crown {
    position: absolute;
    width: 314rpx;
    height: 314rpx;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
}
</style>
