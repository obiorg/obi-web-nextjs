/**
 * https://react-icons.github.io/react-icons/icons/fc/
 */


import * as LIB from "react-icons/fc";


// Define the props that the PostForm component expects
interface fcProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Fc(
    {
        icon = 'FcAbout',
        className,
    }: fcProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'FcAbout': return <LIB.FcAbout className={className} />;
            case 'FcAcceptDatabase': return <LIB.FcAcceptDatabase className={className} />;
            case 'FcAddColumn': return <LIB.FcAddColumn className={className} />;
            case 'FcAddDatabase': return <LIB.FcAddDatabase className={className} />;
            case 'FcAddImage': return <LIB.FcAddImage className={className} />;
            case 'FcAddRow': return <LIB.FcAddRow className={className} />;
            case 'FcAddressBook': return <LIB.FcAddressBook className={className} />;
            case 'FcAdvance': return <LIB.FcAdvance className={className} />;
            case 'FcAdvertising': return <LIB.FcAdvertising className={className} />;
            case 'FcAlarmClock': return <LIB.FcAlarmClock className={className} />;
            case 'FcAlphabeticalSortingAz': return <LIB.FcAlphabeticalSortingAz className={className} />;
            case 'FcAlphabeticalSortingZa': return <LIB.FcAlphabeticalSortingZa className={className} />;
            case 'FcAndroidOs': return <LIB.FcAndroidOs className={className} />;
            case 'FcAnswers': return <LIB.FcAnswers className={className} />;
            case 'FcApproval': return <LIB.FcApproval className={className} />;
            case 'FcApprove': return <LIB.FcApprove className={className} />;
            case 'FcAreaChart': return <LIB.FcAreaChart className={className} />;
            case 'FcAssistant': return <LIB.FcAssistant className={className} />;
            case 'FcAudioFile': return <LIB.FcAudioFile className={className} />;
            case 'FcAutomatic': return <LIB.FcAutomatic className={className} />;
            case 'FcAutomotive': return <LIB.FcAutomotive className={className} />;
            case 'FcBadDecision': return <LIB.FcBadDecision className={className} />;
            case 'FcBarChart': return <LIB.FcBarChart className={className} />;
            case 'FcBbc': return <LIB.FcBbc className={className} />;
            case 'FcBearish': return <LIB.FcBearish className={className} />;
            case 'FcBinoculars': return <LIB.FcBinoculars className={className} />;
            case 'FcBiohazard': return <LIB.FcBiohazard className={className} />;
            case 'FcBiomass': return <LIB.FcBiomass className={className} />;
            case 'FcBiotech': return <LIB.FcBiotech className={className} />;
            case 'FcBookmark': return <LIB.FcBookmark className={className} />;
            case 'FcBriefcase': return <LIB.FcBriefcase className={className} />;
            case 'FcBrokenLink': return <LIB.FcBrokenLink className={className} />;
            case 'FcBullish': return <LIB.FcBullish className={className} />;
            case 'FcBusinessContact': return <LIB.FcBusinessContact className={className} />;
            case 'FcBusiness': return <LIB.FcBusiness className={className} />;
            case 'FcBusinessman': return <LIB.FcBusinessman className={className} />;
            case 'FcBusinesswoman': return <LIB.FcBusinesswoman className={className} />;
            case 'FcButtingIn': return <LIB.FcButtingIn className={className} />;
            case 'FcCableRelease': return <LIB.FcCableRelease className={className} />;
            case 'FcCalculator': return <LIB.FcCalculator className={className} />;
            case 'FcCalendar': return <LIB.FcCalendar className={className} />;
            case 'FcCallTransfer': return <LIB.FcCallTransfer className={className} />;
            case 'FcCallback': return <LIB.FcCallback className={className} />;
            case 'FcCamcorderPro': return <LIB.FcCamcorderPro className={className} />;
            case 'FcCamcorder': return <LIB.FcCamcorder className={className} />;
            case 'FcCameraAddon': return <LIB.FcCameraAddon className={className} />;
            case 'FcCameraIdentification': return <LIB.FcCameraIdentification className={className} />;
            case 'FcCamera': return <LIB.FcCamera className={className} />;
            case 'FcCancel': return <LIB.FcCancel className={className} />;
            case 'FcCandleSticks': return <LIB.FcCandleSticks className={className} />;
            case 'FcCapacitor': return <LIB.FcCapacitor className={className} />;
            case 'FcCdLogo': return <LIB.FcCdLogo className={className} />;
            case 'FcCellPhone': return <LIB.FcCellPhone className={className} />;
            case 'FcChargeBattery': return <LIB.FcChargeBattery className={className} />;
            case 'FcCheckmark': return <LIB.FcCheckmark className={className} />;
            case 'FcCircuit': return <LIB.FcCircuit className={className} />;
            case 'FcClapperboard': return <LIB.FcClapperboard className={className} />;
            case 'FcClearFilters': return <LIB.FcClearFilters className={className} />;
            case 'FcClock': return <LIB.FcClock className={className} />;
            case 'FcCloseUpMode': return <LIB.FcCloseUpMode className={className} />;
            case 'FcCloth': return <LIB.FcCloth className={className} />;
            case 'FcCollaboration': return <LIB.FcCollaboration className={className} />;
            case 'FcCollapse': return <LIB.FcCollapse className={className} />;
            case 'FcCollect': return <LIB.FcCollect className={className} />;
            case 'FcComboChart': return <LIB.FcComboChart className={className} />;
            case 'FcCommandLine': return <LIB.FcCommandLine className={className} />;
            case 'FcComments': return <LIB.FcComments className={className} />;
            case 'FcCompactCamera': return <LIB.FcCompactCamera className={className} />;
            case 'FcConferenceCall': return <LIB.FcConferenceCall className={className} />;
            case 'FcContacts': return <LIB.FcContacts className={className} />;
            case 'FcCopyleft': return <LIB.FcCopyleft className={className} />;
            case 'FcCopyright': return <LIB.FcCopyright className={className} />;
            case 'FcCrystalOscillator': return <LIB.FcCrystalOscillator className={className} />;
            case 'FcCurrencyExchange': return <LIB.FcCurrencyExchange className={className} />;
            case 'FcCursor': return <LIB.FcCursor className={className} />;
            case 'FcCustomerSupport': return <LIB.FcCustomerSupport className={className} />;
            case 'FcDam': return <LIB.FcDam className={className} />;
            case 'FcDataBackup': return <LIB.FcDataBackup className={className} />;
            case 'FcDataConfiguration': return <LIB.FcDataConfiguration className={className} />;
            case 'FcDataEncryption': return <LIB.FcDataEncryption className={className} />;
            case 'FcDataProtection': return <LIB.FcDataProtection className={className} />;
            case 'FcDataRecovery': return <LIB.FcDataRecovery className={className} />;
            case 'FcDataSheet': return <LIB.FcDataSheet className={className} />;
            case 'FcDatabase': return <LIB.FcDatabase className={className} />;
            case 'FcDebian': return <LIB.FcDebian className={className} />;
            case 'FcDebt': return <LIB.FcDebt className={className} />;
            case 'FcDecision': return <LIB.FcDecision className={className} />;
            case 'FcDeleteColumn': return <LIB.FcDeleteColumn className={className} />;
            case 'FcDeleteDatabase': return <LIB.FcDeleteDatabase className={className} />;
            case 'FcDeleteRow': return <LIB.FcDeleteRow className={className} />;
            case 'FcDepartment': return <LIB.FcDepartment className={className} />;
            case 'FcDeployment': return <LIB.FcDeployment className={className} />;
            case 'FcDiploma1': return <LIB.FcDiploma1 className={className} />;
            case 'FcDiploma2': return <LIB.FcDiploma2 className={className} />;
            case 'FcDisapprove': return <LIB.FcDisapprove className={className} />;
            case 'FcDisclaimer': return <LIB.FcDisclaimer className={className} />;
            case 'FcDislike': return <LIB.FcDislike className={className} />;
            case 'FcDisplay': return <LIB.FcDisplay className={className} />;
            case 'FcDoNotInhale': return <LIB.FcDoNotInhale className={className} />;
            case 'FcDoNotInsert': return <LIB.FcDoNotInsert className={className} />;
            case 'FcDoNotMix': return <LIB.FcDoNotMix className={className} />;
            case 'FcDocument': return <LIB.FcDocument className={className} />;
            case 'FcDonate': return <LIB.FcDonate className={className} />;
            case 'FcDoughnutChart': return <LIB.FcDoughnutChart className={className} />;
            case 'FcDownLeft': return <LIB.FcDownLeft className={className} />;
            case 'FcDownRight': return <LIB.FcDownRight className={className} />;
            case 'FcDown': return <LIB.FcDown className={className} />;
            case 'FcDownload': return <LIB.FcDownload className={className} />;
            case 'FcDribbble': return <LIB.FcDribbble className={className} />;
            case 'FcDvdLogo': return <LIB.FcDvdLogo className={className} />;
            case 'FcEditImage': return <LIB.FcEditImage className={className} />;
            case 'FcElectricalSensor': return <LIB.FcElectricalSensor className={className} />;
            case 'FcElectricalThreshold': return <LIB.FcElectricalThreshold className={className} />;
            case 'FcElectricity': return <LIB.FcElectricity className={className} />;
            case 'FcElectroDevices': return <LIB.FcElectroDevices className={className} />;
            case 'FcElectronics': return <LIB.FcElectronics className={className} />;
            case 'FcEmptyBattery': return <LIB.FcEmptyBattery className={className} />;
            case 'FcEmptyFilter': return <LIB.FcEmptyFilter className={className} />;
            case 'FcEmptyTrash': return <LIB.FcEmptyTrash className={className} />;
            case 'FcEndCall': return <LIB.FcEndCall className={className} />;
            case 'FcEngineering': return <LIB.FcEngineering className={className} />;
            case 'FcEnteringHeavenAlive': return <LIB.FcEnteringHeavenAlive className={className} />;
            case 'FcExpand': return <LIB.FcExpand className={className} />;
            case 'FcExpired': return <LIB.FcExpired className={className} />;
            case 'FcExport': return <LIB.FcExport className={className} />;
            case 'FcExternal': return <LIB.FcExternal className={className} />;
            case 'FcFactoryBreakdown': return <LIB.FcFactoryBreakdown className={className} />;
            case 'FcFactory': return <LIB.FcFactory className={className} />;
            case 'FcFaq': return <LIB.FcFaq className={className} />;
            case 'FcFeedIn': return <LIB.FcFeedIn className={className} />;
            case 'FcFeedback': return <LIB.FcFeedback className={className} />;
            case 'FcFile': return <LIB.FcFile className={className} />;
            case 'FcFilingCabinet': return <LIB.FcFilingCabinet className={className} />;
            case 'FcFilledFilter': return <LIB.FcFilledFilter className={className} />;
            case 'FcFilmReel': return <LIB.FcFilmReel className={className} />;
            case 'FcFilm': return <LIB.FcFilm className={className} />;
            case 'FcFinePrint': return <LIB.FcFinePrint className={className} />;
            case 'FcFlashAuto': return <LIB.FcFlashAuto className={className} />;
            case 'FcFlashOff': return <LIB.FcFlashOff className={className} />;
            case 'FcFlashOn': return <LIB.FcFlashOn className={className} />;
            case 'FcFlowChart': return <LIB.FcFlowChart className={className} />;
            case 'FcFolder': return <LIB.FcFolder className={className} />;
            case 'FcFrame': return <LIB.FcFrame className={className} />;
            case 'FcFullBattery': return <LIB.FcFullBattery className={className} />;
            case 'FcFullTrash': return <LIB.FcFullTrash className={className} />;
            case 'FcGallery': return <LIB.FcGallery className={className} />;
            case 'FcGenealogy': return <LIB.FcGenealogy className={className} />;
            case 'FcGenericSortingAsc': return <LIB.FcGenericSortingAsc className={className} />;
            case 'FcGenericSortingDesc': return <LIB.FcGenericSortingDesc className={className} />;
            case 'FcGlobe': return <LIB.FcGlobe className={className} />;
            case 'FcGoodDecision': return <LIB.FcGoodDecision className={className} />;
            case 'FcGoogle': return <LIB.FcGoogle className={className} />;
            case 'FcGraduationCap': return <LIB.FcGraduationCap className={className} />;
            case 'FcGrid': return <LIB.FcGrid className={className} />;
            case 'FcHeadset': return <LIB.FcHeadset className={className} />;
            case 'FcHeatMap': return <LIB.FcHeatMap className={className} />;
            case 'FcHighBattery': return <LIB.FcHighBattery className={className} />;
            case 'FcHighPriority': return <LIB.FcHighPriority className={className} />;
            case 'FcHome': return <LIB.FcHome className={className} />;
            case 'FcIcons8Cup': return <LIB.FcIcons8Cup className={className} />;
            case 'FcIdea': return <LIB.FcIdea className={className} />;
            case 'FcImageFile': return <LIB.FcImageFile className={className} />;
            case 'FcImport': return <LIB.FcImport className={className} />;
            case 'FcInTransit': return <LIB.FcInTransit className={className} />;
            case 'FcInfo': return <LIB.FcInfo className={className} />;
            case 'FcInspection': return <LIB.FcInspection className={className} />;
            case 'FcIntegratedWebcam': return <LIB.FcIntegratedWebcam className={className} />;
            case 'FcInternal': return <LIB.FcInternal className={className} />;
            case 'FcInvite': return <LIB.FcInvite className={className} />;
            case 'FcIpad': return <LIB.FcIpad className={className} />;
            case 'FcIphone': return <LIB.FcIphone className={className} />;
            case 'FcKey': return <LIB.FcKey className={className} />;
            case 'FcKindle': return <LIB.FcKindle className={className} />;
            case 'FcLandscape': return <LIB.FcLandscape className={className} />;
            case 'FcLeave': return <LIB.FcLeave className={className} />;
            case 'FcLeftDown': return <LIB.FcLeftDown className={className} />;
            case 'FcLeftDown2': return <LIB.FcLeftDown2 className={className} />;
            case 'FcLeftUp': return <LIB.FcLeftUp className={className} />;
            case 'FcLeftUp2': return <LIB.FcLeftUp2 className={className} />;
            case 'FcLeft': return <LIB.FcLeft className={className} />;
            case 'FcLibrary': return <LIB.FcLibrary className={className} />;
            case 'FcLightAtTheEndOfTunnel': return <LIB.FcLightAtTheEndOfTunnel className={className} />;
            case 'FcLikePlaceholder': return <LIB.FcLikePlaceholder className={className} />;
            case 'FcLike': return <LIB.FcLike className={className} />;
            case 'FcLineChart': return <LIB.FcLineChart className={className} />;
            case 'FcLink': return <LIB.FcLink className={className} />;
            case 'FcLinux': return <LIB.FcLinux className={className} />;
            case 'FcList': return <LIB.FcList className={className} />;
            case 'FcLockLandscape': return <LIB.FcLockLandscape className={className} />;
            case 'FcLockPortrait': return <LIB.FcLockPortrait className={className} />;
            case 'FcLock': return <LIB.FcLock className={className} />;
            case 'FcLowBattery': return <LIB.FcLowBattery className={className} />;
            case 'FcLowPriority': return <LIB.FcLowPriority className={className} />;
            case 'FcMakeDecision': return <LIB.FcMakeDecision className={className} />;
            case 'FcManager': return <LIB.FcManager className={className} />;
            case 'FcMediumPriority': return <LIB.FcMediumPriority className={className} />;
            case 'FcMenu': return <LIB.FcMenu className={className} />;
            case 'FcMiddleBattery': return <LIB.FcMiddleBattery className={className} />;
            case 'FcMindMap': return <LIB.FcMindMap className={className} />;
            case 'FcMinus': return <LIB.FcMinus className={className} />;
            case 'FcMissedCall': return <LIB.FcMissedCall className={className} />;
            case 'FcMms': return <LIB.FcMms className={className} />;
            case 'FcMoneyTransfer': return <LIB.FcMoneyTransfer className={className} />;
            case 'FcMultipleCameras': return <LIB.FcMultipleCameras className={className} />;
            case 'FcMultipleDevices': return <LIB.FcMultipleDevices className={className} />;
            case 'FcMultipleInputs': return <LIB.FcMultipleInputs className={className} />;
            case 'FcMultipleSmartphones': return <LIB.FcMultipleSmartphones className={className} />;
            case 'FcMusic': return <LIB.FcMusic className={className} />;
            case 'FcNegativeDynamic': return <LIB.FcNegativeDynamic className={className} />;
            case 'FcNeutralDecision': return <LIB.FcNeutralDecision className={className} />;
            case 'FcNeutralTrading': return <LIB.FcNeutralTrading className={className} />;
            case 'FcNews': return <LIB.FcNews className={className} />;
            case 'FcNext': return <LIB.FcNext className={className} />;
            case 'FcNfcSign': return <LIB.FcNfcSign className={className} />;
            case 'FcNightLandscape': return <LIB.FcNightLandscape className={className} />;
            case 'FcNightPortrait': return <LIB.FcNightPortrait className={className} />;
            case 'FcNoIdea': return <LIB.FcNoIdea className={className} />;
            case 'FcNoVideo': return <LIB.FcNoVideo className={className} />;
            case 'FcNook': return <LIB.FcNook className={className} />;
            case 'FcNumericalSorting12': return <LIB.FcNumericalSorting12 className={className} />;
            case 'FcNumericalSorting21': return <LIB.FcNumericalSorting21 className={className} />;
            case 'FcOk': return <LIB.FcOk className={className} />;
            case 'FcOldTimeCamera': return <LIB.FcOldTimeCamera className={className} />;
            case 'FcOnlineSupport': return <LIB.FcOnlineSupport className={className} />;
            case 'FcOpenedFolder': return <LIB.FcOpenedFolder className={className} />;
            case 'FcOrgUnit': return <LIB.FcOrgUnit className={className} />;
            case 'FcOrganization': return <LIB.FcOrganization className={className} />;
            case 'FcOvertime': return <LIB.FcOvertime className={className} />;
            case 'FcPackage': return <LIB.FcPackage className={className} />;
            case 'FcPaid': return <LIB.FcPaid className={className} />;
            case 'FcPanorama': return <LIB.FcPanorama className={className} />;
            case 'FcParallelTasks': return <LIB.FcParallelTasks className={className} />;
            case 'FcPhoneAndroid': return <LIB.FcPhoneAndroid className={className} />;
            case 'FcPhone': return <LIB.FcPhone className={className} />;
            case 'FcPhotoReel': return <LIB.FcPhotoReel className={className} />;
            case 'FcPicture': return <LIB.FcPicture className={className} />;
            case 'FcPieChart': return <LIB.FcPieChart className={className} />;
            case 'FcPlanner': return <LIB.FcPlanner className={className} />;
            case 'FcPlus': return <LIB.FcPlus className={className} />;
            case 'FcPodiumWithAudience': return <LIB.FcPodiumWithAudience className={className} />;
            case 'FcPodiumWithSpeaker': return <LIB.FcPodiumWithSpeaker className={className} />;
            case 'FcPodiumWithoutSpeaker': return <LIB.FcPodiumWithoutSpeaker className={className} />;
            case 'FcPortraitMode': return <LIB.FcPortraitMode className={className} />;
            case 'FcPositiveDynamic': return <LIB.FcPositiveDynamic className={className} />;
            case 'FcPrevious': return <LIB.FcPrevious className={className} />;
            case 'FcPrint': return <LIB.FcPrint className={className} />;
            case 'FcPrivacy': return <LIB.FcPrivacy className={className} />;
            case 'FcProcess': return <LIB.FcProcess className={className} />;
            case 'FcPuzzle': return <LIB.FcPuzzle className={className} />;
            case 'FcQuestions': return <LIB.FcQuestions className={className} />;
            case 'FcRadarPlot': return <LIB.FcRadarPlot className={className} />;
            case 'FcRating': return <LIB.FcRating className={className} />;
            case 'FcRatings': return <LIB.FcRatings className={className} />;
            case 'FcReadingEbook': return <LIB.FcReadingEbook className={className} />;
            case 'FcReading': return <LIB.FcReading className={className} />;
            case 'FcReddit': return <LIB.FcReddit className={className} />;
            case 'FcRedo': return <LIB.FcRedo className={className} />;
            case 'FcRefresh': return <LIB.FcRefresh className={className} />;
            case 'FcRegisteredTrademark': return <LIB.FcRegisteredTrademark className={className} />;
            case 'FcRemoveImage': return <LIB.FcRemoveImage className={className} />;
            case 'FcReuse': return <LIB.FcReuse className={className} />;
            case 'FcRightDown': return <LIB.FcRightDown className={className} />;
            case 'FcRightDown2': return <LIB.FcRightDown2 className={className} />;
            case 'FcRightUp': return <LIB.FcRightUp className={className} />;
            case 'FcRightUp2': return <LIB.FcRightUp2 className={className} />;
            case 'FcRight': return <LIB.FcRight className={className} />;
            case 'FcRotateCamera': return <LIB.FcRotateCamera className={className} />;
            case 'FcRotateToLandscape': return <LIB.FcRotateToLandscape className={className} />;
            case 'FcRotateToPortrait': return <LIB.FcRotateToPortrait className={className} />;
            case 'FcRuler': return <LIB.FcRuler className={className} />;
            case 'FcRules': return <LIB.FcRules className={className} />;
            case 'FcSafe': return <LIB.FcSafe className={className} />;
            case 'FcSalesPerformance': return <LIB.FcSalesPerformance className={className} />;
            case 'FcScatterPlot': return <LIB.FcScatterPlot className={className} />;
            case 'FcSearch': return <LIB.FcSearch className={className} />;
            case 'FcSelfServiceKiosk': return <LIB.FcSelfServiceKiosk className={className} />;
            case 'FcSelfie': return <LIB.FcSelfie className={className} />;
            case 'FcSerialTasks': return <LIB.FcSerialTasks className={className} />;
            case 'FcServiceMark': return <LIB.FcServiceMark className={className} />;
            case 'FcServices': return <LIB.FcServices className={className} />;
            case 'FcSettings': return <LIB.FcSettings className={className} />;
            case 'FcShare': return <LIB.FcShare className={className} />;
            case 'FcShipped': return <LIB.FcShipped className={className} />;
            case 'FcShop': return <LIB.FcShop className={className} />;
            case 'FcSignature': return <LIB.FcSignature className={className} />;
            case 'FcSimCardChip': return <LIB.FcSimCardChip className={className} />;
            case 'FcSimCard': return <LIB.FcSimCard className={className} />;
            case 'FcSlrBackSide': return <LIB.FcSlrBackSide className={className} />;
            case 'FcSmartphoneTablet': return <LIB.FcSmartphoneTablet className={className} />;
            case 'FcSms': return <LIB.FcSms className={className} />;
            case 'FcSoundRecordingCopyright': return <LIB.FcSoundRecordingCopyright className={className} />;
            case 'FcSpeaker': return <LIB.FcSpeaker className={className} />;
            case 'FcSportsMode': return <LIB.FcSportsMode className={className} />;
            case 'FcStackOfPhotos': return <LIB.FcStackOfPhotos className={className} />;
            case 'FcStart': return <LIB.FcStart className={className} />;
            case 'FcStatistics': return <LIB.FcStatistics className={className} />;
            case 'FcSteam': return <LIB.FcSteam className={className} />;
            case 'FcStumbleupon': return <LIB.FcStumbleupon className={className} />;
            case 'FcSupport': return <LIB.FcSupport className={className} />;
            case 'FcSurvey': return <LIB.FcSurvey className={className} />;
            case 'FcSwitchCamera': return <LIB.FcSwitchCamera className={className} />;
            case 'FcSynchronize': return <LIB.FcSynchronize className={className} />;
            case 'FcTabletAndroid': return <LIB.FcTabletAndroid className={className} />;
            case 'FcTemplate': return <LIB.FcTemplate className={className} />;
            case 'FcTimeline': return <LIB.FcTimeline className={className} />;
            case 'FcTodoList': return <LIB.FcTodoList className={className} />;
            case 'FcTouchscreenSmartphone': return <LIB.FcTouchscreenSmartphone className={className} />;
            case 'FcTrademark': return <LIB.FcTrademark className={className} />;
            case 'FcTreeStructure': return <LIB.FcTreeStructure className={className} />;
            case 'FcTwoSmartphones': return <LIB.FcTwoSmartphones className={className} />;
            case 'FcUndo': return <LIB.FcUndo className={className} />;
            case 'FcUnlock': return <LIB.FcUnlock className={className} />;
            case 'FcUpLeft': return <LIB.FcUpLeft className={className} />;
            case 'FcUpRight': return <LIB.FcUpRight className={className} />;
            case 'FcUp': return <LIB.FcUp className={className} />;
            case 'FcUpload': return <LIB.FcUpload className={className} />;
            case 'FcUsb': return <LIB.FcUsb className={className} />;
            case 'FcVideoCall': return <LIB.FcVideoCall className={className} />;
            case 'FcVideoFile': return <LIB.FcVideoFile className={className} />;
            case 'FcVideoProjector': return <LIB.FcVideoProjector className={className} />;
            case 'FcViewDetails': return <LIB.FcViewDetails className={className} />;
            case 'FcVip': return <LIB.FcVip className={className} />;
            case 'FcVlc': return <LIB.FcVlc className={className} />;
            case 'FcVoicePresentation': return <LIB.FcVoicePresentation className={className} />;
            case 'FcVoicemail': return <LIB.FcVoicemail className={className} />;
            case 'FcWebcam': return <LIB.FcWebcam className={className} />;
            case 'FcWiFiLogo': return <LIB.FcWiFiLogo className={className} />;
            case 'FcWikipedia': return <LIB.FcWikipedia className={className} />;
            case 'FcWorkflow': return <LIB.FcWorkflow className={className} />;


            default:
                console.log('Fc - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Fc;