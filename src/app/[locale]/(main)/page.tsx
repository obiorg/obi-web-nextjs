
'use client';

import { useContext, useEffect, useRef, useState } from 'react';


import { LayoutContext } from '@/src/layout/context/layoutcontext';


import DashCardBBT from '@/src/obi/components/App/DashCardBBT';
import DashCardCCT from '@/src/obi/components/App/DashCardCCT';
import OneSetCardHightChart from '@/src/obi/components/App/OneSetCardHighChart';
import { PersistencesStandardsService } from '@/src/obi/service/persistences/PersistencesStandardsService';

import { useTranslations } from 'next-intl';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { TabPanel, TabView } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';






const Dashboard = () => {
    // console.log("Dashboard", locale);
    // Language support
    const t = useTranslations('page');

    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {

    };

    const applyDarkTheme = () => {

    };



    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);





    const CCTs = (() => {
        const icon_gr = 'gi';
        const icon = 'GiEnergyTank';
        const units = ['hl', 'bar', '°C', '°C', 'u'];
        const patterns = ['#0', '#0.00', '#0.0', '#0.0', '0'];
        const items = [
            {
                id: 'TOD35',
                name: 'TOD 35',
                tags: [37, 1, 72, 56, 17], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD36',
                name: 'TOD 36',
                tags: [38, 2, 73, 57, 18], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD37',
                name: 'TOD 37',
                tags: [42, 3, 74, 58, 19], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD38',
                name: 'TOD 38',
                tags: [43, 4, 75, 59, 20], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },




            {
                id: 'TOD39',
                name: 'TOD 39',
                tags: [44, 5, 76, 60, 21], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD40',
                name: 'TOD 40',
                tags: [45, 6, 77, 61, 22], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD41',
                name: 'TOD 41',
                tags: [46, 7, 78, 62, 23], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD42',
                name: 'TOD 42',
                tags: [47, 8, 79, 63, 24], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },




            {
                id: 'TOD43',
                name: 'TOD 43',
                tags: [48, 9, 80, 64, 25], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD44',
                name: 'TOD 44',
                tags: [49, 10, 81, 65, 26], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD45',
                name: 'TOD 45',
                tags: [50, 11, 82, 66, 27], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD46',
                name: 'TOD 46',
                tags: [51, 12, 83, 67, 28], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },



            {
                id: 'TOD47',
                name: 'TOD 47',
                tags: [52, 13, 84, 68, 29], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD48',
                name: 'TOD 48',
                tags: [53, 14, 85, 69, 30], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD17',
                name: 'TOD 17',
                tags: [54, 15, 86, 70, 31], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TOD18',
                name: 'TOD 18',
                tags: [55, 16, 87, 71, 32], // Volume, Pression, T°milieu, T°basse, état
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            }



        ];

        return (
            <>
                {
                    items.map((item) => {
                        return true ?
                            <DashCardCCT
                                key={'dashCardCCT_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                            />
                            : false

                    })
                }

            </>
        );

    });



    const BBT_CO2GLY = (() => {
        const icon_gr = 'md';
        const icon = 'MdCompress';
        const units = ['bar', '', '', ''];
        const patterns = [2, 2];
        const icon_gr1 = 'md';
        const icon1 = 'MdOutlineSevereCold';
        const units1 = ['°C', '', '', ''];
        const items = [
            {
                id: 'TBF_CO2Frais',
                name: 'TBF CO2 Frais',
                tags: [180],
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF_CO2Equilibrium',
                name: 'TBF CO2 Equilibrium',
                tags: [194],
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF_TGlycol_1',
                name: 'TBF T° Glycol Entrée',
                tags: [195],
                icon_gr: icon_gr1, icon: icon1, units: units1, patterns: patterns,
            },
            {
                id: 'TBF_TGlycol_2',
                name: 'TBF T° Glycol Sortie',
                tags: [196],
                icon_gr: icon_gr1, icon: icon1, units: units1, patterns: patterns,
            },


        ];

        return (
            <>
                {
                    items.map((item) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'BBTCO2_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                chart={true}
                                chartTitle={item.name}
                            />
                            : false
                    })
                }

            </>
        );

    });


    const BBTs = (() => {
        const icon_gr = 'bi';
        const icon = 'BiSolidBeer';
        const units = ['hl', '°C', 'u', 'u'];
        const patterns = ['#0', '#0.0', '0', '0'];
        const items = [
            {
                id: 'TBF01',
                name: 'TBF 01',
                tags: [162, 156, 174, 168], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF02',
                name: 'TBF 02',
                tags: [163, 157, 175, 169], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF03',
                name: 'TBF 03',
                tags: [164, 158, 176, 170], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },



            {
                id: 'TBF04',
                name: 'TBF 04',
                tags: [165, 159, 177, 171], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF05',
                name: 'TBF 05',
                tags: [166, 160, 178, 172], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TBF06',
                name: 'TBF 06',
                tags: [167, 161, 179, 173], // Volume, Température, Produit, Etat
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },



        ];

        return (
            <>
                {
                    items.map((item) => {
                        return true ?
                            <DashCardBBT
                                key={'dashCardBBT_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                chart={true}
                            />
                            : false

                    })
                }

            </>
        );

    });

    const O2_Bilan = (() => {
        const icon_gr = 'si';
        const icon = 'SiOxygen';
        const units = ['ppm', 'bar', 'kg', '°C', 'u'];
        const patterns = [3, 0, 0, 0, 0];
        const items = [
            {
                id: 'O2_Daw',
                name: 'Oxy. DAW',
                tags: [193], // 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'O2_Separator',
                name: 'Oxy. Séparateur',
                tags: [191], // 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'O2_Filtration',
                name: 'Oxy. Filtration',
                tags: [192], //
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'O2_Centec',
                name: 'Oxy. Centec',
                tags: [189], // 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
        ];


        return (
            <>
                {
                    items.map((item: any) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'O2Bilan_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                chart={true}
                                chartTitle={'Bilan O2 ' + item.name}
                            />
                            : false

                    })
                }
            </>
        );
    });

    const CO2_Tanks = (() => {
        const icon_gr = 'md';
        const icon = 'MdCo2';
        const units = ['kg', 'bar', 'kg', '°C', 'u'];
        const patterns = [0, 0, 0, 0, 0];
        const items = [
            {
                id: 'TANK01',
                name: 'TANK 01',
                tags: [34], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
                varDeltas: [false],
            },
            {
                id: 'TANK02',
                name: 'TANK 02',
                tags: [35], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
                varDeltas: [false],
            },
            {
                id: 'TANK03',
                name: 'TANK 03',
                tags: [33], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
                varDeltas: [false],
            },
        ];


        return (
            <>
                {
                    items.map((item) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'dashCardCO2_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                varDeltas={item.varDeltas ? item.varDeltas : [false]}
                                chart={true}
                                chartTitle={'Stock CO2 ' + item.name}
                                table={true}
                                tableTitle={'Stock CO2 ' + item.name}
                            />
                            : false

                    })
                }
            </>
        );
    });


    const CO2_Bilan = (() => {
        const icon_gr = 'md';
        const icon = 'MdCo2';
        const units = ['kg', '%', 'ppm', 'kg/h'];
        const patterns = [0, 1, 2, 3];
        const items = [
            {
                id: 'CO2_sepa_purity',
                name: 'Pureté',
                tags: [200],
                icon_gr: icon_gr, icon: icon, units: [units[2]], patterns: [patterns[1]],
            },
            {
                id: 'CO2_sepa_O2',
                name: 'Oxygène',
                tags: [199],
                icon_gr: icon_gr, icon: icon, units: [units[1]], patterns: [patterns[2]],
            },
            {
                id: 'co2_sepa_recup',
                name: 'Envoi - Cave',
                tags: [197],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[0]],
                varDeltas: [true],
            },
            {
                id: 'co2_secheur_prod',
                name: 'Prod. Sécheur',
                tags: [126],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[0]],
                varDeltas: [true],
            },
            {
                id: 'CO2_ballon_niveau',
                name: 'Niveau Ballon',
                tags: [202],
                icon_gr: icon_gr, icon: icon, units: [units[1]], patterns: [patterns[1]],
            },
            {
                id: 'CO2_cooling_vannepurge',
                name: 'Vanne de purge',
                tags: [206],
                icon_gr: icon_gr, icon: icon, units: [units[1]], patterns: [patterns[0]],
            },
        ];


        return (
            <>
                {
                    items.map((item: any) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'CO2Parm_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                varDeltas={item.varDeltas ? item.varDeltas : [false]}
                                chart={true}
                                chartTitle={'CO2 ' + item.name}
                                table={true}
                                tableTitle={'CO2 ' + item.name}
                            />
                            : false

                    })
                }
            </>
        );
    });

    const CO2_Counter = (() => {
        const icon_gr = 'md';
        const icon = 'MdCo2';
        const units = ['h', '%', 'ppm', 'kg/h'];
        const patterns = [0, 1, 2, 3];
        const items = [
            {
                id: 'CO2_RunComp_1',
                name: 'CO1 Marche [h]',
                tags: [209],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
            {
                id: 'CO2_RunComp_2',
                name: 'CO2 Marche [h]',
                tags: [211],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
        ];


        return (
            <>
                {
                    items.map((item: any) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'CO2Counter_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                varDeltas={item.varDeltas ? item.varDeltas : [false]}
                                chart={true}
                                chartTitle={'CO2 ' + item.name}

                                table={true}
                                tableTitle={'CO2 ' + item.name}
                            />
                            : false

                    })
                }
            </>
        );
    });

    const CO2_ConsoDepart = (() => {
        const icon_gr = 'md';
        const icon = 'MdCo2';
        const units = ['kg', '%', 'ppm', 'kg/h'];
        const patterns = [0, 1, 2, 3];
        const items = [
            {
                id: 'CO2_ConsoDepart_Siroperie',
                name: 'Conso. Siroperie [kg]',
                tags: [116],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
            {
                id: 'CO2_ConsoDepart_Filtration',
                name: 'Conso. Filtration [kg]',
                tags: [117],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
            {
                id: 'CO2_ConsoDepart_Brassage',
                name: 'Conso. Brassage [kg]',
                tags: [119],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
            {
                id: 'CO2_ConsoDepart_Conditionnement',
                name: 'Conso. Condition. [kg]',
                tags: [118],
                icon_gr: icon_gr, icon: icon, units: [units[0]], patterns: [patterns[1]],
                varDeltas: [true],
            },
        ];


        return (
            <>
                {
                    items.map((item: any) => {
                        return true ?
                            <OneSetCardHightChart
                                key={'CO2Counter_key_' + item.id}
                                id={item.id}
                                name={item.name}
                                icon_gr={item.icon_gr}
                                icon={item.icon}
                                tags={item.tags}
                                units={item.units}
                                patterns={item.patterns}
                                varDeltas={item.varDeltas ? item.varDeltas : [false]}
                                chart={true}
                                chartTitle={'CO2 ' + item.name}

                                table={true}
                                tableTitle={'CO2 ' + item.name}
                            />
                            : false

                    })
                }
            </>
        );
    });

    // TAB VIEW CONTROL
    const tabViewRef = useRef<any>();   // TabView reference
    const [tabViewIndex, setTabViewIndex] = useState(0); // active index of TabView
    const [tabViewIsInAuto, setTabViewIsInAuto] = useState(false); // indicate if TabView is in auto mode
    const [secondsPassed, setSecondsPassed] = useState(0);  // seconds passed in auto mode
    const [autoTime, setAutoTime] = useState<any>(60);  // seconds specifying end of auto mode

    // Change auto time which is limint duration on active tab view 
    const onAutoTimeChanged = (e: any) => {
        e.value >= 10 ? setAutoTime(e.value) : setAutoTime(60);
    };

    // Effect on tab view auto mode to switch over tab 
    useEffect(() => {
        if (tabViewIsInAuto) {
            const intervalTimeRef = setInterval(() => {
                if (secondsPassed >= autoTime) {
                    onTabViewForward();
                    setSecondsPassed(0);
                } else {
                    setSecondsPassed(secondsPassed + 1);
                }
            }, 1000);

            return () => {
                clearInterval(intervalTimeRef);
            }
        }
    }, [tabViewIsInAuto, tabViewIndex, secondsPassed]);


    // Tab view Seek Backward
    const onTabViewBackward = (() => {
        let tb: any = tabViewRef.current;
        if (tabViewIndex === 0 && tabViewRef.current) {
            setTabViewIndex(tb.props.children.length - 1);
        } else {
            setTabViewIndex(tabViewIndex - 1)
        }
    });

    // TabView Seek Foward in auto mode
    const onPause = (() => {
        setTabViewIsInAuto(!tabViewIsInAuto);
    });
    // TabView Seek Foward
    const onPlay = (() => {
        setTabViewIsInAuto(!tabViewIsInAuto);
    });

    const onTabViewForward = (() => {
        let tb: any = tabViewRef.current;
        if (tabViewIndex === tb.props.children.length - 1) {
            setTabViewIndex(0);
        } else {
            setTabViewIndex(tabViewIndex + 1)
        }
    });





    return (
        <>
            <div className="flex">
                <div className="flex-initial flex align-items-center justify-content-center font-bold pr-5 border-round">
                    <h1 className=''>{t('dashboard.title')}</h1>
                </div>

                <Button icon="pi pi-angle-left"
                    className="mr-1 p-button-rounded p-button-help"
                    aria-label={t('dashboard.actions.previous')}
                    onClick={onTabViewBackward}
                />
                <Button icon="pi pi-pause"
                    className="mr-1 p-button-rounded p-button-secondary"
                    aria-label={t('dashboard.actions.pause')}
                    visible={tabViewIsInAuto}
                    onClick={onPause}
                />
                <Button icon="pi pi-play"
                    className="mr-1 p-button-rounded p-button-success"
                    aria-label={t('dashboard.actions.play')}
                    visible={!tabViewIsInAuto}
                    onClick={onPlay}
                />
                <Button icon="pi pi-angle-right"
                    className="mr-1 p-button-rounded p-button-info"
                    aria-label={t('dashboard.actions.next')}
                    onClick={onTabViewForward}
                />

                <InputNumber value={autoTime}
                    onValueChange={onAutoTimeChanged}
                    suffix=" s"
                    showButtons
                    decrementButtonClassName="p-button-danger"
                    incrementButtonClassName="p-button-success"
                    // buttonLayout="horizontal" 
                    step={5}
                    min={10}
                    className='ml-1 p-0 w-auto h-3rem'
                    size={1}
                />
                {secondsPassed}
            </div>

            <TabView
                activeIndex={tabViewIndex}
                onTabChange={(e) => setTabViewIndex(e.index)}
                ref={tabViewRef}

            >


                <TabPanel header={t('dashboard.CCT.short')} key="tab1"
                    nextButton={<Button icon="pi pi-angle-right" className="p-button-rounded p-button-info" />}
                >


                    <h2>{t('dashboard.CCT.short')}</h2>

                    <div className="grid">
                        {CCTs()}
                    </div>
                    <hr />
                </TabPanel>


                <TabPanel header={t('dashboard.BBT.short')} key="tab2" >
                    <h2>{t('dashboard.BBT.short')}</h2>
                    <p>{t('dashboard.BBT.description')}</p>
                    <div className="grid">
                        {BBT_CO2GLY()}
                    </div>
                    <hr />

                    <div className="grid">
                        {BBTs()}
                    </div>
                    <hr />
                    <div className="grid">
                        {O2_Bilan()}
                    </div>
                    <hr />
                </TabPanel>


                <TabPanel header={t('dashboard.CO2.title')} key="tab3" >
                    <h2>{t('dashboard.CO2.title')}</h2>
                    <p>{t('dashboard.CO2.description')}</p>

                    <div className="grid">
                        {CO2_Tanks()}
                    </div>


                    <hr />
                    <div className="grid">
                        {CO2_Bilan()}
                    </div>
                    <hr />
                    {/* <div className="grid">
                        {CO2_Counter()}
                    </div>
                    <hr /> */}
                    <div className="grid">
                        {CO2_ConsoDepart()}
                    </div>
                    <hr />


                    
                </TabPanel>

            </TabView>
        </>
    );
};


export default Dashboard;

