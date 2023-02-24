import http from "./http";

// 我的粉丝列表
export function getFansList(pageNum = 1, pageSize = 10) {
    return http.get<GetFansListResult>("/mobile/my/myFansList", { pageNum, pageSize });
}

// 积分记录
export function getIntegralList(pageNum = 1, pageSize = 10) {
    return http.get<any>("/mobile/my/myIntegralList", { pageNum, pageSize });
}

// 我的消息列表
export function getMsgList(pageNum = 1, pageSize = 10) {
    return http.get<GetMsgListResult>("/mobile/my/myMsglist", { pageNum, pageSize });
}
