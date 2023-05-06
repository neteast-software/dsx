<template>
    <view class="wrap small grey">
        <view class="signbar flex-between relative" @tap="showApply">
            <image class="bg" src="@/assets/imgs/sign-bg.png" mode="aspectFill"></image>
            <view class="flex-center relative">
                <image class="vip" src="@/assets/icons/vip.png" mode="widthFix"></image>
                <text class="font-middle">签约管理</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import user from "@/store/user";
import { APP_VERSION } from "@/config/env";
import { Toast } from "@/utils/uniapi";
import { onReady, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getCache, clearCache } from "@/utils/util";
import { statusBarHeight } from "@/utils/systemInfo";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { doApply, getVipUpgradeMsg } from "@/api/dsx/business";
import Congratulation from "@/components/congratulation.vue";
import { useVipUpgrade } from "@/mixins/vip";
</script>

<style scoped lang="scss">
@import "./videoChoose.scss";
</style>
