<template>
    <view class="nav">
        <view class="active">新手入门 </view>
        <view>精品课程</view>
    </view>

    <view class="items">
        <view
            class="item"
            v-for="(item, index) in data"
        >
            <image
                src="@/static/course/ad.png"
                mode="aspectFit"
            />
            <view class="title">{{ item.title }}</view>
            <view class="user">
                <image
                    class="avatar"
                    :src="item.avatar"
                    mode="aspectFit"
                />
                <view class="name">{{ item.username }}</view>
                <view class="read_count">
                    <uni-icons
                        type="eye-filled"
                        size="28rpx"
                        color="#7B7379"
                    ></uni-icons>
                    12W</view
                >
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { reactive } from "vue";
const data = reactive([
    {
        username: "鱼丸1",
        title: "数销通新手教程-陈老师教你如何赚教你如何赚教你如何赚钱扶",
        read_count: 12000,
        avatar: "/static/course/user.png"
    },
    {
        username: "鱼丸2",
        title: "数销通新手教程-陈老师教你如何赚教你如何赚教你如何赚钱扶",
        read_count: 12000,
        avatar: "/static/course/user.png"
    },
    {
        username: "鱼丸3",
        title: "数销通1231新手教程-陈老师教你如何赚教你如何赚教你如何赚钱扶",
        read_count: 12000,
        avatar: "/static/course/user.png"
    },
    {
        username: "鱼丸4",
        title: "数销通新手教程-陈老师教你如何赚教你如何赚教你如何赚钱扶",
        read_count: 12000,
        avatar: "/static/course/user.png"
    }
]);
</script>

<style scoped lang="scss">
page {
    background-color: #f7f8fa;
}
.items {
    padding: 60rpx 32rpx;
    display: flex;
    padding-bottom: 100rpx;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 334rpx;
        height: 542rpx;
        border-radius: 36rpx;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 20rpx;
        & > image {
            width: 100%;
            height: 334rpx;
        }
        .title {
            padding: 0 30rpx;
            margin-top: 16rpx;
            margin-bottom: 28rpx;
            overflow: hidden;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            font-size: 28rpx;
            height: 78rpx;
        }

        .user {
            display: flex;
            padding: 0 30rpx;
            color: #7b7379;
            font-size: 24rpx;
            align-items: center;
        }
        .avatar {
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
        }
        .name {
            margin-left: 12rpx;
        }
        .read_count {
            flex: 1;
            margin-left: auto;
            text-align: right;
        }
    }
}
.nav {
    padding-top: 32rpx;
    font-size: 28rpx;
    color: #3d3d3d;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;

    & > view {
        min-width: 144rpx;
        margin: 0 45rpx;
        &.active {
            font-size: 36rpx;
            font-weight: bold;
        }
    }
}
</style>
