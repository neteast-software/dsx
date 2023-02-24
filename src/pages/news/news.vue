<template>
    <view class="wrap small grey pb-32">
        <view class="group" v-for="item in msgList" :key="item.id">
            <view class="data flex-between">
                <view class="time">{{ item.createTime }}</view>
            </view>
            <view class="information" @tap="toNewsDetail(item.id)">
                <view class="header flex-between">
                    <view class="flex-between">
                        <image class="img-news" src="@/assets/imgs/news.png"></image>
                        <view class="text-news">平台咨询</view>
                    </view>
                    <view class="look flex-between">
                        <view class="check">查看详情</view>
                        <uni-icons type="forward" size="17"></uni-icons>
                    </view>
                </view>
                <view class="content">
                    <view>{{ item.title || "" }}</view>
                    <text class="text-content" style="white-space: pre-line">{{ item.content }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { getMsgList } from "@/api/dsx/business";
import { onReady } from "@dcloudio/uni-app";
import { usePaginator } from "@/utils/util";
import router from "@/utils/router";
const { initList, list: msgList, nextList } = usePaginator<MsgInfo>(getMsgList);
onReady(initList);
function toNewsDetail(id: string) {
    router.push("newsDetail", { query: { id } });
}
</script>

<style scoped lang="scss">
@import "./news.scss";
</style>
