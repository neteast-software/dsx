<template>
    <!-- <view class="container"></view> -->
    <view class="container wrap grey flex-column overflow-hidden">
        <scroll-view class="flex-rest-height" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
            <view class="account flex-center" v-for="(fan, idx) in fansList" :key="idx">
                <view class="avatar-wrap relative">
                    <image v-if="fan.avatar" class="avatar" :src="fan.avatar" mode="aspectFill"></image>
                    <image v-else class="avatar" src="@/assets/imgs/avatar.png" mode="aspectFill"></image>
                    <image v-if="fan.vipLvl" class="crown" src="@/assets/imgs/user-crown.png" mode="scaleToFill" />
                </view>
                <view class="message flex-rest-width">
                    <view class="message-item flex-center">
                        <view class="name">{{ fan.nickname }}</view>
                        <view class="shopkeeper flex-shrink-0">店主</view>
                    </view>
                    <view class="tel">{{ fan.mobile }}</view>
                    <!-- <view class="stop">有效店铺数: 12</view> -->
                </view>
                <view class="copy-wrap flex-column">
                    <view class="copy" @tap="copyMobile(fan.username)">复制</view>
                    <view class="data">{{ fan.createTime }}</view>
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
function copyMobile(mobile: string) {
    uni.setClipboardData({
        data: mobile
        // success: () => {
        //     uni.showToast({
        //         title: "复制成功",
        //         icon: "none"
        //     });
        // }
    });
}
</script>

<style scoped lang="scss">
@import "./fan.scss";
</style>
