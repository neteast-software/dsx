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
                    <view class="btn recharge" @tap="showRechargeList">充值</view>
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
    <view class="main overflow-hidden" style="padding-bottom: 20px">
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
            :upper-threshold="0"
            @scrolltolower="nextList"
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
        <view class="pop-wrap flex-column-center">
            <view class="bg"></view>
            <view class="pop-content flex-column-center">
                <image class="popup-text" src="@/assets/imgs/payText.svg" mode="widthFix" />
                <view class="pop-box">
                    <view
                        class="popup-item flex-column-all-center"
                        :class="{ active: item.id === activeRecharge }"
                        v-for="item in rechargeList"
                        @tap="changeActive(item.id)"
                        :key="item.id"
                    >
                        <view class="flex-center money">
                            <view class="sign-money">¥</view>
                            <view>{{ item.amount }}</view>
                        </view>
                        <view class="flex-center">
                            <image class="currency-img" src="@/assets/icons/currency.png" mode="widthFix"></image>
                            <view class="currency-text">{{ item.totalPoints }}积分</view>
                        </view></view
                    >
                </view>
                <button class="popup-btn" @tap="recharge(activeRecharge)">确定</button>
            </view>
            <image
                @tap="closeRechargeList"
                class="popup-close"
                src="@/assets/icons/close.svg"
                mode="scaleToFill"
            ></image>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import navBar from "@/components/navBar.vue";
import { onReady, onPageScroll, onReachBottom, onShow } from "@dcloudio/uni-app";
import { getIntegralList, getIntegralRechargeList, rechargeIntegral } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
import user from "@/store/user";
import { ref } from "vue";
import { wxRequestPayment } from "@/weapp/utils";
import { getNodeInfo } from "@/utils/uniapi";
import router from "@/utils/router";
import { useDebounceFn } from "@vueuse/shared";
// 初始化页面数据
const { initList, list: integralList, nextList } = usePaginator<IntegralRecord>(getIntegralList);
onShow(() => {
    initList();
    user.initUserInfo();
});

// 页面滚动改变navbar透明度
const navBarHeight = ref(0);
const opaticy = ref(0);
const scrollViewHeight = ref(0);
const canScroll = ref(false);
async function initNavbarInfo() {
    const { height } = await getNodeInfo("#navbar");
    const { height: tipHeight = 0 } = await getNodeInfo(".points-details");
    navBarHeight.value = height || 0;
    // console.log("巴拉巴拉", uni.getSystemInfoSync());
    const { windowHeight } = uni.getSystemInfoSync();
    console.log("一系列高度", windowHeight, navBarHeight.value, tipHeight);
    scrollViewHeight.value = windowHeight - navBarHeight.value - tipHeight - 20;
}
onReady(initNavbarInfo);
const setScrollStatus = useDebounceFn(async () => {
    const { top = 0 } = await getNodeInfo(".points-details");
    if (top <= navBarHeight.value + 5) {
        canScroll.value = true;
    } else {
        canScroll.value = false;
    }
}, 100);
onPageScroll(({ scrollTop }) => {
    if (!navBarHeight.value) return;
    if (scrollTop < navBarHeight.value * 2) {
        opaticy.value = scrollTop / navBarHeight.value / 2;
    } else {
        opaticy.value = 1;
    }
    setScrollStatus();
});

// 充值
const popup = ref();
const activeRecharge = ref(0);
onReady(initRechargeList);
const rechargeList = ref<IntegralRechargeListItem[]>([]);
async function initRechargeList() {
    const { data } = await getIntegralRechargeList();
    rechargeList.value = data;
    activeRecharge.value = data[0].id;
}
function changeActive(id: number) {
    activeRecharge.value = id;
}
function showRechargeList() {
    popup.value.open();
}
function closeRechargeList() {
    popup.value.close();
}
async function recharge(id = 1) {
    const { data } = await rechargeIntegral(id);
    await wxRequestPayment(data);
    closeRechargeList();
    router.push("paySuccess");
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
