//
//  DouyinOpenSDKShare.h
//
//  Created by ByteDance on 2019/7/8.
//  Copyright (c) 2018年 ByteDance Ltd. All rights reserved.

#import "DouyinOpenSDKObjects.h"
#import "DouyinOpenSDKApplicationDelegate.h"

NS_ASSUME_NONNULL_BEGIN

static NSString * const  kDouyinOpenSDKShareState = @"share_state";
static NSString * const  kDouyinOpenSDKShareTitleTextKey = @"title_text";
static NSString * const  kDouyinOpenSDKShareTitleMentionOpenIDsKey = @"title_mention_IDs";
static NSString * const  kDouyinOpenSDKShareTitleMentionIndexesKey = @"title_mention_indexes";
static NSString * const  kDouyinOpenSDKShareTitleHashtagTextKey = @"title_hashtag_text";
static NSString * const  kDouyinOpenSDKShareTitleHashtagIndexKey = @"title_hashtag_indexes";
static NSString * const  kDouyinOpenSDKShareImageStickerLocalIdentifiersKey = @"image_sticker_local_identifiers";
static NSString * const  kDYOpenSDKCardType = @"card_type";
static NSString * const  kDouyinOpenSDKShareImageStickerXKey = @"image_sticker_x";
static NSString * const  kDouyinOpenSDKShareImageStickerYKey = @"image_sticker_y";
static NSString * const  kDouyinOpenSDKShareImageStickerDeleteableKey = @"image_sticker_deleteable";
static NSString * const  kDouyinOpenSDKShareImageStickerEditableKey = @"image_sticker_editable";
static NSString * const  kDouyinOpenSDKShareImageStickerMaxEdgeKey = @"image_sticker_max_edge";
static NSString * const  kDouyinOpenSDKShareImageStickerMinimumScale = @"image_sticker_minimum_scale";
static NSString * const  kDouyinOpenSDKShareHashtagStickerTextKey = @"hashtag_sticker_text";
static NSString * const  kDouyinOpenSDKShareHashtagStickerXKey = @"hashtag_sticker_x";
static NSString * const  kDouyinOpenSDKShareHashtagStickerYKey = @"hashtag_sticker_y";
static NSString * const  kDouyinOpenSDKShareMentionStickerOpenIDKey = @"mention_sticker_openid";
static NSString * const  kDouyinOpenSDKShareMentionStickerXKey = @"mention_sticker_x";
static NSString * const  kDouyinOpenSDKShareMentionStickerYKey = @"mention_sticker_y";

typedef NS_ENUM(NSUInteger, DouyinOpenSDKShareMediaType) {
    DouyinOpenSDKShareMediaTypeImage = 0, //!< Map to PHAssetMediaTypeImage
    DouyinOpenSDKShareMediaTypeVideo, //!< Map to PHAssetMediaTypeVideo
    DouyinOpenSDKShareMediaTypeMix, // Image & Video
    DouyinOpenSDKShareMediaTypeAudio = 103, //
};

typedef NS_ENUM(NSUInteger, DouyinOpenSDKShareInvitationType) {
    DouyinOpenSDKShareInvitationTypeMultiple = 0,
    DouyinOpenSDKShareInvitationTypeSingle,
};

typedef NS_ENUM(NSUInteger, DouyinOpenSDKShareInvitationRoomState) {
    DouyinOpenSDKShareInvitationTeamUp = 1,
    DouyinOpenSDKShareInvitationFull = 10,
    DouyinOpenSDKShareInvitationFinished = 99,
};

typedef NS_ENUM(NSUInteger, DouyinOpenSDKLandedPageType) {
    DouyinOpenSDKLandedPageClip = 0,//!< Landed to Clip ViewController
    DouyinOpenSDKLandedPageEdit,//!< Landed to Edit ViewController
    DouyinOpenSDKLandedPagePublish,//!< Landed to Edit ViewController
    DouyinOpenSDKLandedPageProfile,//!< Landed to Account Profile
    DouyinOpenSDKLandedPageContact,//!< Landed to Contact Page
    DouyinOpenSDKLandedPageAlbum,//!< Landed to Album Page
};

typedef NS_ENUM(NSUInteger, DouyinOpenSDKShareAction) {
    DouyinOpenSDKShareTypePublishMedia,
    DouyinOpenSDKShareTypeShareContentToIM,
    DouyinOpenSDKShareTypeCapture,
    DouyinOpenSDKShareTypeJump,
    DouyinOpenSDKShareTypeAddGroup, // 加群
};

