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
export function getBannerList() {
    return http.get<GetBannerList>("/mobile/carousel/list");
}

// 热销商品列表
export function getRecommendGoodsList() {
    return http.get<GetRecommendGoodsList>("/mobile/product/hotAndHighList");
}

// 商品分类列表
export function getGoodsCategoryList() {
    return http.get<GetGoodsCategoryList>("/mobile/product/typeList");
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

export function getUserAgreement() {
    return http.get<GetUserAgreementResult>("/mobile/marketSettings/getuserAgreement");
}
