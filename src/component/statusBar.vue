<template>
    <view :style="{ height: statusBarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
import { statusBarHeight } from "@/utils/systemInfo";
</script>

<style scoped></style>
