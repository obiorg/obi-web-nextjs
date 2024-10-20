/**
 * https://react-icons.github.io/react-icons/icons/ci/
 */


import * as LIB from "react-icons/ci";


// Define the props that the PostForm component expects
interface ciProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Ci(
    {
        icon = 'CiAirportSign1',
        className,
    }: ciProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'CiAirportSign1': return <LIB.CiAirportSign1 className={className} />;
            case 'CiAlarmOff': return <LIB.CiAlarmOff className={className} />;
            case 'CiAlarmOn': return <LIB.CiAlarmOn className={className} />;
            case 'CiAlignBottom': return <LIB.CiAlignBottom className={className} />;
            case 'CiAlignCenterH': return <LIB.CiAlignCenterH className={className} />;
            case 'CiAlignCenterV': return <LIB.CiAlignCenterV className={className} />;
            case 'CiAlignLeft': return <LIB.CiAlignLeft className={className} />;
            case 'CiAlignRight': return <LIB.CiAlignRight className={className} />;
            case 'CiAlignTop': return <LIB.CiAlignTop className={className} />;
            case 'CiApple': return <LIB.CiApple className={className} />;
            case 'CiAt': return <LIB.CiAt className={className} />;
            case 'CiAvocado': return <LIB.CiAvocado className={className} />;
            case 'CiBacon': return <LIB.CiBacon className={className} />;
            case 'CiBadgeDollar': return <LIB.CiBadgeDollar className={className} />;
            case 'CiBag1': return <LIB.CiBag1 className={className} />;
            case 'CiBandage': return <LIB.CiBandage className={className} />;
            case 'CiBank': return <LIB.CiBank className={className} />;
            case 'CiBarcode': return <LIB.CiBarcode className={className} />;
            case 'CiBaseball': return <LIB.CiBaseball className={className} />;
            case 'CiBasketball': return <LIB.CiBasketball className={className} />;
            case 'CiBatteryCharging': return <LIB.CiBatteryCharging className={className} />;
            case 'CiBatteryEmpty': return <LIB.CiBatteryEmpty className={className} />;
            case 'CiBatteryFull': return <LIB.CiBatteryFull className={className} />;
            case 'CiBeaker1': return <LIB.CiBeaker1 className={className} />;
            case 'CiBeerMugFull': return <LIB.CiBeerMugFull className={className} />;
            case 'CiBellOff': return <LIB.CiBellOff className={className} />;
            case 'CiBellOn': return <LIB.CiBellOn className={className} />;
            case 'CiBezier': return <LIB.CiBezier className={className} />;
            case 'CiBitcoin': return <LIB.CiBitcoin className={className} />;
            case 'CiBluetooth': return <LIB.CiBluetooth className={className} />;
            case 'CiBookmarkCheck': return <LIB.CiBookmarkCheck className={className} />;
            case 'CiBookmarkMinus': return <LIB.CiBookmarkMinus className={className} />;
            case 'CiBookmarkPlus': return <LIB.CiBookmarkPlus className={className} />;
            case 'CiBookmarkRemove': return <LIB.CiBookmarkRemove className={className} />;
            case 'CiBookmark': return <LIB.CiBookmark className={className} />;
            case 'CiBowlNoodles': return <LIB.CiBowlNoodles className={className} />;
            case 'CiBoxList': return <LIB.CiBoxList className={className} />;
            case 'CiBoxes': return <LIB.CiBoxes className={className} />;
            case 'CiBrightnessDown': return <LIB.CiBrightnessDown className={className} />;
            case 'CiBrightnessUp': return <LIB.CiBrightnessUp className={className} />;
            case 'CiBullhorn': return <LIB.CiBullhorn className={className} />;
            case 'CiBurger': return <LIB.CiBurger className={className} />;
            case 'CiCalculator1': return <LIB.CiCalculator1 className={className} />;
            case 'CiCalculator2': return <LIB.CiCalculator2 className={className} />;
            case 'CiCalendarDate': return <LIB.CiCalendarDate className={className} />;
            case 'CiCalendar': return <LIB.CiCalendar className={className} />;
            case 'CiCamera': return <LIB.CiCamera className={className} />;
            case 'CiChat1': return <LIB.CiChat1 className={className} />;
            case 'CiChat2': return <LIB.CiChat2 className={className} />;
            case 'CiCircleAlert': return <LIB.CiCircleAlert className={className} />;
            case 'CiCircleCheck': return <LIB.CiCircleCheck className={className} />;
            case 'CiCircleChevDown': return <LIB.CiCircleChevDown className={className} />;
            case 'CiCircleChevLeft': return <LIB.CiCircleChevLeft className={className} />;
            case 'CiCircleChevRight': return <LIB.CiCircleChevRight className={className} />;
            case 'CiCircleChevUp': return <LIB.CiCircleChevUp className={className} />;
            case 'CiCircleInfo': return <LIB.CiCircleInfo className={className} />;
            case 'CiCircleList': return <LIB.CiCircleList className={className} />;
            case 'CiCircleMinus': return <LIB.CiCircleMinus className={className} />;
            case 'CiCircleMore': return <LIB.CiCircleMore className={className} />;
            case 'CiCirclePlus': return <LIB.CiCirclePlus className={className} />;
            case 'CiCircleQuestion': return <LIB.CiCircleQuestion className={className} />;
            case 'CiCircleRemove': return <LIB.CiCircleRemove className={className} />;
            case 'CiClock1': return <LIB.CiClock1 className={className} />;
            case 'CiClock2': return <LIB.CiClock2 className={className} />;
            case 'CiCloudDrizzle': return <LIB.CiCloudDrizzle className={className} />;
            case 'CiCloudMoon': return <LIB.CiCloudMoon className={className} />;
            case 'CiCloudOff': return <LIB.CiCloudOff className={className} />;
            case 'CiCloudOn': return <LIB.CiCloudOn className={className} />;
            case 'CiCloudRainbow': return <LIB.CiCloudRainbow className={className} />;
            case 'CiCloudSun': return <LIB.CiCloudSun className={className} />;
            case 'CiCloud': return <LIB.CiCloud className={className} />;
            case 'CiCoffeeBean': return <LIB.CiCoffeeBean className={className} />;
            case 'CiCoffeeCup': return <LIB.CiCoffeeCup className={className} />;
            case 'CiCoinInsert': return <LIB.CiCoinInsert className={className} />;
            case 'CiCoins1': return <LIB.CiCoins1 className={className} />;
            case 'CiCompass1': return <LIB.CiCompass1 className={className} />;
            case 'CiCreditCard1': return <LIB.CiCreditCard1 className={className} />;
            case 'CiCreditCard2': return <LIB.CiCreditCard2 className={className} />;
            case 'CiCreditCardOff': return <LIB.CiCreditCardOff className={className} />;
            case 'CiCrop': return <LIB.CiCrop className={className} />;
            case 'CiDark': return <LIB.CiDark className={className} />;
            case 'CiDatabase': return <LIB.CiDatabase className={className} />;
            case 'CiDeliveryTruck': return <LIB.CiDeliveryTruck className={className} />;
            case 'CiDesktopMouse1': return <LIB.CiDesktopMouse1 className={className} />;
            case 'CiDesktopMouse2': return <LIB.CiDesktopMouse2 className={className} />;
            case 'CiDesktop': return <LIB.CiDesktop className={className} />;
            case 'CiDiscount1': return <LIB.CiDiscount1 className={className} />;
            case 'CiDollar': return <LIB.CiDollar className={className} />;
            case 'CiDroplet': return <LIB.CiDroplet className={className} />;
            case 'CiDumbbell': return <LIB.CiDumbbell className={className} />;
            case 'CiEdit': return <LIB.CiEdit className={className} />;
            case 'CiEraser': return <LIB.CiEraser className={className} />;
            case 'CiExport': return <LIB.CiExport className={className} />;
            case 'CiFaceFrown': return <LIB.CiFaceFrown className={className} />;
            case 'CiFaceMeh': return <LIB.CiFaceMeh className={className} />;
            case 'CiFaceSmile': return <LIB.CiFaceSmile className={className} />;
            case 'CiFacebook': return <LIB.CiFacebook className={className} />;
            case 'CiFileOff': return <LIB.CiFileOff className={className} />;
            case 'CiFileOn': return <LIB.CiFileOn className={className} />;
            case 'CiFilter': return <LIB.CiFilter className={className} />;
            case 'CiFlag1': return <LIB.CiFlag1 className={className} />;
            case 'CiFloppyDisk': return <LIB.CiFloppyDisk className={className} />;
            case 'CiFolderOff': return <LIB.CiFolderOff className={className} />;
            case 'CiFolderOn': return <LIB.CiFolderOn className={className} />;
            case 'CiFootball': return <LIB.CiFootball className={className} />;
            case 'CiForkAndKnife': return <LIB.CiForkAndKnife className={className} />;
            case 'CiFries': return <LIB.CiFries className={className} />;
            case 'CiGift': return <LIB.CiGift className={className} />;
            case 'CiGlass': return <LIB.CiGlass className={className} />;
            case 'CiGlobe': return <LIB.CiGlobe className={className} />;
            case 'CiGps': return <LIB.CiGps className={className} />;
            case 'CiGrid2H': return <LIB.CiGrid2H className={className} />;
            case 'CiGrid2V': return <LIB.CiGrid2V className={className} />;
            case 'CiGrid31': return <LIB.CiGrid31 className={className} />;
            case 'CiGrid32': return <LIB.CiGrid32 className={className} />;
            case 'CiGrid41': return <LIB.CiGrid41 className={className} />;
            case 'CiGrid42': return <LIB.CiGrid42 className={className} />;
            case 'CiHardDrive': return <LIB.CiHardDrive className={className} />;
            case 'CiHashtag': return <LIB.CiHashtag className={className} />;
            case 'CiHeadphones': return <LIB.CiHeadphones className={className} />;
            case 'CiHeart': return <LIB.CiHeart className={className} />;
            case 'CiHome': return <LIB.CiHome className={className} />;
            case 'CiHospital1': return <LIB.CiHospital1 className={className} />;
            case 'CiHotdog': return <LIB.CiHotdog className={className} />;
            case 'CiIceCream': return <LIB.CiIceCream className={className} />;
            case 'CiImageOff': return <LIB.CiImageOff className={className} />;
            case 'CiImageOn': return <LIB.CiImageOn className={className} />;
            case 'CiImport': return <LIB.CiImport className={className} />;
            case 'CiInboxIn': return <LIB.CiInboxIn className={className} />;
            case 'CiInboxOut': return <LIB.CiInboxOut className={className} />;
            case 'CiIndent': return <LIB.CiIndent className={className} />;
            case 'CiInstagram': return <LIB.CiInstagram className={className} />;
            case 'CiKeyboard': return <LIB.CiKeyboard className={className} />;
            case 'CiLaptop': return <LIB.CiLaptop className={className} />;
            case 'CiLemon': return <LIB.CiLemon className={className} />;
            case 'CiLight': return <LIB.CiLight className={className} />;
            case 'CiLineHeight': return <LIB.CiLineHeight className={className} />;
            case 'CiLink': return <LIB.CiLink className={className} />;
            case 'CiLinkedin': return <LIB.CiLinkedin className={className} />;
            case 'CiLocationArrow1': return <LIB.CiLocationArrow1 className={className} />;
            case 'CiLocationOff': return <LIB.CiLocationOff className={className} />;
            case 'CiLocationOn': return <LIB.CiLocationOn className={className} />;
            case 'CiLock': return <LIB.CiLock className={className} />;
            case 'CiLogin': return <LIB.CiLogin className={className} />;
            case 'CiLogout': return <LIB.CiLogout className={className} />;
            case 'CiLollipop': return <LIB.CiLollipop className={className} />;
            case 'CiMail': return <LIB.CiMail className={className} />;
            case 'CiMapPin': return <LIB.CiMapPin className={className} />;
            case 'CiMap': return <LIB.CiMap className={className} />;
            case 'CiMaximize1': return <LIB.CiMaximize1 className={className} />;
            case 'CiMaximize2': return <LIB.CiMaximize2 className={className} />;
            case 'CiMedal': return <LIB.CiMedal className={className} />;
            case 'CiMedicalCase': return <LIB.CiMedicalCase className={className} />;
            case 'CiMedicalClipboard': return <LIB.CiMedicalClipboard className={className} />;
            case 'CiMedicalCross': return <LIB.CiMedicalCross className={className} />;
            case 'CiMedicalMask': return <LIB.CiMedicalMask className={className} />;
            case 'CiMemoPad': return <LIB.CiMemoPad className={className} />;
            case 'CiMenuBurger': return <LIB.CiMenuBurger className={className} />;
            case 'CiMenuFries': return <LIB.CiMenuFries className={className} />;
            case 'CiMenuKebab': return <LIB.CiMenuKebab className={className} />;
            case 'CiMicrochip': return <LIB.CiMicrochip className={className} />;
            case 'CiMicrophoneOff': return <LIB.CiMicrophoneOff className={className} />;
            case 'CiMicrophoneOn': return <LIB.CiMicrophoneOn className={className} />;
            case 'CiMinimize1': return <LIB.CiMinimize1 className={className} />;
            case 'CiMinimize2': return <LIB.CiMinimize2 className={className} />;
            case 'CiMobile1': return <LIB.CiMobile1 className={className} />;
            case 'CiMobile2': return <LIB.CiMobile2 className={className} />;
            case 'CiMobile3': return <LIB.CiMobile3 className={className} />;
            case 'CiMobile4': return <LIB.CiMobile4 className={className} />;
            case 'CiMoneyBill': return <LIB.CiMoneyBill className={className} />;
            case 'CiMoneyCheck1': return <LIB.CiMoneyCheck1 className={className} />;
            case 'CiMonitor': return <LIB.CiMonitor className={className} />;
            case 'CiMountain1': return <LIB.CiMountain1 className={className} />;
            case 'CiMug1': return <LIB.CiMug1 className={className} />;
            case 'CiMusicNote1': return <LIB.CiMusicNote1 className={className} />;
            case 'CiNoWaitingSign': return <LIB.CiNoWaitingSign className={className} />;
            case 'CiPalette': return <LIB.CiPalette className={className} />;
            case 'CiPaperplane': return <LIB.CiPaperplane className={className} />;
            case 'CiParking1': return <LIB.CiParking1 className={className} />;
            case 'CiPassport1': return <LIB.CiPassport1 className={className} />;
            case 'CiPause1': return <LIB.CiPause1 className={className} />;
            case 'CiPen': return <LIB.CiPen className={className} />;
            case 'CiPenpot': return <LIB.CiPenpot className={className} />;
            case 'CiPercent': return <LIB.CiPercent className={className} />;
            case 'CiPhone': return <LIB.CiPhone className={className} />;
            case 'CiPickerEmpty': return <LIB.CiPickerEmpty className={className} />;
            case 'CiPickerHalf': return <LIB.CiPickerHalf className={className} />;
            case 'CiPill': return <LIB.CiPill className={className} />;
            case 'CiPillsBottle1': return <LIB.CiPillsBottle1 className={className} />;
            case 'CiPizza': return <LIB.CiPizza className={className} />;
            case 'CiPlane': return <LIB.CiPlane className={className} />;
            case 'CiPlay1': return <LIB.CiPlay1 className={className} />;
            case 'CiPlug1': return <LIB.CiPlug1 className={className} />;
            case 'CiPower': return <LIB.CiPower className={className} />;
            case 'CiRainbow': return <LIB.CiRainbow className={className} />;
            case 'CiRead': return <LIB.CiRead className={className} />;
            case 'CiReceipt': return <LIB.CiReceipt className={className} />;
            case 'CiRedo': return <LIB.CiRedo className={className} />;
            case 'CiRepeat': return <LIB.CiRepeat className={className} />;
            case 'CiRollingSuitcase': return <LIB.CiRollingSuitcase className={className} />;
            case 'CiRoute': return <LIB.CiRoute className={className} />;
            case 'CiRouter': return <LIB.CiRouter className={className} />;
            case 'CiRuler': return <LIB.CiRuler className={className} />;
            case 'CiSatellite1': return <LIB.CiSatellite1 className={className} />;
            case 'CiSaveDown1': return <LIB.CiSaveDown1 className={className} />;
            case 'CiSaveDown2': return <LIB.CiSaveDown2 className={className} />;
            case 'CiSaveUp1': return <LIB.CiSaveUp1 className={className} />;
            case 'CiSaveUp2': return <LIB.CiSaveUp2 className={className} />;
            case 'CiSearch': return <LIB.CiSearch className={className} />;
            case 'CiServer': return <LIB.CiServer className={className} />;
            case 'CiSettings': return <LIB.CiSettings className={className} />;
            case 'CiShare1': return <LIB.CiShare1 className={className} />;
            case 'CiShare2': return <LIB.CiShare2 className={className} />;
            case 'CiShirt': return <LIB.CiShirt className={className} />;
            case 'CiShop': return <LIB.CiShop className={className} />;
            case 'CiShoppingBasket': return <LIB.CiShoppingBasket className={className} />;
            case 'CiShoppingCart': return <LIB.CiShoppingCart className={className} />;
            case 'CiShoppingTag': return <LIB.CiShoppingTag className={className} />;
            case 'CiShuffle': return <LIB.CiShuffle className={className} />;
            case 'CiSignpostDuo1': return <LIB.CiSignpostDuo1 className={className} />;
            case 'CiSignpostL1': return <LIB.CiSignpostL1 className={className} />;
            case 'CiSignpostR1': return <LIB.CiSignpostR1 className={className} />;
            case 'CiSliderHorizontal': return <LIB.CiSliderHorizontal className={className} />;
            case 'CiSliderVertical': return <LIB.CiSliderVertical className={className} />;
            case 'CiSpeaker': return <LIB.CiSpeaker className={className} />;
            case 'CiSquareAlert': return <LIB.CiSquareAlert className={className} />;
            case 'CiSquareCheck': return <LIB.CiSquareCheck className={className} />;
            case 'CiSquareChevDown': return <LIB.CiSquareChevDown className={className} />;
            case 'CiSquareChevLeft': return <LIB.CiSquareChevLeft className={className} />;
            case 'CiSquareChevRight': return <LIB.CiSquareChevRight className={className} />;
            case 'CiSquareChevUp': return <LIB.CiSquareChevUp className={className} />;
            case 'CiSquareInfo': return <LIB.CiSquareInfo className={className} />;
            case 'CiSquareMinus': return <LIB.CiSquareMinus className={className} />;
            case 'CiSquareMore': return <LIB.CiSquareMore className={className} />;
            case 'CiSquarePlus': return <LIB.CiSquarePlus className={className} />;
            case 'CiSquareQuestion': return <LIB.CiSquareQuestion className={className} />;
            case 'CiSquareRemove': return <LIB.CiSquareRemove className={className} />;
            case 'CiStar': return <LIB.CiStar className={className} />;
            case 'CiStethoscope': return <LIB.CiStethoscope className={className} />;
            case 'CiStickyNote': return <LIB.CiStickyNote className={className} />;
            case 'CiStop1': return <LIB.CiStop1 className={className} />;
            case 'CiStopSign1': return <LIB.CiStopSign1 className={className} />;
            case 'CiStopwatch': return <LIB.CiStopwatch className={className} />;
            case 'CiStreamOff': return <LIB.CiStreamOff className={className} />;
            case 'CiStreamOn': return <LIB.CiStreamOn className={className} />;
            case 'CiSun': return <LIB.CiSun className={className} />;
            case 'CiTablets1': return <LIB.CiTablets1 className={className} />;
            case 'CiTempHigh': return <LIB.CiTempHigh className={className} />;
            case 'CiTextAlignCenter': return <LIB.CiTextAlignCenter className={className} />;
            case 'CiTextAlignJustify': return <LIB.CiTextAlignJustify className={className} />;
            case 'CiTextAlignLeft': return <LIB.CiTextAlignLeft className={className} />;
            case 'CiTextAlignRight': return <LIB.CiTextAlignRight className={className} />;
            case 'CiText': return <LIB.CiText className={className} />;
            case 'CiTimer': return <LIB.CiTimer className={className} />;
            case 'CiTrash': return <LIB.CiTrash className={className} />;
            case 'CiTrophy': return <LIB.CiTrophy className={className} />;
            case 'CiTurnL1': return <LIB.CiTurnL1 className={className} />;
            case 'CiTurnR1': return <LIB.CiTurnR1 className={className} />;
            case 'CiTwitter': return <LIB.CiTwitter className={className} />;
            case 'CiUmbrella': return <LIB.CiUmbrella className={className} />;
            case 'CiUndo': return <LIB.CiUndo className={className} />;
            case 'CiUnlock': return <LIB.CiUnlock className={className} />;
            case 'CiUnread': return <LIB.CiUnread className={className} />;
            case 'CiUsb': return <LIB.CiUsb className={className} />;
            case 'CiUser': return <LIB.CiUser className={className} />;
            case 'CiVault': return <LIB.CiVault className={className} />;
            case 'CiVial': return <LIB.CiVial className={className} />;
            case 'CiVideoOff': return <LIB.CiVideoOff className={className} />;
            case 'CiVideoOn': return <LIB.CiVideoOn className={className} />;
            case 'CiViewBoard': return <LIB.CiViewBoard className={className} />;
            case 'CiViewColumn': return <LIB.CiViewColumn className={className} />;
            case 'CiViewList': return <LIB.CiViewList className={className} />;
            case 'CiViewTable': return <LIB.CiViewTable className={className} />;
            case 'CiViewTimeline': return <LIB.CiViewTimeline className={className} />;
            case 'CiVirus': return <LIB.CiVirus className={className} />;
            case 'CiVoicemail': return <LIB.CiVoicemail className={className} />;
            case 'CiVolumeHigh': return <LIB.CiVolumeHigh className={className} />;
            case 'CiVolumeMute': return <LIB.CiVolumeMute className={className} />;
            case 'CiVolume': return <LIB.CiVolume className={className} />;
            case 'CiWallet': return <LIB.CiWallet className={className} />;
            case 'CiWarning': return <LIB.CiWarning className={className} />;
            case 'CiWavePulse1': return <LIB.CiWavePulse1 className={className} />;
            case 'CiWheat': return <LIB.CiWheat className={className} />;
            case 'CiWifiOff': return <LIB.CiWifiOff className={className} />;
            case 'CiWifiOn': return <LIB.CiWifiOn className={className} />;
            case 'CiYoutube': return <LIB.CiYoutube className={className} />;
            case 'CiZoomIn': return <LIB.CiZoomIn className={className} />;
            case 'CiZoomOut': return <LIB.CiZoomOut className={className} />;


            default:
                console.log('Ci - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Ci;