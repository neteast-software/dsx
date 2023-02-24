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

interface li {
    username: String;
    title: String;
    read_count: Number;
    avatar: String;
}
let tmp: li[] = [];
for (let i = 1; i <= 100; i++) {
    let title = "数销通-陈老师教你";
    if (i % 2 == 0) {
        title += title;
    }
    tmp.push({
        username: "鱼丸" + i,
        title,
        read_count: 12000,
        avatar: "/static/course/user.png"
    });
}
let newData = [].concat(
    ...Array.from(
        tmp.reduce(
            (total, cur, index) => {
                total[index % 2].push(cur);
                return total;
            },
            { 0: [], 1: [], length: 2 }
        )
    )
);

const data = reactive<li[]>([...newData]);
</script>

<style scoped lang="scss">
page {
    background-color: #f7f8fa;
}
.items {
    padding: 60rpx 32rpx;
    padding-bottom: 100rpx;
    column-count: 2;

    .item {
        width: 334rpx;
        border-radius: 36rpx;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 20rpx;
        padding-bottom: 10rpx;

        &:nth-child(2n + 1) {
            order: 1;
        }
        &:nth-child(2n) {
            order: 2;
        }
        & > image {
            width: 100%;
            height: 334rpx;
        }
        .title {
            padding: 0 30rpx;
            margin: 16rpx 0;
            overflow: hidden;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            font-size: 28rpx;
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
