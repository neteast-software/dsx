<template>
    <view class="details">
        <view class="title">
            <view class="h1">{{ detail?.title || "" }}</view>
            <text class="time">{{ detail?.createTime || "" }}</text>
        </view>
        <view class="text-content">
            <text style="white-space: pre-line">{{ detail?.content || "" }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getMsgDetail } from "@/api/dsx/business";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
onLoad((options) => {
    const id = options?.id;
    initData(id);
});
const detail = ref<MsgDetail>();
async function initData(id: string) {
    const { data } = await getMsgDetail(id);
    detail.value = data;
}
</script>

<style scoped lang="scss">
@import "./newsDetail.scss";
</style>