typedef NS_ENUM(NSInteger, DouyinOpenSDKShareRespState) {
    DouyinOpenSDKShareRespStateSuccess                         = 20000, //!< Success
    DouyinOpenSDKShareRespStateUnknownError                    = 20001, //!< Unknown or current SDK version unclassified error
    DouyinOpenSDKShareRespStateParamValidError                 = 20002, //!< Params parsing error, media resource type difference you pass
    DouyinOpenSDKShareRespStateSharePermissionDenied           = 20003, //!< Not enough permissions to operation.
    DouyinOpenSDKShareRespStateUserNotLogin                    = 20004, //!< User not login
    DouyinOpenSDKShareRespStateNotHavePhotoLibraryPermission   = 20005, //!< Has no album permissions
    DouyinOpenSDKShareRespStateNetworkError                    = 20006, //!< Network error
    DouyinOpenSDKShareRespStateVideoTimeLimitError             = 20007, //!< Video length doesn't meet requirements
    DouyinOpenSDKShareRespStatePhotoResolutionError            = 20008, //!< Photo doesn't meet requirements
    DouyinOpenSDKShareRespTimeStampError                       = 20009, //!< Timestamp check failed
    DouyinOpenSDKShareRespStateHandleMediaError                = 20010, //!< Processing photo resources faild
    DouyinOpenSDKShareRespStateVideoResolutionError            = 20011, //!< Video resolution doesn't meet requirements
    DouyinOpenSDKShareRespStateVideoFormatError                = 20012, //!< Video format is not supported
    DouyinOpenSDKShareRespStateCancel                          = 20013, //!< Sharing canceled
    DouyinOpenSDKShareRespStateHaveUploadingTask               = 20014, //!< Another video is currently uploading
    DouyinOpenSDKShareRespStateSaveAsDraft                     = 20015, //!< Users store shared content for draft or user accounts are not allowed to post videos
    DouyinOpenSDKShareRespStatePublishFailed                   = 20016, //!< Post share content failed
    DouyinOpenSDKShareRespStateAccMismatched                   = 20017, //!<Douyin logged in acc mismatch
    DouyinOpenSDKShareRespStateMediaInIcloudError              = 21001, //!< Downloading from iCloud faild
    DouyinOpenSDKShareRespStateParamsParsingError              = 21002, //!< Internal params parsing error
    DouyinOpenSDKShareRespStateGetMediaError                   = 21003, //!< Media resources do not exist
};

typedef NS_ENUM(NSUInteger, DouyinOpenSDKAddGroupType) {
    DouyinOpenSDKAddGroupTypeMLBB = 0, // MLBB为0
    DouyinOpenSDKAddGroupTypeGeneral,  // 通用能力为1
};

DouyinOpenSDKShareRespState DouyinOpenSDKStringToShareState(NSString *string);


@class DouyinOpenSDKShareResponse;

typedef void(^DouyinOpenSDKShareCompleteBlock)(DouyinOpenSDKShareResponse *Response);

@interface DouyinOpenSDKShareLink : NSObject

@property (nonatomic, copy) NSString *linkTitle;

@property (nonatomic, copy) NSString *linkDescription;

@property (nonatomic, copy) NSString *linkURLString;

@property (nonatomic, copy) NSString *linkCoverURLString;

@end

@interface DouyinOpenSDKTitleMention : NSObject
@property (nonatomic, copy) NSString *openID;
@property (nonatomic, assign) NSInteger index;
@end

@interface DouyinOpenSDKTitleHashtag : NSObject
@property (nonatomic, copy) NSString *text;
@property (nonatomic, assign) NSInteger index;
@end

@interface DouyinOpenSDKShareTitle : NSObject

@property (nonatomic, copy) NSString *text;
@property (nonatomic, strong) NSMutableArray<DouyinOpenSDKTitleMention*>* mentions;
@property (nonatomic, strong) NSMutableArray<DouyinOpenSDKTitleHashtag*>* hashtags;

- (NSDictionary *)info;

@end

@interface DouyinOpenSDKShareImageSticker : NSObject

@property (nonatomic, strong) NSNumber* locationX;
@property (nonatomic, strong) NSNumber* locationY;
@property (nonatomic, strong) NSNumber* maxEdge;
@property (nonatomic, strong) NSNumber* minimumScale;
@property (nonatomic, assign) BOOL deleteable;
@property (nonatomic, assign) BOOL editable;
@property (nonatomic, strong) NSString  *localIdentifier;

@end

@interface DouyinOpenSDKShareHashtagSticker : NSObject
@property (nonatomic, copy) NSString* text;
@property (nonatomic, strong) NSNumber* locationX;
@property (nonatomic, strong) NSNumber* locationY;

@end

@interface DouyinOpenSDKShareMentionSticker : NSObject
@property (nonatomic, copy) NSString* openID;
@property (nonatomic, strong) NSNumber* locationX;
@property (nonatomic, strong) NSNumber* locationY;
@end


@interface DouyinOpenSDKShareInvitation : NSObject

@property (nonatomic, assign) DouyinOpenSDKShareInvitationType invitationType;

@property (nonatomic, assign) DouyinOpenSDKShareInvitationRoomState roomState;

@property (nonatomic, copy) NSString *userOpenId;

@property (nonatomic, copy) NSString *inviteeOpenId;

@property (nonatomic, copy) NSString *gameName;

@property (nonatomic, copy) NSString *coverImg;

@property (nonatomic, copy) NSString *schema;

@property (nonatomic, copy) NSString *downloadSchema;

@property (nonatomic, copy) NSNumber *appId;

@property (nonatomic, copy) NSNumber *roomTotalNum;

