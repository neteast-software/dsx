interface VideoStatBase {
    task: string;
    taskId: string;
    time: string;
    type: string;
}
interface VideoStatProcess extends VideoStatBase {
    data: {
        progress: number;
    };
    status: 5;
}
interface VideoStatSuccess extends VideoStatBase {
    data: {
        res: {
            fileUrl: string;
        };
    };
    status: 7;
}
interface GetVideoStatsResult {
    data: VideoStatProcess | VideoStatSuccess;
}
