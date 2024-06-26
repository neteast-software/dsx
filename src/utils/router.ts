const routes = {
    index: "/pages/index/index",
    login: "/pages/login/login"
} as const;
type RouteName = keyof typeof routes;
type RoutePath = typeof routes[RouteName];
type RouterQuery = Record<string, any>;
interface RouterOption {
    query?: RouterQuery;
    delta?: number;
    events?: any;
    complete?: () => void;
}
interface RouterOptionWithPath extends RouterOption {
    readonly path: RouteName | RoutePath;
}

function parseQuery(query: RouterQuery) {
    const querys: string[] = [];
    Object.entries(query).forEach(([key, value]) => {
        querys.push(`${key}=${value}`);
    });
    return querys.join("&");
}

function getFullPath(path: RouteName | RoutePath | RouterOptionWithPath, op: RouterOption) {
    const options: RouterOptionWithPath = typeof path === "string" ? { ...op, path } : path;
    const url = Object.keys(routes).includes(options.path) ? routes[options.path as RouteName] : options.path;
    const { query = {} } = options;
    const queryStr = parseQuery(query);
    if (!queryStr) return url;
    return `${url}?${queryStr}`;
}

export default {
    push(path: RouteName | RoutePath | RouterOptionWithPath, op: RouterOption = {}) {
        const url = getFullPath(path, op);
        const { events, complete } = op;
        return new Promise<UniApp.NavigateToSuccessOptions>((resolve, reject) => {
            uni.navigateTo({
                url,
                events,
                success: resolve,
                fail: reject,
                complete
            });
        });
    },
    back(op: RouterOption = {}) {
        const { delta = 1, complete } = op;
        return new Promise<any>((resolve, reject) => {
            uni.navigateBack({
                delta,
                success: resolve,
                fail: reject,
                complete
            });
        });
    },
    replace(path: RouteName | RoutePath | RouterOptionWithPath, op: RouterOption = {}) {
        const url = getFullPath(path, op);
        const { complete } = op;
        return new Promise<any>((resolve, reject) => {
            uni.redirectTo({
                url,
                success: resolve,
                fail: reject,
                complete
            });
        });
    },
    switchTab(path: RouteName | RoutePath | RouterOptionWithPath, op: RouterOption = {}) {
        const url = getFullPath(path, op);
        const { complete } = op;
        return new Promise<any>((resolve, reject) => {
            uni.switchTab({
                url,
                success: resolve,
                fail: reject,
                complete
            });
        });
    },
    reLaunch(path: RouteName | RoutePath | RouterOptionWithPath, op: RouterOption = {}) {
        const url = getFullPath(path, op);
        const { complete } = op;
        return new Promise<any>((resolve, reject) => {
            uni.reLaunch({
                url,
                success: resolve,
                fail: reject,
                complete
            });
        });
    }
};
