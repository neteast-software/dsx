<template>
    <scroll-view
        class="list"
        v-if="goodList.length"
        :scroll-y="disableScroll"
        @scrolltolower="nextList({ id: cateId })"
    >
        <good-info v-for="item in goodList" :key="item.id" :good-info="item" :has-dialog="false"></good-info>
    </scroll-view>
    <view class="empty" v-else>
        <image class="empty-img" src="@/assets/empty/noData.png" mode="widthFix"></image>
    </view>
</template>

<script setup lang="ts">
import { getGoodsList } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
import { onMounted, inject } from "vue";
import goodInfo from "@/components/goodInfo.vue";
const disableScroll: any = inject("disableScroll");
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getGoodsList);
const props = defineProps({
    cateId: {
        type: Number,
        required: true
    }
});
onMounted(() => {
    initList({ id: props.cateId });
});
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    .empty-img {
        width: 400rpx;
        height: 400rpx;
    }
}
</style>
