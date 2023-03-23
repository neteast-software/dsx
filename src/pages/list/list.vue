<template>
    <view class="flex-column h-full">
        <nav-bar :title="title"></nav-bar>
        <scroll-view
            v-if="goodList.length"
            class="flex-rest-height p-x-32"
            scroll-y
            @scrolltolower="nextList({ listType })"
        >
            <good-info v-for="good in goodList" :key="good.id" :good-info="good"></good-info>
        </scroll-view>
        <empty v-else></empty>
    </view>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { ListType } from "@/config/enum";
import { usePaginator } from "@/utils/util";
import { getGoodListByListType } from "@/api/dsx/business";
import GoodInfo from "@/components/goodInfo.vue";
import empty from "@/components/empty.vue";
const title = ref("");
const listType = ref("");
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getGoodListByListType);
onLoad((options) => {
    listType.value = options?.listType || "";
    title.value = ListType[listType.value];
    initList({ listType: listType.value });
});
</script>

<style scoped lang="scss">
@import "./list.scss";
</style>
