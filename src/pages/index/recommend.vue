<template>
    <view class="recommend">
        <view class="h3">
            抖省心
            <view class="desc">选品就上抖省心，高返利还省心</view>
        </view>
        <view class="section">
            <view class="rexiao">
                <image src="@/static/index/rexiao-bg.png" mode="aspectFit" class="texture"></image>
                <view class="h4" @tap="toHotList">热销榜单 <view class="desc">爆单更轻松</view></view>
                <view class="items">
                    <view class="item" v-for="item in hotGoodsList" :key="item.id">
                        <image :src="item.images" mode="aspectFit" />
                        <view class="bottom">
                            <view class="zhuan">赚</view>
                            <view class="symbol">¥</view>
                            <view class="price">{{ (item.price * item.commissionRatio) / 100 }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="gaoyong">
                <image src="@/static/index/gaoyong-bg.png" mode="aspectFit" class="texture"></image>
                <view class="h4" @tap="toExclusiveList">专属高佣 <view class="desc">开单必备</view></view>
                <view class="items">
                    <view class="item" v-for="item in exclusiveGoodsList" :key="item.id">
                        <image :src="item.images" mode="aspectFit" />
                        <view class="bottom">
                            <view class="zhuan">赚</view>
                            <view class="symbol">¥</view>
                            <view class="price">{{ (item.price * item.commissionRatio) / 100 }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getRecommendGoodsList } from "@/api/dsx/business";
import router from "@/utils/router";
import { onMounted, ref } from "vue";
const hotGoodsList = ref<GoodInfo[]>([]);
const exclusiveGoodsList = ref<GoodInfo[]>([]);
async function initData() {
    const { data } = await getRecommendGoodsList();
    const { hotList, exclisiveList } = data;
    hotGoodsList.value = hotList;
    exclusiveGoodsList.value = exclisiveList;
}
onMounted(initData);
function toHotList() {
    router.push("hotList");
}
function toExclusiveList() {
    router.push("exclusiveList");
}
</script>

<style scoped lang="scss">
.recommend {
    margin-top: 25rpx;
    padding: 25rpx 32rpx;
}

.rexiao {
    position: relative;
    box-sizing: border-box;
    background-image: linear-gradient(171deg, #ffdfe6 1%, rgba(255, 255, 255, 0) 22%);
    background-repeat: no-repeat;
    background-size: contain;
    border-right: 1rpx solid #f7f8fa;
}
.gaoyong {
    position: relative;
    box-sizing: border-box;
    background-image: linear-gradient(-171deg, #fff0df 5%, rgba(255, 255, 255, 1) 10%);
    background-repeat: no-repeat;
    background-size: contain;
    border-left: 1rpx solid #f7f8fa;
}
.texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 88rpx;
}
.section {
    margin-top: 30rpx;
    display: flex;
    border-radius: 30rpx;
    overflow: hidden;
    background-color: #fff;
    & > view {
        width: 50%;
        padding-bottom: 30rpx;
        position: relative;
    }
    .price {
        font-weight: bold;
        color: #3d3d3d;
    }

    .h4 {
        position: relative;
        font-size: 28rpx;
        height: 88rpx;
        line-height: 88rpx;
        padding-left: 30rpx;
        font-weight: normal;
        color: #3d3d3d;
        display: flex;
        align-items: center;

        .desc {
            font-weight: 300;
            line-height: 28rpx;
            height: 34rpx;
            padding: 4rpx 12rpx;
            background-color: #ff6383;
            font-size: 20rpx;
            color: #fff;
            border-radius: 17rpx 2rpx 17rpx 17rpx;
            margin-left: 10rpx;
        }
    }

    .gaoyong {
        .desc {
            background-color: #ff9c3f !important;
        }
    }
    .items {
        display: flex;
        & > view {
            width: 50%;
            text-align: center;
        }
        image {
            height: 132rpx;
            width: 132rpx;
        }
        .zhuan {
            font-size: 24rpx;
            color: #ea3598;
            margin-right: 2rpx;
        }
        .bottom {
            display: flex;
            justify-content: center;
            padding: 0 20rpx;
            align-items: baseline;
        }
        .symbol {
            font-size: 24rpx;
            font-weight: 400;
            margin: 0 2rpx;
        }
    }
}
.h3 {
    font-size: 32rpx;
    font-weight: normal;
    color: #3d3d3d;
    .desc {
        font-size: 24rpx;
        color: #7b7379;
        display: inline-block;
    }
}
</style>
