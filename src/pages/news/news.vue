<template>
    <view class="wrap small grey">
        <view class="group">
            <view class="data flex-between">
                <view class="time">2023-01-28</view>
                <view> 10:32</view>
            </view>
            <view class="information">
                <view class="header flex-between">
                    <view class="flex-between">
                        <image class="img-news" src="@/assets/imgs/news.png"></image>
                        <view class="text-news">平台咨讯</view>
                    </view>
                    <view class="look flex-between">
                        <view class="check">查看详情</view>
                        <uni-icons type="forward" size="17"></uni-icons>
                    </view>
                </view>
                <view class="content">
                    <view>封号通知</view>
                    <text class="text-content" style="white-space: pre-line"
                        >尊敬的用户 你好\n
                        这是一封封号邮件，由于您近期多次违规操作导致平台其他用户资金亏损。我们将对您进行为期三年的封号处理，请您规范用户行为，如有疑问请咨询客服</text
                    >
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
</script>

<style scoped lang="scss">
@import "./news.scss";
</style>
