<template>
    <view class="goods-list">
        <scroll-view
            scroll-x="true"
            class="cates"
        >
            <view
                class="li"
                v-for="(item, index) in goodsCates"
                :key="index"
                :class="{ active: index == 0 }"
                >{{ item.title }}
            </view>
        </scroll-view>
        <view class="list">
            <view
                class="goods"
                v-for="(item, index) in goodsList"
                :key="index"
            >
                <image
                    class="cover"
                    :src="item.image"
                    mode="aspectFit"
                />
                <view class="info">
                    <view class="row">
                        <view class="label">
                            <image src="@/static/index/label.svg" />
                            <view> {{ item.activity }}</view>
                        </view>
                        <view class="title">{{ item.title }}</view>
                    </view>
                    <view class="row detail">
                        <view
                            >售价: <view>{{ item.price }}</view></view
                        >
                        <view
                            >销量: <view>{{ item.sales }}</view></view
                        >
                    </view>
                    <view class="row money">
                        <view class="percent">高佣{{ item.percent }}</view>
                        <view class="profit">
                            赚：¥
                            <view>{{ item.brokerage }}</view>
                        </view>
                    </view>
                </view>
                <button
                    class="add-btn"
                    type="button"
                >
                    加橱窗
                </button>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";

//商品分类
const goodsCates = reactive([
    {
        title: "今日精选",
        id: 1
    },
    {
        title: "日用家居",
        id: 2
    },
    {
        title: "食品饮料",
        id: 3
    },
    {
        title: "美妆个护",
        id: 4
    },
    {
        title: "服饰鞋袜",
        id: 5
    }
]);
//商品列表
const goodsList = [
    {
        price: "12.8",
        title: "OLAY光感小白瓶水感透白光水感透白光",
        sales: "12w+",
        activity: "专属高佣",
        brokerage: "5.2",
        percent: "45%",
        image: "/static/index/goods1.png"
    },
    {
        price: "12.8",
        title: "OLAY光感小白瓶水感透白光水感透白光",
        sales: "12w+",
        activity: "专属高佣",
        brokerage: "5.2",
        percent: "45%",
        image: "/static/index/goods1.png"
    },
    {
        price: "12.8",
        title: "OLAY光感小白瓶水感透白光水感透白光",
        sales: "12w+",
        activity: "专属高佣",
        brokerage: "5.2",
        percent: "45%",
        image: "/static/index/goods1.png"
    },
    {
        price: "12.8",
        title: "OLAY光感小白瓶水感透白光水感透白光",
        sales: "12w+",
        activity: "专属高佣",
        brokerage: "5.2",
        percent: "45%",
        image: "/static/index/goods1.png"
    },
    {
        price: "12.8",
        title: "OLAY光感小白瓶水感透白光水感透白光",
        sales: "12w+",
        activity: "专属高佣",
        brokerage: "5.2",
        percent: "45%",
        image: "/static/index/goods1.png"
    }
];
</script>

<style scoped lang="scss">
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
.money {
    align-items: center;
    height: 42rpx;
    font-size: 24rpx;
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

.row {
    display: flex;
    white-space: nowrap;
}
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
}

.goods-list {
    position: relative;
    width: 100%;
    border-radius: 30rpx;
    padding: 30rpx;
    background-color: #fff;
    padding-bottom: 80rpx;
    &::after {
        position: absolute;
        content: " ";
        width: 60rpx;
        height: 60rpx;
        right: 0;
        top: 30rpx;
        background-image: linear-gradient(270deg, #ffffff 50%, rgba(255, 255, 255, 0) 99%);
    }
    .list {
        border-top: 1rpx solid #f3f6fc;
        padding-top: 30rpx;
    }
    .cates {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        padding-bottom: 30rpx;

        .li {
            text-align: center;
            &.active {
                color: #fff;
                background-image: linear-gradient(180deg, #fd5bb4 10%, #f92e9e 100%);
            }
            display: inline-block;
            border-radius: 30rpx;
            height: 62rpx;
            line-height: 62rpx;
            min-width: 166rpx;
            margin-right: 10rpx;
            color: #3d3d3d;
        }
    }
}
</style>
