/**
 * https://react-icons.github.io/react-icons/icons/ti/
 */


import * as LIB from "react-icons/ti";


// Define the props that the PostForm component expects
interface tiProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Ti(
    {
        icon = 'TiAdjustBrightness',
        className,
    }: tiProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'TiAdjustBrightness': return <LIB.TiAdjustBrightness className={className} />;
            case 'TiAdjustContrast': return <LIB.TiAdjustContrast className={className} />;
            case 'TiAnchorOutline': return <LIB.TiAnchorOutline className={className} />;
            case 'TiAnchor': return <LIB.TiAnchor className={className} />;
            case 'TiArchive': return <LIB.TiArchive className={className} />;
            case 'TiArrowBackOutline': return <LIB.TiArrowBackOutline className={className} />;
            case 'TiArrowBack': return <LIB.TiArrowBack className={className} />;
            case 'TiArrowDownOutline': return <LIB.TiArrowDownOutline className={className} />;
            case 'TiArrowDownThick': return <LIB.TiArrowDownThick className={className} />;
            case 'TiArrowDown': return <LIB.TiArrowDown className={className} />;
            case 'TiArrowForwardOutline': return <LIB.TiArrowForwardOutline className={className} />;
            case 'TiArrowForward': return <LIB.TiArrowForward className={className} />;
            case 'TiArrowLeftOutline': return <LIB.TiArrowLeftOutline className={className} />;
            case 'TiArrowLeftThick': return <LIB.TiArrowLeftThick className={className} />;
            case 'TiArrowLeft': return <LIB.TiArrowLeft className={className} />;
            case 'TiArrowLoopOutline': return <LIB.TiArrowLoopOutline className={className} />;
            case 'TiArrowLoop': return <LIB.TiArrowLoop className={className} />;
            case 'TiArrowMaximiseOutline': return <LIB.TiArrowMaximiseOutline className={className} />;
            case 'TiArrowMaximise': return <LIB.TiArrowMaximise className={className} />;
            case 'TiArrowMinimiseOutline': return <LIB.TiArrowMinimiseOutline className={className} />;
            case 'TiArrowMinimise': return <LIB.TiArrowMinimise className={className} />;
            case 'TiArrowMoveOutline': return <LIB.TiArrowMoveOutline className={className} />;
            case 'TiArrowMove': return <LIB.TiArrowMove className={className} />;
            case 'TiArrowRepeatOutline': return <LIB.TiArrowRepeatOutline className={className} />;
            case 'TiArrowRepeat': return <LIB.TiArrowRepeat className={className} />;
            case 'TiArrowRightOutline': return <LIB.TiArrowRightOutline className={className} />;
            case 'TiArrowRightThick': return <LIB.TiArrowRightThick className={className} />;
            case 'TiArrowRight': return <LIB.TiArrowRight className={className} />;
            case 'TiArrowShuffle': return <LIB.TiArrowShuffle className={className} />;
            case 'TiArrowSortedDown': return <LIB.TiArrowSortedDown className={className} />;
            case 'TiArrowSortedUp': return <LIB.TiArrowSortedUp className={className} />;
            case 'TiArrowSyncOutline': return <LIB.TiArrowSyncOutline className={className} />;
            case 'TiArrowSync': return <LIB.TiArrowSync className={className} />;
            case 'TiArrowUnsorted': return <LIB.TiArrowUnsorted className={className} />;
            case 'TiArrowUpOutline': return <LIB.TiArrowUpOutline className={className} />;
            case 'TiArrowUpThick': return <LIB.TiArrowUpThick className={className} />;
            case 'TiArrowUp': return <LIB.TiArrowUp className={className} />;
            case 'TiAt': return <LIB.TiAt className={className} />;
            case 'TiAttachmentOutline': return <LIB.TiAttachmentOutline className={className} />;
            case 'TiAttachment': return <LIB.TiAttachment className={className} />;
            case 'TiBackspaceOutline': return <LIB.TiBackspaceOutline className={className} />;
            case 'TiBackspace': return <LIB.TiBackspace className={className} />;
            case 'TiBatteryCharge': return <LIB.TiBatteryCharge className={className} />;
            case 'TiBatteryFull': return <LIB.TiBatteryFull className={className} />;
            case 'TiBatteryHigh': return <LIB.TiBatteryHigh className={className} />;
            case 'TiBatteryLow': return <LIB.TiBatteryLow className={className} />;
            case 'TiBatteryMid': return <LIB.TiBatteryMid className={className} />;
            case 'TiBeaker': return <LIB.TiBeaker className={className} />;
            case 'TiBeer': return <LIB.TiBeer className={className} />;
            case 'TiBell': return <LIB.TiBell className={className} />;
            case 'TiBook': return <LIB.TiBook className={className} />;
            case 'TiBookmark': return <LIB.TiBookmark className={className} />;
            case 'TiBriefcase': return <LIB.TiBriefcase className={className} />;
            case 'TiBrush': return <LIB.TiBrush className={className} />;
            case 'TiBusinessCard': return <LIB.TiBusinessCard className={className} />;
            case 'TiCalculator': return <LIB.TiCalculator className={className} />;
            case 'TiCalendarOutline': return <LIB.TiCalendarOutline className={className} />;
            case 'TiCalendar': return <LIB.TiCalendar className={className} />;
            case 'TiCameraOutline': return <LIB.TiCameraOutline className={className} />;
            case 'TiCamera': return <LIB.TiCamera className={className} />;
            case 'TiCancelOutline': return <LIB.TiCancelOutline className={className} />;
            case 'TiCancel': return <LIB.TiCancel className={className} />;
            case 'TiChartAreaOutline': return <LIB.TiChartAreaOutline className={className} />;
            case 'TiChartArea': return <LIB.TiChartArea className={className} />;
            case 'TiChartBarOutline': return <LIB.TiChartBarOutline className={className} />;
            case 'TiChartBar': return <LIB.TiChartBar className={className} />;
            case 'TiChartLineOutline': return <LIB.TiChartLineOutline className={className} />;
            case 'TiChartLine': return <LIB.TiChartLine className={className} />;
            case 'TiChartPieOutline': return <LIB.TiChartPieOutline className={className} />;
            case 'TiChartPie': return <LIB.TiChartPie className={className} />;
            case 'TiChevronLeftOutline': return <LIB.TiChevronLeftOutline className={className} />;
            case 'TiChevronLeft': return <LIB.TiChevronLeft className={className} />;
            case 'TiChevronRightOutline': return <LIB.TiChevronRightOutline className={className} />;
            case 'TiChevronRight': return <LIB.TiChevronRight className={className} />;
            case 'TiClipboard': return <LIB.TiClipboard className={className} />;
            case 'TiCloudStorageOutline': return <LIB.TiCloudStorageOutline className={className} />;
            case 'TiCloudStorage': return <LIB.TiCloudStorage className={className} />;
            case 'TiCodeOutline': return <LIB.TiCodeOutline className={className} />;
            case 'TiCode': return <LIB.TiCode className={className} />;
            case 'TiCoffee': return <LIB.TiCoffee className={className} />;
            case 'TiCogOutline': return <LIB.TiCogOutline className={className} />;
            case 'TiCog': return <LIB.TiCog className={className} />;
            case 'TiCompass': return <LIB.TiCompass className={className} />;
            case 'TiContacts': return <LIB.TiContacts className={className} />;
            case 'TiCreditCard': return <LIB.TiCreditCard className={className} />;
            case 'TiCss3': return <LIB.TiCss3 className={className} />;
            case 'TiDatabase': return <LIB.TiDatabase className={className} />;
            case 'TiDeleteOutline': return <LIB.TiDeleteOutline className={className} />;
            case 'TiDelete': return <LIB.TiDelete className={className} />;
            case 'TiDeviceDesktop': return <LIB.TiDeviceDesktop className={className} />;
            case 'TiDeviceLaptop': return <LIB.TiDeviceLaptop className={className} />;
            case 'TiDevicePhone': return <LIB.TiDevicePhone className={className} />;
            case 'TiDeviceTablet': return <LIB.TiDeviceTablet className={className} />;
            case 'TiDirections': return <LIB.TiDirections className={className} />;
            case 'TiDivideOutline': return <LIB.TiDivideOutline className={className} />;
            case 'TiDivide': return <LIB.TiDivide className={className} />;
            case 'TiDocumentAdd': return <LIB.TiDocumentAdd className={className} />;
            case 'TiDocumentDelete': return <LIB.TiDocumentDelete className={className} />;
            case 'TiDocumentText': return <LIB.TiDocumentText className={className} />;
            case 'TiDocument': return <LIB.TiDocument className={className} />;
            case 'TiDownloadOutline': return <LIB.TiDownloadOutline className={className} />;
            case 'TiDownload': return <LIB.TiDownload className={className} />;
            case 'TiDropbox': return <LIB.TiDropbox className={className} />;
            case 'TiEdit': return <LIB.TiEdit className={className} />;
            case 'TiEjectOutline': return <LIB.TiEjectOutline className={className} />;
            case 'TiEject': return <LIB.TiEject className={className} />;
            case 'TiEqualsOutline': return <LIB.TiEqualsOutline className={className} />;
            case 'TiEquals': return <LIB.TiEquals className={className} />;
            case 'TiExportOutline': return <LIB.TiExportOutline className={className} />;
            case 'TiExport': return <LIB.TiExport className={className} />;
            case 'TiEyeOutline': return <LIB.TiEyeOutline className={className} />;
            case 'TiEye': return <LIB.TiEye className={className} />;
            case 'TiFeather': return <LIB.TiFeather className={className} />;
            case 'TiFilm': return <LIB.TiFilm className={className} />;
            case 'TiFilter': return <LIB.TiFilter className={className} />;
            case 'TiFlagOutline': return <LIB.TiFlagOutline className={className} />;
            case 'TiFlag': return <LIB.TiFlag className={className} />;
            case 'TiFlashOutline': return <LIB.TiFlashOutline className={className} />;
            case 'TiFlash': return <LIB.TiFlash className={className} />;
            case 'TiFlowChildren': return <LIB.TiFlowChildren className={className} />;
            case 'TiFlowMerge': return <LIB.TiFlowMerge className={className} />;
            case 'TiFlowParallel': return <LIB.TiFlowParallel className={className} />;
            case 'TiFlowSwitch': return <LIB.TiFlowSwitch className={className} />;
            case 'TiFolderAdd': return <LIB.TiFolderAdd className={className} />;
            case 'TiFolderDelete': return <LIB.TiFolderDelete className={className} />;
            case 'TiFolderOpen': return <LIB.TiFolderOpen className={className} />;
            case 'TiFolder': return <LIB.TiFolder className={className} />;
            case 'TiGift': return <LIB.TiGift className={className} />;
            case 'TiGlobeOutline': return <LIB.TiGlobeOutline className={className} />;
            case 'TiGlobe': return <LIB.TiGlobe className={className} />;
            case 'TiGroupOutline': return <LIB.TiGroupOutline className={className} />;
            case 'TiGroup': return <LIB.TiGroup className={className} />;
            case 'TiHeadphones': return <LIB.TiHeadphones className={className} />;
            case 'TiHeartFullOutline': return <LIB.TiHeartFullOutline className={className} />;
            case 'TiHeartHalfOutline': return <LIB.TiHeartHalfOutline className={className} />;
            case 'TiHeartOutline': return <LIB.TiHeartOutline className={className} />;
            case 'TiHeart': return <LIB.TiHeart className={className} />;
            case 'TiHomeOutline': return <LIB.TiHomeOutline className={className} />;
            case 'TiHome': return <LIB.TiHome className={className} />;
            case 'TiHtml5': return <LIB.TiHtml5 className={className} />;
            case 'TiImageOutline': return <LIB.TiImageOutline className={className} />;
            case 'TiImage': return <LIB.TiImage className={className} />;
            case 'TiInfinityOutline': return <LIB.TiInfinityOutline className={className} />;
            case 'TiInfinity': return <LIB.TiInfinity className={className} />;
            case 'TiInfoLargeOutline': return <LIB.TiInfoLargeOutline className={className} />;
            case 'TiInfoLarge': return <LIB.TiInfoLarge className={className} />;
            case 'TiInfoOutline': return <LIB.TiInfoOutline className={className} />;
            case 'TiInfo': return <LIB.TiInfo className={className} />;
            case 'TiInputCheckedOutline': return <LIB.TiInputCheckedOutline className={className} />;
            case 'TiInputChecked': return <LIB.TiInputChecked className={className} />;
            case 'TiKeyOutline': return <LIB.TiKeyOutline className={className} />;
            case 'TiKey': return <LIB.TiKey className={className} />;
            case 'TiKeyboard': return <LIB.TiKeyboard className={className} />;
            case 'TiLeaf': return <LIB.TiLeaf className={className} />;
            case 'TiLightbulb': return <LIB.TiLightbulb className={className} />;
            case 'TiLinkOutline': return <LIB.TiLinkOutline className={className} />;
            case 'TiLink': return <LIB.TiLink className={className} />;
            case 'TiLocationArrowOutline': return <LIB.TiLocationArrowOutline className={className} />;
            case 'TiLocationArrow': return <LIB.TiLocationArrow className={className} />;
            case 'TiLocationOutline': return <LIB.TiLocationOutline className={className} />;
            case 'TiLocation': return <LIB.TiLocation className={className} />;
            case 'TiLockClosedOutline': return <LIB.TiLockClosedOutline className={className} />;
            case 'TiLockClosed': return <LIB.TiLockClosed className={className} />;
            case 'TiLockOpenOutline': return <LIB.TiLockOpenOutline className={className} />;
            case 'TiLockOpen': return <LIB.TiLockOpen className={className} />;
            case 'TiMail': return <LIB.TiMail className={className} />;
            case 'TiMap': return <LIB.TiMap className={className} />;
            case 'TiMediaEjectOutline': return <LIB.TiMediaEjectOutline className={className} />;
            case 'TiMediaEject': return <LIB.TiMediaEject className={className} />;
            case 'TiMediaFastForwardOutline': return <LIB.TiMediaFastForwardOutline className={className} />;
            case 'TiMediaFastForward': return <LIB.TiMediaFastForward className={className} />;
            case 'TiMediaPauseOutline': return <LIB.TiMediaPauseOutline className={className} />;
            case 'TiMediaPause': return <LIB.TiMediaPause className={className} />;
            case 'TiMediaPlayOutline': return <LIB.TiMediaPlayOutline className={className} />;
            case 'TiMediaPlayReverseOutline': return <LIB.TiMediaPlayReverseOutline className={className} />;
            case 'TiMediaPlayReverse': return <LIB.TiMediaPlayReverse className={className} />;
            case 'TiMediaPlay': return <LIB.TiMediaPlay className={className} />;
            case 'TiMediaRecordOutline': return <LIB.TiMediaRecordOutline className={className} />;
            case 'TiMediaRecord': return <LIB.TiMediaRecord className={className} />;
            case 'TiMediaRewindOutline': return <LIB.TiMediaRewindOutline className={className} />;
            case 'TiMediaRewind': return <LIB.TiMediaRewind className={className} />;
            case 'TiMediaStopOutline': return <LIB.TiMediaStopOutline className={className} />;
            case 'TiMediaStop': return <LIB.TiMediaStop className={className} />;
            case 'TiMessageTyping': return <LIB.TiMessageTyping className={className} />;
            case 'TiMessage': return <LIB.TiMessage className={className} />;
            case 'TiMessages': return <LIB.TiMessages className={className} />;
            case 'TiMicrophoneOutline': return <LIB.TiMicrophoneOutline className={className} />;
            case 'TiMicrophone': return <LIB.TiMicrophone className={className} />;
            case 'TiMinusOutline': return <LIB.TiMinusOutline className={className} />;
            case 'TiMinus': return <LIB.TiMinus className={className} />;
            case 'TiMortarBoard': return <LIB.TiMortarBoard className={className} />;
            case 'TiNews': return <LIB.TiNews className={className} />;
            case 'TiNotesOutline': return <LIB.TiNotesOutline className={className} />;
            case 'TiNotes': return <LIB.TiNotes className={className} />;
            case 'TiPen': return <LIB.TiPen className={className} />;
            case 'TiPencil': return <LIB.TiPencil className={className} />;
            case 'TiPhoneOutline': return <LIB.TiPhoneOutline className={className} />;
            case 'TiPhone': return <LIB.TiPhone className={className} />;
            case 'TiPiOutline': return <LIB.TiPiOutline className={className} />;
            case 'TiPi': return <LIB.TiPi className={className} />;
            case 'TiPinOutline': return <LIB.TiPinOutline className={className} />;
            case 'TiPin': return <LIB.TiPin className={className} />;
            case 'TiPipette': return <LIB.TiPipette className={className} />;
            case 'TiPlaneOutline': return <LIB.TiPlaneOutline className={className} />;
            case 'TiPlane': return <LIB.TiPlane className={className} />;
            case 'TiPlug': return <LIB.TiPlug className={className} />;
            case 'TiPlusOutline': return <LIB.TiPlusOutline className={className} />;
            case 'TiPlus': return <LIB.TiPlus className={className} />;
            case 'TiPointOfInterestOutline': return <LIB.TiPointOfInterestOutline className={className} />;
            case 'TiPointOfInterest': return <LIB.TiPointOfInterest className={className} />;
            case 'TiPowerOutline': return <LIB.TiPowerOutline className={className} />;
            case 'TiPower': return <LIB.TiPower className={className} />;
            case 'TiPrinter': return <LIB.TiPrinter className={className} />;
            case 'TiPuzzleOutline': return <LIB.TiPuzzleOutline className={className} />;
            case 'TiPuzzle': return <LIB.TiPuzzle className={className} />;
            case 'TiRadarOutline': return <LIB.TiRadarOutline className={className} />;
            case 'TiRadar': return <LIB.TiRadar className={className} />;
            case 'TiRefreshOutline': return <LIB.TiRefreshOutline className={className} />;
            case 'TiRefresh': return <LIB.TiRefresh className={className} />;
            case 'TiRssOutline': return <LIB.TiRssOutline className={className} />;
            case 'TiRss': return <LIB.TiRss className={className} />;
            case 'TiScissorsOutline': return <LIB.TiScissorsOutline className={className} />;
            case 'TiScissors': return <LIB.TiScissors className={className} />;
            case 'TiShoppingBag': return <LIB.TiShoppingBag className={className} />;
            case 'TiShoppingCart': return <LIB.TiShoppingCart className={className} />;
            case 'TiSocialAtCircular': return <LIB.TiSocialAtCircular className={className} />;
            case 'TiSocialDribbbleCircular': return <LIB.TiSocialDribbbleCircular className={className} />;
            case 'TiSocialDribbble': return <LIB.TiSocialDribbble className={className} />;
            case 'TiSocialFacebookCircular': return <LIB.TiSocialFacebookCircular className={className} />;
            case 'TiSocialFacebook': return <LIB.TiSocialFacebook className={className} />;
            case 'TiSocialFlickrCircular': return <LIB.TiSocialFlickrCircular className={className} />;
            case 'TiSocialFlickr': return <LIB.TiSocialFlickr className={className} />;
            case 'TiSocialGithubCircular': return <LIB.TiSocialGithubCircular className={className} />;
            case 'TiSocialGithub': return <LIB.TiSocialGithub className={className} />;
            case 'TiSocialGooglePlusCircular': return <LIB.TiSocialGooglePlusCircular className={className} />;
            case 'TiSocialGooglePlus': return <LIB.TiSocialGooglePlus className={className} />;
            case 'TiSocialInstagramCircular': return <LIB.TiSocialInstagramCircular className={className} />;
            case 'TiSocialInstagram': return <LIB.TiSocialInstagram className={className} />;
            case 'TiSocialLastFmCircular': return <LIB.TiSocialLastFmCircular className={className} />;
            case 'TiSocialLastFm': return <LIB.TiSocialLastFm className={className} />;
            case 'TiSocialLinkedinCircular': return <LIB.TiSocialLinkedinCircular className={className} />;
            case 'TiSocialLinkedin': return <LIB.TiSocialLinkedin className={className} />;
            case 'TiSocialPinterestCircular': return <LIB.TiSocialPinterestCircular className={className} />;
            case 'TiSocialPinterest': return <LIB.TiSocialPinterest className={className} />;
            case 'TiSocialSkypeOutline': return <LIB.TiSocialSkypeOutline className={className} />;
            case 'TiSocialSkype': return <LIB.TiSocialSkype className={className} />;
            case 'TiSocialTumblerCircular': return <LIB.TiSocialTumblerCircular className={className} />;
            case 'TiSocialTumbler': return <LIB.TiSocialTumbler className={className} />;
            case 'TiSocialTwitterCircular': return <LIB.TiSocialTwitterCircular className={className} />;
            case 'TiSocialTwitter': return <LIB.TiSocialTwitter className={className} />;
            case 'TiSocialVimeoCircular': return <LIB.TiSocialVimeoCircular className={className} />;
            case 'TiSocialVimeo': return <LIB.TiSocialVimeo className={className} />;
            case 'TiSocialYoutubeCircular': return <LIB.TiSocialYoutubeCircular className={className} />;
            case 'TiSocialYoutube': return <LIB.TiSocialYoutube className={className} />;
            case 'TiSortAlphabeticallyOutline': return <LIB.TiSortAlphabeticallyOutline className={className} />;
            case 'TiSortAlphabetically': return <LIB.TiSortAlphabetically className={className} />;
            case 'TiSortNumericallyOutline': return <LIB.TiSortNumericallyOutline className={className} />;
            case 'TiSortNumerically': return <LIB.TiSortNumerically className={className} />;
            case 'TiSpannerOutline': return <LIB.TiSpannerOutline className={className} />;
            case 'TiSpanner': return <LIB.TiSpanner className={className} />;
            case 'TiSpiral': return <LIB.TiSpiral className={className} />;
            case 'TiStarFullOutline': return <LIB.TiStarFullOutline className={className} />;
            case 'TiStarHalfOutline': return <LIB.TiStarHalfOutline className={className} />;
            case 'TiStarHalf': return <LIB.TiStarHalf className={className} />;
            case 'TiStarOutline': return <LIB.TiStarOutline className={className} />;
            case 'TiStar': return <LIB.TiStar className={className} />;
            case 'TiStarburstOutline': return <LIB.TiStarburstOutline className={className} />;
            case 'TiStarburst': return <LIB.TiStarburst className={className} />;
            case 'TiStopwatch': return <LIB.TiStopwatch className={className} />;
            case 'TiSupport': return <LIB.TiSupport className={className} />;
            case 'TiTabsOutline': return <LIB.TiTabsOutline className={className} />;
            case 'TiTag': return <LIB.TiTag className={className} />;
            case 'TiTags': return <LIB.TiTags className={className} />;
            case 'TiThLargeOutline': return <LIB.TiThLargeOutline className={className} />;
            case 'TiThLarge': return <LIB.TiThLarge className={className} />;
            case 'TiThListOutline': return <LIB.TiThListOutline className={className} />;
            case 'TiThList': return <LIB.TiThList className={className} />;
            case 'TiThMenuOutline': return <LIB.TiThMenuOutline className={className} />;
            case 'TiThMenu': return <LIB.TiThMenu className={className} />;
            case 'TiThSmallOutline': return <LIB.TiThSmallOutline className={className} />;
            case 'TiThSmall': return <LIB.TiThSmall className={className} />;
            case 'TiThermometer': return <LIB.TiThermometer className={className} />;
            case 'TiThumbsDown': return <LIB.TiThumbsDown className={className} />;
            case 'TiThumbsOk': return <LIB.TiThumbsOk className={className} />;
            case 'TiThumbsUp': return <LIB.TiThumbsUp className={className} />;
            case 'TiTickOutline': return <LIB.TiTickOutline className={className} />;
            case 'TiTick': return <LIB.TiTick className={className} />;
            case 'TiTicket': return <LIB.TiTicket className={className} />;
            case 'TiTime': return <LIB.TiTime className={className} />;
            case 'TiTimesOutline': return <LIB.TiTimesOutline className={className} />;
            case 'TiTimes': return <LIB.TiTimes className={className} />;
            case 'TiTrash': return <LIB.TiTrash className={className} />;
            case 'TiTree': return <LIB.TiTree className={className} />;
            case 'TiUploadOutline': return <LIB.TiUploadOutline className={className} />;
            case 'TiUpload': return <LIB.TiUpload className={className} />;
            case 'TiUserAddOutline': return <LIB.TiUserAddOutline className={className} />;
            case 'TiUserAdd': return <LIB.TiUserAdd className={className} />;
            case 'TiUserDeleteOutline': return <LIB.TiUserDeleteOutline className={className} />;
            case 'TiUserDelete': return <LIB.TiUserDelete className={className} />;
            case 'TiUserOutline': return <LIB.TiUserOutline className={className} />;
            case 'TiUser': return <LIB.TiUser className={className} />;
            case 'TiVendorAndroid': return <LIB.TiVendorAndroid className={className} />;
            case 'TiVendorApple': return <LIB.TiVendorApple className={className} />;
            case 'TiVendorMicrosoft': return <LIB.TiVendorMicrosoft className={className} />;
            case 'TiVideoOutline': return <LIB.TiVideoOutline className={className} />;
            case 'TiVideo': return <LIB.TiVideo className={className} />;
            case 'TiVolumeDown': return <LIB.TiVolumeDown className={className} />;
            case 'TiVolumeMute': return <LIB.TiVolumeMute className={className} />;
            case 'TiVolumeUp': return <LIB.TiVolumeUp className={className} />;
            case 'TiVolume': return <LIB.TiVolume className={className} />;
            case 'TiWarningOutline': return <LIB.TiWarningOutline className={className} />;
            case 'TiWarning': return <LIB.TiWarning className={className} />;
            case 'TiWatch': return <LIB.TiWatch className={className} />;
            case 'TiWavesOutline': return <LIB.TiWavesOutline className={className} />;
            case 'TiWaves': return <LIB.TiWaves className={className} />;
            case 'TiWeatherCloudy': return <LIB.TiWeatherCloudy className={className} />;
            case 'TiWeatherDownpour': return <LIB.TiWeatherDownpour className={className} />;
            case 'TiWeatherNight': return <LIB.TiWeatherNight className={className} />;
            case 'TiWeatherPartlySunny': return <LIB.TiWeatherPartlySunny className={className} />;
            case 'TiWeatherShower': return <LIB.TiWeatherShower className={className} />;
            case 'TiWeatherSnow': return <LIB.TiWeatherSnow className={className} />;
            case 'TiWeatherStormy': return <LIB.TiWeatherStormy className={className} />;
            case 'TiWeatherSunny': return <LIB.TiWeatherSunny className={className} />;
            case 'TiWeatherWindyCloudy': return <LIB.TiWeatherWindyCloudy className={className} />;
            case 'TiWeatherWindy': return <LIB.TiWeatherWindy className={className} />;
            case 'TiWiFiOutline': return <LIB.TiWiFiOutline className={className} />;
            case 'TiWiFi': return <LIB.TiWiFi className={className} />;
            case 'TiWine': return <LIB.TiWine className={className} />;
            case 'TiWorldOutline': return <LIB.TiWorldOutline className={className} />;
            case 'TiWorld': return <LIB.TiWorld className={className} />;
            case 'TiZoomInOutline': return <LIB.TiZoomInOutline className={className} />;
            case 'TiZoomIn': return <LIB.TiZoomIn className={className} />;
            case 'TiZoomOutOutline': return <LIB.TiZoomOutOutline className={className} />;
            case 'TiZoomOut': return <LIB.TiZoomOut className={className} />;
            case 'TiZoomOutline': return <LIB.TiZoomOutline className={className} />;
            case 'TiZoom': return <LIB.TiZoom className={className} />;

            default:
                console.log('Ti - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Ti;