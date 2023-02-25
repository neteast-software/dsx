<template>
    <view class="wrap small">
        <good-info></good-info>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GoodInfo from "@/components/goodInfo.vue";
import { usePaginator } from "@/utils/util";
</script>

<style scoped></style>
