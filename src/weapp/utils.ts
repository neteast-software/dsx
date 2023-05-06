import { uniLogin } from "@/utils/uniapi";

export const wxLogin = uniLogin("weixin");

export function wxRequestPayment(params: UniApp.RequestPaymentOptions) {
    return new Promise((resolve, reject) => {
        console.log("支付参数", params);
        uni.requestPayment({
            ...params,
            provider: "wxpay",
            success: resolve,
            fail: reject
        });
    });
}
