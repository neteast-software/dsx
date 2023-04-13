<template>
    <scroll-view class="stage" scroll-y @scroll="onScroll">
        <template v-if="user.logined">
            <!-- <status-bar></status-bar> -->
            <view id="nav" style="position: sticky; top: 0; z-index: 9999">
                <NavBar ext-class="indexNav">
                    <Header></Header>
                </NavBar>
            </view>
            <view class="item">
                <search></search>
                <Banner></Banner>
                <iconsWrapper></iconsWrapper>
                <Recommend></Recommend>
            </view>
            <view id="goods" class="h-full goodlist-wrap">
                <GoodsList></GoodsList>
            </view>
        </template>
    </scroll-view>
    <user-guide
        v-model="showDialog"
        :confirm="true"
        :title="'带货指南'"
        :text="'您已复制商品链接，请前往添加至橱窗'"
        @confirm="toDouyin"
    ></user-guide>
    <Congratulation v-model="showCongratulation" @close="confirmUpgrade"></Congratulation>
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
import { onShareAppMessage, onReady, onShow } from "@dcloudio/uni-app";
import user from "@/store/user";
import search from "./search.vue";
import iconsWrapper from "./icons-wrapper.vue";
import UserGuide from "@/components/user_guide.vue";
import Congratulation from "@/components/congratulation.vue";
import { useVipUpgrade } from "@/mixins/vip";
const { showCongratulation, checkVipUpgrade, confirmUpgrade } = useVipUpgrade();
onShow(checkVipUpgrade);

const showDialog = ref(false);
provide("showDialog", showDialog);
let navHeight = 0;
const disableScroll = ref(false);
provide("disableScroll", disableScroll);
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
onShow(() => {
    console.log("index onShow");
    user.initUserInfo();
});
onReady(async () => {
    const { height } = await getNodeInfo("#nav");
    navHeight = height || 0;
});
const timer = ref<NodeJS.Timer>();
function onScroll(e) {
    let timeOut = 50;
    // #ifdef APP-PLUS
    timeOut = 20;
    // #endif
    // #ifdef MP-WEIXIN
    timeOut = 100;
    // #endif
    if (timer.value) {
        clearTimeout(timer.value);
    }
    timer.value = setTimeout(() => {
        setScrollStatus();
    }, timeOut);
}
async function setScrollStatus() {
    const { top = 0 } = await getNodeInfo("#goods");
    if (top <= navHeight + 5) {
        disableScroll.value = true;
    } else {
        disableScroll.value = false;
    }
}
</script>

<style>
page {
    height: 100%;
    background: #f7f8fa;
}
</style>
<style scoped lang="scss">
.stage {
    height: 100%;
    // background-image: linear-gradient(180deg, rgba(253, 228, 216, 1) 1%, rgba(247, 248, 250, 1) 20%);
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
}
// .goodlist-wrap {
//     position: sticky;
//     top: 200rpx;
// }

.item {
    padding: 0 32rpx;
}
</style>
