//
//  DouyinOpenSDKObjects.h
//
//  Created by ByteDance on 2019/7/8.
//  Copyright (c) 2018年 ByteDance Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>
@class DouyinOpenSDKBaseResponse;

/// 一级错误码
typedef NS_ENUM(NSInteger, DouyinOpenSDKErrorCode) {
    DouyinOpenSDKSuccess                 = 0,
    DouyinOpenSDKErrorCodeCommon         = -1,
    DouyinOpenSDKErrorCodeUserCanceled   = -2,
    DouyinOpenSDKErrorCodeSendFailed     = -3,
    DouyinOpenSDKErrorCodeAuthDenied     = -4,   /** 权限错误 */
    DouyinOpenSDKErrorCodeUnsupported    = -5,    /** 不支持 */
    DouyinOpenSDKErrorCodeNetDataError   = -6,    /** 网络返回错误，非字典类型，解析不了 */
    DouyinOpenSDKErrorCodeNetError       = -7,    /** ttnet返回网络错误 */
    DouyinOpenSDKErrorCodeAccNotMatched  = -8,    /** 抖音账号和游戏账号不匹配 */
    DouyinOpenSDKErrorCodeGroupIdInvalid = -9,    /** MLBB 加群 Id 不通过校验 */
    // 双端统一，从 20000 开始
    DouyinOpenSDKSuccessNew                 = 20000, // 成功
};

/// 二级错误码
typedef NS_ENUM(NSInteger, DouyinOpenSDKSubCode) {
    DouyinOpenSDKSubCodeNone                = 0, // 无须二级错误码
};

typedef NS_ENUM(NSInteger, DouyinOpenSDKTargetAppType) {
    DouyinOpenSDKTargetAuto,
    DouyinOpenSDKTargetDouyinLiteApp,
    DouyinOpenSDKTargetDouyinApp
};

NS_ASSUME_NONNULL_BEGIN
typedef void(^DouyinOpenSDKRequestCompletedBlock) (DouyinOpenSDKBaseResponse *resp);

@interface DouyinOpenSDKBaseRequest : NSObject

/// Passing additional sharing requests param
@property (nonatomic, copy, nullable) NSDictionary *extraInfo;

/// target app
@property (nonatomic, assign) DouyinOpenSDKTargetAppType targetApp;

/// other user info dict
@property (nonatomic, strong, nullable) NSMutableDictionary<NSObject *, id> *otherInfoDict;

@end

@interface DouyinOpenSDKBaseResponse : NSObject

/// YES for succeess
@property (nonatomic, readonly, assign) BOOL isSucceed;

/// Level 1 code
@property (nonatomic, assign) DouyinOpenSDKErrorCode errCode;

/// Level 2 code
@property (nonatomic, assign) DouyinOpenSDKSubCode subErrorCode;

/// error msg
@property (nonatomic, copy, nullable) NSString *errString;

@end

NS_ASSUME_NONNULL_END
