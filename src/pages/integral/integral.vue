<template>
    <view v-if="integralList.length" class="wrap grey small overflow-hidden">
        <scroll-view class="h-full" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
            <view class="header flex-center relative">
                <image class="bg" src="../../assets/imgs/integral-bg.png" mode="aspectFill"></image>
                <view class="relative flex-column-center available">
                    <view class="available-num">1226</view>
                    <view class="available-text">可用积分</view>
                </view>
                <view class="relative flex-column-center available">
                    <view class="available-num">122</view>
                    <view class="available-text">赠送积分</view>
                </view>
            </view>
            <view class="flex-center points-details">
                <view class="shape"></view>
                <view class="text">积分明细</view>
            </view>

            <view class="account flex-box" v-for="item in integralList" :key="item.id">
                <view class="share">
                    <text class="text-share">{{ item.useWayLabel }}</text>
                    <view class="data-surplus">
                        <text class="data">时间: {{ item.createTime }} </text>
                        <view class="surplus">
                            <text>剩余积分：</text>
                            <text class="text-surplus">{{ item.remainder || 0 }}</text>
                        </view>
                    </view>
                </view>
                <text class="text" :class="[item.type === '1' ? 'positive' : 'negative']"
                    >{{ item.type === "1" ? "+" : "-" }} {{ item.point }}</text
                >
            </view>
        </scroll-view>
    </view>
    <view v-else class="h-full bg-white flex-box">
        <image class="img-empty" src="@/assets/empty/noScore.png" mode="widthFix"></image>
    </view>
</template>

<script setup lang="ts">
import { onReady } from "@dcloudio/uni-app";
import { getIntegralList } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
const { initList, list: integralList, nextList } = usePaginator<IntegralRecord>(getIntegralList);
onReady(initList);
</script>

<style scoped lang="scss">
@import "./integral.scss";
</style>
