<template>
    <uni-popup ref="dialog" :type="type">
        <view class="dialog">
            <view class="dialog-upper">
                <view v-if="content" class="contetn">{{ content }}</view>
                <slot v-else></slot>
                <!-- <view class="content"> 您是否确认要注销账号？</view>
                <view class="content">确认请输入“我确认” </view>
                <input v-model="logoffText" class="input" type="text" /> -->
            </view>
            <view class="dialog-lower">
                <button class="btn cancel" @tap="onCancel">{{ cancelText }}</button>
                <button class="btn confirm" @tap="onConfirm">{{ confirmText }}</button>
            </view>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { ref, watch } from "vue";
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "center"
    },
    content: String,
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
    emit("cancel")
}
</script>

<style scoped lang="scss"></style>
