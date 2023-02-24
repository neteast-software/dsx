interface FanInfo {
    nickname: string;
    mobile: string;
    nickname: string;
    username: string;
    createTime: string;
    avatar: string;
}
interface GetFansListResult {
    rows: FanInfo[];
    total: number;
}
interface IntegralRecord {
    appUserId: number;
    createBy: string;
    createTime: string;
    delFlag: string;
    id: number;
    point: number;
    remainder: number;
    remark: string;
    type: string;
    updateBy: string;
    updateTime: string;
    useWay: string;
    useWayLabel: string;
}
interface GetIntegralListResult {
    rows: IntegralRecord[];
    total: number;
}

interface MsgInfo {
    id: string;
    title: string;
    createTime: string;
    content: string;
}
interface GetMsgListResult {
    rows: MsgInfo[];
    total: number;
}
