/**
 * https://react-icons.github.io/react-icons/icons/rx/
 */


import * as LIB from "react-icons/rx";


// Define the props that the PostForm component expects
interface rxProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Rx(
    {
        icon = 'RxAccessibility',
        className,
    }: rxProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'RxAccessibility': return <LIB.RxAccessibility className={className} />;
            case 'RxActivityLog': return <LIB.RxActivityLog className={className} />;
            case 'RxAlignBaseline': return <LIB.RxAlignBaseline className={className} />;
            case 'RxAlignBottom': return <LIB.RxAlignBottom className={className} />;
            case 'RxAlignCenterHorizontally': return <LIB.RxAlignCenterHorizontally className={className} />;
            case 'RxAlignCenterVertically': return <LIB.RxAlignCenterVertically className={className} />;
            case 'RxAlignLeft': return <LIB.RxAlignLeft className={className} />;
            case 'RxAlignRight': return <LIB.RxAlignRight className={className} />;
            case 'RxAlignTop': return <LIB.RxAlignTop className={className} />;
            case 'RxAllSides': return <LIB.RxAllSides className={className} />;
            case 'RxAngle': return <LIB.RxAngle className={className} />;
            case 'RxArchive': return <LIB.RxArchive className={className} />;
            case 'RxArrowBottomLeft': return <LIB.RxArrowBottomLeft className={className} />;
            case 'RxArrowBottomRight': return <LIB.RxArrowBottomRight className={className} />;
            case 'RxArrowDown': return <LIB.RxArrowDown className={className} />;
            case 'RxArrowLeft': return <LIB.RxArrowLeft className={className} />;
            case 'RxArrowRight': return <LIB.RxArrowRight className={className} />;
            case 'RxArrowTopLeft': return <LIB.RxArrowTopLeft className={className} />;
            case 'RxArrowTopRight': return <LIB.RxArrowTopRight className={className} />;
            case 'RxArrowUp': return <LIB.RxArrowUp className={className} />;
            case 'RxAspectRatio': return <LIB.RxAspectRatio className={className} />;
            case 'RxAvatar': return <LIB.RxAvatar className={className} />;
            case 'RxBackpack': return <LIB.RxBackpack className={className} />;
            case 'RxBadge': return <LIB.RxBadge className={className} />;
            case 'RxBarChart': return <LIB.RxBarChart className={className} />;
            case 'RxBell': return <LIB.RxBell className={className} />;
            case 'RxBlendingMode': return <LIB.RxBlendingMode className={className} />;
            case 'RxBookmarkFilled': return <LIB.RxBookmarkFilled className={className} />;
            case 'RxBookmark': return <LIB.RxBookmark className={className} />;
            case 'RxBorderAll': return <LIB.RxBorderAll className={className} />;
            case 'RxBorderBottom': return <LIB.RxBorderBottom className={className} />;
            case 'RxBorderDashed': return <LIB.RxBorderDashed className={className} />;
            case 'RxBorderDotted': return <LIB.RxBorderDotted className={className} />;
            case 'RxBorderLeft': return <LIB.RxBorderLeft className={className} />;
            case 'RxBorderNone': return <LIB.RxBorderNone className={className} />;
            case 'RxBorderRight': return <LIB.RxBorderRight className={className} />;
            case 'RxBorderSolid': return <LIB.RxBorderSolid className={className} />;
            case 'RxBorderSplit': return <LIB.RxBorderSplit className={className} />;
            case 'RxBorderStyle': return <LIB.RxBorderStyle className={className} />;
            case 'RxBorderTop': return <LIB.RxBorderTop className={className} />;
            case 'RxBorderWidth': return <LIB.RxBorderWidth className={className} />;
            case 'RxBoxModel': return <LIB.RxBoxModel className={className} />;
            case 'RxBox': return <LIB.RxBox className={className} />;
            case 'RxButton': return <LIB.RxButton className={className} />;
            case 'RxCalendar': return <LIB.RxCalendar className={className} />;
            case 'RxCamera': return <LIB.RxCamera className={className} />;
            case 'RxCardStackMinus': return <LIB.RxCardStackMinus className={className} />;
            case 'RxCardStackPlus': return <LIB.RxCardStackPlus className={className} />;
            case 'RxCardStack': return <LIB.RxCardStack className={className} />;
            case 'RxCaretDown': return <LIB.RxCaretDown className={className} />;
            case 'RxCaretLeft': return <LIB.RxCaretLeft className={className} />;
            case 'RxCaretRight': return <LIB.RxCaretRight className={className} />;
            case 'RxCaretSort': return <LIB.RxCaretSort className={className} />;
            case 'RxCaretUp': return <LIB.RxCaretUp className={className} />;
            case 'RxChatBubble': return <LIB.RxChatBubble className={className} />;
            case 'RxCheckCircled': return <LIB.RxCheckCircled className={className} />;
            case 'RxCheck': return <LIB.RxCheck className={className} />;
            case 'RxCheckbox': return <LIB.RxCheckbox className={className} />;
            case 'RxChevronDown': return <LIB.RxChevronDown className={className} />;
            case 'RxChevronLeft': return <LIB.RxChevronLeft className={className} />;
            case 'RxChevronRight': return <LIB.RxChevronRight className={className} />;
            case 'RxChevronUp': return <LIB.RxChevronUp className={className} />;
            case 'RxCircleBackslash': return <LIB.RxCircleBackslash className={className} />;
            case 'RxCircle': return <LIB.RxCircle className={className} />;
            case 'RxClipboardCopy': return <LIB.RxClipboardCopy className={className} />;
            case 'RxClipboard': return <LIB.RxClipboard className={className} />;
            case 'RxClock': return <LIB.RxClock className={className} />;
            case 'RxCode': return <LIB.RxCode className={className} />;
            case 'RxCodesandboxLogo': return <LIB.RxCodesandboxLogo className={className} />;
            case 'RxColorWheel': return <LIB.RxColorWheel className={className} />;
            case 'RxColumnSpacing': return <LIB.RxColumnSpacing className={className} />;
            case 'RxColumns': return <LIB.RxColumns className={className} />;
            case 'RxCommit': return <LIB.RxCommit className={className} />;
            case 'RxComponent1': return <LIB.RxComponent1 className={className} />;
            case 'RxComponent2': return <LIB.RxComponent2 className={className} />;
            case 'RxComponentBoolean': return <LIB.RxComponentBoolean className={className} />;
            case 'RxComponentInstance': return <LIB.RxComponentInstance className={className} />;
            case 'RxComponentNone': return <LIB.RxComponentNone className={className} />;
            case 'RxComponentPlaceholder': return <LIB.RxComponentPlaceholder className={className} />;
            case 'RxContainer': return <LIB.RxContainer className={className} />;
            case 'RxCookie': return <LIB.RxCookie className={className} />;
            case 'RxCopy': return <LIB.RxCopy className={className} />;
            case 'RxCornerBottomLeft': return <LIB.RxCornerBottomLeft className={className} />;
            case 'RxCornerBottomRight': return <LIB.RxCornerBottomRight className={className} />;
            case 'RxCornerTopLeft': return <LIB.RxCornerTopLeft className={className} />;
            case 'RxCornerTopRight': return <LIB.RxCornerTopRight className={className} />;
            case 'RxCorners': return <LIB.RxCorners className={className} />;
            case 'RxCountdownTimer': return <LIB.RxCountdownTimer className={className} />;
            case 'RxCounterClockwiseClock': return <LIB.RxCounterClockwiseClock className={className} />;
            case 'RxCrop': return <LIB.RxCrop className={className} />;
            case 'RxCross1': return <LIB.RxCross1 className={className} />;
            case 'RxCross2': return <LIB.RxCross2 className={className} />;
            case 'RxCrossCircled': return <LIB.RxCrossCircled className={className} />;
            case 'RxCrosshair1': return <LIB.RxCrosshair1 className={className} />;
            case 'RxCrosshair2': return <LIB.RxCrosshair2 className={className} />;
            case 'RxCrumpledPaper': return <LIB.RxCrumpledPaper className={className} />;
            case 'RxCube': return <LIB.RxCube className={className} />;
            case 'RxCursorArrow': return <LIB.RxCursorArrow className={className} />;
            case 'RxCursorText': return <LIB.RxCursorText className={className} />;
            case 'RxDash': return <LIB.RxDash className={className} />;
            case 'RxDashboard': return <LIB.RxDashboard className={className} />;
            case 'RxDesktop': return <LIB.RxDesktop className={className} />;
            case 'RxDimensions': return <LIB.RxDimensions className={className} />;
            case 'RxDisc': return <LIB.RxDisc className={className} />;
            case 'RxDiscordLogo': return <LIB.RxDiscordLogo className={className} />;
            case 'RxDividerHorizontal': return <LIB.RxDividerHorizontal className={className} />;
            case 'RxDividerVertical': return <LIB.RxDividerVertical className={className} />;
            case 'RxDotFilled': return <LIB.RxDotFilled className={className} />;
            case 'RxDot': return <LIB.RxDot className={className} />;
            case 'RxDotsHorizontal': return <LIB.RxDotsHorizontal className={className} />;
            case 'RxDotsVertical': return <LIB.RxDotsVertical className={className} />;
            case 'RxDoubleArrowDown': return <LIB.RxDoubleArrowDown className={className} />;
            case 'RxDoubleArrowLeft': return <LIB.RxDoubleArrowLeft className={className} />;
            case 'RxDoubleArrowRight': return <LIB.RxDoubleArrowRight className={className} />;
            case 'RxDoubleArrowUp': return <LIB.RxDoubleArrowUp className={className} />;
            case 'RxDownload': return <LIB.RxDownload className={className} />;
            case 'RxDragHandleDots1': return <LIB.RxDragHandleDots1 className={className} />;
            case 'RxDragHandleDots2': return <LIB.RxDragHandleDots2 className={className} />;
            case 'RxDragHandleHorizontal': return <LIB.RxDragHandleHorizontal className={className} />;
            case 'RxDragHandleVertical': return <LIB.RxDragHandleVertical className={className} />;
            case 'RxDrawingPinFilled': return <LIB.RxDrawingPinFilled className={className} />;
            case 'RxDrawingPin': return <LIB.RxDrawingPin className={className} />;
            case 'RxDropdownMenu': return <LIB.RxDropdownMenu className={className} />;
            case 'RxEnterFullScreen': return <LIB.RxEnterFullScreen className={className} />;
            case 'RxEnter': return <LIB.RxEnter className={className} />;
            case 'RxEnvelopeClosed': return <LIB.RxEnvelopeClosed className={className} />;
            case 'RxEnvelopeOpen': return <LIB.RxEnvelopeOpen className={className} />;
            case 'RxEraser': return <LIB.RxEraser className={className} />;
            case 'RxExclamationTriangle': return <LIB.RxExclamationTriangle className={className} />;
            case 'RxExitFullScreen': return <LIB.RxExitFullScreen className={className} />;
            case 'RxExit': return <LIB.RxExit className={className} />;
            case 'RxExternalLink': return <LIB.RxExternalLink className={className} />;
            case 'RxEyeClosed': return <LIB.RxEyeClosed className={className} />;
            case 'RxEyeNone': return <LIB.RxEyeNone className={className} />;
            case 'RxEyeOpen': return <LIB.RxEyeOpen className={className} />;
            case 'RxFace': return <LIB.RxFace className={className} />;
            case 'RxFigmaLogo': return <LIB.RxFigmaLogo className={className} />;
            case 'RxFileMinus': return <LIB.RxFileMinus className={className} />;
            case 'RxFilePlus': return <LIB.RxFilePlus className={className} />;
            case 'RxFileText': return <LIB.RxFileText className={className} />;
            case 'RxFile': return <LIB.RxFile className={className} />;
            case 'RxFontBold': return <LIB.RxFontBold className={className} />;
            case 'RxFontFamily': return <LIB.RxFontFamily className={className} />;
            case 'RxFontItalic': return <LIB.RxFontItalic className={className} />;
            case 'RxFontRoman': return <LIB.RxFontRoman className={className} />;
            case 'RxFontSize': return <LIB.RxFontSize className={className} />;
            case 'RxFontStyle': return <LIB.RxFontStyle className={className} />;
            case 'RxFrame': return <LIB.RxFrame className={className} />;
            case 'RxFramerLogo': return <LIB.RxFramerLogo className={className} />;
            case 'RxGear': return <LIB.RxGear className={className} />;
            case 'RxGithubLogo': return <LIB.RxGithubLogo className={className} />;
            case 'RxGlobe': return <LIB.RxGlobe className={className} />;
            case 'RxGrid': return <LIB.RxGrid className={className} />;
            case 'RxGroup': return <LIB.RxGroup className={className} />;
            case 'RxHalf1': return <LIB.RxHalf1 className={className} />;
            case 'RxHalf2': return <LIB.RxHalf2 className={className} />;
            case 'RxHamburgerMenu': return <LIB.RxHamburgerMenu className={className} />;
            case 'RxHand': return <LIB.RxHand className={className} />;
            case 'RxHeading': return <LIB.RxHeading className={className} />;
            case 'RxHeartFilled': return <LIB.RxHeartFilled className={className} />;
            case 'RxHeart': return <LIB.RxHeart className={className} />;
            case 'RxHeight': return <LIB.RxHeight className={className} />;
            case 'RxHobbyKnife': return <LIB.RxHobbyKnife className={className} />;
            case 'RxHome': return <LIB.RxHome className={className} />;
            case 'RxIconjarLogo': return <LIB.RxIconjarLogo className={className} />;
            case 'RxIdCard': return <LIB.RxIdCard className={className} />;
            case 'RxImage': return <LIB.RxImage className={className} />;
            case 'RxInfoCircled': return <LIB.RxInfoCircled className={className} />;
            case 'RxInput': return <LIB.RxInput className={className} />;
            case 'RxInstagramLogo': return <LIB.RxInstagramLogo className={className} />;
            case 'RxKeyboard': return <LIB.RxKeyboard className={className} />;
            case 'RxLapTimer': return <LIB.RxLapTimer className={className} />;
            case 'RxLaptop': return <LIB.RxLaptop className={className} />;
            case 'RxLayers': return <LIB.RxLayers className={className} />;
            case 'RxLayout': return <LIB.RxLayout className={className} />;
            case 'RxLetterCaseCapitalize': return <LIB.RxLetterCaseCapitalize className={className} />;
            case 'RxLetterCaseLowercase': return <LIB.RxLetterCaseLowercase className={className} />;
            case 'RxLetterCaseToggle': return <LIB.RxLetterCaseToggle className={className} />;
            case 'RxLetterCaseUppercase': return <LIB.RxLetterCaseUppercase className={className} />;
            case 'RxLetterSpacing': return <LIB.RxLetterSpacing className={className} />;
            case 'RxLightningBolt': return <LIB.RxLightningBolt className={className} />;
            case 'RxLineHeight': return <LIB.RxLineHeight className={className} />;
            case 'RxLink1': return <LIB.RxLink1 className={className} />;
            case 'RxLink2': return <LIB.RxLink2 className={className} />;
            case 'RxLinkBreak1': return <LIB.RxLinkBreak1 className={className} />;
            case 'RxLinkBreak2': return <LIB.RxLinkBreak2 className={className} />;
            case 'RxLinkNone1': return <LIB.RxLinkNone1 className={className} />;
            case 'RxLinkNone2': return <LIB.RxLinkNone2 className={className} />;
            case 'RxLinkedinLogo': return <LIB.RxLinkedinLogo className={className} />;
            case 'RxListBullet': return <LIB.RxListBullet className={className} />;
            case 'RxLockClosed': return <LIB.RxLockClosed className={className} />;
            case 'RxLockOpen1': return <LIB.RxLockOpen1 className={className} />;
            case 'RxLockOpen2': return <LIB.RxLockOpen2 className={className} />;
            case 'RxLoop': return <LIB.RxLoop className={className} />;
            case 'RxMagicWand': return <LIB.RxMagicWand className={className} />;
            case 'RxMagnifyingGlass': return <LIB.RxMagnifyingGlass className={className} />;
            case 'RxMargin': return <LIB.RxMargin className={className} />;
            case 'RxMaskOff': return <LIB.RxMaskOff className={className} />;
            case 'RxMaskOn': return <LIB.RxMaskOn className={className} />;
            case 'RxMinusCircled': return <LIB.RxMinusCircled className={className} />;
            case 'RxMinus': return <LIB.RxMinus className={className} />;
            case 'RxMix': return <LIB.RxMix className={className} />;
            case 'RxMixerHorizontal': return <LIB.RxMixerHorizontal className={className} />;
            case 'RxMixerVertical': return <LIB.RxMixerVertical className={className} />;
            case 'RxMobile': return <LIB.RxMobile className={className} />;
            case 'RxModulzLogo': return <LIB.RxModulzLogo className={className} />;
            case 'RxMoon': return <LIB.RxMoon className={className} />;
            case 'RxMove': return <LIB.RxMove className={className} />;
            case 'RxNotionLogo': return <LIB.RxNotionLogo className={className} />;
            case 'RxOpacity': return <LIB.RxOpacity className={className} />;
            case 'RxOpenInNewWindow': return <LIB.RxOpenInNewWindow className={className} />;
            case 'RxOverline': return <LIB.RxOverline className={className} />;
            case 'RxPadding': return <LIB.RxPadding className={className} />;
            case 'RxPaperPlane': return <LIB.RxPaperPlane className={className} />;
            case 'RxPause': return <LIB.RxPause className={className} />;
            case 'RxPencil1': return <LIB.RxPencil1 className={className} />;
            case 'RxPencil2': return <LIB.RxPencil2 className={className} />;
            case 'RxPerson': return <LIB.RxPerson className={className} />;
            case 'RxPieChart': return <LIB.RxPieChart className={className} />;
            case 'RxPilcrow': return <LIB.RxPilcrow className={className} />;
            case 'RxPinBottom': return <LIB.RxPinBottom className={className} />;
            case 'RxPinLeft': return <LIB.RxPinLeft className={className} />;
            case 'RxPinRight': return <LIB.RxPinRight className={className} />;
            case 'RxPinTop': return <LIB.RxPinTop className={className} />;
            case 'RxPlay': return <LIB.RxPlay className={className} />;
            case 'RxPlusCircled': return <LIB.RxPlusCircled className={className} />;
            case 'RxPlus': return <LIB.RxPlus className={className} />;
            case 'RxQuestionMarkCircled': return <LIB.RxQuestionMarkCircled className={className} />;
            case 'RxQuestionMark': return <LIB.RxQuestionMark className={className} />;
            case 'RxQuote': return <LIB.RxQuote className={className} />;
            case 'RxRadiobutton': return <LIB.RxRadiobutton className={className} />;
            case 'RxReader': return <LIB.RxReader className={className} />;
            case 'RxReload': return <LIB.RxReload className={className} />;
            case 'RxReset': return <LIB.RxReset className={className} />;
            case 'RxResume': return <LIB.RxResume className={className} />;
            case 'RxRocket': return <LIB.RxRocket className={className} />;
            case 'RxRotateCounterClockwise': return <LIB.RxRotateCounterClockwise className={className} />;
            case 'RxRowSpacing': return <LIB.RxRowSpacing className={className} />;
            case 'RxRows': return <LIB.RxRows className={className} />;
            case 'RxRulerHorizontal': return <LIB.RxRulerHorizontal className={className} />;
            case 'RxRulerSquare': return <LIB.RxRulerSquare className={className} />;
            case 'RxScissors': return <LIB.RxScissors className={className} />;
            case 'RxSection': return <LIB.RxSection className={className} />;
            case 'RxSewingPinFilled': return <LIB.RxSewingPinFilled className={className} />;
            case 'RxSewingPin': return <LIB.RxSewingPin className={className} />;
            case 'RxShadowInner': return <LIB.RxShadowInner className={className} />;
            case 'RxShadowNone': return <LIB.RxShadowNone className={className} />;
            case 'RxShadowOuter': return <LIB.RxShadowOuter className={className} />;
            case 'RxShadow': return <LIB.RxShadow className={className} />;
            case 'RxShare1': return <LIB.RxShare1 className={className} />;
            case 'RxShare2': return <LIB.RxShare2 className={className} />;
            case 'RxShuffle': return <LIB.RxShuffle className={className} />;
            case 'RxSize': return <LIB.RxSize className={className} />;
            case 'RxSketchLogo': return <LIB.RxSketchLogo className={className} />;
            case 'RxSlash': return <LIB.RxSlash className={className} />;
            case 'RxSlider': return <LIB.RxSlider className={className} />;
            case 'RxSpaceBetweenHorizontally': return <LIB.RxSpaceBetweenHorizontally className={className} />;
            case 'RxSpaceBetweenVertically': return <LIB.RxSpaceBetweenVertically className={className} />;
            case 'RxSpaceEvenlyHorizontally': return <LIB.RxSpaceEvenlyHorizontally className={className} />;
            case 'RxSpaceEvenlyVertically': return <LIB.RxSpaceEvenlyVertically className={className} />;
            case 'RxSpeakerLoud': return <LIB.RxSpeakerLoud className={className} />;
            case 'RxSpeakerModerate': return <LIB.RxSpeakerModerate className={className} />;
            case 'RxSpeakerOff': return <LIB.RxSpeakerOff className={className} />;
            case 'RxSpeakerQuiet': return <LIB.RxSpeakerQuiet className={className} />;
            case 'RxSquare': return <LIB.RxSquare className={className} />;
            case 'RxStack': return <LIB.RxStack className={className} />;
            case 'RxStarFilled': return <LIB.RxStarFilled className={className} />;
            case 'RxStar': return <LIB.RxStar className={className} />;
            case 'RxStitchesLogo': return <LIB.RxStitchesLogo className={className} />;
            case 'RxStop': return <LIB.RxStop className={className} />;
            case 'RxStopwatch': return <LIB.RxStopwatch className={className} />;
            case 'RxStretchHorizontally': return <LIB.RxStretchHorizontally className={className} />;
            case 'RxStretchVertically': return <LIB.RxStretchVertically className={className} />;
            case 'RxStrikethrough': return <LIB.RxStrikethrough className={className} />;
            case 'RxSun': return <LIB.RxSun className={className} />;
            case 'RxSwitch': return <LIB.RxSwitch className={className} />;
            case 'RxSymbol': return <LIB.RxSymbol className={className} />;
            case 'RxTable': return <LIB.RxTable className={className} />;
            case 'RxTarget': return <LIB.RxTarget className={className} />;
            case 'RxTextAlignBottom': return <LIB.RxTextAlignBottom className={className} />;
            case 'RxTextAlignCenter': return <LIB.RxTextAlignCenter className={className} />;
            case 'RxTextAlignJustify': return <LIB.RxTextAlignJustify className={className} />;
            case 'RxTextAlignLeft': return <LIB.RxTextAlignLeft className={className} />;
            case 'RxTextAlignMiddle': return <LIB.RxTextAlignMiddle className={className} />;
            case 'RxTextAlignRight': return <LIB.RxTextAlignRight className={className} />;
            case 'RxTextAlignTop': return <LIB.RxTextAlignTop className={className} />;
            case 'RxTextNone': return <LIB.RxTextNone className={className} />;
            case 'RxText': return <LIB.RxText className={className} />;
            case 'RxThickArrowDown': return <LIB.RxThickArrowDown className={className} />;
            case 'RxThickArrowLeft': return <LIB.RxThickArrowLeft className={className} />;
            case 'RxThickArrowRight': return <LIB.RxThickArrowRight className={className} />;
            case 'RxThickArrowUp': return <LIB.RxThickArrowUp className={className} />;
            case 'RxTimer': return <LIB.RxTimer className={className} />;
            case 'RxTokens': return <LIB.RxTokens className={className} />;
            case 'RxTrackNext': return <LIB.RxTrackNext className={className} />;
            case 'RxTrackPrevious': return <LIB.RxTrackPrevious className={className} />;
            case 'RxTransform': return <LIB.RxTransform className={className} />;
            case 'RxTransparencyGrid': return <LIB.RxTransparencyGrid className={className} />;
            case 'RxTrash': return <LIB.RxTrash className={className} />;
            case 'RxTriangleDown': return <LIB.RxTriangleDown className={className} />;
            case 'RxTriangleLeft': return <LIB.RxTriangleLeft className={className} />;
            case 'RxTriangleRight': return <LIB.RxTriangleRight className={className} />;
            case 'RxTriangleUp': return <LIB.RxTriangleUp className={className} />;
            case 'RxTwitterLogo': return <LIB.RxTwitterLogo className={className} />;
            case 'RxUnderline': return <LIB.RxUnderline className={className} />;
            case 'RxUpdate': return <LIB.RxUpdate className={className} />;
            case 'RxUpload': return <LIB.RxUpload className={className} />;
            case 'RxValueNone': return <LIB.RxValueNone className={className} />;
            case 'RxValue': return <LIB.RxValue className={className} />;
            case 'RxVercelLogo': return <LIB.RxVercelLogo className={className} />;
            case 'RxVideo': return <LIB.RxVideo className={className} />;
            case 'RxViewGrid': return <LIB.RxViewGrid className={className} />;
            case 'RxViewHorizontal': return <LIB.RxViewHorizontal className={className} />;
            case 'RxViewNone': return <LIB.RxViewNone className={className} />;
            case 'RxViewVertical': return <LIB.RxViewVertical className={className} />;
            case 'RxWidth': return <LIB.RxWidth className={className} />;
            case 'RxZoomIn': return <LIB.RxZoomIn className={className} />;
            case 'RxZoomOut': return <LIB.RxZoomOut className={className} />;


            default:
                console.log('Rx - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Rx;