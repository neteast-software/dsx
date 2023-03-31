<template>
    <nav-bar></nav-bar>
    <view class="wrap grey small overflow-hidden">
        <scroll-view class="h-full" :scroll-y="true" :enable-flex="true" @scrolltolower="nextList">
            <view class="header flex-center relative">
                <image class="bg" src="../../assets/imgs/integral-bg.png" mode="aspectFill"></image>
                <view class="relative flex-column-center available">
                    <view class="available-num">{{ user.integral }}</view>
                    <view class="available-text">可用积分</view>
                </view>
                <view class="relative flex-column-center available">
                    <view class="available-num">{{ user.giftsPoints }}</view>
                    <view class="available-text">赠送积分</view>
                </view>
            </view>
            <view class="flex-center points-details">
                <view class="shape"></view>
                <view class="text">积分明细</view>
            </view>
            <button @tap="recharge(1)" style="color: #000">充值</button>

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
                <view class="h-full bg-white flex-box">
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
import { onReady } from "@dcloudio/uni-app";
import { getIntegralList, getIntegralRechargeList, rechargeIntegral } from "@/api/dsx/business";
import { usePaginator } from "@/utils/util";
import user from "@/store/user";
import { ref } from "vue";
import { wxRequestPayment } from "@/weapp/utils";
const { initList, list: integralList, nextList } = usePaginator<IntegralRecord>(getIntegralList);
onReady(initList);

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
<style scoped lang="scss">
@import "./integral.scss";
</style>
