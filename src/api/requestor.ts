type RequestData = string | AnyObject | ArrayBuffer;
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT";
interface ReqestConfig {
    url?: string;
    baseURL?: string;
    data?: RequestData;
    dataType?: "json" | "其他";
    header?: AnyObject;
    method?: RequestMethod;
    timeout?: number;
}
interface RequestConfigWithUrl extends ReqestConfig {
    url: string;
}
type UniResponse = UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult;
interface Interceptor {
    request: MaybeNull<(config: RequestConfigWithUrl) => RequestConfigWithUrl>;
    response: MaybeNull<(res: UniResponse, requestConfig: RequestConfigWithUrl) => any>;
}
class Requestor {
    interceptor: Interceptor = {
        request: null,
        response: null
    };
    private lock: AnyObject = {};
    private defaultConfig: ReqestConfig = { header: {}, timeout: 30000 };
    constructor(config?: ReqestConfig) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
    get<T = any>(url: string, data?: RequestData, config: ReqestConfig = {}): Promise<T> {
        return this.preRequest<T>(url, "GET", config, data);
    }
    post<T = any>(url: string, data?: RequestData, config: ReqestConfig = {}): Promise<T> {
        return this.preRequest<T>(url, "POST", config, data);
    }
    put<T = any>(url: string, data?: RequestData, config: ReqestConfig = {}): Promise<T> {
        return this.preRequest<T>(url, "PUT", config, data);
    }
    delete<T = any>(url: string, data?: RequestData, config: ReqestConfig = {}): Promise<T> {
        return this.preRequest<T>(url, "DELETE", config, data);
    }
    upload<T = any>(url: string, filePath: string, name = "file", config: ReqestConfig = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            const context = this.preProcess({ ...this.defaultConfig, ...config, url });
            uni.uploadFile({
                url: this.defaultConfig.baseURL ? this.defaultConfig.baseURL + url : url,
                filePath,
                name,
                header: context.header,
                timeout: context.timeout,
                success: (res) => {
                    resolve(res.data as T);
                },
                fail: reject
            });
        });
    }
    private getLockKey(config: ReqestConfig): string {
        const { url, method, data } = config;
        return `${method}:${url}:${JSON.stringify(data)}`;
    }
    private preRequest<T = any>(
        url: string,
        method: RequestMethod,
        config: ReqestConfig,
        data?: RequestData
    ): Promise<T> {
        const newConfig: RequestConfigWithUrl = { ...config, url, method, data };
        const lockKey = this.getLockKey(newConfig);
        if (this.lock[lockKey]) return Promise.reject("请求重复");
        this.lock[lockKey] = true;
        const p = this.request(newConfig);
        p.finally(() => {
            this.lock[lockKey] = false;
        });
        return p;
    }
    private preProcess(config: RequestConfigWithUrl) {
        let newConfig: RequestConfigWithUrl = { ...this.defaultConfig, ...config };
        if (newConfig.baseURL) {
            newConfig.url = newConfig.baseURL + newConfig.url;
        }
        // 是否存在拦截器
        if (this.interceptor.request) {
            newConfig = this.interceptor.request(newConfig);
        }
        return newConfig;
    }
    request<T = any>(config: RequestConfigWithUrl) {
        const context = this.preProcess(config);
        return new Promise<T>((resolve, reject) => {
            uni.request({
                ...context,
                success: (res) => {
                    // 是否存在拦截器
                    if (this.interceptor.response && typeof this.interceptor.response === "function") {
                        const response = this.interceptor.response(res, context);
                        return resolve(response as T);
                    }
                    resolve(res.data as T);
                },
                fail: reject
            });
        });
    }
}

export default Requestor;