<template>
    <!-- #ifdef MP-WEIXIN -->
    <page-meta page-style="height: 100%;background: #f7f8fa;">
        <!-- #endif -->
        <scroll-view class="stage" scroll-y @scroll="onScroll">
            <!-- <status-bar></status-bar> -->
            <view style="position: sticky; top: 0; z-index: 9999">
                <NavBar>
                    <Header></Header>
                </NavBar>
            </view>
            <Banner></Banner>
            <Recommend></Recommend>
            <view id="goods" class="h-full goodlist-wrap">
                <GoodsList></GoodsList>
            </view>
        </scroll-view>
        <Dialog
            :show="showDialog"
            :content="dialogContent"
            confirm-text="立即前往"
            @confirm="toDouyin"
            @cancel="hideDialog"
        ></Dialog>
        <!-- #ifdef MP-WEIXIN -->
    </page-meta>
    <!-- #endif -->
</template>

<script setup lang="ts">
import Header from "./header.vue";
import Banner from "./banner.vue";
import Recommend from "./recommend.vue";
import GoodsList from "./goods_list.vue";
import NavBar from "@/components/navBar.vue";
import Dialog from "@/components/dialog.vue";
import { provide, ref } from "vue";
import { goDouyin } from "@/utils/util";
import { getNodeInfo } from "@/utils/uniapi";
import { onShareAppMessage, onReady } from "@dcloudio/uni-app";
import user from "@/store/user";

const showDialog = ref(false);
provide("showDialog", showDialog);
const dialogContent = ref("您已复制商品链接\n是否立刻前往抖音加入橱窗");
function hideDialog() {
    showDialog.value = false;
}
function toDouyin() {
    // #ifdef APP-PLUS
    goDouyin();
    // #endif
    showDialog.value = false;
}
onShareAppMessage(() => {
    return {
        title: "抖省心",
        path: "/pages/index/index"
    };
});
function onScroll(e) {
    console.log("onScroll", e.detail);
}
onReady(() => {
    user.initUserInfo();
});
onReady(() => {
    const query = uni.createSelectorQuery();
    console.log("query", query);
    query
        .select("#goods")
        .boundingClientRect((data) => {
            console.log("data", data);
        })
        .exec();
});
function getGoodsTop() {
    return new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery();
        query
            .select("#goods")
            .boundingClientRect((data) => {
                resolve(data);
            })
            .exec();
    });
}
</script>

<style scoped lang="scss">
.stage {
    height: 100%;
    // background-image: linear-gradient(180deg, #fde4d8 1%, rgba(247, 248, 250, 1) 20%);
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
}
// .goodlist-wrap {
//     position: sticky;
//     top: 200rpx;
// }
</style>
