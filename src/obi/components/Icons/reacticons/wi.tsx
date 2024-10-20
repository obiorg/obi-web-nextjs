/**
 * https://react-icons.github.io/react-icons/icons/wi/
 */


import * as LIB from "react-icons/wi";


// Define the props that the PostForm component expects
interface wiProps {
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


function Wi(
    {
        icon = 'WiAlien',
        className,
    }: wiProps
) {


    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'WiAlien': return <LIB.WiAlien className={className} />;
            case 'WiBarometer': return <LIB.WiBarometer className={className} />;
            case 'WiCelsius': return <LIB.WiCelsius className={className} />;
            case 'WiCloudDown': return <LIB.WiCloudDown className={className} />;
            case 'WiCloudRefresh': return <LIB.WiCloudRefresh className={className} />;
            case 'WiCloudUp': return <LIB.WiCloudUp className={className} />;
            case 'WiCloud': return <LIB.WiCloud className={className} />;
            case 'WiCloudyGusts': return <LIB.WiCloudyGusts className={className} />;
            case 'WiCloudyWindy': return <LIB.WiCloudyWindy className={className} />;
            case 'WiCloudy': return <LIB.WiCloudy className={className} />;
            case 'WiDayCloudyGusts': return <LIB.WiDayCloudyGusts className={className} />;
            case 'WiDayCloudyHigh': return <LIB.WiDayCloudyHigh className={className} />;
            case 'WiDayCloudyWindy': return <LIB.WiDayCloudyWindy className={className} />;
            case 'WiDayCloudy': return <LIB.WiDayCloudy className={className} />;
            case 'WiDayFog': return <LIB.WiDayFog className={className} />;
            case 'WiDayHail': return <LIB.WiDayHail className={className} />;
            case 'WiDayHaze': return <LIB.WiDayHaze className={className} />;
            case 'WiDayLightWind': return <LIB.WiDayLightWind className={className} />;
            case 'WiDayLightning': return <LIB.WiDayLightning className={className} />;
            case 'WiDayRainMix': return <LIB.WiDayRainMix className={className} />;
            case 'WiDayRainWind': return <LIB.WiDayRainWind className={className} />;
            case 'WiDayRain': return <LIB.WiDayRain className={className} />;
            case 'WiDayShowers': return <LIB.WiDayShowers className={className} />;
            case 'WiDaySleetStorm': return <LIB.WiDaySleetStorm className={className} />;
            case 'WiDaySleet': return <LIB.WiDaySleet className={className} />;
            case 'WiDaySnowThunderstorm': return <LIB.WiDaySnowThunderstorm className={className} />;
            case 'WiDaySnowWind': return <LIB.WiDaySnowWind className={className} />;
            case 'WiDaySnow': return <LIB.WiDaySnow className={className} />;
            case 'WiDaySprinkle': return <LIB.WiDaySprinkle className={className} />;
            case 'WiDayStormShowers': return <LIB.WiDayStormShowers className={className} />;
            case 'WiDaySunnyOvercast': return <LIB.WiDaySunnyOvercast className={className} />;
            case 'WiDaySunny': return <LIB.WiDaySunny className={className} />;
            case 'WiDayThunderstorm': return <LIB.WiDayThunderstorm className={className} />;
            case 'WiDayWindy': return <LIB.WiDayWindy className={className} />;
            case 'WiDegrees': return <LIB.WiDegrees className={className} />;
            case 'WiDirectionDownLeft': return <LIB.WiDirectionDownLeft className={className} />;
            case 'WiDirectionDownRight': return <LIB.WiDirectionDownRight className={className} />;
            case 'WiDirectionDown': return <LIB.WiDirectionDown className={className} />;
            case 'WiDirectionLeft': return <LIB.WiDirectionLeft className={className} />;
            case 'WiDirectionRight': return <LIB.WiDirectionRight className={className} />;
            case 'WiDirectionUpLeft': return <LIB.WiDirectionUpLeft className={className} />;
            case 'WiDirectionUpRight': return <LIB.WiDirectionUpRight className={className} />;
            case 'WiDirectionUp': return <LIB.WiDirectionUp className={className} />;
            case 'WiDust': return <LIB.WiDust className={className} />;
            case 'WiEarthquake': return <LIB.WiEarthquake className={className} />;
            case 'WiFahrenheit': return <LIB.WiFahrenheit className={className} />;
            case 'WiFire': return <LIB.WiFire className={className} />;
            case 'WiFlood': return <LIB.WiFlood className={className} />;
            case 'WiFog': return <LIB.WiFog className={className} />;
            case 'WiGaleWarning': return <LIB.WiGaleWarning className={className} />;
            case 'WiHail': return <LIB.WiHail className={className} />;
            case 'WiHorizonAlt': return <LIB.WiHorizonAlt className={className} />;
            case 'WiHorizon': return <LIB.WiHorizon className={className} />;
            case 'WiHot': return <LIB.WiHot className={className} />;
            case 'WiHumidity': return <LIB.WiHumidity className={className} />;
            case 'WiHurricaneWarning': return <LIB.WiHurricaneWarning className={className} />;
            case 'WiHurricane': return <LIB.WiHurricane className={className} />;
            case 'WiLightning': return <LIB.WiLightning className={className} />;
            case 'WiLunarEclipse': return <LIB.WiLunarEclipse className={className} />;
            case 'WiMeteor': return <LIB.WiMeteor className={className} />;
            case 'WiMoonAltFirstQuarter': return <LIB.WiMoonAltFirstQuarter className={className} />;
            case 'WiMoonAltFull': return <LIB.WiMoonAltFull className={className} />;
            case 'WiMoonAltNew': return <LIB.WiMoonAltNew className={className} />;
            case 'WiMoonAltThirdQuarter': return <LIB.WiMoonAltThirdQuarter className={className} />;
            case 'WiMoonAltWaningCrescent1': return <LIB.WiMoonAltWaningCrescent1 className={className} />;
            case 'WiMoonAltWaningCrescent2': return <LIB.WiMoonAltWaningCrescent2 className={className} />;
            case 'WiMoonAltWaningCrescent3': return <LIB.WiMoonAltWaningCrescent3 className={className} />;
            case 'WiMoonAltWaningCrescent4': return <LIB.WiMoonAltWaningCrescent4 className={className} />;
            case 'WiMoonAltWaningCrescent5': return <LIB.WiMoonAltWaningCrescent5 className={className} />;
            case 'WiMoonAltWaningCrescent6': return <LIB.WiMoonAltWaningCrescent6 className={className} />;
            case 'WiMoonAltWaningGibbous1': return <LIB.WiMoonAltWaningGibbous1 className={className} />;
            case 'WiMoonAltWaningGibbous2': return <LIB.WiMoonAltWaningGibbous2 className={className} />;
            case 'WiMoonAltWaningGibbous3': return <LIB.WiMoonAltWaningGibbous3 className={className} />;
            case 'WiMoonAltWaningGibbous4': return <LIB.WiMoonAltWaningGibbous4 className={className} />;
            case 'WiMoonAltWaningGibbous5': return <LIB.WiMoonAltWaningGibbous5 className={className} />;
            case 'WiMoonAltWaningGibbous6': return <LIB.WiMoonAltWaningGibbous6 className={className} />;
            case 'WiMoonAltWaxingCrescent1': return <LIB.WiMoonAltWaxingCrescent1 className={className} />;
            case 'WiMoonAltWaxingCrescent2': return <LIB.WiMoonAltWaxingCrescent2 className={className} />;
            case 'WiMoonAltWaxingCrescent3': return <LIB.WiMoonAltWaxingCrescent3 className={className} />;
            case 'WiMoonAltWaxingCrescent4': return <LIB.WiMoonAltWaxingCrescent4 className={className} />;
            case 'WiMoonAltWaxingCrescent5': return <LIB.WiMoonAltWaxingCrescent5 className={className} />;
            case 'WiMoonAltWaxingCrescent6': return <LIB.WiMoonAltWaxingCrescent6 className={className} />;
            case 'WiMoonAltWaxingGibbous1': return <LIB.WiMoonAltWaxingGibbous1 className={className} />;
            case 'WiMoonAltWaxingGibbous2': return <LIB.WiMoonAltWaxingGibbous2 className={className} />;
            case 'WiMoonAltWaxingGibbous3': return <LIB.WiMoonAltWaxingGibbous3 className={className} />;
            case 'WiMoonAltWaxingGibbous4': return <LIB.WiMoonAltWaxingGibbous4 className={className} />;
            case 'WiMoonAltWaxingGibbous5': return <LIB.WiMoonAltWaxingGibbous5 className={className} />;
            case 'WiMoonAltWaxingGibbous6': return <LIB.WiMoonAltWaxingGibbous6 className={className} />;
            case 'WiMoonFirstQuarter': return <LIB.WiMoonFirstQuarter className={className} />;
            case 'WiMoonFull': return <LIB.WiMoonFull className={className} />;
            case 'WiMoonNew': return <LIB.WiMoonNew className={className} />;
            case 'WiMoonThirdQuarter': return <LIB.WiMoonThirdQuarter className={className} />;
            case 'WiMoonWaningCrescent1': return <LIB.WiMoonWaningCrescent1 className={className} />;
            case 'WiMoonWaningCrescent2': return <LIB.WiMoonWaningCrescent2 className={className} />;
            case 'WiMoonWaningCrescent3': return <LIB.WiMoonWaningCrescent3 className={className} />;
            case 'WiMoonWaningCrescent4': return <LIB.WiMoonWaningCrescent4 className={className} />;
            case 'WiMoonWaningCrescent5': return <LIB.WiMoonWaningCrescent5 className={className} />;
            case 'WiMoonWaningCrescent6': return <LIB.WiMoonWaningCrescent6 className={className} />;
            case 'WiMoonWaningGibbous1': return <LIB.WiMoonWaningGibbous1 className={className} />;
            case 'WiMoonWaningGibbous2': return <LIB.WiMoonWaningGibbous2 className={className} />;
            case 'WiMoonWaningGibbous3': return <LIB.WiMoonWaningGibbous3 className={className} />;
            case 'WiMoonWaningGibbous4': return <LIB.WiMoonWaningGibbous4 className={className} />;
            case 'WiMoonWaningGibbous5': return <LIB.WiMoonWaningGibbous5 className={className} />;
            case 'WiMoonWaningGibbous6': return <LIB.WiMoonWaningGibbous6 className={className} />;
            case 'WiMoonWaxing6': return <LIB.WiMoonWaxing6 className={className} />;
            case 'WiMoonWaxingCrescent1': return <LIB.WiMoonWaxingCrescent1 className={className} />;
            case 'WiMoonWaxingCrescent2': return <LIB.WiMoonWaxingCrescent2 className={className} />;
            case 'WiMoonWaxingCrescent3': return <LIB.WiMoonWaxingCrescent3 className={className} />;
            case 'WiMoonWaxingCrescent4': return <LIB.WiMoonWaxingCrescent4 className={className} />;
            case 'WiMoonWaxingCrescent5': return <LIB.WiMoonWaxingCrescent5 className={className} />;
            case 'WiMoonWaxingGibbous1': return <LIB.WiMoonWaxingGibbous1 className={className} />;
            case 'WiMoonWaxingGibbous2': return <LIB.WiMoonWaxingGibbous2 className={className} />;
            case 'WiMoonWaxingGibbous3': return <LIB.WiMoonWaxingGibbous3 className={className} />;
            case 'WiMoonWaxingGibbous4': return <LIB.WiMoonWaxingGibbous4 className={className} />;
            case 'WiMoonWaxingGibbous5': return <LIB.WiMoonWaxingGibbous5 className={className} />;
            case 'WiMoonWaxingGibbous6': return <LIB.WiMoonWaxingGibbous6 className={className} />;
            case 'WiMoonrise': return <LIB.WiMoonrise className={className} />;
            case 'WiMoonset': return <LIB.WiMoonset className={className} />;
            case 'WiNa': return <LIB.WiNa className={className} />;
            case 'WiNightAltCloudyGusts': return <LIB.WiNightAltCloudyGusts className={className} />;
            case 'WiNightAltCloudyHigh': return <LIB.WiNightAltCloudyHigh className={className} />;
            case 'WiNightAltCloudyWindy': return <LIB.WiNightAltCloudyWindy className={className} />;
            case 'WiNightAltCloudy': return <LIB.WiNightAltCloudy className={className} />;
            case 'WiNightAltHail': return <LIB.WiNightAltHail className={className} />;
            case 'WiNightAltLightning': return <LIB.WiNightAltLightning className={className} />;
            case 'WiNightAltPartlyCloudy': return <LIB.WiNightAltPartlyCloudy className={className} />;
            case 'WiNightAltRainMix': return <LIB.WiNightAltRainMix className={className} />;
            case 'WiNightAltRainWind': return <LIB.WiNightAltRainWind className={className} />;
            case 'WiNightAltRain': return <LIB.WiNightAltRain className={className} />;
            case 'WiNightAltShowers': return <LIB.WiNightAltShowers className={className} />;
            case 'WiNightAltSleetStorm': return <LIB.WiNightAltSleetStorm className={className} />;
            case 'WiNightAltSleet': return <LIB.WiNightAltSleet className={className} />;
            case 'WiNightAltSnowThunderstorm': return <LIB.WiNightAltSnowThunderstorm className={className} />;
            case 'WiNightAltSnowWind': return <LIB.WiNightAltSnowWind className={className} />;
            case 'WiNightAltSnow': return <LIB.WiNightAltSnow className={className} />;
            case 'WiNightAltSprinkle': return <LIB.WiNightAltSprinkle className={className} />;
            case 'WiNightAltStormShowers': return <LIB.WiNightAltStormShowers className={className} />;
            case 'WiNightAltThunderstorm': return <LIB.WiNightAltThunderstorm className={className} />;
            case 'WiNightClear': return <LIB.WiNightClear className={className} />;
            case 'WiNightCloudyGusts': return <LIB.WiNightCloudyGusts className={className} />;
            case 'WiNightCloudyHigh': return <LIB.WiNightCloudyHigh className={className} />;
            case 'WiNightCloudyWindy': return <LIB.WiNightCloudyWindy className={className} />;
            case 'WiNightCloudy': return <LIB.WiNightCloudy className={className} />;
            case 'WiNightFog': return <LIB.WiNightFog className={className} />;
            case 'WiNightHail': return <LIB.WiNightHail className={className} />;
            case 'WiNightLightning': return <LIB.WiNightLightning className={className} />;
            case 'WiNightPartlyCloudy': return <LIB.WiNightPartlyCloudy className={className} />;
            case 'WiNightRainMix': return <LIB.WiNightRainMix className={className} />;
            case 'WiNightRainWind': return <LIB.WiNightRainWind className={className} />;
            case 'WiNightRain': return <LIB.WiNightRain className={className} />;
            case 'WiNightShowers': return <LIB.WiNightShowers className={className} />;
            case 'WiNightSleetStorm': return <LIB.WiNightSleetStorm className={className} />;
            case 'WiNightSleet': return <LIB.WiNightSleet className={className} />;
            case 'WiNightSnowThunderstorm': return <LIB.WiNightSnowThunderstorm className={className} />;
            case 'WiNightSnowWind': return <LIB.WiNightSnowWind className={className} />;
            case 'WiNightSnow': return <LIB.WiNightSnow className={className} />;
            case 'WiNightSprinkle': return <LIB.WiNightSprinkle className={className} />;
            case 'WiNightStormShowers': return <LIB.WiNightStormShowers className={className} />;
            case 'WiNightThunderstorm': return <LIB.WiNightThunderstorm className={className} />;
            case 'WiRainMix': return <LIB.WiRainMix className={className} />;
            case 'WiRainWind': return <LIB.WiRainWind className={className} />;
            case 'WiRain': return <LIB.WiRain className={className} />;
            case 'WiRaindrop': return <LIB.WiRaindrop className={className} />;
            case 'WiRaindrops': return <LIB.WiRaindrops className={className} />;
            case 'WiRefreshAlt': return <LIB.WiRefreshAlt className={className} />;
            case 'WiRefresh': return <LIB.WiRefresh className={className} />;
            case 'WiSandstorm': return <LIB.WiSandstorm className={className} />;
            case 'WiShowers': return <LIB.WiShowers className={className} />;
            case 'WiSleet': return <LIB.WiSleet className={className} />;
            case 'WiSmallCraftAdvisory': return <LIB.WiSmallCraftAdvisory className={className} />;
            case 'WiSmog': return <LIB.WiSmog className={className} />;
            case 'WiSmoke': return <LIB.WiSmoke className={className} />;
            case 'WiSnowWind': return <LIB.WiSnowWind className={className} />;
            case 'WiSnow': return <LIB.WiSnow className={className} />;
            case 'WiSnowflakeCold': return <LIB.WiSnowflakeCold className={className} />;
            case 'WiSolarEclipse': return <LIB.WiSolarEclipse className={className} />;
            case 'WiSprinkle': return <LIB.WiSprinkle className={className} />;
            case 'WiStars': return <LIB.WiStars className={className} />;
            case 'WiStormShowers': return <LIB.WiStormShowers className={className} />;
            case 'WiStormWarning': return <LIB.WiStormWarning className={className} />;
            case 'WiStrongWind': return <LIB.WiStrongWind className={className} />;
            case 'WiSunrise': return <LIB.WiSunrise className={className} />;
            case 'WiSunset': return <LIB.WiSunset className={className} />;
            case 'WiThermometerExterior': return <LIB.WiThermometerExterior className={className} />;
            case 'WiThermometerInternal': return <LIB.WiThermometerInternal className={className} />;
            case 'WiThermometer': return <LIB.WiThermometer className={className} />;
            case 'WiThunderstorm': return <LIB.WiThunderstorm className={className} />;
            case 'WiTime1': return <LIB.WiTime1 className={className} />;
            case 'WiTime10': return <LIB.WiTime10 className={className} />;
            case 'WiTime11': return <LIB.WiTime11 className={className} />;
            case 'WiTime12': return <LIB.WiTime12 className={className} />;
            case 'WiTime2': return <LIB.WiTime2 className={className} />;
            case 'WiTime3': return <LIB.WiTime3 className={className} />;
            case 'WiTime4': return <LIB.WiTime4 className={className} />;
            case 'WiTime5': return <LIB.WiTime5 className={className} />;
            case 'WiTime6': return <LIB.WiTime6 className={className} />;
            case 'WiTime7': return <LIB.WiTime7 className={className} />;
            case 'WiTime8': return <LIB.WiTime8 className={className} />;
            case 'WiTime9': return <LIB.WiTime9 className={className} />;
            case 'WiTornado': return <LIB.WiTornado className={className} />;
            case 'WiTrain': return <LIB.WiTrain className={className} />;
            case 'WiTsunami': return <LIB.WiTsunami className={className} />;
            case 'WiUmbrella': return <LIB.WiUmbrella className={className} />;
            case 'WiVolcano': return <LIB.WiVolcano className={className} />;
            case 'WiWindBeaufort0': return <LIB.WiWindBeaufort0 className={className} />;
            case 'WiWindBeaufort1': return <LIB.WiWindBeaufort1 className={className} />;
            case 'WiWindBeaufort10': return <LIB.WiWindBeaufort10 className={className} />;
            case 'WiWindBeaufort11': return <LIB.WiWindBeaufort11 className={className} />;
            case 'WiWindBeaufort12': return <LIB.WiWindBeaufort12 className={className} />;
            case 'WiWindBeaufort2': return <LIB.WiWindBeaufort2 className={className} />;
            case 'WiWindBeaufort3': return <LIB.WiWindBeaufort3 className={className} />;
            case 'WiWindBeaufort4': return <LIB.WiWindBeaufort4 className={className} />;
            case 'WiWindBeaufort5': return <LIB.WiWindBeaufort5 className={className} />;
            case 'WiWindBeaufort6': return <LIB.WiWindBeaufort6 className={className} />;
            case 'WiWindBeaufort7': return <LIB.WiWindBeaufort7 className={className} />;
            case 'WiWindBeaufort8': return <LIB.WiWindBeaufort8 className={className} />;
            case 'WiWindBeaufort9': return <LIB.WiWindBeaufort9 className={className} />;
            case 'WiWindDeg': return <LIB.WiWindDeg className={className} />;
            case 'WiWindy': return <LIB.WiWindy className={className} />;

            default:
                console.log('Wi - unknown icon : ' + icon + ' by the name ' + iconName);
                return null;

        }
    }
    const iconComponent = getIcon(icon);


    return (<>
        {iconComponent}
    </>);




};

export default Wi;