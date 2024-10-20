/**
 * https://react-icons.github.io/react-icons/icons/go/
 */


import * as LIB from "react-icons/go";


// Define the props that the PostForm component expects
interface goProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Go(
    {
        icon = 'GoAlert',
        className,
    }: goProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'GoAlert': return <LIB.GoAlert className={className} />;
            case 'GoAlertFill': return <LIB.GoAlertFill className={className} />;
            case 'GoArchive': return <LIB.GoArchive className={className} />;
            case 'GoArrowBoth': return <LIB.GoArrowBoth className={className} />;
            case 'GoArrowDown': return <LIB.GoArrowDown className={className} />;
            case 'GoArrowDownLeft': return <LIB.GoArrowDownLeft className={className} />;
            case 'GoArrowDownRight': return <LIB.GoArrowDownRight className={className} />;
            case 'GoArrowLeft': return <LIB.GoArrowLeft className={className} />;
            case 'GoArrowRight': return <LIB.GoArrowRight className={className} />;
            case 'GoArrowSwitch': return <LIB.GoArrowSwitch className={className} />;
            case 'GoArrowUp': return <LIB.GoArrowUp className={className} />;
            case 'GoArrowUpLeft': return <LIB.GoArrowUpLeft className={className} />;
            case 'GoArrowUpRight': return <LIB.GoArrowUpRight className={className} />;
            case 'GoBeaker': return <LIB.GoBeaker className={className} />;
            case 'GoBell': return <LIB.GoBell className={className} />;
            case 'GoBellFill': return <LIB.GoBellFill className={className} />;
            case 'GoBellSlash': return <LIB.GoBellSlash className={className} />;
            case 'GoBlocked': return <LIB.GoBlocked className={className} />;
            case 'GoBold': return <LIB.GoBold className={className} />;
            case 'GoBook': return <LIB.GoBook className={className} />;
            case 'GoBookmark': return <LIB.GoBookmark className={className} />;
            case 'GoBookmarkFill': return <LIB.GoBookmarkFill className={className} />;
            case 'GoBookmarkSlash': return <LIB.GoBookmarkSlash className={className} />;
            case 'GoBookmarkSlashFill': return <LIB.GoBookmarkSlashFill className={className} />;
            case 'GoBriefcase': return <LIB.GoBriefcase className={className} />;
            case 'GoBroadcast': return <LIB.GoBroadcast className={className} />;
            case 'GoBrowser': return <LIB.GoBrowser className={className} />;
            case 'GoBug': return <LIB.GoBug className={className} />;
            case 'GoCalendar': return <LIB.GoCalendar className={className} />;
            case 'GoCheck': return <LIB.GoCheck className={className} />;
            case 'GoCheckCircle': return <LIB.GoCheckCircle className={className} />;
            case 'GoCheckCircleFill': return <LIB.GoCheckCircleFill className={className} />;
            case 'GoCheckbox': return <LIB.GoCheckbox className={className} />;
            case 'GoChecklist': return <LIB.GoChecklist className={className} />;
            case 'GoChevronDown': return <LIB.GoChevronDown className={className} />;
            case 'GoChevronLeft': return <LIB.GoChevronLeft className={className} />;
            case 'GoChevronRight': return <LIB.GoChevronRight className={className} />;
            case 'GoChevronUp': return <LIB.GoChevronUp className={className} />;
            case 'GoCircle': return <LIB.GoCircle className={className} />;
            case 'GoCircleSlash': return <LIB.GoCircleSlash className={className} />;
            case 'GoClock': return <LIB.GoClock className={className} />;
            case 'GoClockFill': return <LIB.GoClockFill className={className} />;
            case 'GoCloud': return <LIB.GoCloud className={className} />;
            case 'GoCloudOffline': return <LIB.GoCloudOffline className={className} />;
            case 'GoCode': return <LIB.GoCode className={className} />;
            case 'GoCodeOfConduct': return <LIB.GoCodeOfConduct className={className} />;
            case 'GoCodeReview': return <LIB.GoCodeReview className={className} />;
            case 'GoCodeSquare': return <LIB.GoCodeSquare className={className} />;
            case 'GoCodescan': return <LIB.GoCodescan className={className} />;
            case 'GoCodescanCheckmark': return <LIB.GoCodescanCheckmark className={className} />;
            case 'GoCodespaces': return <LIB.GoCodespaces className={className} />;
            case 'GoColumns': return <LIB.GoColumns className={className} />;
            case 'GoCommandPalette': return <LIB.GoCommandPalette className={className} />;
            case 'GoComment': return <LIB.GoComment className={className} />;
            case 'GoCommentDiscussion': return <LIB.GoCommentDiscussion className={className} />;
            case 'GoCommit': return <LIB.GoCommit className={className} />;
            case 'GoContainer': return <LIB.GoContainer className={className} />;
            case 'GoCopilot': return <LIB.GoCopilot className={className} />;
            case 'GoCopy': return <LIB.GoCopy className={className} />;
            case 'GoCpu': return <LIB.GoCpu className={className} />;
            case 'GoCreditCard': return <LIB.GoCreditCard className={className} />;
            case 'GoCrossReference': return <LIB.GoCrossReference className={className} />;
            case 'GoDash': return <LIB.GoDash className={className} />;
            case 'GoDatabase': return <LIB.GoDatabase className={className} />;
            case 'GoDependabot': return <LIB.GoDependabot className={className} />;
            case 'GoDesktopDownload': return <LIB.GoDesktopDownload className={className} />;
            case 'GoDeviceCameraVideo': return <LIB.GoDeviceCameraVideo className={className} />;
            case 'GoDeviceDesktop': return <LIB.GoDeviceDesktop className={className} />;
            case 'GoDeviceMobile': return <LIB.GoDeviceMobile className={className} />;
            case 'GoDiamond': return <LIB.GoDiamond className={className} />;
            case 'GoDiff': return <LIB.GoDiff className={className} />;
            case 'GoDiscussionClosed': return <LIB.GoDiscussionClosed className={className} />;
            case 'GoDiscussionDuplicate': return <LIB.GoDiscussionDuplicate className={className} />;
            case 'GoDiscussionOutdated': return <LIB.GoDiscussionOutdated className={className} />;
            case 'GoDot': return <LIB.GoDot className={className} />;
            case 'GoDotFill': return <LIB.GoDotFill className={className} />;
            case 'GoDownload': return <LIB.GoDownload className={className} />;
            case 'GoDuplicate': return <LIB.GoDuplicate className={className} />;
            case 'GoEye': return <LIB.GoEye className={className} />;
            case 'GoEyeClosed': return <LIB.GoEyeClosed className={className} />;
            case 'GoFile': return <LIB.GoFile className={className} />;
            case 'GoFileBinary': return <LIB.GoFileBinary className={className} />;
            case 'GoFileCode': return <LIB.GoFileCode className={className} />;
            case 'GoFileDiff': return <LIB.GoFileDiff className={className} />;
            case 'GoFileDirectory': return <LIB.GoFileDirectory className={className} />;
            case 'GoFileDirectoryFill': return <LIB.GoFileDirectoryFill className={className} />;
            case 'GoFileMedia': return <LIB.GoFileMedia className={className} />;
            case 'GoFileSubmodule': return <LIB.GoFileSubmodule className={className} />;
            case 'GoFileSymlinkFile': return <LIB.GoFileSymlinkFile className={className} />;
            case 'GoFileZip': return <LIB.GoFileZip className={className} />;
            case 'GoFilter': return <LIB.GoFilter className={className} />;
            case 'GoFlame': return <LIB.GoFlame className={className} />;
            case 'GoFold': return <LIB.GoFold className={className} />;
            case 'GoFoldDown': return <LIB.GoFoldDown className={className} />;
            case 'GoFoldUp': return <LIB.GoFoldUp className={className} />;
            case 'GoGear': return <LIB.GoGear className={className} />;
            case 'GoGift': return <LIB.GoGift className={className} />;
            case 'GoGitBranch': return <LIB.GoGitBranch className={className} />;
            case 'GoGitCommit': return <LIB.GoGitCommit className={className} />;
            case 'GoGitCompare': return <LIB.GoGitCompare className={className} />;
            case 'GoGitMerge': return <LIB.GoGitMerge className={className} />;
            case 'GoGitMergeQueue': return <LIB.GoGitMergeQueue className={className} />;
            case 'GoGitPullRequest': return <LIB.GoGitPullRequest className={className} />;
            case 'GoGitPullRequestClosed': return <LIB.GoGitPullRequestClosed className={className} />;
            case 'GoGitPullRequestDraft': return <LIB.GoGitPullRequestDraft className={className} />;
            case 'GoGlobe': return <LIB.GoGlobe className={className} />;
            case 'GoGoal': return <LIB.GoGoal className={className} />;
            case 'GoGrabber': return <LIB.GoGrabber className={className} />;
            case 'GoGraph': return <LIB.GoGraph className={className} />;
            case 'GoHash': return <LIB.GoHash className={className} />;
            case 'GoHeading': return <LIB.GoHeading className={className} />;
            case 'GoHeart': return <LIB.GoHeart className={className} />;
            case 'GoHeartFill': return <LIB.GoHeartFill className={className} />;
            case 'GoHistory': return <LIB.GoHistory className={className} />;
            case 'GoHome': return <LIB.GoHome className={className} />;
            case 'GoHomeFill': return <LIB.GoHomeFill className={className} />;
            case 'GoHorizontalRule': return <LIB.GoHorizontalRule className={className} />;
            case 'GoHourglass': return <LIB.GoHourglass className={className} />;
            case 'GoHubot': return <LIB.GoHubot className={className} />;
            case 'GoImage': return <LIB.GoImage className={className} />;
            case 'GoInbox': return <LIB.GoInbox className={className} />;
            case 'GoInfinity': return <LIB.GoInfinity className={className} />;
            case 'GoInfo': return <LIB.GoInfo className={className} />;
            case 'GoIssueClosed': return <LIB.GoIssueClosed className={className} />;
            case 'GoIssueDraft': return <LIB.GoIssueDraft className={className} />;
            case 'GoIssueOpened': return <LIB.GoIssueOpened className={className} />;
            case 'GoIssueReopened': return <LIB.GoIssueReopened className={className} />;
            case 'GoIssueTrackedBy': return <LIB.GoIssueTrackedBy className={className} />;
            case 'GoIssueTracks': return <LIB.GoIssueTracks className={className} />;
            case 'GoItalic': return <LIB.GoItalic className={className} />;
            case 'GoIterations': return <LIB.GoIterations className={className} />;
            case 'GoKebabHorizontal': return <LIB.GoKebabHorizontal className={className} />;
            case 'GoKey': return <LIB.GoKey className={className} />;
            case 'GoLaw': return <LIB.GoLaw className={className} />;
            case 'GoLightBulb': return <LIB.GoLightBulb className={className} />;
            case 'GoLink': return <LIB.GoLink className={className} />;
            case 'GoLinkExternal': return <LIB.GoLinkExternal className={className} />;
            case 'GoListOrdered': return <LIB.GoListOrdered className={className} />;
            case 'GoListUnordered': return <LIB.GoListUnordered className={className} />;
            case 'GoLocation': return <LIB.GoLocation className={className} />;
            case 'GoLock': return <LIB.GoLock className={className} />;
            case 'GoLog': return <LIB.GoLog className={className} />;
            case 'GoMail': return <LIB.GoMail className={className} />;
            case 'GoMegaphone': return <LIB.GoMegaphone className={className} />;
            case 'GoMention': return <LIB.GoMention className={className} />;
            case 'GoMilestone': return <LIB.GoMilestone className={className} />;
            case 'GoMirror': return <LIB.GoMirror className={className} />;
            case 'GoMoon': return <LIB.GoMoon className={className} />;
            case 'GoMortarBoard': return <LIB.GoMortarBoard className={className} />;
            case 'GoMoveToBottom': return <LIB.GoMoveToBottom className={className} />;
            case 'GoMoveToEnd': return <LIB.GoMoveToEnd className={className} />;
            case 'GoMoveToStart': return <LIB.GoMoveToStart className={className} />;
            case 'GoMoveToTop': return <LIB.GoMoveToTop className={className} />;
            case 'GoMultiSelect': return <LIB.GoMultiSelect className={className} />;
            case 'GoMute': return <LIB.GoMute className={className} />;
            case 'GoNoEntry': return <LIB.GoNoEntry className={className} />;
            case 'GoNorthStar': return <LIB.GoNorthStar className={className} />;
            case 'GoNote': return <LIB.GoNote className={className} />;
            case 'GoNumber': return <LIB.GoNumber className={className} />;
            case 'GoOrganization': return <LIB.GoOrganization className={className} />;
            case 'GoPackage': return <LIB.GoPackage className={className} />;
            case 'GoPackageDependencies': return <LIB.GoPackageDependencies className={className} />;
            case 'GoPackageDependents': return <LIB.GoPackageDependents className={className} />;
            case 'GoPaperAirplane': return <LIB.GoPaperAirplane className={className} />;
            case 'GoPaperclip': return <LIB.GoPaperclip className={className} />;
            case 'GoPasskeyFill': return <LIB.GoPasskeyFill className={className} />;
            case 'GoPaste': return <LIB.GoPaste className={className} />;
            case 'GoPencil': return <LIB.GoPencil className={className} />;
            case 'GoPeople': return <LIB.GoPeople className={className} />;
            case 'GoPerson': return <LIB.GoPerson className={className} />;
            case 'GoPersonAdd': return <LIB.GoPersonAdd className={className} />;
            case 'GoPersonFill': return <LIB.GoPersonFill className={className} />;
            case 'GoPin': return <LIB.GoPin className={className} />;
            case 'GoPlay': return <LIB.GoPlay className={className} />;
            case 'GoPlug': return <LIB.GoPlug className={className} />;
            case 'GoPlus': return <LIB.GoPlus className={className} />;
            case 'GoPlusCircle': return <LIB.GoPlusCircle className={className} />;
            case 'GoProject': return <LIB.GoProject className={className} />;
            case 'GoProjectRoadmap': return <LIB.GoProjectRoadmap className={className} />;
            case 'GoProjectSymlink': return <LIB.GoProjectSymlink className={className} />;
            case 'GoProjectTemplate': return <LIB.GoProjectTemplate className={className} />;
            case 'GoPulse': return <LIB.GoPulse className={className} />;
            case 'GoQuestion': return <LIB.GoQuestion className={className} />;
            case 'GoQuote': return <LIB.GoQuote className={className} />;
            case 'GoRead': return <LIB.GoRead className={className} />;
            case 'GoRelFilePath': return <LIB.GoRelFilePath className={className} />;
            case 'GoReply': return <LIB.GoReply className={className} />;
            case 'GoRepo': return <LIB.GoRepo className={className} />;
            case 'GoRepoForked': return <LIB.GoRepoForked className={className} />;
            case 'GoRepoLocked': return <LIB.GoRepoLocked className={className} />;
            case 'GoRepoPush': return <LIB.GoRepoPush className={className} />;
            case 'GoRepoTemplate': return <LIB.GoRepoTemplate className={className} />;
            case 'GoReport': return <LIB.GoReport className={className} />;
            case 'GoRocket': return <LIB.GoRocket className={className} />;
            case 'GoRows': return <LIB.GoRows className={className} />;
            case 'GoRss': return <LIB.GoRss className={className} />;
            case 'GoRuby': return <LIB.GoRuby className={className} />;
            case 'GoScreenFull': return <LIB.GoScreenFull className={className} />;
            case 'GoScreenNormal': return <LIB.GoScreenNormal className={className} />;
            case 'GoSearch': return <LIB.GoSearch className={className} />;
            case 'GoServer': return <LIB.GoServer className={className} />;
            case 'GoShare': return <LIB.GoShare className={className} />;
            case 'GoShareAndroid': return <LIB.GoShareAndroid className={className} />;
            case 'GoShield': return <LIB.GoShield className={className} />;
            case 'GoShieldCheck': return <LIB.GoShieldCheck className={className} />;
            case 'GoShieldLock': return <LIB.GoShieldLock className={className} />;
            case 'GoShieldSlash': return <LIB.GoShieldSlash className={className} />;
            case 'GoShieldX': return <LIB.GoShieldX className={className} />;
            case 'GoSidebarCollapse': return <LIB.GoSidebarCollapse className={className} />;
            case 'GoSidebarExpand': return <LIB.GoSidebarExpand className={className} />;
            case 'GoSignIn': return <LIB.GoSignIn className={className} />;
            case 'GoSignOut': return <LIB.GoSignOut className={className} />;
            case 'GoSingleSelect': return <LIB.GoSingleSelect className={className} />;
            case 'GoSkip': return <LIB.GoSkip className={className} />;
            case 'GoSkipFill': return <LIB.GoSkipFill className={className} />;
            case 'GoSmiley': return <LIB.GoSmiley className={className} />;
            case 'GoSortAsc': return <LIB.GoSortAsc className={className} />;
            case 'GoSortDesc': return <LIB.GoSortDesc className={className} />;
            case 'GoSponsorTiers': return <LIB.GoSponsorTiers className={className} />;
            case 'GoSquare': return <LIB.GoSquare className={className} />;
            case 'GoSquareFill': return <LIB.GoSquareFill className={className} />;
            case 'GoSquirrel': return <LIB.GoSquirrel className={className} />;
            case 'GoStack': return <LIB.GoStack className={className} />;
            case 'GoStar': return <LIB.GoStar className={className} />;
            case 'GoStarFill': return <LIB.GoStarFill className={className} />;
            case 'GoStop': return <LIB.GoStop className={className} />;
            case 'GoStopwatch': return <LIB.GoStopwatch className={className} />;
            case 'GoStrikethrough': return <LIB.GoStrikethrough className={className} />;
            case 'GoSun': return <LIB.GoSun className={className} />;
            case 'GoSync': return <LIB.GoSync className={className} />;
            case 'GoTab': return <LIB.GoTab className={className} />;
            case 'GoTable': return <LIB.GoTable className={className} />;
            case 'GoTag': return <LIB.GoTag className={className} />;
            case 'GoTasklist': return <LIB.GoTasklist className={className} />;
            case 'GoTelescope': return <LIB.GoTelescope className={className} />;
            case 'GoTelescopeFill': return <LIB.GoTelescopeFill className={className} />;
            case 'GoTerminal': return <LIB.GoTerminal className={className} />;
            case 'GoThumbsdown': return <LIB.GoThumbsdown className={className} />;
            case 'GoThumbsup': return <LIB.GoThumbsup className={className} />;
            case 'GoTools': return <LIB.GoTools className={className} />;
            case 'GoTrash': return <LIB.GoTrash className={className} />;
            case 'GoTriangleDown': return <LIB.GoTriangleDown className={className} />;
            case 'GoTriangleLeft': return <LIB.GoTriangleLeft className={className} />;
            case 'GoTriangleRight': return <LIB.GoTriangleRight className={className} />;
            case 'GoTriangleUp': return <LIB.GoTriangleUp className={className} />;
            case 'GoTrophy': return <LIB.GoTrophy className={className} />;
            case 'GoTypography': return <LIB.GoTypography className={className} />;
            case 'GoUnfold': return <LIB.GoUnfold className={className} />;
            case 'GoUnlink': return <LIB.GoUnlink className={className} />;
            case 'GoUnlock': return <LIB.GoUnlock className={className} />;
            case 'GoUnmute': return <LIB.GoUnmute className={className} />;
            case 'GoUnread': return <LIB.GoUnread className={className} />;
            case 'GoUnverified': return <LIB.GoUnverified className={className} />;
            case 'GoUpload': return <LIB.GoUpload className={className} />;
            case 'GoVerified': return <LIB.GoVerified className={className} />;
            case 'GoVersions': return <LIB.GoVersions className={className} />;
            case 'GoVideo': return <LIB.GoVideo className={className} />;
            case 'GoWorkflow': return <LIB.GoWorkflow className={className} />;
            case 'GoX': return <LIB.GoX className={className} />;
            case 'GoXCircle': return <LIB.GoXCircle className={className} />;
            case 'GoXCircleFill': return <LIB.GoXCircleFill className={className} />;
            case 'GoZap': return <LIB.GoZap className={className} />;
            case 'GoZoomIn': return <LIB.GoZoomIn className={className} />;
            case 'GoZoomOut': return <LIB.GoZoomOut className={className} />;


            default:
                console.log('Go - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Go;