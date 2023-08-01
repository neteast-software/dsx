<template>
    <view class="wrap small">
        <status-bar></status-bar>
        <!-- #ifdef APP-PLUS -->
        <view class="header flex-center">
            <view class="search-input flex-center">
                <view class="line"></view>
                <input type="text" v-model="keyword" placeholder="请搜索内容" @confirm="initList({ keyword })" />
            </view>
            <view @tap="back">取消</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="header flex-center weapp" :style="{ top: `${statusBarHeight}px` }">
            <view class="back-wrap" @tap="back">
                <uni-icons type="back" size="24"></uni-icons>
            </view>
            <view class="search-input weapp flex-center">
                <view class="line"></view>
                <input type="text" v-model="keyword" placeholder="请搜索内容" @confirm="initList({ keyword })" />
            </view>
        </view>
        <!-- #endif -->
        <scroll-view class="list" :scroll-y="true" @scrolltolower="nextList">
            <good-info v-for="good in goodList" :key="good.id" :good-info="good"></good-info>
            <Empty v-if="!loading && !goodList.length"></Empty>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import statusBar from "@/components/statusBar.vue";
import { usePaginator } from "@/utils/util";
import { getSearchGoodsList } from "@/api/dsx/business";
import GoodInfo from "@/components/goodInfo.vue";
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { statusBarHeight } from "@/utils/systemInfo";
import Empty from "@/components/empty.vue";
const { list: goodList, initList, nextList, loading } = usePaginator<GoodInfo>(getSearchGoodsList);
const keyword = ref("");
function resetKeyword() {
    keyword.value = "";
    initList({ keyword: "" });
}
function back() {
    router.back();
}
watch(loading, (isLoading) => {
    if (!isLoading) {
        uni.hideLoading();
    } else {
        uni.showLoading({ title: "加载中" });
    }
});
</script>

<style scoped lang="scss">
@import "@/styles/goods.scss";
@import "./search.scss";
</style>
