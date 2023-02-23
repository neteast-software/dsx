<template>
    <view class="wrap grey flex-column">
        <scroll-view class="flex-rest-height" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
            <view class="account flex-center" v-for="fan in numList">
                <image class="avatar" src="@/static/manage/avatar1.png" mode="aspectFill"></image>
                <view class="message flex-rest-width">
                    <view class="message-item flex-center">
                        <view class="name">{{ fan }}</view>
                        <view class="shopkeeper">店主</view>
                    </view>
                    <view class="tel">138 **** 1954</view>
                    <view class="stop">有效店铺数: 12</view>
                </view>
                <view class="copy-wrap flex-column">
                    <view class="copy">复制</view>
                    <view class="data">2023.02.17. 11:58:21</view>
                </view>
            </view>
        </scroll-view>

        <!-- <view class="account flex-center">
            <image class="avatar" src="@/static/manage/avatar1.png" mode="aspectFill"></image>
            <view class="message flex-rest-width">
                <view class="message-item flex-center">
                    <view class="name">王大锤</view>
                    <view class="shopkeeper">店主</view>
                </view>
                <view class="tel">138 **** 1954</view>
                <view class="stop">有效店铺数: 12</view>
            </view>
            <view class="copy-wrap flex-column">
                <view class="copy">复制</view>
                <view class="data">2023.02.17. 11:58:21</view>
            </view>
        </view> -->
        <view class="invite flex-center">
            <view class="recommender flex-center">
                <image class="img-recommender" mode="widthFix" src="@/static/manage/recommender.png"></image>
                <text>我的邀请人为：</text>
            </view>
            <view>
                <text>王大锤一号 138 **** 2344</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getFansList } from "@/api/dsx/business";
import { onReady } from "@dcloudio/uni-app";
import { ref, toRaw, onMounted } from "vue";
import { usePaginator } from "@/utils/util";
const { initList, list: fansList } = usePaginator<FanInfo>(getFansList);
// const fansList = ref([]);
// async function initData() {
//     const data = await getFansList();
//     console.log(data);
// }
const list = ref<FanInfo[]>([]);
const initData = async () => {
    const { rows } = await getFansList();
    list.value = rows;
};
function nextList() {
    console.log("list");
}
const numList = ref<number[]>([]);
onMounted(async () => {
    numList.value = [1, 2, 3, 4, 5];
    await initData();
    console.log(toRaw(list.value));
});
</script>

<style scoped lang="scss">
@import "./fan.scss";
</style>
