import { wxLogin } from "@/api/dsx/root";
// import user from "@/store/user";
import storage from "@/utils/storage";
class Session {
    // 熔断相关参数
    refreshLoginFuseLine = 3;
    refreshLoginFuseLocked = false;
    refreshLoginFuseRestoreTime = 5000;
    // 熔断控制
    refreshLoginFuse() {
        if (this.refreshLoginFuseLocked) {
            return Promise.reject("刷新登录-保险丝已熔断，请稍后");
        }
        if (this.refreshLoginFuseLine > 0) {
            this.refreshLoginFuseLine -= 1;
            return Promise.resolve();
        } else {
            this.refreshLoginFuseLocked = true;
            setTimeout(() => {
                this.refreshLoginFuseLocked = false;
                this.refreshLoginFuseLine = 3;
            }, this.refreshLoginFuseRestoreTime);
            return Promise.reject("刷新登录-保险丝熔断!!");
        }
    }
    // 并发回调队列
    // refreshLoginQueueMaxLength = 100
    // refreshLoginQueue: any[] = []
    refreshLoginLocked = false;
    refreshLoginSingleton: Promise<WxLoginResult> | null = null;
    // 刷新登录状态
    refreshLogin() {
        if (this.refreshLoginSingleton !== null) {
            return this.refreshLoginSingleton;
        }
        this.refreshLoginSingleton = Promise.resolve()
            // 回调队列 + 熔断机制
            .then(() => this.refreshLoginFuse())
            // 通过前置控制之后，发起登录过程
            .then(() => {
                this.clearSession();
                return this.login();
            });
        this.refreshLoginSingleton.finally(() => {
            this.refreshLoginSingleton = null;
        });
        return this.refreshLoginSingleton;
    }
    clearSession() {
        // user.token = "";
        storage.remove("token");
    }
    login() {
        return new Promise<WxLoginResult>((resolve, reject) => {
            uni.login({
                success: (res) => {
                    wxLogin(res.code).then(resolve, reject);
                },
                fail: (res) => {
                    reject(res);
                }
            });
        });
    }
    async ensureSession() {
        // const token = user.token;
        const token = storage.get("token");
        if (!token) {
            return this.refreshLogin();
        }
        const hasSession = await new Promise((resolve) => {
            uni.checkSession({
                success: () => resolve(true),
                fail: () => resolve(false)
            });
        });
        if (!hasSession) {
            return this.refreshLogin();
        }
        return Promise.resolve();
    }
}

export default new Session();
