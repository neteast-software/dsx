<template>
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
import { statusBarHeight } from "@/utils/systemInfo";
</script>

<style scoped>
.status-bar {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 999;
}
</style>
