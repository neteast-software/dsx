<template>
    <scroll-view class="list" :scroll-y="true" @scrolltolower="nextList">
        <good-info v-for="item in goodList" :key="item.id" :good-info="item" :has-dialog="false"></good-info>
    </scroll-view>
</template>

<script setup lang="ts">
import { getAllGoodsLists } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
import { onMounted } from "vue";
import goodInfo from "@/components/goodInfo.vue";
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getAllGoodsLists);

onMounted(() => {
    initList();
});
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    height: 100%;
}
</style>
