<template>
    <view>
        <nav-bar title="AI视频"></nav-bar>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import navBar from "@/components/navBar.vue";
const pages = getCurrentPages();
console.log(pages);
// router.push("videoChoose");
</script>

<style scoped></style>
