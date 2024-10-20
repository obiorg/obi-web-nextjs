/**
 * https://react-icons.github.io/react-icons/icons/di/
 */


import * as LIB from "react-icons/di";


// Define the props that the PostForm component expects
interface diProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Di(
    {
        icon = 'DiAndroid',
        className,
    }: diProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'DiAndroid': return <LIB.DiAndroid className={className} />;
            case 'DiAngularSimple': return <LIB.DiAngularSimple className={className} />;
            case 'DiAppcelerator': return <LIB.DiAppcelerator className={className} />;
            case 'DiApple': return <LIB.DiApple className={className} />;
            case 'DiAppstore': return <LIB.DiAppstore className={className} />;
            case 'DiAptana': return <LIB.DiAptana className={className} />;
            case 'DiAsterisk': return <LIB.DiAsterisk className={className} />;
            case 'DiAtlassian': return <LIB.DiAtlassian className={className} />;
            case 'DiAtom': return <LIB.DiAtom className={className} />;
            case 'DiAws': return <LIB.DiAws className={className} />;
            case 'DiBackbone': return <LIB.DiBackbone className={className} />;
            case 'DiBingSmall': return <LIB.DiBingSmall className={className} />;
            case 'DiBintray': return <LIB.DiBintray className={className} />;
            case 'DiBitbucket': return <LIB.DiBitbucket className={className} />;
            case 'DiBlackberry': return <LIB.DiBlackberry className={className} />;
            case 'DiBootstrap': return <LIB.DiBootstrap className={className} />;
            case 'DiBower': return <LIB.DiBower className={className} />;
            case 'DiBrackets': return <LIB.DiBrackets className={className} />;
            case 'DiBugsense': return <LIB.DiBugsense className={className} />;
            case 'DiCelluloid': return <LIB.DiCelluloid className={className} />;
            case 'DiChrome': return <LIB.DiChrome className={className} />;
            case 'DiCisco': return <LIB.DiCisco className={className} />;
            case 'DiClojureAlt': return <LIB.DiClojureAlt className={className} />;
            case 'DiClojure': return <LIB.DiClojure className={className} />;
            case 'DiCloud9': return <LIB.DiCloud9 className={className} />;
            case 'DiCoda': return <LIB.DiCoda className={className} />;
            case 'DiCodeBadge': return <LIB.DiCodeBadge className={className} />;
            case 'DiCode': return <LIB.DiCode className={className} />;
            case 'DiCodeigniter': return <LIB.DiCodeigniter className={className} />;
            case 'DiCodepen': return <LIB.DiCodepen className={className} />;
            case 'DiCodrops': return <LIB.DiCodrops className={className} />;
            case 'DiCoffeescript': return <LIB.DiCoffeescript className={className} />;
            case 'DiCompass': return <LIB.DiCompass className={className} />;
            case 'DiComposer': return <LIB.DiComposer className={className} />;
            case 'DiCreativecommonsBadge': return <LIB.DiCreativecommonsBadge className={className} />;
            case 'DiCreativecommons': return <LIB.DiCreativecommons className={className} />;
            case 'DiCssTricks': return <LIB.DiCssTricks className={className} />;
            case 'DiCss3Full': return <LIB.DiCss3Full className={className} />;
            case 'DiCss3': return <LIB.DiCss3 className={className} />;
            case 'DiCssdeck': return <LIB.DiCssdeck className={className} />;
            case 'DiDart': return <LIB.DiDart className={className} />;
            case 'DiDatabase': return <LIB.DiDatabase className={className} />;
            case 'DiDebian': return <LIB.DiDebian className={className} />;
            case 'DiDigitalOcean': return <LIB.DiDigitalOcean className={className} />;
            case 'DiDjango': return <LIB.DiDjango className={className} />;
            case 'DiDlang': return <LIB.DiDlang className={className} />;
            case 'DiDocker': return <LIB.DiDocker className={className} />;
            case 'DiDoctrine': return <LIB.DiDoctrine className={className} />;
            case 'DiDojo': return <LIB.DiDojo className={className} />;
            case 'DiDotnet': return <LIB.DiDotnet className={className} />;
            case 'DiDreamweaver': return <LIB.DiDreamweaver className={className} />;
            case 'DiDropbox': return <LIB.DiDropbox className={className} />;
            case 'DiDrupal': return <LIB.DiDrupal className={className} />;
            case 'DiEclipse': return <LIB.DiEclipse className={className} />;
            case 'DiEmber': return <LIB.DiEmber className={className} />;
            case 'DiEnvato': return <LIB.DiEnvato className={className} />;
            case 'DiErlang': return <LIB.DiErlang className={className} />;
            case 'DiExtjs': return <LIB.DiExtjs className={className} />;
            case 'DiFirebase': return <LIB.DiFirebase className={className} />;
            case 'DiFirefox': return <LIB.DiFirefox className={className} />;
            case 'DiFsharp': return <LIB.DiFsharp className={className} />;
            case 'DiGhostSmall': return <LIB.DiGhostSmall className={className} />;
            case 'DiGhost': return <LIB.DiGhost className={className} />;
            case 'DiGitBranch': return <LIB.DiGitBranch className={className} />;
            case 'DiGitCommit': return <LIB.DiGitCommit className={className} />;
            case 'DiGitCompare': return <LIB.DiGitCompare className={className} />;
            case 'DiGitMerge': return <LIB.DiGitMerge className={className} />;
            case 'DiGitPullRequest': return <LIB.DiGitPullRequest className={className} />;
            case 'DiGit': return <LIB.DiGit className={className} />;
            case 'DiGithubAlt': return <LIB.DiGithubAlt className={className} />;
            case 'DiGithubBadge': return <LIB.DiGithubBadge className={className} />;
            case 'DiGithubFull': return <LIB.DiGithubFull className={className} />;
            case 'DiGithub': return <LIB.DiGithub className={className} />;
            case 'DiGnu': return <LIB.DiGnu className={className} />;
            case 'DiGo': return <LIB.DiGo className={className} />;
            case 'DiGoogleAnalytics': return <LIB.DiGoogleAnalytics className={className} />;
            case 'DiGoogleDrive': return <LIB.DiGoogleDrive className={className} />;
            case 'DiGoogleCloudPlatform': return <LIB.DiGoogleCloudPlatform className={className} />;
            case 'DiGrails': return <LIB.DiGrails className={className} />;
            case 'DiGroovy': return <LIB.DiGroovy className={className} />;
            case 'DiGrunt': return <LIB.DiGrunt className={className} />;
            case 'DiGulp': return <LIB.DiGulp className={className} />;
            case 'DiHackernews': return <LIB.DiHackernews className={className} />;
            case 'DiHaskell': return <LIB.DiHaskell className={className} />;
            case 'DiHeroku': return <LIB.DiHeroku className={className} />;
            case 'DiHtml53dEffects': return <LIB.DiHtml53dEffects className={className} />;
            case 'DiHtml5Connectivity': return <LIB.DiHtml5Connectivity className={className} />;
            case 'DiHtml5DeviceAccess': return <LIB.DiHtml5DeviceAccess className={className} />;
            case 'DiHtml5Multimedia': return <LIB.DiHtml5Multimedia className={className} />;
            case 'DiHtml5': return <LIB.DiHtml5 className={className} />;
            case 'DiIe': return <LIB.DiIe className={className} />;
            case 'DiIllustrator': return <LIB.DiIllustrator className={className} />;
            case 'DiIntellij': return <LIB.DiIntellij className={className} />;
            case 'DiIonic': return <LIB.DiIonic className={className} />;
            case 'DiJava': return <LIB.DiJava className={className} />;
            case 'DiJavascript1': return <LIB.DiJavascript1 className={className} />;
            case 'DiJavascript': return <LIB.DiJavascript className={className} />;
            case 'DiJekyllSmall': return <LIB.DiJekyllSmall className={className} />;
            case 'DiJenkins': return <LIB.DiJenkins className={className} />;
            case 'DiJira': return <LIB.DiJira className={className} />;
            case 'DiJoomla': return <LIB.DiJoomla className={className} />;
            case 'DiJqueryLogo': return <LIB.DiJqueryLogo className={className} />;
            case 'DiJqueryUiLogo': return <LIB.DiJqueryUiLogo className={className} />;
            case 'DiJsBadge': return <LIB.DiJsBadge className={className} />;
            case 'DiKomodo': return <LIB.DiKomodo className={className} />;
            case 'DiKrakenjsBadge': return <LIB.DiKrakenjsBadge className={className} />;
            case 'DiKrakenjs': return <LIB.DiKrakenjs className={className} />;
            case 'DiLaravel': return <LIB.DiLaravel className={className} />;
            case 'DiLess': return <LIB.DiLess className={className} />;
            case 'DiLinux': return <LIB.DiLinux className={className} />;
            case 'DiMagento': return <LIB.DiMagento className={className} />;
            case 'DiMailchimp': return <LIB.DiMailchimp className={className} />;
            case 'DiMarkdown': return <LIB.DiMarkdown className={className} />;
            case 'DiMaterializecss': return <LIB.DiMaterializecss className={className} />;
            case 'DiMeteor': return <LIB.DiMeteor className={className} />;
            case 'DiMeteorfull': return <LIB.DiMeteorfull className={className} />;
            case 'DiMitlicence': return <LIB.DiMitlicence className={className} />;
            case 'DiModernizr': return <LIB.DiModernizr className={className} />;
            case 'DiMongodb': return <LIB.DiMongodb className={className} />;
            case 'DiMootoolsBadge': return <LIB.DiMootoolsBadge className={className} />;
            case 'DiMootools': return <LIB.DiMootools className={className} />;
            case 'DiMozilla': return <LIB.DiMozilla className={className} />;
            case 'DiMsqlServer': return <LIB.DiMsqlServer className={className} />;
            case 'DiMysql': return <LIB.DiMysql className={className} />;
            case 'DiNancy': return <LIB.DiNancy className={className} />;
            case 'DiNetbeans': return <LIB.DiNetbeans className={className} />;
            case 'DiNetmagazine': return <LIB.DiNetmagazine className={className} />;
            case 'DiNginx': return <LIB.DiNginx className={className} />;
            case 'DiNodejsSmall': return <LIB.DiNodejsSmall className={className} />;
            case 'DiNodejs': return <LIB.DiNodejs className={className} />;
            case 'DiNpm': return <LIB.DiNpm className={className} />;
            case 'DiOnedrive': return <LIB.DiOnedrive className={className} />;
            case 'DiOpenshift': return <LIB.DiOpenshift className={className} />;
            case 'DiOpensource': return <LIB.DiOpensource className={className} />;
            case 'DiOpera': return <LIB.DiOpera className={className} />;
            case 'DiPerl': return <LIB.DiPerl className={className} />;
            case 'DiPhonegap': return <LIB.DiPhonegap className={className} />;
            case 'DiPhotoshop': return <LIB.DiPhotoshop className={className} />;
            case 'DiPhp': return <LIB.DiPhp className={className} />;
            case 'DiPostgresql': return <LIB.DiPostgresql className={className} />;
            case 'DiProlog': return <LIB.DiProlog className={className} />;
            case 'DiPython': return <LIB.DiPython className={className} />;
            case 'DiRackspace': return <LIB.DiRackspace className={className} />;
            case 'DiRaphael': return <LIB.DiRaphael className={className} />;
            case 'DiRasberryPi': return <LIB.DiRasberryPi className={className} />;
            case 'DiReact': return <LIB.DiReact className={className} />;
            case 'DiRedhat': return <LIB.DiRedhat className={className} />;
            case 'DiRedis': return <LIB.DiRedis className={className} />;
            case 'DiRequirejs': return <LIB.DiRequirejs className={className} />;
            case 'DiResponsive': return <LIB.DiResponsive className={className} />;
            case 'DiRor': return <LIB.DiRor className={className} />;
            case 'DiRubyRough': return <LIB.DiRubyRough className={className} />;
            case 'DiRuby': return <LIB.DiRuby className={className} />;
            case 'DiRust': return <LIB.DiRust className={className} />;
            case 'DiSafari': return <LIB.DiSafari className={className} />;
            case 'DiSass': return <LIB.DiSass className={className} />;
            case 'DiScala': return <LIB.DiScala className={className} />;
            case 'DiScriptcs': return <LIB.DiScriptcs className={className} />;
            case 'DiScrum': return <LIB.DiScrum className={className} />;
            case 'DiSenchatouch': return <LIB.DiSenchatouch className={className} />;
            case 'DiSizzlejs': return <LIB.DiSizzlejs className={className} />;
            case 'DiSmashingMagazine': return <LIB.DiSmashingMagazine className={className} />;
            case 'DiSnapSvg': return <LIB.DiSnapSvg className={className} />;
            case 'DiSpark': return <LIB.DiSpark className={className} />;
            case 'DiSqllite': return <LIB.DiSqllite className={className} />;
            case 'DiStackoverflow': return <LIB.DiStackoverflow className={className} />;
            case 'DiStreamline': return <LIB.DiStreamline className={className} />;
            case 'DiStylus': return <LIB.DiStylus className={className} />;
            case 'DiSublime': return <LIB.DiSublime className={className} />;
            case 'DiSwift': return <LIB.DiSwift className={className} />;
            case 'DiSymfonyBadge': return <LIB.DiSymfonyBadge className={className} />;
            case 'DiSymfony': return <LIB.DiSymfony className={className} />;
            case 'DiTechcrunch': return <LIB.DiTechcrunch className={className} />;
            case 'DiTerminalBadge': return <LIB.DiTerminalBadge className={className} />;
            case 'DiTerminal': return <LIB.DiTerminal className={className} />;
            case 'DiTravis': return <LIB.DiTravis className={className} />;
            case 'DiTrello': return <LIB.DiTrello className={className} />;
            case 'DiTypo3': return <LIB.DiTypo3 className={className} />;
            case 'DiUbuntu': return <LIB.DiUbuntu className={className} />;
            case 'DiUikit': return <LIB.DiUikit className={className} />;
            case 'DiUnitySmall': return <LIB.DiUnitySmall className={className} />;
            case 'DiVim': return <LIB.DiVim className={className} />;
            case 'DiVisualstudio': return <LIB.DiVisualstudio className={className} />;
            case 'DiW3C': return <LIB.DiW3C className={className} />;
            case 'DiWebplatform': return <LIB.DiWebplatform className={className} />;
            case 'DiWindows': return <LIB.DiWindows className={className} />;
            case 'DiWordpress': return <LIB.DiWordpress className={className} />;
            case 'DiYahooSmall': return <LIB.DiYahooSmall className={className} />;
            case 'DiYahoo': return <LIB.DiYahoo className={className} />;
            case 'DiYeoman': return <LIB.DiYeoman className={className} />;
            case 'DiYii': return <LIB.DiYii className={className} />;
            case 'DiZend': return <LIB.DiZend className={className} />;


            default:
                console.log('Di - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Di;