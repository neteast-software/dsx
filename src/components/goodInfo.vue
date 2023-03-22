<template>
    <view class="goods" @tap="toGoodDetail(goodInfo.id)">
        <image class="cover" :src="goodInfo.images" mode="aspectFit" />
        <view class="info">
            <view class="row">
                <view v-if="Number(goodInfo.isExclusive)" class="label">
                    <image src="@/static/index/label.svg" />
                    <view>专属高佣</view>
                </view>
                <view class="title">{{ goodInfo.name }}</view>
            </view>
            <view class="row detail">
                <view>售价: {{ goodInfo.price }}</view>
                <view>销量: {{ goodInfo.saleCount }}</view>
            </view>
            <view class="row money">
                <view class="percent"
                    >{{ Number(goodInfo.isHigh) ? "高佣" : "佣金" }}{{ goodInfo.commissionRatio }}%</view
                >
                <view class="profit">
                    赚：¥
                    <view>{{ ((goodInfo.price * goodInfo.commissionRatio) / 100).toFixed(2) }}</view>
                </view>
            </view>
        </view>
        <button class="add-btn" type="button" @tap.stop="copyToClipboard(goodInfo.coalitionUrl)">加橱窗</button>
    </view>
    <!-- <Dialog
        v-if="hasDialog"
        :show="showDialog"
        :content="dialogContent"
        confirm-text="立即前往"
        @confirm="toDouyin"
        @cancel="hideDialog"
    ></Dialog> -->
    <user-guide
        v-model="showDialog"
        :confirm="true"
        :title="'带货指南'"
        :text="'您已复制商品链接，请前往添加至橱窗'"
        @confirm="toDouyin"
    ></user-guide>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import Dialog from "./dialog.vue";
import { ref, inject } from "vue";
import { goDouyin } from "@/utils/util";
import UserGuide from "@/components/user_guide.vue";
const props = defineProps({
    goodInfo: {
        type: Object,
        default: () => {}
    },
    hasDialog: {
        type: Boolean,
        default: true
    }
});
function toGoodDetail(id: number) {
    router.push("goodDetail", { query: { id } });
}
const topShow: any = props.hasDialog ? false : inject("showDialog");
// 加橱窗
const showDialog = ref(false);
// const dialogContent = ref("您已复制商品链接\n是否立刻前往抖音加入橱窗");
function copyToClipboard(coalitionUrl: string) {
    console.log("复制内容", coalitionUrl);
    uni.setClipboardData({
        data: coalitionUrl,
        showToast: false,
        success: () => {
            console.log("复制成功");
            if (props.hasDialog) {
                showDialog.value = true;
            } else if (topShow && !props.hasDialog) {
                topShow.value = true;
            }
        }
    });
}
function hideDialog() {
    // (ug.value as DuckActions).hide();
    showDialog.value = false;
}
function toDouyin() {
    // #ifdef APP-PLUS
    goDouyin();
    // #endif
    showDialog.value = false;
}
</script>

<style scoped lang="scss">
.goods {
    position: relative;
    display: flex;
    margin-bottom: 50rpx;
    .cover {
        width: 160rpx;
        height: 160rpx;
        flex-shrink: 0;
        border-radius: 26rpx;
    }
    .info {
        padding-left: 16rpx;
        .row {
            display: flex;
            white-space: nowrap;
            .label {
                position: relative;
                width: 120rpx;
                height: 42rpx;
                color: #fff;
                image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                view {
                    width: 120rpx;
                    text-align: center;
                    white-space: nowrap;
                    position: relative;
                    font-size: 20rpx;
                    height: 100%;
                    line-height: 44rpx;
                }
            }
            .title {
                width: 380rpx;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 28rpx;
            }
        }
        .detail {
            & > view {
                display: flex;
                color: #7b7379;
                margin: 15rpx 0;
                font-size: 24rpx;
                &:last-child {
                    margin-left: 46rpx;
                }
            }
        }
        .money {
            align-items: center;
            height: 42rpx;
            font-size: 24rpx;
            margin-top: 20rpx;
            .percent {
                color: #e93798;
                background-color: rgba(#e93798, 0.1);
                line-height: 40rpx;
                border: #e93798 1rpx solid;
                border-radius: 20rpx;
                min-width: 136rpx;
                text-align: center;
            }
            .profit {
                color: #f03737;
                font-size: 24rpx;
                display: flex;
                margin-left: 24rpx;
                line-height: 40rpx;
                align-items: baseline;
                view {
                    font-size: 36rpx;
                    font-weight: bold;
                }
            }
        }
    }
    .add-btn {
        position: absolute;
        right: 30rpx;
        bottom: 0;
        min-width: 138rpx;
        height: 58rpx;
        background: linear-gradient(180deg, #fd5bb4 10%, #f92e9e 100%);
        border-radius: 220rpx;
        line-height: 58rpx;
        font-size: 24rpx;
    }
}
</style>
