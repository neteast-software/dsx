import dyh from "./http";

// 获取视频合成进度
export function getVideoStats(taskId: string, token: string) {
    return dyh.post<GetVideoStatsResult>("/task/stats", { taskId }, { header: { __signature__: token } });
}
