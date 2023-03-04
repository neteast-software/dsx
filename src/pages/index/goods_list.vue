<template>
    <view class="goods-list flex-column">
        <scroll-view :scroll-x="true" class="cates">
            <view class="li" :class="{ active: currentIndex === 0 }" @tap="changeCate(0, 0)">全部</view>
            <view
                class="li"
                v-for="(item, index) in cateList"
                :key="item.id"
                :class="{ active: index + 1 === currentIndex }"
                @tap="changeCate(item.id, index + 1)"
                >{{ item.name }}
            </view>
        </scroll-view>
        <!-- <view class="list" :scroll-y="true" @scrolltolower="nextList({ id: activeCate })">
            <good-info v-for="item in goodList" :key="item.id" :good-info="item"></good-info>
        </view> -->
        <swiper class="swiper-box flex-rest-height" :current="currentIndex" @change="swiperChange" duration="220">
            <template v-for="(item, index) in cateList" :key="item.id">
                <swiper-item v-if="index == 0">
                    <all-list></all-list>
                </swiper-item>
                <swiper-item v-else>
                    <cate-list :cate-id="item.id"></cate-list>
                </swiper-item>
            </template>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getGoodsCategoryList } from "@/api/dsx/business";
import { onMounted } from "vue";
import CateList from "./cateList.vue";
import AllList from "./allList.vue";

//商品分类列表
const cateList = ref<GoodsCategory[]>([]);
const activeCate = ref(0);
const currentIndex = ref(0);
async function initCate() {
    const { data } = await getGoodsCategoryList();
    cateList.value = data;
}
async function changeCate(id: number, index: number) {
    activeCate.value = id;
    currentIndex.value = index;
}
function swiperChange(e) {
    if (currentIndex.value === e.detail.current) return;
    currentIndex.value = e.detail.current;
}
onMounted(async () => {
    initCate();
});
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
    position: sticky;
    top: 176rpx;
    width: 100%;
    border-radius: 30rpx 30rpx 0 0;
    padding: 0 30rpx;
    background-color: #fff;
    // padding-bottom: 80rpx;
    height: calc(100% - 176rpx);
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
        padding: 30rpx 0;
        background-color: #fff;
        // position: sticky;
        // top: 176rpx;
        // z-index: 999;
        height: 130rpx;
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
.swiper-box {
}
</style>
