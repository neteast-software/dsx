import http from "./http";

// 上传
export function uploadFile(file: string) {
    return http.upload<UploadFileResult>("/mobile/common/upload", file);
}
