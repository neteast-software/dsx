<template>
    <view id="navbar" :style="{ background: `rgba(255, 255, 255, ${opaticy})` }">
        <nav-bar title="我的积分" ext-class="transparent" background-color="transparent"></nav-bar>
    </view>
    <view class="header relative flex-column">
        <view class="flex-rest-height flex-all-center">
            <view class="total relative flex-column-center">
                <view class="label">总积分</view>
                <view class="value">
                    {{ user.integral }}
                    <view class="btn recharge">充值</view>
                </view>
            </view>
        </view>
        <view class="flex-center header-bottom">
            <view class="relative flex-column-center available">
                <view class="available-text">充值积分</view>
                <view class="available-num">{{ user.integral - user.giftsPoints }}</view>
            </view>
            <view class="relative flex-column-center available">
                <view class="available-text">赠送积分</view>
                <view class="available-num">{{ user.giftsPoints }}</view>
            </view>
        </view>
    </view>
    <view class="main overflow-hidden" style="padding-bottom: 50px">
        <view class="flex-center points-details" :style="{ top: '0' }">
            <view class="shape"></view>
            <view class="text">积分明细</view>
        </view>
        <scroll-view
            v-if="scrollViewHeight"
            class="scroll-box"
            :style="{ height: scrollViewHeight + 'px' }"
            :scroll-y="canScroll"
            :enable-flex="true"
            @scrolltolower="nextList"
            @scrolltoupper="onScrollToUpper"
        >
            <template v-if="integralList.length">
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
            </template>
            <template v-else>
                <view class="h-full flex-box">
                    <image class="img-empty" src="@/assets/empty/noScore.png" mode="widthFix"></image>
                </view>
            </template>
        </scroll-view>
    </view>
    <uni-popup ref="popup" type="bottom">
        <view class="pop-wrap"> </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import navBar from "@/components/navBar.vue";
import { onReady, onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { getIntegralList, getIntegralRechargeList, rechargeIntegral } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
import user from "@/store/user";
import { ref } from "vue";
import { wxRequestPayment } from "@/weapp/utils";
import { getNodeInfo } from "@/utils/uniapi";
import { windowHeight } from "@/utils/systemInfo";
const { initList, list: integralList, nextList } = usePaginator<IntegralRecord>(getIntegralList);
onReady(initList);
user.initUserInfo();

// 页面滚动改变navbar透明度
const navBarHeight = ref(0);
const opaticy = ref(0);
const scrollViewHeight = ref(0);
const tipTop = ref(0);
const canScroll = ref(false);
async function initNavbarInfo() {
    const { height } = await getNodeInfo("#navbar");
    const { height: tipHeight = 0, top } = await getNodeInfo(".points-details");
    tipTop.value = top || 0;
    navBarHeight.value = height || 0;
    scrollViewHeight.value = windowHeight - navBarHeight.value - tipHeight - 50;
}
onReady(initNavbarInfo);
onPageScroll(({ scrollTop }) => {
    if (!navBarHeight) return;
    if (scrollTop < navBarHeight.value * 2) {
        opaticy.value = scrollTop / navBarHeight.value / 2;
    } else {
        opaticy.value = 1;
    }
});
function onScrollToUpper() {
    canScroll.value = false;
}
onReachBottom(() => {
    canScroll.value = true;
});

// 充值
const popup = ref();
onReady(initRechargeList);
async function initRechargeList() {
    const data = await getIntegralRechargeList();
    console.log(data);
}
async function recharge(id = 1) {
    const { data } = await rechargeIntegral(id);
    wxRequestPayment(data);
    console.log(data);
}
</script>
<style>
page {
    background-color: #f7f8fa;
}
</style>
<style scoped lang="scss">
@import "./integral.scss";
</style>
