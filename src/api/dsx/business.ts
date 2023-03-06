import http from "./http";

// 我的粉丝列表
export function getFansList(pageNum = 1, pageSize = 10) {
    return http.get<GetFansListResult>("/mobile/my/myFansList", { pageNum, pageSize });
}

// 积分记录
export function getIntegralList(pageNum = 1, pageSize = 10) {
    return http.get<GetIntegralListResult>("/mobile/my/myIntegralList", { pageNum, pageSize });
}

// 我的消息列表
export function getMsgList(pageNum = 1, pageSize = 10) {
    return http.get<GetMsgListResult>("/mobile/my/myMsglist", { pageNum, pageSize });
}

// 我的消息详情
export function getMsgDetail(id: string | number) {
    return http.get<GetMsgDetailResult>(`/mobile/my/myMsgDetail/${id}`);
}

// 轮播图列表
export function getBannerList(type: "1" | "2" = "1") {
    return http.get<GetBannerList>(`/mobile/carousel/list/${type}`);
}

// 广告列表
export function getAdList(type: "1" | "2" = "2") {
    return http.get<GetBannerList>(`/mobile/carousel/list/${type}`);
}

// 热销商品列表
export function getRecommendGoodsList() {
    return http.get<GetRecommendGoodsList>("/mobile/product/hotAndHighList");
}

// 商品分类列表
export function getGoodsCategoryList() {
    return http.get<GetGoodsCategoryList>("/mobile/product/typeList");
}

export function getAllGoodsLists() {
    return http.get("/mobile/product/allList");
}

// 商品列表
interface getGoodsListFilter {
    id: string | number;
}
export function getGoodsList(pageNum = 1, pageSize = 10, filter: getGoodsListFilter) {
    const { id } = filter;
    return http.get<GetGoodsListResult>(`/mobile/product/infoList/${id}`, { pageNum, pageSize });
}

// 商品详情
export function getGoodsDetail(id: string | number) {
    return http.get<GetGoodsDetailResult>(`/mobile/product/detail/${id}`);
}

// 隐私协议
export function getPrivacyAgreement() {
    return http.get<GetPrivacyAgreementResult>("/mobile/marketSettings/getPrivacyAgreement");
}

// 用户协议
export function getUserAgreement() {
    return http.get<GetUserAgreementResult>("/mobile/marketSettings/getuserAgreement");
}

// 商品搜索、高佣、热销列表
interface getSearchGoodsListFilter {
    keyword?: string;
    isHot?: string;
    isExclusive?: string;
}
export function getSearchGoodsList(pageNum = 1, pageSize = 10, filter: getSearchGoodsListFilter) {
    return http.get<GetSearchGoodsListResult>("/mobile/product/searchInfoList", { pageNum, pageSize, ...filter });
}

// 合成视频
export function getProcessVideo(id: number) {
    return http.get<GetProcessVideoResult>(`/mobile/product/compositedFootage/${id}`);
}

// 获取分享图片
export function getShareImg() {
    return http.get<GetShareImgResult>("/mobile/marketSettings/getShareImgUrl");
}
