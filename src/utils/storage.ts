export default {
    set<T = any>(key: string, value: T) {
        uni.setStorageSync(key, value);
    },
    get<T = any>(key: string): T {
        return uni.getStorageSync(key);
    },
    remove(key: string) {
        uni.removeStorageSync(key);
    },
    clear() {
        uni.clearStorageSync();
    },
    push<T = any>(key: string, value: T) {
        const arr = this.get<T[]>(key) || [];
        if (!Array.isArray(arr)) return;
        arr.push(value);
        this.set<T[]>(key, arr);
    },
    pop<T = any>(key: string): T | undefined {
        const arr = this.get<T[]>(key);
        if (!Array.isArray(arr)) {
            return arr as T;
        }
        const ret = arr.pop();
        this.set<T[]>(key, arr);
        return ret;
    },
    getInfo() {
        return uni.getStorageInfoSync();
    }
};
