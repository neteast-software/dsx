<template>
    <Header></Header>
    <Banner></Banner>
    <Recommend></Recommend>
    <GoodsList></GoodsList>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Header from "./header.vue";
import Banner from "./banner.vue";
import Recommend from "./recommend.vue";
import GoodsList from "./goods_list.vue";
</script>

<style scoped lang="scss">
page {
    background-image: linear-gradient(180deg, #fde4d8 1%, rgba(247, 248, 250, 1) 20%);
    background-size: 100% 100%;
}
</style>
