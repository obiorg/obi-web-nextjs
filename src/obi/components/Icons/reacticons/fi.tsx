/**
 * https://react-icons.github.io/react-icons/icons/fi/
 */


import * as LIB from "react-icons/fi";


// Define the props that the PostForm component expects
interface fiProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Fi(
    {
        icon = 'FiActivity',
        className,
    }: fiProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'FiActivity': return <LIB.FiActivity className={className} />;
            case 'FiAirplay': return <LIB.FiAirplay className={className} />;
            case 'FiAlertCircle': return <LIB.FiAlertCircle className={className} />;
            case 'FiAlertOctagon': return <LIB.FiAlertOctagon className={className} />;
            case 'FiAlertTriangle': return <LIB.FiAlertTriangle className={className} />;
            case 'FiAlignCenter': return <LIB.FiAlignCenter className={className} />;
            case 'FiAlignJustify': return <LIB.FiAlignJustify className={className} />;
            case 'FiAlignLeft': return <LIB.FiAlignLeft className={className} />;
            case 'FiAlignRight': return <LIB.FiAlignRight className={className} />;
            case 'FiAnchor': return <LIB.FiAnchor className={className} />;
            case 'FiAperture': return <LIB.FiAperture className={className} />;
            case 'FiArchive': return <LIB.FiArchive className={className} />;
            case 'FiArrowDownCircle': return <LIB.FiArrowDownCircle className={className} />;
            case 'FiArrowDownLeft': return <LIB.FiArrowDownLeft className={className} />;
            case 'FiArrowDownRight': return <LIB.FiArrowDownRight className={className} />;
            case 'FiArrowDown': return <LIB.FiArrowDown className={className} />;
            case 'FiArrowLeftCircle': return <LIB.FiArrowLeftCircle className={className} />;
            case 'FiArrowLeft': return <LIB.FiArrowLeft className={className} />;
            case 'FiArrowRightCircle': return <LIB.FiArrowRightCircle className={className} />;
            case 'FiArrowRight': return <LIB.FiArrowRight className={className} />;
            case 'FiArrowUpCircle': return <LIB.FiArrowUpCircle className={className} />;
            case 'FiArrowUpLeft': return <LIB.FiArrowUpLeft className={className} />;
            case 'FiArrowUpRight': return <LIB.FiArrowUpRight className={className} />;
            case 'FiArrowUp': return <LIB.FiArrowUp className={className} />;
            case 'FiAtSign': return <LIB.FiAtSign className={className} />;
            case 'FiAward': return <LIB.FiAward className={className} />;
            case 'FiBarChart2': return <LIB.FiBarChart2 className={className} />;
            case 'FiBarChart': return <LIB.FiBarChart className={className} />;
            case 'FiBatteryCharging': return <LIB.FiBatteryCharging className={className} />;
            case 'FiBattery': return <LIB.FiBattery className={className} />;
            case 'FiBellOff': return <LIB.FiBellOff className={className} />;
            case 'FiBell': return <LIB.FiBell className={className} />;
            case 'FiBluetooth': return <LIB.FiBluetooth className={className} />;
            case 'FiBold': return <LIB.FiBold className={className} />;
            case 'FiBookOpen': return <LIB.FiBookOpen className={className} />;
            case 'FiBook': return <LIB.FiBook className={className} />;
            case 'FiBookmark': return <LIB.FiBookmark className={className} />;
            case 'FiBox': return <LIB.FiBox className={className} />;
            case 'FiBriefcase': return <LIB.FiBriefcase className={className} />;
            case 'FiCalendar': return <LIB.FiCalendar className={className} />;
            case 'FiCameraOff': return <LIB.FiCameraOff className={className} />;
            case 'FiCamera': return <LIB.FiCamera className={className} />;
            case 'FiCast': return <LIB.FiCast className={className} />;
            case 'FiCheckCircle': return <LIB.FiCheckCircle className={className} />;
            case 'FiCheckSquare': return <LIB.FiCheckSquare className={className} />;
            case 'FiCheck': return <LIB.FiCheck className={className} />;
            case 'FiChevronDown': return <LIB.FiChevronDown className={className} />;
            case 'FiChevronLeft': return <LIB.FiChevronLeft className={className} />;
            case 'FiChevronRight': return <LIB.FiChevronRight className={className} />;
            case 'FiChevronUp': return <LIB.FiChevronUp className={className} />;
            case 'FiChevronsDown': return <LIB.FiChevronsDown className={className} />;
            case 'FiChevronsLeft': return <LIB.FiChevronsLeft className={className} />;
            case 'FiChevronsRight': return <LIB.FiChevronsRight className={className} />;
            case 'FiChevronsUp': return <LIB.FiChevronsUp className={className} />;
            case 'FiChrome': return <LIB.FiChrome className={className} />;
            case 'FiCircle': return <LIB.FiCircle className={className} />;
            case 'FiClipboard': return <LIB.FiClipboard className={className} />;
            case 'FiClock': return <LIB.FiClock className={className} />;
            case 'FiCloudDrizzle': return <LIB.FiCloudDrizzle className={className} />;
            case 'FiCloudLightning': return <LIB.FiCloudLightning className={className} />;
            case 'FiCloudOff': return <LIB.FiCloudOff className={className} />;
            case 'FiCloudRain': return <LIB.FiCloudRain className={className} />;
            case 'FiCloudSnow': return <LIB.FiCloudSnow className={className} />;
            case 'FiCloud': return <LIB.FiCloud className={className} />;
            case 'FiCode': return <LIB.FiCode className={className} />;
            case 'FiCodepen': return <LIB.FiCodepen className={className} />;
            case 'FiCodesandbox': return <LIB.FiCodesandbox className={className} />;
            case 'FiCoffee': return <LIB.FiCoffee className={className} />;
            case 'FiColumns': return <LIB.FiColumns className={className} />;
            case 'FiCommand': return <LIB.FiCommand className={className} />;
            case 'FiCompass': return <LIB.FiCompass className={className} />;
            case 'FiCopy': return <LIB.FiCopy className={className} />;
            case 'FiCornerDownLeft': return <LIB.FiCornerDownLeft className={className} />;
            case 'FiCornerDownRight': return <LIB.FiCornerDownRight className={className} />;
            case 'FiCornerLeftDown': return <LIB.FiCornerLeftDown className={className} />;
            case 'FiCornerLeftUp': return <LIB.FiCornerLeftUp className={className} />;
            case 'FiCornerRightDown': return <LIB.FiCornerRightDown className={className} />;
            case 'FiCornerRightUp': return <LIB.FiCornerRightUp className={className} />;
            case 'FiCornerUpLeft': return <LIB.FiCornerUpLeft className={className} />;
            case 'FiCornerUpRight': return <LIB.FiCornerUpRight className={className} />;
            case 'FiCpu': return <LIB.FiCpu className={className} />;
            case 'FiCreditCard': return <LIB.FiCreditCard className={className} />;
            case 'FiCrop': return <LIB.FiCrop className={className} />;
            case 'FiCrosshair': return <LIB.FiCrosshair className={className} />;
            case 'FiDatabase': return <LIB.FiDatabase className={className} />;
            case 'FiDelete': return <LIB.FiDelete className={className} />;
            case 'FiDisc': return <LIB.FiDisc className={className} />;
            case 'FiDivideCircle': return <LIB.FiDivideCircle className={className} />;
            case 'FiDivideSquare': return <LIB.FiDivideSquare className={className} />;
            case 'FiDivide': return <LIB.FiDivide className={className} />;
            case 'FiDollarSign': return <LIB.FiDollarSign className={className} />;
            case 'FiDownloadCloud': return <LIB.FiDownloadCloud className={className} />;
            case 'FiDownload': return <LIB.FiDownload className={className} />;
            case 'FiDribbble': return <LIB.FiDribbble className={className} />;
            case 'FiDroplet': return <LIB.FiDroplet className={className} />;
            case 'FiEdit2': return <LIB.FiEdit2 className={className} />;
            case 'FiEdit3': return <LIB.FiEdit3 className={className} />;
            case 'FiEdit': return <LIB.FiEdit className={className} />;
            case 'FiExternalLink': return <LIB.FiExternalLink className={className} />;
            case 'FiEyeOff': return <LIB.FiEyeOff className={className} />;
            case 'FiEye': return <LIB.FiEye className={className} />;
            case 'FiFacebook': return <LIB.FiFacebook className={className} />;
            case 'FiFastForward': return <LIB.FiFastForward className={className} />;
            case 'FiFeather': return <LIB.FiFeather className={className} />;
            case 'FiFigma': return <LIB.FiFigma className={className} />;
            case 'FiFileMinus': return <LIB.FiFileMinus className={className} />;
            case 'FiFilePlus': return <LIB.FiFilePlus className={className} />;
            case 'FiFileText': return <LIB.FiFileText className={className} />;
            case 'FiFile': return <LIB.FiFile className={className} />;
            case 'FiFilm': return <LIB.FiFilm className={className} />;
            case 'FiFilter': return <LIB.FiFilter className={className} />;
            case 'FiFlag': return <LIB.FiFlag className={className} />;
            case 'FiFolderMinus': return <LIB.FiFolderMinus className={className} />;
            case 'FiFolderPlus': return <LIB.FiFolderPlus className={className} />;
            case 'FiFolder': return <LIB.FiFolder className={className} />;
            case 'FiFramer': return <LIB.FiFramer className={className} />;
            case 'FiFrown': return <LIB.FiFrown className={className} />;
            case 'FiGift': return <LIB.FiGift className={className} />;
            case 'FiGitBranch': return <LIB.FiGitBranch className={className} />;
            case 'FiGitCommit': return <LIB.FiGitCommit className={className} />;
            case 'FiGitMerge': return <LIB.FiGitMerge className={className} />;
            case 'FiGitPullRequest': return <LIB.FiGitPullRequest className={className} />;
            case 'FiGithub': return <LIB.FiGithub className={className} />;
            case 'FiGitlab': return <LIB.FiGitlab className={className} />;
            case 'FiGlobe': return <LIB.FiGlobe className={className} />;
            case 'FiGrid': return <LIB.FiGrid className={className} />;
            case 'FiHardDrive': return <LIB.FiHardDrive className={className} />;
            case 'FiHash': return <LIB.FiHash className={className} />;
            case 'FiHeadphones': return <LIB.FiHeadphones className={className} />;
            case 'FiHeart': return <LIB.FiHeart className={className} />;
            case 'FiHelpCircle': return <LIB.FiHelpCircle className={className} />;
            case 'FiHexagon': return <LIB.FiHexagon className={className} />;
            case 'FiHome': return <LIB.FiHome className={className} />;
            case 'FiImage': return <LIB.FiImage className={className} />;
            case 'FiInbox': return <LIB.FiInbox className={className} />;
            case 'FiInfo': return <LIB.FiInfo className={className} />;
            case 'FiInstagram': return <LIB.FiInstagram className={className} />;
            case 'FiItalic': return <LIB.FiItalic className={className} />;
            case 'FiKey': return <LIB.FiKey className={className} />;
            case 'FiLayers': return <LIB.FiLayers className={className} />;
            case 'FiLayout': return <LIB.FiLayout className={className} />;
            case 'FiLifeBuoy': return <LIB.FiLifeBuoy className={className} />;
            case 'FiLink2': return <LIB.FiLink2 className={className} />;
            case 'FiLink': return <LIB.FiLink className={className} />;
            case 'FiLinkedin': return <LIB.FiLinkedin className={className} />;
            case 'FiList': return <LIB.FiList className={className} />;
            case 'FiLoader': return <LIB.FiLoader className={className} />;
            case 'FiLock': return <LIB.FiLock className={className} />;
            case 'FiLogIn': return <LIB.FiLogIn className={className} />;
            case 'FiLogOut': return <LIB.FiLogOut className={className} />;
            case 'FiMail': return <LIB.FiMail className={className} />;
            case 'FiMapPin': return <LIB.FiMapPin className={className} />;
            case 'FiMap': return <LIB.FiMap className={className} />;
            case 'FiMaximize2': return <LIB.FiMaximize2 className={className} />;
            case 'FiMaximize': return <LIB.FiMaximize className={className} />;
            case 'FiMeh': return <LIB.FiMeh className={className} />;
            case 'FiMenu': return <LIB.FiMenu className={className} />;
            case 'FiMessageCircle': return <LIB.FiMessageCircle className={className} />;
            case 'FiMessageSquare': return <LIB.FiMessageSquare className={className} />;
            case 'FiMicOff': return <LIB.FiMicOff className={className} />;
            case 'FiMic': return <LIB.FiMic className={className} />;
            case 'FiMinimize2': return <LIB.FiMinimize2 className={className} />;
            case 'FiMinimize': return <LIB.FiMinimize className={className} />;
            case 'FiMinusCircle': return <LIB.FiMinusCircle className={className} />;
            case 'FiMinusSquare': return <LIB.FiMinusSquare className={className} />;
            case 'FiMinus': return <LIB.FiMinus className={className} />;
            case 'FiMonitor': return <LIB.FiMonitor className={className} />;
            case 'FiMoon': return <LIB.FiMoon className={className} />;
            case 'FiMoreHorizontal': return <LIB.FiMoreHorizontal className={className} />;
            case 'FiMoreVertical': return <LIB.FiMoreVertical className={className} />;
            case 'FiMousePointer': return <LIB.FiMousePointer className={className} />;
            case 'FiMove': return <LIB.FiMove className={className} />;
            case 'FiMusic': return <LIB.FiMusic className={className} />;
            case 'FiNavigation2': return <LIB.FiNavigation2 className={className} />;
            case 'FiNavigation': return <LIB.FiNavigation className={className} />;
            case 'FiOctagon': return <LIB.FiOctagon className={className} />;
            case 'FiPackage': return <LIB.FiPackage className={className} />;
            case 'FiPaperclip': return <LIB.FiPaperclip className={className} />;
            case 'FiPauseCircle': return <LIB.FiPauseCircle className={className} />;
            case 'FiPause': return <LIB.FiPause className={className} />;
            case 'FiPenTool': return <LIB.FiPenTool className={className} />;
            case 'FiPercent': return <LIB.FiPercent className={className} />;
            case 'FiPhoneCall': return <LIB.FiPhoneCall className={className} />;
            case 'FiPhoneForwarded': return <LIB.FiPhoneForwarded className={className} />;
            case 'FiPhoneIncoming': return <LIB.FiPhoneIncoming className={className} />;
            case 'FiPhoneMissed': return <LIB.FiPhoneMissed className={className} />;
            case 'FiPhoneOff': return <LIB.FiPhoneOff className={className} />;
            case 'FiPhoneOutgoing': return <LIB.FiPhoneOutgoing className={className} />;
            case 'FiPhone': return <LIB.FiPhone className={className} />;
            case 'FiPieChart': return <LIB.FiPieChart className={className} />;
            case 'FiPlayCircle': return <LIB.FiPlayCircle className={className} />;
            case 'FiPlay': return <LIB.FiPlay className={className} />;
            case 'FiPlusCircle': return <LIB.FiPlusCircle className={className} />;
            case 'FiPlusSquare': return <LIB.FiPlusSquare className={className} />;
            case 'FiPlus': return <LIB.FiPlus className={className} />;
            case 'FiPocket': return <LIB.FiPocket className={className} />;
            case 'FiPower': return <LIB.FiPower className={className} />;
            case 'FiPrinter': return <LIB.FiPrinter className={className} />;
            case 'FiRadio': return <LIB.FiRadio className={className} />;
            case 'FiRefreshCcw': return <LIB.FiRefreshCcw className={className} />;
            case 'FiRefreshCw': return <LIB.FiRefreshCw className={className} />;
            case 'FiRepeat': return <LIB.FiRepeat className={className} />;
            case 'FiRewind': return <LIB.FiRewind className={className} />;
            case 'FiRotateCcw': return <LIB.FiRotateCcw className={className} />;
            case 'FiRotateCw': return <LIB.FiRotateCw className={className} />;
            case 'FiRss': return <LIB.FiRss className={className} />;
            case 'FiSave': return <LIB.FiSave className={className} />;
            case 'FiScissors': return <LIB.FiScissors className={className} />;
            case 'FiSearch': return <LIB.FiSearch className={className} />;
            case 'FiSend': return <LIB.FiSend className={className} />;
            case 'FiServer': return <LIB.FiServer className={className} />;
            case 'FiSettings': return <LIB.FiSettings className={className} />;
            case 'FiShare2': return <LIB.FiShare2 className={className} />;
            case 'FiShare': return <LIB.FiShare className={className} />;
            case 'FiShieldOff': return <LIB.FiShieldOff className={className} />;
            case 'FiShield': return <LIB.FiShield className={className} />;
            case 'FiShoppingBag': return <LIB.FiShoppingBag className={className} />;
            case 'FiShoppingCart': return <LIB.FiShoppingCart className={className} />;
            case 'FiShuffle': return <LIB.FiShuffle className={className} />;
            case 'FiSidebar': return <LIB.FiSidebar className={className} />;
            case 'FiSkipBack': return <LIB.FiSkipBack className={className} />;
            case 'FiSkipForward': return <LIB.FiSkipForward className={className} />;
            case 'FiSlack': return <LIB.FiSlack className={className} />;
            case 'FiSlash': return <LIB.FiSlash className={className} />;
            case 'FiSliders': return <LIB.FiSliders className={className} />;
            case 'FiSmartphone': return <LIB.FiSmartphone className={className} />;
            case 'FiSmile': return <LIB.FiSmile className={className} />;
            case 'FiSpeaker': return <LIB.FiSpeaker className={className} />;
            case 'FiSquare': return <LIB.FiSquare className={className} />;
            case 'FiStar': return <LIB.FiStar className={className} />;
            case 'FiStopCircle': return <LIB.FiStopCircle className={className} />;
            case 'FiSun': return <LIB.FiSun className={className} />;
            case 'FiSunrise': return <LIB.FiSunrise className={className} />;
            case 'FiSunset': return <LIB.FiSunset className={className} />;
            case 'FiTable': return <LIB.FiTable className={className} />;
            case 'FiTablet': return <LIB.FiTablet className={className} />;
            case 'FiTag': return <LIB.FiTag className={className} />;
            case 'FiTarget': return <LIB.FiTarget className={className} />;
            case 'FiTerminal': return <LIB.FiTerminal className={className} />;
            case 'FiThermometer': return <LIB.FiThermometer className={className} />;
            case 'FiThumbsDown': return <LIB.FiThumbsDown className={className} />;
            case 'FiThumbsUp': return <LIB.FiThumbsUp className={className} />;
            case 'FiToggleLeft': return <LIB.FiToggleLeft className={className} />;
            case 'FiToggleRight': return <LIB.FiToggleRight className={className} />;
            case 'FiTool': return <LIB.FiTool className={className} />;
            case 'FiTrash2': return <LIB.FiTrash2 className={className} />;
            case 'FiTrash': return <LIB.FiTrash className={className} />;
            case 'FiTrello': return <LIB.FiTrello className={className} />;
            case 'FiTrendingDown': return <LIB.FiTrendingDown className={className} />;
            case 'FiTrendingUp': return <LIB.FiTrendingUp className={className} />;
            case 'FiTriangle': return <LIB.FiTriangle className={className} />;
            case 'FiTruck': return <LIB.FiTruck className={className} />;
            case 'FiTv': return <LIB.FiTv className={className} />;
            case 'FiTwitch': return <LIB.FiTwitch className={className} />;
            case 'FiTwitter': return <LIB.FiTwitter className={className} />;
            case 'FiType': return <LIB.FiType className={className} />;
            case 'FiUmbrella': return <LIB.FiUmbrella className={className} />;
            case 'FiUnderline': return <LIB.FiUnderline className={className} />;
            case 'FiUnlock': return <LIB.FiUnlock className={className} />;
            case 'FiUploadCloud': return <LIB.FiUploadCloud className={className} />;
            case 'FiUpload': return <LIB.FiUpload className={className} />;
            case 'FiUserCheck': return <LIB.FiUserCheck className={className} />;
            case 'FiUserMinus': return <LIB.FiUserMinus className={className} />;
            case 'FiUserPlus': return <LIB.FiUserPlus className={className} />;
            case 'FiUserX': return <LIB.FiUserX className={className} />;
            case 'FiUser': return <LIB.FiUser className={className} />;
            case 'FiUsers': return <LIB.FiUsers className={className} />;
            case 'FiVideoOff': return <LIB.FiVideoOff className={className} />;
            case 'FiVideo': return <LIB.FiVideo className={className} />;
            case 'FiVoicemail': return <LIB.FiVoicemail className={className} />;
            case 'FiVolume1': return <LIB.FiVolume1 className={className} />;
            case 'FiVolume2': return <LIB.FiVolume2 className={className} />;
            case 'FiVolumeX': return <LIB.FiVolumeX className={className} />;
            case 'FiVolume': return <LIB.FiVolume className={className} />;
            case 'FiWatch': return <LIB.FiWatch className={className} />;
            case 'FiWifiOff': return <LIB.FiWifiOff className={className} />;
            case 'FiWifi': return <LIB.FiWifi className={className} />;
            case 'FiWind': return <LIB.FiWind className={className} />;
            case 'FiXCircle': return <LIB.FiXCircle className={className} />;
            case 'FiXOctagon': return <LIB.FiXOctagon className={className} />;
            case 'FiXSquare': return <LIB.FiXSquare className={className} />;
            case 'FiX': return <LIB.FiX className={className} />;
            case 'FiYoutube': return <LIB.FiYoutube className={className} />;
            case 'FiZapOff': return <LIB.FiZapOff className={className} />;
            case 'FiZap': return <LIB.FiZap className={className} />;
            case 'FiZoomIn': return <LIB.FiZoomIn className={className} />;
            case 'FiZoomOut': return <LIB.FiZoomOut className={className} />;


            default:
                console.log('Fi - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Fi;