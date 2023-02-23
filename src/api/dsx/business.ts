import http from "./http";

// 我的粉丝列表
export function getFansList(pageNo = 1, pageSize = 10) {
    return http.get<GetFansListResult>("/mobile/my/myFansList", { pageNo, pageSize });
}
