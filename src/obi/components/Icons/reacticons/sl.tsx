/**
 * https://react-icons.github.io/react-icons/icons/sl/
 */


import * as LIB from "react-icons/sl";


// Define the props that the PostForm component expects
interface slProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Sl(
    {
        icon = 'SlActionRedo',
        className,
    }: slProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'SlActionRedo': return <LIB.SlActionRedo className={className} />;
            case 'SlActionUndo': return <LIB.SlActionUndo className={className} />;
            case 'SlAnchor': return <LIB.SlAnchor className={className} />;
            case 'SlArrowDownCircle': return <LIB.SlArrowDownCircle className={className} />;
            case 'SlArrowDown': return <LIB.SlArrowDown className={className} />;
            case 'SlArrowLeftCircle': return <LIB.SlArrowLeftCircle className={className} />;
            case 'SlArrowLeft': return <LIB.SlArrowLeft className={className} />;
            case 'SlArrowRightCircle': return <LIB.SlArrowRightCircle className={className} />;
            case 'SlArrowRight': return <LIB.SlArrowRight className={className} />;
            case 'SlArrowUpCircle': return <LIB.SlArrowUpCircle className={className} />;
            case 'SlArrowUp': return <LIB.SlArrowUp className={className} />;
            case 'SlBadge': return <LIB.SlBadge className={className} />;
            case 'SlBag': return <LIB.SlBag className={className} />;
            case 'SlBan': return <LIB.SlBan className={className} />;
            case 'SlBasketLoaded': return <LIB.SlBasketLoaded className={className} />;
            case 'SlBasket': return <LIB.SlBasket className={className} />;
            case 'SlBell': return <LIB.SlBell className={className} />;
            case 'SlBookOpen': return <LIB.SlBookOpen className={className} />;
            case 'SlBriefcase': return <LIB.SlBriefcase className={className} />;
            case 'SlBubble': return <LIB.SlBubble className={className} />;
            case 'SlBubbles': return <LIB.SlBubbles className={className} />;
            case 'SlBulb': return <LIB.SlBulb className={className} />;
            case 'SlCalculator': return <LIB.SlCalculator className={className} />;
            case 'SlCalender': return <LIB.SlCalender className={className} />;
            case 'SlCallEnd': return <LIB.SlCallEnd className={className} />;
            case 'SlCallIn': return <LIB.SlCallIn className={className} />;
            case 'SlCallOut': return <LIB.SlCallOut className={className} />;
            case 'SlCamera': return <LIB.SlCamera className={className} />;
            case 'SlCamrecorder': return <LIB.SlCamrecorder className={className} />;
            case 'SlChart': return <LIB.SlChart className={className} />;
            case 'SlCheck': return <LIB.SlCheck className={className} />;
            case 'SlChemistry': return <LIB.SlChemistry className={className} />;
            case 'SlClock': return <LIB.SlClock className={className} />;
            case 'SlClose': return <LIB.SlClose className={className} />;
            case 'SlCloudDownload': return <LIB.SlCloudDownload className={className} />;
            case 'SlCloudUpload': return <LIB.SlCloudUpload className={className} />;
            case 'SlCompass': return <LIB.SlCompass className={className} />;
            case 'SlControlEnd': return <LIB.SlControlEnd className={className} />;
            case 'SlControlForward': return <LIB.SlControlForward className={className} />;
            case 'SlControlPause': return <LIB.SlControlPause className={className} />;
            case 'SlControlPlay': return <LIB.SlControlPlay className={className} />;
            case 'SlControlRewind': return <LIB.SlControlRewind className={className} />;
            case 'SlControlStart': return <LIB.SlControlStart className={className} />;
            case 'SlCreditCard': return <LIB.SlCreditCard className={className} />;
            case 'SlCrop': return <LIB.SlCrop className={className} />;
            case 'SlCup': return <LIB.SlCup className={className} />;
            case 'SlCursorMove': return <LIB.SlCursorMove className={className} />;
            case 'SlCursor': return <LIB.SlCursor className={className} />;
            case 'SlDiamond': return <LIB.SlDiamond className={className} />;
            case 'SlDirection': return <LIB.SlDirection className={className} />;
            case 'SlDirections': return <LIB.SlDirections className={className} />;
            case 'SlDisc': return <LIB.SlDisc className={className} />;
            case 'SlDislike': return <LIB.SlDislike className={className} />;
            case 'SlDoc': return <LIB.SlDoc className={className} />;
            case 'SlDocs': return <LIB.SlDocs className={className} />;
            case 'SlDrawer': return <LIB.SlDrawer className={className} />;
            case 'SlDrop': return <LIB.SlDrop className={className} />;
            case 'SlEarphonesAlt': return <LIB.SlEarphonesAlt className={className} />;
            case 'SlEarphones': return <LIB.SlEarphones className={className} />;
            case 'SlEmotsmile': return <LIB.SlEmotsmile className={className} />;
            case 'SlEnergy': return <LIB.SlEnergy className={className} />;
            case 'SlEnvelopeOpen': return <LIB.SlEnvelopeOpen className={className} />;
            case 'SlEnvolopeLetter': return <LIB.SlEnvolopeLetter className={className} />;
            case 'SlEnvolope': return <LIB.SlEnvolope className={className} />;
            case 'SlEqualizer': return <LIB.SlEqualizer className={className} />;
            case 'SlEvent': return <LIB.SlEvent className={className} />;
            case 'SlExclamation': return <LIB.SlExclamation className={className} />;
            case 'SlEye': return <LIB.SlEye className={className} />;
            case 'SlEyeglass': return <LIB.SlEyeglass className={className} />;
            case 'SlFeed': return <LIB.SlFeed className={className} />;
            case 'SlFilm': return <LIB.SlFilm className={className} />;
            case 'SlFire': return <LIB.SlFire className={className} />;
            case 'SlFlag': return <LIB.SlFlag className={className} />;
            case 'SlFolderAlt': return <LIB.SlFolderAlt className={className} />;
            case 'SlFolder': return <LIB.SlFolder className={className} />;
            case 'SlFrame': return <LIB.SlFrame className={className} />;
            case 'SlGameController': return <LIB.SlGameController className={className} />;
            case 'SlGhost': return <LIB.SlGhost className={className} />;
            case 'SlGlobeAlt': return <LIB.SlGlobeAlt className={className} />;
            case 'SlGlobe': return <LIB.SlGlobe className={className} />;
            case 'SlGraduation': return <LIB.SlGraduation className={className} />;
            case 'SlGraph': return <LIB.SlGraph className={className} />;
            case 'SlGrid': return <LIB.SlGrid className={className} />;
            case 'SlHandbag': return <LIB.SlHandbag className={className} />;
            case 'SlHeart': return <LIB.SlHeart className={className} />;
            case 'SlHome': return <LIB.SlHome className={className} />;
            case 'SlHourglass': return <LIB.SlHourglass className={className} />;
            case 'SlInfo': return <LIB.SlInfo className={className} />;
            case 'SlKey': return <LIB.SlKey className={className} />;
            case 'SlLayers': return <LIB.SlLayers className={className} />;
            case 'SlLike': return <LIB.SlLike className={className} />;
            case 'SlLink': return <LIB.SlLink className={className} />;
            case 'SlList': return <LIB.SlList className={className} />;
            case 'SlLocationPin': return <LIB.SlLocationPin className={className} />;
            case 'SlLockOpen': return <LIB.SlLockOpen className={className} />;
            case 'SlLock': return <LIB.SlLock className={className} />;
            case 'SlLogin': return <LIB.SlLogin className={className} />;
            case 'SlLogout': return <LIB.SlLogout className={className} />;
            case 'SlLoop': return <LIB.SlLoop className={className} />;
            case 'SlMagicWand': return <LIB.SlMagicWand className={className} />;
            case 'SlMagnet': return <LIB.SlMagnet className={className} />;
            case 'SlMagnifierAdd': return <LIB.SlMagnifierAdd className={className} />;
            case 'SlMagnifierRemove': return <LIB.SlMagnifierRemove className={className} />;
            case 'SlMagnifier': return <LIB.SlMagnifier className={className} />;
            case 'SlMap': return <LIB.SlMap className={className} />;
            case 'SlMenu': return <LIB.SlMenu className={className} />;
            case 'SlMicrophone': return <LIB.SlMicrophone className={className} />;
            case 'SlMinus': return <LIB.SlMinus className={className} />;
            case 'SlMouse': return <LIB.SlMouse className={className} />;
            case 'SlMusicToneAlt': return <LIB.SlMusicToneAlt className={className} />;
            case 'SlMusicTone': return <LIB.SlMusicTone className={className} />;
            case 'SlMustache': return <LIB.SlMustache className={className} />;
            case 'SlNote': return <LIB.SlNote className={className} />;
            case 'SlNotebook': return <LIB.SlNotebook className={className} />;
            case 'SlOptionsVertical': return <LIB.SlOptionsVertical className={className} />;
            case 'SlOptions': return <LIB.SlOptions className={className} />;
            case 'SlOrganization': return <LIB.SlOrganization className={className} />;
            case 'SlPaperClip': return <LIB.SlPaperClip className={className} />;
            case 'SlPaperPlane': return <LIB.SlPaperPlane className={className} />;
            case 'SlPaypal': return <LIB.SlPaypal className={className} />;
            case 'SlPencil': return <LIB.SlPencil className={className} />;
            case 'SlPeople': return <LIB.SlPeople className={className} />;
            case 'SlPhone': return <LIB.SlPhone className={className} />;
            case 'SlPicture': return <LIB.SlPicture className={className} />;
            case 'SlPieChart': return <LIB.SlPieChart className={className} />;
            case 'SlPin': return <LIB.SlPin className={className} />;
            case 'SlPlane': return <LIB.SlPlane className={className} />;
            case 'SlPlaylist': return <LIB.SlPlaylist className={className} />;
            case 'SlPlus': return <LIB.SlPlus className={className} />;
            case 'SlPower': return <LIB.SlPower className={className} />;
            case 'SlPresent': return <LIB.SlPresent className={className} />;
            case 'SlPrinter': return <LIB.SlPrinter className={className} />;
            case 'SlPuzzle': return <LIB.SlPuzzle className={className} />;
            case 'SlQuestion': return <LIB.SlQuestion className={className} />;
            case 'SlRefresh': return <LIB.SlRefresh className={className} />;
            case 'SlReload': return <LIB.SlReload className={className} />;
            case 'SlRocket': return <LIB.SlRocket className={className} />;
            case 'SlScreenDesktop': return <LIB.SlScreenDesktop className={className} />;
            case 'SlScreenSmartphone': return <LIB.SlScreenSmartphone className={className} />;
            case 'SlScreenTablet': return <LIB.SlScreenTablet className={className} />;
            case 'SlSettings': return <LIB.SlSettings className={className} />;
            case 'SlShareAlt': return <LIB.SlShareAlt className={className} />;
            case 'SlShare': return <LIB.SlShare className={className} />;
            case 'SlShield': return <LIB.SlShield className={className} />;
            case 'SlShuffle': return <LIB.SlShuffle className={className} />;
            case 'SlSizeActual': return <LIB.SlSizeActual className={className} />;
            case 'SlSizeFullscreen': return <LIB.SlSizeFullscreen className={className} />;
            case 'SlSocialBehance': return <LIB.SlSocialBehance className={className} />;
            case 'SlSocialDribbble': return <LIB.SlSocialDribbble className={className} />;
            case 'SlSocialDropbox': return <LIB.SlSocialDropbox className={className} />;
            case 'SlSocialFacebook': return <LIB.SlSocialFacebook className={className} />;
            case 'SlSocialFoursqare': return <LIB.SlSocialFoursqare className={className} />;
            case 'SlSocialGithub': return <LIB.SlSocialGithub className={className} />;
            case 'SlSocialGoogle': return <LIB.SlSocialGoogle className={className} />;
            case 'SlSocialInstagram': return <LIB.SlSocialInstagram className={className} />;
            case 'SlSocialLinkedin': return <LIB.SlSocialLinkedin className={className} />;
            case 'SlSocialPintarest': return <LIB.SlSocialPintarest className={className} />;
            case 'SlSocialReddit': return <LIB.SlSocialReddit className={className} />;
            case 'SlSocialSkype': return <LIB.SlSocialSkype className={className} />;
            case 'SlSocialSoundcloud': return <LIB.SlSocialSoundcloud className={className} />;
            case 'SlSocialSpotify': return <LIB.SlSocialSpotify className={className} />;
            case 'SlSocialSteam': return <LIB.SlSocialSteam className={className} />;
            case 'SlSocialStumbleupon': return <LIB.SlSocialStumbleupon className={className} />;
            case 'SlSocialTumblr': return <LIB.SlSocialTumblr className={className} />;
            case 'SlSocialTwitter': return <LIB.SlSocialTwitter className={className} />;
            case 'SlSocialVkontakte': return <LIB.SlSocialVkontakte className={className} />;
            case 'SlSocialYoutube': return <LIB.SlSocialYoutube className={className} />;
            case 'SlSpeech': return <LIB.SlSpeech className={className} />;
            case 'SlSpeedometer': return <LIB.SlSpeedometer className={className} />;
            case 'SlStar': return <LIB.SlStar className={className} />;
            case 'SlSupport': return <LIB.SlSupport className={className} />;
            case 'SlSymbleFemale': return <LIB.SlSymbleFemale className={className} />;
            case 'SlSymbolMale': return <LIB.SlSymbolMale className={className} />;
            case 'SlTag': return <LIB.SlTag className={className} />;
            case 'SlTarget': return <LIB.SlTarget className={className} />;
            case 'SlTrash': return <LIB.SlTrash className={className} />;
            case 'SlTrophy': return <LIB.SlTrophy className={className} />;
            case 'SlUmbrella': return <LIB.SlUmbrella className={className} />;
            case 'SlUserFemale': return <LIB.SlUserFemale className={className} />;
            case 'SlUserFollow': return <LIB.SlUserFollow className={className} />;
            case 'SlUserFollowing': return <LIB.SlUserFollowing className={className} />;
            case 'SlUserUnfollow': return <LIB.SlUserUnfollow className={className} />;
            case 'SlUser': return <LIB.SlUser className={className} />;
            case 'SlVector': return <LIB.SlVector className={className} />;
            case 'SlVolume1': return <LIB.SlVolume1 className={className} />;
            case 'SlVolume2': return <LIB.SlVolume2 className={className} />;
            case 'SlVolumeOff': return <LIB.SlVolumeOff className={className} />;
            case 'SlWallet': return <LIB.SlWallet className={className} />;
            case 'SlWrench': return <LIB.SlWrench className={className} />;

            default:
                console.log('Sl - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Sl;