@property (nonatomic, copy) NSNumber *roomCurNum;

@property (nonatomic, copy, nullable) NSString *roomId;

@property (nonatomic, copy) NSString *linkId;

@property (nonatomic, copy, nullable) NSNumber *shareVersion;

@property (nonatomic, copy) NSString *extra;

@end

@interface DouyinOpenSDKShareRequest : DouyinOpenSDKBaseRequest

// 是否使用抖音新分享能力
@property (nonatomic, assign) BOOL useNewShareAbility;

/**
 The local identifier of the video or image shared by the your application to Open Platform in the **Photo Album**. The content must be all images or video.

 - The aspect ratio of the images or videos should between: [1/2.2, 2.2]
 - If mediaType is Image:
    - The number of images should be more than one and up to 12.
 - If mediaType is Video:
    - Total video duration should be longer than 3 seconds.
    - No more than 12 videos can be shared
 - Video with brand logo or watermark will lead to video deleted or account banned. Make sure your applications share contents without watermark.
 */
@property (nonatomic, strong) NSArray *localIdentifiers;

@property (nonatomic, assign) DouyinOpenSDKShareAction shareAction;

/**
 Which page do you want to land on?
 Defualt is Clip Viewcontroller
 */

@property (nonatomic, assign) DouyinOpenSDKLandedPageType landedPageType;
/**
 To associate your video with a hashtag, set the hashtag property on the request. The length cannot exceed 35
 */
@property (nonatomic, copy) NSString *hashtag;
@property (nonatomic, copy) NSString *shareH5Path;
@property (nonatomic, copy) NSString* cardType;

@property (nonatomic, copy) NSString *openId;
@property (nonatomic, copy) NSString *targetOpenId;
@property (nonatomic, copy) NSNumber *appId;

// 音乐相关分享
@property (nonatomic, copy) NSString *musicId; // 音乐Id
@property (nonatomic, strong) NSNumber *musicStartTime; // 音乐开始时间

// MLBB 加群的 id
@property (nonatomic, copy) NSString *groupId;

// MLBB 加群only，默认为0，通用能力为1
@property (nonatomic, assign) DouyinOpenSDKAddGroupType addGroupType;

// 通用加群能力only，群类型
@property (nonatomic, copy) NSNumber *groupType;
/**
 User hashtag as sticker , default is NO
 */
@property (nonatomic, assign) BOOL hashtagSticker;
@property (nonatomic, assign) BOOL publishStory;

/**
 The Media type of localIdentifiers in Album, All attachment localIdentifiers must be the same type
 */
@property (nonatomic, assign) DouyinOpenSDKShareMediaType mediaType;

/**
 Used to identify the uniqueness of the request, and finally returned by App when jumping back to the third-party program
 */
@property (nonatomic, copy, nullable) NSString *state;

@property (nonatomic, strong) DouyinOpenSDKShareLink *shareLink;

@property (nonatomic, strong) DouyinOpenSDKShareInvitation *invitation;

@property (nonatomic, copy) NSDictionary *customPlatformInfo;

/**
 Share images to douyin in album mode if set to true
 */
@property (nonatomic, assign) BOOL imageAlbumMode;

@property (nonatomic, strong) DouyinOpenSDKShareTitle* title;

@property (nonatomic, strong) NSMutableArray<DouyinOpenSDKShareImageSticker*>* imageStickers;
@property (nonatomic, strong) NSMutableArray<DouyinOpenSDKShareHashtagSticker*>* hashtagStickers;
@property (nonatomic, strong) NSMutableArray<DouyinOpenSDKShareMentionSticker*>* mentionStickers;
/**
 * @brief Send share request to Open Platform.
 *
 * @param completed  The async result call back. You can get result in share response.isSucceed;
 *
 * @return Share request is valid will return YES;
 */
- (BOOL)sendShareRequestWithCompleteBlock:(DouyinOpenSDKShareCompleteBlock) completed;

/**
 Check douyin support image album mode
 */
+ (BOOL)supportImageAlbumMode;
/**
 Check douyin support mix mode
 */
+ (BOOL)supportMixMode;

+ (BOOL)supportGameInvitation;

/// 判断是否支持分享汽水音乐到抖音
+ (BOOL)supportShareLunaMusic;

/// 判断是否支持分享汽水音乐到抖音，且能带上小程序与H5链接到气泡贴纸
+ (BOOL)supportShareLunaMusicWithSticker;

/// 判断抖极是否支持
+ (BOOL)supportDouyinLite;

+ (BOOL)supportMLBBAddGroup;

/// 判断分享到图集是否支持携带音乐信息
+ (BOOL)supportShareImageAlbumWithMusic;

@end

@interface DouyinOpenSDKShareResponse : DouyinOpenSDKBaseResponse
/**
 Used to identify the uniqueness of the request, and finally returned by App when jumping back to the third-party program
 */
@property (nonatomic, copy, nullable) NSString *state;

@property (nonatomic, assign) DouyinOpenSDKShareRespState shareState;

@end

NS_ASSUME_NONNULL_END
