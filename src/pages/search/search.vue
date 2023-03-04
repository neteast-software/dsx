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
        <view class="header flex-center weapp">
            <view class="back-wrap" @tap="back">
                <uni-icons type="back" size="24"></uni-icons>
            </view>
            <view class="search-input weapp flex-center">
                <view class="line"></view>
                <input type="text" v-model="keyword" placeholder="请搜索内容" @confirm="initList({ keyword })" />
            </view>
        </view>
        <!-- #endif -->
        <good-info v-for="good in goodList" :key="good.id" :good-info="good"></good-info>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import statusBar from "@/components/statusBar.vue";
import { usePaginator } from "@/utils/util";
import { getSearchGoodsList } from "@/api/dsx/business";
import GoodInfo from "@/components/goodInfo.vue";
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getSearchGoodsList);
const keyword = ref("");
function resetKeyword() {
    keyword.value = "";
    initList({ keyword: "" });
}
function back() {
    router.back();
}
</script>

<style scoped lang="scss">
@import "@/styles/goods.scss";
@import "./search.scss";
</style>
