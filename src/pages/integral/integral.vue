<template>
    <view class="wrap grey small overflow-hidden">
        <scroll-view class="h-full" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
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
