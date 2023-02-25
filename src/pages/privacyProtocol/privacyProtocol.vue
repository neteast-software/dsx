<template>
    <view class="protocol">
        <rich-text :nodes="content"></rich-text>
    </view>
</template>

<script setup lang="ts">
import { getPrivacyAgreement } from "@/api/dsx/business";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
const content = ref("");
async function initData() {
    const { data } = await getPrivacyAgreement();
    content.value = data;
}
onReady(initData);
</script>

<style scoped lang="scss">
.protocol {
    padding: 64rpx;
    background-color: #fff;
    color: $uni-text-color;
}
</style>
