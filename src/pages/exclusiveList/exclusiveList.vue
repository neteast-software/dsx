<template>
    <view class="wrap small">
        <scroll-view class="h-full" scroll-y @scrolltolower="nextList({ isExclusive: '1' })">
            <good-info v-for="good in goodList" :key="good.id" :good-info="good"></good-info>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import GoodInfo from "@/components/goodInfo.vue";
import { usePaginator } from "@/utils/util";
import { getSearchGoodsList } from "@/api/dsx/business";
import { onReady } from "@dcloudio/uni-app";
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getSearchGoodsList);
onReady(async () => {
    await initList({ isExclusive: "1" });
});
</script>

<style scoped lang="scss">
@import "./exclusiveList.scss";
.h-full {
    padding-top: 40rpx;
}
</style>
