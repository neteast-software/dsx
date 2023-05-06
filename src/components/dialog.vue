<template>
    <uni-popup ref="dialog" :type="type">
        <view class="dialog">
            <view class="dialog-upper">
                <view v-if="content" class="content">{{ content }}</view>
                <slot v-else></slot>
                <!-- <view class="content"> 您是否确认要注销账号？</view>
                <view class="content">确认请输入“我确认” </view>
                <input v-model="logoffText" class="input" type="text" /> -->
            </view>
            <view class="dialog-lower" v-if="showBtn">
                <button class="btn cancel" @tap="onCancel">{{ cancelText }}</button>
                <button class="btn confirm" @tap="onConfirm">{{ confirmText }}</button>
            </view>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { ref, watch, onMounted } from "vue";
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    content: String,
    type: {
        type: String,
        default: "center"
    },
    showBtn: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: String,
        default: "取消"
    },
    confirmText: {
        type: String,
        default: "确定"
    }
});
watch(
    () => props.show,
    (val) => {
        if (val) {
            openDialog();
        } else {
            closeDialog();
        }
    }
);
onMounted(() => {
    if (props.show) {
        openDialog();
    }
});
const emit = defineEmits(["confirm", "cancel"]);
const dialog = ref<any>(null);
function closeDialog() {
    if (!dialog.value) return;
    dialog.value.close();
}
function openDialog() {
    if (!dialog.value) return;
    dialog.value.open();
}
function onConfirm() {
    emit("confirm");
}
function onCancel() {
    emit("cancel");
}
</script>

<style scoped lang="scss">
.dialog {
    background-color: #fff;
    width: 608rpx;
    border-radius: 36rpx;
    color: #2a2b2c;
    .dialog-upper {
        padding: 46rpx 32rpx;
    }
    .content {
        white-space: pre-line;
        text-align: center;
        font-size: $uni-font-size-middle;
    }
    .input {
        text-align: center;
        width: 100%;
        height: 98rpx;
        line-height: 98rpx;
        background-color: #f0f2f5;
        border-radius: 30rpx;
        margin-top: 32rpx;
    }
    .dialog-lower {
        display: flex;
        height: 120rpx;
        border-top: 1rpx solid #f3f6fc;
        .btn {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            &:not(:last-child) {
                border-right: 1rpx solid #f3f6fc;
            }
            &.confirm {
                color: $uni-color-primary;
            }
            &.cancel {
                color: #3d3d3d;
            }
        }
    }
}
</style>
