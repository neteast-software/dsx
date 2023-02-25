<template>
    <view class="goods-list">
        <!-- <scroll-view scroll-x="true" class="cates"> -->
        <view class="scroller cates">
            <view
                class="li"
                v-for="item in cateList"
                :key="item.id"
                :class="{ active: item.id == activeCate }"
                @tap="changeCate(item.id)"
                >{{ item.name }}
            </view>
        </view>
        <!-- </scroll-view> -->
        <view class="list">
            <good-info v-for="item in goodList" :key="item.id" :good-info="item"></good-info>
            <!-- <view class="goods" v-for="item in goodList" :key="item.id" @tap="toGoodDetail(item.id)">
                <image class="cover" :src="item.images" mode="aspectFit" />
                <view class="info">
                    <view class="row">
                        <view v-if="Number(item.isExclusive)" class="label">
                            <image src="@/static/index/label.svg" />
                            <view>专属高佣</view>
                        </view>
                        <view class="title">{{ item.name }}</view>
                    </view>
                    <view class="row detail">
                        <view
                            >售价: <view>{{ item.price }}</view></view
                        >
                        <view
                            >销量: <view>{{ item.saleCount }}</view></view
                        >
                    </view>
                    <view class="row money">
                        <view class="percent"
                            >{{ Number(item.isHigh) ? "高佣" : "佣金" }}{{ item.commissionRatio }}%</view
                        >
                        <view class="profit">
                            赚：¥
                            <view>{{ (item.price * item.commissionRatio) / 100 }}</view>
                        </view>
                    </view>
                </view>
                <button class="add-btn" type="button">加橱窗</button>
            </view> -->
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getGoodsCategoryList, getGoodsList } from "@/api/dsx/business";
import { onMounted } from "vue";
import { usePaginator } from "@/utils/util";
import router from "@/utils/router";
import GoodInfo from "@/components/goodInfo.vue";
const { list: goodList, initList, nextList } = usePaginator<GoodInfo>(getGoodsList);

//商品分类列表
const cateList = ref<GoodsCategory[]>([]);
const activeCate = ref(0);
async function initCate() {
    const { data } = await getGoodsCategoryList();
    cateList.value = data;
    activeCate.value = data[0].id;
}
function changeCate(id: number) {
    activeCate.value = id;
    initList({ id });
}
onMounted(async () => {
    await initCate();
    const cateId = activeCate.value;
    await initList({ id: cateId });
});
// 商品列表
function toGoodDetail(id: number) {
    console.log("去商品详情页", id);
    router.push("goodDetail", { query: { id } });
}
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
