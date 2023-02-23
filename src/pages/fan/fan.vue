<template>
    <view class="wrap grey flex-column overflow-hidden">
        <scroll-view class="flex-rest-height" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
            <view class="account flex-center" v-for="fan in fansList">
                <image class="avatar" src="@/static/manage/avatar1.png" mode="aspectFill"></image>
                <view class="message flex-rest-width">
                    <view class="message-item flex-center">
                        <view class="name">{{ fan.nickname }}</view>
                        <view class="shopkeeper">店主</view>
                    </view>
                    <view class="tel">{{ fan.mobile }}</view>
                    <view class="stop">有效店铺数: 12</view>
                </view>
                <view class="copy-wrap flex-column">
                    <view class="copy">复制</view>
                    <view class="data">2023.02.17. 11:58:21</view>
                </view>
            </view>
        </scroll-view>

        <view class="invite flex-center">
            <view class="recommender flex-center">
                <image class="img-recommender" mode="widthFix" src="@/static/manage/recommender.png"></image>
                <text>我的邀请人为：</text>
            </view>
            <view>
                <text>{{ user.inviteNickname }} {{ user.inviteUserMobile }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getFansList } from "@/api/dsx/business";
import { onReady } from "@dcloudio/uni-app";
import { usePaginator } from "@/utils/util";
import user from "@/store/user";
const { initList, list: fansList, nextList } = usePaginator<FanInfo>(getFansList);
onReady(initList);
</script>

<style scoped lang="scss">
@import "./fan.scss";
</style>
