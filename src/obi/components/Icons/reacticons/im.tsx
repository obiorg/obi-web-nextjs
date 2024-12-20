/**
 * https://react-icons.github.io/react-icons/icons/im/
 */


import * as LIB from "react-icons/im";


// Define the props that the PostForm component expects
interface imProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Im(
    {
        icon = 'ImHome',
        className,
    }: imProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'ImHome': return <LIB.ImHome className={className} />;
            case 'ImHome2': return <LIB.ImHome2 className={className} />;
            case 'ImHome3': return <LIB.ImHome3 className={className} />;
            case 'ImOffice': return <LIB.ImOffice className={className} />;
            case 'ImNewspaper': return <LIB.ImNewspaper className={className} />;
            case 'ImPencil': return <LIB.ImPencil className={className} />;
            case 'ImPencil2': return <LIB.ImPencil2 className={className} />;
            case 'ImQuill': return <LIB.ImQuill className={className} />;
            case 'ImPen': return <LIB.ImPen className={className} />;
            case 'ImBlog': return <LIB.ImBlog className={className} />;
            case 'ImEyedropper': return <LIB.ImEyedropper className={className} />;
            case 'ImDroplet': return <LIB.ImDroplet className={className} />;
            case 'ImPaintFormat': return <LIB.ImPaintFormat className={className} />;
            case 'ImImage': return <LIB.ImImage className={className} />;
            case 'ImImages': return <LIB.ImImages className={className} />;
            case 'ImCamera': return <LIB.ImCamera className={className} />;
            case 'ImHeadphones': return <LIB.ImHeadphones className={className} />;
            case 'ImMusic': return <LIB.ImMusic className={className} />;
            case 'ImPlay': return <LIB.ImPlay className={className} />;
            case 'ImFilm': return <LIB.ImFilm className={className} />;
            case 'ImVideoCamera': return <LIB.ImVideoCamera className={className} />;
            case 'ImDice': return <LIB.ImDice className={className} />;
            case 'ImPacman': return <LIB.ImPacman className={className} />;
            case 'ImSpades': return <LIB.ImSpades className={className} />;
            case 'ImClubs': return <LIB.ImClubs className={className} />;
            case 'ImDiamonds': return <LIB.ImDiamonds className={className} />;
            case 'ImBullhorn': return <LIB.ImBullhorn className={className} />;
            case 'ImConnection': return <LIB.ImConnection className={className} />;
            case 'ImPodcast': return <LIB.ImPodcast className={className} />;
            case 'ImFeed': return <LIB.ImFeed className={className} />;
            case 'ImMic': return <LIB.ImMic className={className} />;
            case 'ImBook': return <LIB.ImBook className={className} />;
            case 'ImBooks': return <LIB.ImBooks className={className} />;
            case 'ImLibrary': return <LIB.ImLibrary className={className} />;
            case 'ImFileText': return <LIB.ImFileText className={className} />;
            case 'ImProfile': return <LIB.ImProfile className={className} />;
            case 'ImFileEmpty': return <LIB.ImFileEmpty className={className} />;
            case 'ImFilesEmpty': return <LIB.ImFilesEmpty className={className} />;
            case 'ImFileText2': return <LIB.ImFileText2 className={className} />;
            case 'ImFilePicture': return <LIB.ImFilePicture className={className} />;
            case 'ImFileMusic': return <LIB.ImFileMusic className={className} />;
            case 'ImFilePlay': return <LIB.ImFilePlay className={className} />;
            case 'ImFileVideo': return <LIB.ImFileVideo className={className} />;
            case 'ImFileZip': return <LIB.ImFileZip className={className} />;
            case 'ImCopy': return <LIB.ImCopy className={className} />;
            case 'ImPaste': return <LIB.ImPaste className={className} />;
            case 'ImStack': return <LIB.ImStack className={className} />;
            case 'ImFolder': return <LIB.ImFolder className={className} />;
            case 'ImFolderOpen': return <LIB.ImFolderOpen className={className} />;
            case 'ImFolderPlus': return <LIB.ImFolderPlus className={className} />;
            case 'ImFolderMinus': return <LIB.ImFolderMinus className={className} />;
            case 'ImFolderDownload': return <LIB.ImFolderDownload className={className} />;
            case 'ImFolderUpload': return <LIB.ImFolderUpload className={className} />;
            case 'ImPriceTag': return <LIB.ImPriceTag className={className} />;
            case 'ImPriceTags': return <LIB.ImPriceTags className={className} />;
            case 'ImBarcode': return <LIB.ImBarcode className={className} />;
            case 'ImQrcode': return <LIB.ImQrcode className={className} />;
            case 'ImTicket': return <LIB.ImTicket className={className} />;
            case 'ImCart': return <LIB.ImCart className={className} />;
            case 'ImCoinDollar': return <LIB.ImCoinDollar className={className} />;
            case 'ImCoinEuro': return <LIB.ImCoinEuro className={className} />;
            case 'ImCoinPound': return <LIB.ImCoinPound className={className} />;
            case 'ImCoinYen': return <LIB.ImCoinYen className={className} />;
            case 'ImCreditCard': return <LIB.ImCreditCard className={className} />;
            case 'ImCalculator': return <LIB.ImCalculator className={className} />;
            case 'ImLifebuoy': return <LIB.ImLifebuoy className={className} />;
            case 'ImPhone': return <LIB.ImPhone className={className} />;
            case 'ImPhoneHangUp': return <LIB.ImPhoneHangUp className={className} />;
            case 'ImAddressBook': return <LIB.ImAddressBook className={className} />;
            case 'ImEnvelop': return <LIB.ImEnvelop className={className} />;
            case 'ImPushpin': return <LIB.ImPushpin className={className} />;
            case 'ImLocation': return <LIB.ImLocation className={className} />;
            case 'ImLocation2': return <LIB.ImLocation2 className={className} />;
            case 'ImCompass': return <LIB.ImCompass className={className} />;
            case 'ImCompass2': return <LIB.ImCompass2 className={className} />;
            case 'ImMap': return <LIB.ImMap className={className} />;
            case 'ImMap2': return <LIB.ImMap2 className={className} />;
            case 'ImHistory': return <LIB.ImHistory className={className} />;
            case 'ImClock': return <LIB.ImClock className={className} />;
            case 'ImClock2': return <LIB.ImClock2 className={className} />;
            case 'ImAlarm': return <LIB.ImAlarm className={className} />;
            case 'ImBell': return <LIB.ImBell className={className} />;
            case 'ImStopwatch': return <LIB.ImStopwatch className={className} />;
            case 'ImCalendar': return <LIB.ImCalendar className={className} />;
            case 'ImPrinter': return <LIB.ImPrinter className={className} />;
            case 'ImKeyboard': return <LIB.ImKeyboard className={className} />;
            case 'ImDisplay': return <LIB.ImDisplay className={className} />;
            case 'ImLaptop': return <LIB.ImLaptop className={className} />;
            case 'ImMobile': return <LIB.ImMobile className={className} />;
            case 'ImMobile2': return <LIB.ImMobile2 className={className} />;
            case 'ImTablet': return <LIB.ImTablet className={className} />;
            case 'ImTv': return <LIB.ImTv className={className} />;
            case 'ImDrawer': return <LIB.ImDrawer className={className} />;
            case 'ImDrawer2': return <LIB.ImDrawer2 className={className} />;
            case 'ImBoxAdd': return <LIB.ImBoxAdd className={className} />;
            case 'ImBoxRemove': return <LIB.ImBoxRemove className={className} />;
            case 'ImDownload': return <LIB.ImDownload className={className} />;
            case 'ImUpload': return <LIB.ImUpload className={className} />;
            case 'ImFloppyDisk': return <LIB.ImFloppyDisk className={className} />;
            case 'ImDrive': return <LIB.ImDrive className={className} />;
            case 'ImDatabase': return <LIB.ImDatabase className={className} />;
            case 'ImUndo': return <LIB.ImUndo className={className} />;
            case 'ImRedo': return <LIB.ImRedo className={className} />;
            case 'ImUndo2': return <LIB.ImUndo2 className={className} />;
            case 'ImRedo2': return <LIB.ImRedo2 className={className} />;
            case 'ImForward': return <LIB.ImForward className={className} />;
            case 'ImReply': return <LIB.ImReply className={className} />;
            case 'ImBubble': return <LIB.ImBubble className={className} />;
            case 'ImBubbles': return <LIB.ImBubbles className={className} />;
            case 'ImBubbles2': return <LIB.ImBubbles2 className={className} />;
            case 'ImBubble2': return <LIB.ImBubble2 className={className} />;
            case 'ImBubbles3': return <LIB.ImBubbles3 className={className} />;
            case 'ImBubbles4': return <LIB.ImBubbles4 className={className} />;
            case 'ImUser': return <LIB.ImUser className={className} />;
            case 'ImUsers': return <LIB.ImUsers className={className} />;
            case 'ImUserPlus': return <LIB.ImUserPlus className={className} />;
            case 'ImUserMinus': return <LIB.ImUserMinus className={className} />;
            case 'ImUserCheck': return <LIB.ImUserCheck className={className} />;
            case 'ImUserTie': return <LIB.ImUserTie className={className} />;
            case 'ImQuotesLeft': return <LIB.ImQuotesLeft className={className} />;
            case 'ImQuotesRight': return <LIB.ImQuotesRight className={className} />;
            case 'ImHourGlass': return <LIB.ImHourGlass className={className} />;
            case 'ImSpinner': return <LIB.ImSpinner className={className} />;
            case 'ImSpinner2': return <LIB.ImSpinner2 className={className} />;
            case 'ImSpinner3': return <LIB.ImSpinner3 className={className} />;
            case 'ImSpinner4': return <LIB.ImSpinner4 className={className} />;
            case 'ImSpinner5': return <LIB.ImSpinner5 className={className} />;
            case 'ImSpinner6': return <LIB.ImSpinner6 className={className} />;
            case 'ImSpinner7': return <LIB.ImSpinner7 className={className} />;
            case 'ImSpinner8': return <LIB.ImSpinner8 className={className} />;
            case 'ImSpinner9': return <LIB.ImSpinner9 className={className} />;
            case 'ImSpinner10': return <LIB.ImSpinner10 className={className} />;
            case 'ImSpinner11': return <LIB.ImSpinner11 className={className} />;
            case 'ImBinoculars': return <LIB.ImBinoculars className={className} />;
            case 'ImSearch': return <LIB.ImSearch className={className} />;
            case 'ImZoomIn': return <LIB.ImZoomIn className={className} />;
            case 'ImZoomOut': return <LIB.ImZoomOut className={className} />;
            case 'ImEnlarge': return <LIB.ImEnlarge className={className} />;
            case 'ImShrink': return <LIB.ImShrink className={className} />;
            case 'ImEnlarge2': return <LIB.ImEnlarge2 className={className} />;
            case 'ImShrink2': return <LIB.ImShrink2 className={className} />;
            case 'ImKey': return <LIB.ImKey className={className} />;
            case 'ImKey2': return <LIB.ImKey2 className={className} />;
            case 'ImLock': return <LIB.ImLock className={className} />;
            case 'ImUnlocked': return <LIB.ImUnlocked className={className} />;
            case 'ImWrench': return <LIB.ImWrench className={className} />;
            case 'ImEqualizer': return <LIB.ImEqualizer className={className} />;
            case 'ImEqualizer2': return <LIB.ImEqualizer2 className={className} />;
            case 'ImCog': return <LIB.ImCog className={className} />;
            case 'ImCogs': return <LIB.ImCogs className={className} />;
            case 'ImHammer': return <LIB.ImHammer className={className} />;
            case 'ImMagicWand': return <LIB.ImMagicWand className={className} />;
            case 'ImAidKit': return <LIB.ImAidKit className={className} />;
            case 'ImBug': return <LIB.ImBug className={className} />;
            case 'ImPieChart': return <LIB.ImPieChart className={className} />;
            case 'ImStatsDots': return <LIB.ImStatsDots className={className} />;
            case 'ImStatsBars': return <LIB.ImStatsBars className={className} />;
            case 'ImStatsBars2': return <LIB.ImStatsBars2 className={className} />;
            case 'ImTrophy': return <LIB.ImTrophy className={className} />;
            case 'ImGift': return <LIB.ImGift className={className} />;
            case 'ImGlass': return <LIB.ImGlass className={className} />;
            case 'ImGlass2': return <LIB.ImGlass2 className={className} />;
            case 'ImMug': return <LIB.ImMug className={className} />;
            case 'ImSpoonKnife': return <LIB.ImSpoonKnife className={className} />;
            case 'ImLeaf': return <LIB.ImLeaf className={className} />;
            case 'ImRocket': return <LIB.ImRocket className={className} />;
            case 'ImMeter': return <LIB.ImMeter className={className} />;
            case 'ImMeter2': return <LIB.ImMeter2 className={className} />;
            case 'ImHammer2': return <LIB.ImHammer2 className={className} />;
            case 'ImFire': return <LIB.ImFire className={className} />;
            case 'ImLab': return <LIB.ImLab className={className} />;
            case 'ImMagnet': return <LIB.ImMagnet className={className} />;
            case 'ImBin': return <LIB.ImBin className={className} />;
            case 'ImBin2': return <LIB.ImBin2 className={className} />;
            case 'ImBriefcase': return <LIB.ImBriefcase className={className} />;
            case 'ImAirplane': return <LIB.ImAirplane className={className} />;
            case 'ImTruck': return <LIB.ImTruck className={className} />;
            case 'ImRoad': return <LIB.ImRoad className={className} />;
            case 'ImAccessibility': return <LIB.ImAccessibility className={className} />;
            case 'ImTarget': return <LIB.ImTarget className={className} />;
            case 'ImShield': return <LIB.ImShield className={className} />;
            case 'ImPower': return <LIB.ImPower className={className} />;
            case 'ImSwitch': return <LIB.ImSwitch className={className} />;
            case 'ImPowerCord': return <LIB.ImPowerCord className={className} />;
            case 'ImClipboard': return <LIB.ImClipboard className={className} />;
            case 'ImListNumbered': return <LIB.ImListNumbered className={className} />;
            case 'ImList': return <LIB.ImList className={className} />;
            case 'ImList2': return <LIB.ImList2 className={className} />;
            case 'ImTree': return <LIB.ImTree className={className} />;
            case 'ImMenu': return <LIB.ImMenu className={className} />;
            case 'ImMenu2': return <LIB.ImMenu2 className={className} />;
            case 'ImMenu3': return <LIB.ImMenu3 className={className} />;
            case 'ImMenu4': return <LIB.ImMenu4 className={className} />;
            case 'ImCloud': return <LIB.ImCloud className={className} />;
            case 'ImCloudDownload': return <LIB.ImCloudDownload className={className} />;
            case 'ImCloudUpload': return <LIB.ImCloudUpload className={className} />;
            case 'ImCloudCheck': return <LIB.ImCloudCheck className={className} />;
            case 'ImDownload2': return <LIB.ImDownload2 className={className} />;
            case 'ImUpload2': return <LIB.ImUpload2 className={className} />;
            case 'ImDownload3': return <LIB.ImDownload3 className={className} />;
            case 'ImUpload3': return <LIB.ImUpload3 className={className} />;
            case 'ImSphere': return <LIB.ImSphere className={className} />;
            case 'ImEarth': return <LIB.ImEarth className={className} />;
            case 'ImLink': return <LIB.ImLink className={className} />;
            case 'ImFlag': return <LIB.ImFlag className={className} />;
            case 'ImAttachment': return <LIB.ImAttachment className={className} />;
            case 'ImEye': return <LIB.ImEye className={className} />;
            case 'ImEyePlus': return <LIB.ImEyePlus className={className} />;
            case 'ImEyeMinus': return <LIB.ImEyeMinus className={className} />;
            case 'ImEyeBlocked': return <LIB.ImEyeBlocked className={className} />;
            case 'ImBookmark': return <LIB.ImBookmark className={className} />;
            case 'ImBookmarks': return <LIB.ImBookmarks className={className} />;
            case 'ImSun': return <LIB.ImSun className={className} />;
            case 'ImContrast': return <LIB.ImContrast className={className} />;
            case 'ImBrightnessContrast': return <LIB.ImBrightnessContrast className={className} />;
            case 'ImStarEmpty': return <LIB.ImStarEmpty className={className} />;
            case 'ImStarHalf': return <LIB.ImStarHalf className={className} />;
            case 'ImStarFull': return <LIB.ImStarFull className={className} />;
            case 'ImHeart': return <LIB.ImHeart className={className} />;
            case 'ImHeartBroken': return <LIB.ImHeartBroken className={className} />;
            case 'ImMan': return <LIB.ImMan className={className} />;
            case 'ImWoman': return <LIB.ImWoman className={className} />;
            case 'ImManWoman': return <LIB.ImManWoman className={className} />;
            case 'ImHappy': return <LIB.ImHappy className={className} />;
            case 'ImHappy2': return <LIB.ImHappy2 className={className} />;
            case 'ImSmile': return <LIB.ImSmile className={className} />;
            case 'ImSmile2': return <LIB.ImSmile2 className={className} />;
            case 'ImTongue': return <LIB.ImTongue className={className} />;
            case 'ImTongue2': return <LIB.ImTongue2 className={className} />;
            case 'ImSad': return <LIB.ImSad className={className} />;
            case 'ImSad2': return <LIB.ImSad2 className={className} />;
            case 'ImWink': return <LIB.ImWink className={className} />;
            case 'ImWink2': return <LIB.ImWink2 className={className} />;
            case 'ImGrin': return <LIB.ImGrin className={className} />;
            case 'ImGrin2': return <LIB.ImGrin2 className={className} />;
            case 'ImCool': return <LIB.ImCool className={className} />;
            case 'ImCool2': return <LIB.ImCool2 className={className} />;
            case 'ImAngry': return <LIB.ImAngry className={className} />;
            case 'ImAngry2': return <LIB.ImAngry2 className={className} />;
            case 'ImEvil': return <LIB.ImEvil className={className} />;
            case 'ImEvil2': return <LIB.ImEvil2 className={className} />;
            case 'ImShocked': return <LIB.ImShocked className={className} />;
            case 'ImShocked2': return <LIB.ImShocked2 className={className} />;
            case 'ImBaffled': return <LIB.ImBaffled className={className} />;
            case 'ImBaffled2': return <LIB.ImBaffled2 className={className} />;
            case 'ImConfused': return <LIB.ImConfused className={className} />;
            case 'ImConfused2': return <LIB.ImConfused2 className={className} />;
            case 'ImNeutral': return <LIB.ImNeutral className={className} />;
            case 'ImNeutral2': return <LIB.ImNeutral2 className={className} />;
            case 'ImHipster': return <LIB.ImHipster className={className} />;
            case 'ImHipster2': return <LIB.ImHipster2 className={className} />;
            case 'ImWondering': return <LIB.ImWondering className={className} />;
            case 'ImWondering2': return <LIB.ImWondering2 className={className} />;
            case 'ImSleepy': return <LIB.ImSleepy className={className} />;
            case 'ImSleepy2': return <LIB.ImSleepy2 className={className} />;
            case 'ImFrustrated': return <LIB.ImFrustrated className={className} />;
            case 'ImFrustrated2': return <LIB.ImFrustrated2 className={className} />;
            case 'ImCrying': return <LIB.ImCrying className={className} />;
            case 'ImCrying2': return <LIB.ImCrying2 className={className} />;
            case 'ImPointUp': return <LIB.ImPointUp className={className} />;
            case 'ImPointRight': return <LIB.ImPointRight className={className} />;
            case 'ImPointDown': return <LIB.ImPointDown className={className} />;
            case 'ImPointLeft': return <LIB.ImPointLeft className={className} />;
            case 'ImWarning': return <LIB.ImWarning className={className} />;
            case 'ImNotification': return <LIB.ImNotification className={className} />;
            case 'ImQuestion': return <LIB.ImQuestion className={className} />;
            case 'ImPlus': return <LIB.ImPlus className={className} />;
            case 'ImMinus': return <LIB.ImMinus className={className} />;
            case 'ImInfo': return <LIB.ImInfo className={className} />;
            case 'ImCancelCircle': return <LIB.ImCancelCircle className={className} />;
            case 'ImBlocked': return <LIB.ImBlocked className={className} />;
            case 'ImCross': return <LIB.ImCross className={className} />;
            case 'ImCheckmark': return <LIB.ImCheckmark className={className} />;
            case 'ImCheckmark2': return <LIB.ImCheckmark2 className={className} />;
            case 'ImSpellCheck': return <LIB.ImSpellCheck className={className} />;
            case 'ImEnter': return <LIB.ImEnter className={className} />;
            case 'ImExit': return <LIB.ImExit className={className} />;
            case 'ImPlay2': return <LIB.ImPlay2 className={className} />;
            case 'ImPause': return <LIB.ImPause className={className} />;
            case 'ImStop': return <LIB.ImStop className={className} />;
            case 'ImPrevious': return <LIB.ImPrevious className={className} />;
            case 'ImNext': return <LIB.ImNext className={className} />;
            case 'ImBackward': return <LIB.ImBackward className={className} />;
            case 'ImForward2': return <LIB.ImForward2 className={className} />;
            case 'ImPlay3': return <LIB.ImPlay3 className={className} />;
            case 'ImPause2': return <LIB.ImPause2 className={className} />;
            case 'ImStop2': return <LIB.ImStop2 className={className} />;
            case 'ImBackward2': return <LIB.ImBackward2 className={className} />;
            case 'ImForward3': return <LIB.ImForward3 className={className} />;
            case 'ImFirst': return <LIB.ImFirst className={className} />;
            case 'ImLast': return <LIB.ImLast className={className} />;
            case 'ImPrevious2': return <LIB.ImPrevious2 className={className} />;
            case 'ImNext2': return <LIB.ImNext2 className={className} />;
            case 'ImEject': return <LIB.ImEject className={className} />;
            case 'ImVolumeHigh': return <LIB.ImVolumeHigh className={className} />;
            case 'ImVolumeMedium': return <LIB.ImVolumeMedium className={className} />;
            case 'ImVolumeLow': return <LIB.ImVolumeLow className={className} />;
            case 'ImVolumeMute': return <LIB.ImVolumeMute className={className} />;
            case 'ImVolumeMute2': return <LIB.ImVolumeMute2 className={className} />;
            case 'ImVolumeIncrease': return <LIB.ImVolumeIncrease className={className} />;
            case 'ImVolumeDecrease': return <LIB.ImVolumeDecrease className={className} />;
            case 'ImLoop': return <LIB.ImLoop className={className} />;
            case 'ImLoop2': return <LIB.ImLoop2 className={className} />;
            case 'ImInfinite': return <LIB.ImInfinite className={className} />;
            case 'ImShuffle': return <LIB.ImShuffle className={className} />;
            case 'ImArrowUpLeft': return <LIB.ImArrowUpLeft className={className} />;
            case 'ImArrowUp': return <LIB.ImArrowUp className={className} />;
            case 'ImArrowUpRight': return <LIB.ImArrowUpRight className={className} />;
            case 'ImArrowRight': return <LIB.ImArrowRight className={className} />;
            case 'ImArrowDownRight': return <LIB.ImArrowDownRight className={className} />;
            case 'ImArrowDown': return <LIB.ImArrowDown className={className} />;
            case 'ImArrowDownLeft': return <LIB.ImArrowDownLeft className={className} />;
            case 'ImArrowLeft': return <LIB.ImArrowLeft className={className} />;
            case 'ImArrowUpLeft2': return <LIB.ImArrowUpLeft2 className={className} />;
            case 'ImArrowUp2': return <LIB.ImArrowUp2 className={className} />;
            case 'ImArrowUpRight2': return <LIB.ImArrowUpRight2 className={className} />;
            case 'ImArrowRight2': return <LIB.ImArrowRight2 className={className} />;
            case 'ImArrowDownRight2': return <LIB.ImArrowDownRight2 className={className} />;
            case 'ImArrowDown2': return <LIB.ImArrowDown2 className={className} />;
            case 'ImArrowDownLeft2': return <LIB.ImArrowDownLeft2 className={className} />;
            case 'ImArrowLeft2': return <LIB.ImArrowLeft2 className={className} />;
            case 'ImCircleUp': return <LIB.ImCircleUp className={className} />;
            case 'ImCircleRight': return <LIB.ImCircleRight className={className} />;
            case 'ImCircleDown': return <LIB.ImCircleDown className={className} />;
            case 'ImCircleLeft': return <LIB.ImCircleLeft className={className} />;
            case 'ImTab': return <LIB.ImTab className={className} />;
            case 'ImMoveUp': return <LIB.ImMoveUp className={className} />;
            case 'ImMoveDown': return <LIB.ImMoveDown className={className} />;
            case 'ImSortAlphaAsc': return <LIB.ImSortAlphaAsc className={className} />;
            case 'ImSortAlphaDesc': return <LIB.ImSortAlphaDesc className={className} />;
            case 'ImSortNumericAsc': return <LIB.ImSortNumericAsc className={className} />;
            case 'ImSortNumbericDesc': return <LIB.ImSortNumbericDesc className={className} />;
            case 'ImSortAmountAsc': return <LIB.ImSortAmountAsc className={className} />;
            case 'ImSortAmountDesc': return <LIB.ImSortAmountDesc className={className} />;
            case 'ImCommand': return <LIB.ImCommand className={className} />;
            case 'ImShift': return <LIB.ImShift className={className} />;
            case 'ImCtrl': return <LIB.ImCtrl className={className} />;
            case 'ImOpt': return <LIB.ImOpt className={className} />;
            case 'ImCheckboxChecked': return <LIB.ImCheckboxChecked className={className} />;
            case 'ImCheckboxUnchecked': return <LIB.ImCheckboxUnchecked className={className} />;
            case 'ImRadioChecked': return <LIB.ImRadioChecked className={className} />;
            case 'ImRadioChecked2': return <LIB.ImRadioChecked2 className={className} />;
            case 'ImRadioUnchecked': return <LIB.ImRadioUnchecked className={className} />;
            case 'ImCrop': return <LIB.ImCrop className={className} />;
            case 'ImMakeGroup': return <LIB.ImMakeGroup className={className} />;
            case 'ImUngroup': return <LIB.ImUngroup className={className} />;
            case 'ImScissors': return <LIB.ImScissors className={className} />;
            case 'ImFilter': return <LIB.ImFilter className={className} />;
            case 'ImFont': return <LIB.ImFont className={className} />;
            case 'ImLigature': return <LIB.ImLigature className={className} />;
            case 'ImLigature2': return <LIB.ImLigature2 className={className} />;
            case 'ImTextHeight': return <LIB.ImTextHeight className={className} />;
            case 'ImTextWidth': return <LIB.ImTextWidth className={className} />;
            case 'ImFontSize': return <LIB.ImFontSize className={className} />;
            case 'ImBold': return <LIB.ImBold className={className} />;
            case 'ImUnderline': return <LIB.ImUnderline className={className} />;
            case 'ImItalic': return <LIB.ImItalic className={className} />;
            case 'ImStrikethrough': return <LIB.ImStrikethrough className={className} />;
            case 'ImOmega': return <LIB.ImOmega className={className} />;
            case 'ImSigma': return <LIB.ImSigma className={className} />;
            case 'ImPageBreak': return <LIB.ImPageBreak className={className} />;
            case 'ImSuperscript': return <LIB.ImSuperscript className={className} />;
            case 'ImSubscript': return <LIB.ImSubscript className={className} />;
            case 'ImSuperscript2': return <LIB.ImSuperscript2 className={className} />;
            case 'ImSubscript2': return <LIB.ImSubscript2 className={className} />;
            case 'ImTextColor': return <LIB.ImTextColor className={className} />;
            case 'ImPagebreak': return <LIB.ImPagebreak className={className} />;
            case 'ImClearFormatting': return <LIB.ImClearFormatting className={className} />;
            case 'ImTable': return <LIB.ImTable className={className} />;
            case 'ImTable2': return <LIB.ImTable2 className={className} />;
            case 'ImInsertTemplate': return <LIB.ImInsertTemplate className={className} />;
            case 'ImPilcrow': return <LIB.ImPilcrow className={className} />;
            case 'ImLtr': return <LIB.ImLtr className={className} />;
            case 'ImRtl': return <LIB.ImRtl className={className} />;
            case 'ImSection': return <LIB.ImSection className={className} />;
            case 'ImParagraphLeft': return <LIB.ImParagraphLeft className={className} />;
            case 'ImParagraphCenter': return <LIB.ImParagraphCenter className={className} />;
            case 'ImParagraphRight': return <LIB.ImParagraphRight className={className} />;
            case 'ImParagraphJustify': return <LIB.ImParagraphJustify className={className} />;
            case 'ImIndentIncrease': return <LIB.ImIndentIncrease className={className} />;
            case 'ImIndentDecrease': return <LIB.ImIndentDecrease className={className} />;
            case 'ImShare': return <LIB.ImShare className={className} />;
            case 'ImNewTab': return <LIB.ImNewTab className={className} />;
            case 'ImEmbed': return <LIB.ImEmbed className={className} />;
            case 'ImEmbed2': return <LIB.ImEmbed2 className={className} />;
            case 'ImTerminal': return <LIB.ImTerminal className={className} />;
            case 'ImShare2': return <LIB.ImShare2 className={className} />;
            case 'ImMail': return <LIB.ImMail className={className} />;
            case 'ImMail2': return <LIB.ImMail2 className={className} />;
            case 'ImMail3': return <LIB.ImMail3 className={className} />;
            case 'ImMail4': return <LIB.ImMail4 className={className} />;
            case 'ImAmazon': return <LIB.ImAmazon className={className} />;
            case 'ImGoogle': return <LIB.ImGoogle className={className} />;
            case 'ImGoogle2': return <LIB.ImGoogle2 className={className} />;
            case 'ImGoogle3': return <LIB.ImGoogle3 className={className} />;
            case 'ImGooglePlus': return <LIB.ImGooglePlus className={className} />;
            case 'ImGooglePlus2': return <LIB.ImGooglePlus2 className={className} />;
            case 'ImGooglePlus3': return <LIB.ImGooglePlus3 className={className} />;
            case 'ImHangouts': return <LIB.ImHangouts className={className} />;
            case 'ImGoogleDrive': return <LIB.ImGoogleDrive className={className} />;
            case 'ImFacebook': return <LIB.ImFacebook className={className} />;
            case 'ImFacebook2': return <LIB.ImFacebook2 className={className} />;
            case 'ImInstagram': return <LIB.ImInstagram className={className} />;
            case 'ImWhatsapp': return <LIB.ImWhatsapp className={className} />;
            case 'ImSpotify': return <LIB.ImSpotify className={className} />;
            case 'ImTelegram': return <LIB.ImTelegram className={className} />;
            case 'ImTwitter': return <LIB.ImTwitter className={className} />;
            case 'ImVine': return <LIB.ImVine className={className} />;
            case 'ImVk': return <LIB.ImVk className={className} />;
            case 'ImRenren': return <LIB.ImRenren className={className} />;
            case 'ImSinaWeibo': return <LIB.ImSinaWeibo className={className} />;
            case 'ImRss': return <LIB.ImRss className={className} />;
            case 'ImRss2': return <LIB.ImRss2 className={className} />;
            case 'ImYoutube': return <LIB.ImYoutube className={className} />;
            case 'ImYoutube2': return <LIB.ImYoutube2 className={className} />;
            case 'ImTwitch': return <LIB.ImTwitch className={className} />;
            case 'ImVimeo': return <LIB.ImVimeo className={className} />;
            case 'ImVimeo2': return <LIB.ImVimeo2 className={className} />;
            case 'ImLanyrd': return <LIB.ImLanyrd className={className} />;
            case 'ImFlickr': return <LIB.ImFlickr className={className} />;
            case 'ImFlickr2': return <LIB.ImFlickr2 className={className} />;
            case 'ImFlickr3': return <LIB.ImFlickr3 className={className} />;
            case 'ImFlickr4': return <LIB.ImFlickr4 className={className} />;
            case 'ImDribbble': return <LIB.ImDribbble className={className} />;
            case 'ImBehance': return <LIB.ImBehance className={className} />;
            case 'ImBehance2': return <LIB.ImBehance2 className={className} />;
            case 'ImDeviantart': return <LIB.ImDeviantart className={className} />;
            case 'Im500Px': return <LIB.Im500Px className={className} />;
            case 'ImSteam': return <LIB.ImSteam className={className} />;
            case 'ImSteam2': return <LIB.ImSteam2 className={className} />;
            case 'ImDropbox': return <LIB.ImDropbox className={className} />;
            case 'ImOnedrive': return <LIB.ImOnedrive className={className} />;
            case 'ImGithub': return <LIB.ImGithub className={className} />;
            case 'ImNpm': return <LIB.ImNpm className={className} />;
            case 'ImBasecamp': return <LIB.ImBasecamp className={className} />;
            case 'ImTrello': return <LIB.ImTrello className={className} />;
            case 'ImWordpress': return <LIB.ImWordpress className={className} />;
            case 'ImJoomla': return <LIB.ImJoomla className={className} />;
            case 'ImEllo': return <LIB.ImEllo className={className} />;
            case 'ImBlogger': return <LIB.ImBlogger className={className} />;
            case 'ImBlogger2': return <LIB.ImBlogger2 className={className} />;
            case 'ImTumblr': return <LIB.ImTumblr className={className} />;
            case 'ImTumblr2': return <LIB.ImTumblr2 className={className} />;
            case 'ImYahoo': return <LIB.ImYahoo className={className} />;
            case 'ImYahoo2': return <LIB.ImYahoo2 className={className} />;
            case 'ImTux': return <LIB.ImTux className={className} />;
            case 'ImAppleinc': return <LIB.ImAppleinc className={className} />;
            case 'ImFinder': return <LIB.ImFinder className={className} />;
            case 'ImAndroid': return <LIB.ImAndroid className={className} />;
            case 'ImWindows': return <LIB.ImWindows className={className} />;
            case 'ImWindows8': return <LIB.ImWindows8 className={className} />;
            case 'ImSoundcloud': return <LIB.ImSoundcloud className={className} />;
            case 'ImSoundcloud2': return <LIB.ImSoundcloud2 className={className} />;
            case 'ImSkype': return <LIB.ImSkype className={className} />;
            case 'ImReddit': return <LIB.ImReddit className={className} />;
            case 'ImHackernews': return <LIB.ImHackernews className={className} />;
            case 'ImWikipedia': return <LIB.ImWikipedia className={className} />;
            case 'ImLinkedin': return <LIB.ImLinkedin className={className} />;
            case 'ImLinkedin2': return <LIB.ImLinkedin2 className={className} />;
            case 'ImLastfm': return <LIB.ImLastfm className={className} />;
            case 'ImLastfm2': return <LIB.ImLastfm2 className={className} />;
            case 'ImDelicious': return <LIB.ImDelicious className={className} />;
            case 'ImStumbleupon': return <LIB.ImStumbleupon className={className} />;
            case 'ImStumbleupon2': return <LIB.ImStumbleupon2 className={className} />;
            case 'ImStackoverflow': return <LIB.ImStackoverflow className={className} />;
            case 'ImPinterest': return <LIB.ImPinterest className={className} />;
            case 'ImPinterest2': return <LIB.ImPinterest2 className={className} />;
            case 'ImXing': return <LIB.ImXing className={className} />;
            case 'ImXing2': return <LIB.ImXing2 className={className} />;
            case 'ImFlattr': return <LIB.ImFlattr className={className} />;
            case 'ImFoursquare': return <LIB.ImFoursquare className={className} />;
            case 'ImYelp': return <LIB.ImYelp className={className} />;
            case 'ImPaypal': return <LIB.ImPaypal className={className} />;
            case 'ImChrome': return <LIB.ImChrome className={className} />;
            case 'ImFirefox': return <LIB.ImFirefox className={className} />;
            case 'ImIe': return <LIB.ImIe className={className} />;
            case 'ImEdge': return <LIB.ImEdge className={className} />;
            case 'ImSafari': return <LIB.ImSafari className={className} />;
            case 'ImOpera': return <LIB.ImOpera className={className} />;
            case 'ImFilePdf': return <LIB.ImFilePdf className={className} />;
            case 'ImFileOpenoffice': return <LIB.ImFileOpenoffice className={className} />;
            case 'ImFileWord': return <LIB.ImFileWord className={className} />;
            case 'ImFileExcel': return <LIB.ImFileExcel className={className} />;
            case 'ImLibreoffice': return <LIB.ImLibreoffice className={className} />;
            case 'ImHtmlFive': return <LIB.ImHtmlFive className={className} />;
            case 'ImHtmlFive2': return <LIB.ImHtmlFive2 className={className} />;
            case 'ImCss3': return <LIB.ImCss3 className={className} />;
            case 'ImGit': return <LIB.ImGit className={className} />;
            case 'ImCodepen': return <LIB.ImCodepen className={className} />;
            case 'ImSvg': return <LIB.ImSvg className={className} />;
            case 'ImIcoMoon': return <LIB.ImIcoMoon className={className} />;


            default:
                console.log('Im - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Im;