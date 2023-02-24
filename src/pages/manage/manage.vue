<template>
    <view class="wrap grey">
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar1.png" mode="aspectFill"></image>
            <view class="message1">
                <text class="name">点点种草记</text>
                <text class="data">2023-03-01 22:24:12 授权到期</text>
            </view>
        </view>
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar2.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">上古白帝山</text>
                <view class="state state1">签约中</view>
            </view>
            <view class="look flex-center">
                <text class="check">查看签约信息</text>
                <image class="img-check" mode="aspectFill" src="@/static/manage/check.png"></image>
            </view>
        </view>
        <view class="account">
            <image class="avatar" src="@/static/manage/avatar3.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">兔兔花严选</text>
                <view class="state state2">已签约</view>
            </view>
        </view>
        <view class="account flex-center">
            <image class="avatar" src="@/static/manage/avatar4.png" mode="aspectFill"></image>
            <view class="message">
                <text class="name">点点种草记</text>
                <view class="state state3">已授权</view>
            </view>
            <button class="btn-bind">进行结算绑定</button>
        </view>
        <view class="add flex-column">
            <button class="btn-add">新增签约账号</button>
            <text>每个签约账号都必须进行授权哦</text>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "./manage.scss";
</style>
