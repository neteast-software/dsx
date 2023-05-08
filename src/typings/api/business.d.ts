interface FanInfo {
    nickname: string;
    mobile: string;
    username: string;
    createTime: string;
    avatar: string;
    vipLvl: number;
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

interface MsgDetail {
    id: number;
    content: string;
    createBy: string;
    createTime: string;
    delFlag: string;
    isRead: string;
    recipient: string;
    recipientArr: string[];
    remark: string;
    title: string;
    updateBy: string;
    updateTime: string;
}
interface GetMsgDetailResult {
    data: MsgDetail;
}
interface BannerInfo {
    createBy: string;
    createTime: string;
    delFlag: string;
    id: number;
    image: string;
    name: string;
    remark: string;
    sort: number;
    updateBy: string;
    updateTime: string;
    url: string;
}
interface GetBannerList {
    data: BannerInfo[];
}

interface GoodInfo {
    id: number;
    sort: number;
    name: string;
    price: number;
    commissionRatio: number;
    viewCount: number;
    saleCount: number;
    isHigh: string;
    isHot: string;
    isExclusive: string;
    images: string;
    coalitionUrl: string;
    coalitionId: string;
}

interface GetRecommendGoodsList {
    data: {
        exclisiveList: GoodInfo[];
        hotList: GoodInfo[];
    };
}
interface GoodsCategory {
    id: number;
    createBy: string;
    createTime: string;
    delFlag: string;
    image: string;
    name: string;
    remark: string;
    sort: number;
    updateBy: string;
    updateTime: string;
}
interface GetGoodsCategoryList {
    data: GoodsCategory[];
}

interface GetGoodsListResult {
    rows: GoodInfo[];
    total: number;
}
interface GoodDetail {
    coalitionId: string;
    coalitionUrl: string;
    commissionRatio: number;
    imageList: string[];
    id: number;
    isExclusive: string;
    isHigh: string;
    isHot: string;
    makers: string;
    name: string;
    price: number;
    saleCount: number;
    templateImage: string;
    templateVideo: string;
    viewCount: number;
    description: string;
    productType: number;
    generateVideo: boolean;
    brand: string;
    recommendReason: string;
    score: number;
    top: number;
    deductionPoints: number;
}
interface GetGoodsDetailResult {
    data: GoodDetail;
}
interface GetPrivacyAgreementResult {
    data: string;
}
interface GetUserAgreementResult {
    data: string;
}
interface GetSearchGoodsListResult {
    data: GoodInfo[];
    total: number;
}
interface GetProcessVideoResult {
    data: {
        task: string;
        token: string;
    };
}
interface GetShareImgResult {
    data: string;
}
interface IntegralRechargeListItem {
    actualAmount: number;
    amount: number;
    bonusPoints: number;
    id: number;
    points: number;
    totalPoints: number;
}
interface GetIntegralRechargeListResult {
    data: IntegralRechargeListItem[];
}
interface RechargeIntegralResult {
    data: UniApp.RequestPaymentOptions;
}

interface GetVipUpgradeMsgResult {
    data: {
        createTime: string;
        id: string | null;
        isRead: string;
        title: string;
    };
}
interface VideoMaterial {
    id: number;
    url: string;
    name: string;
}
interface BackgroundInfo extends VideoMaterial {}
interface GetVideoBackgroundListResult {
    data: {
        rows: BackgroundInfo[];
        total: number;
        msg: string;
    };
}
interface VideoProcessBtn {
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
    id: number;
    name: string;
    delFlag: string;
    icon: string;
    buttonType: string;
    defaultValue: string;
    fieldName: string;
    sort: number;
}
interface GetVideoProcessBtnListResult {
    data: VideoProcessBtn[];
}
interface StickerInfo extends VideoMaterial {
    width: number;
    height: number
}
