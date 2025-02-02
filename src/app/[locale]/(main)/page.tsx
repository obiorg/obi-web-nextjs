/* eslint-disable @next/next/no-img-element */
'use client';
import { Menu } from 'primereact/menu';
import { useContext, useEffect, useRef, useState } from 'react';


import { ProductService } from '@/src/demo/service/ProductService';
import { LayoutContext } from '@/src/layout/context/layoutcontext';

import { Demo } from '@/src/types';
import { ChartData, ChartOptions } from 'chart.js';

import DashCardCCT from '@/src/obi/components/App/DashCardCCT';
import DashCardCO2Tanks from '@/src/obi/components/App/DashCardCO2Tanks';
import ReactIcons from '@/src/obi/components/Icons/ReactIcons';
import { useTranslations } from 'next-intl';
import DashCardBBT from '@/src/obi/components/App/DashCardBBT';
import { TabPanel, TabView } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import OneSetCard from '@/src/obi/components/App/OneSetCard';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { PersistenceStandardService } from '@/src/obi/service/persistences/PersistenceStandardService copy';
import { PersistencesStandardsService } from '@/src/obi/service/persistences/PersistencesStandardsService';
import { SelectButton } from 'primereact/selectbutton';


const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

type HomeProps = {

};

const Dashboard = ({ }: HomeProps) => {
    // console.log("Dashboard", locale);

    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const titleHeader = (
        <span className='flex flex-auto justify-content-between'>
            {/* icon */}
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}>
                <ReactIcons group="gi" icon="GiChemicalTank" className="text-blue-500 text-2xl" />
            </div>
            TOD 35
        </span>
    );

    const header = (
        <></>
    );
    const footer = (
        <>
            {/* Date line */}
            <div className="flex flex-row-reverse justify-content-start mt-0">
                <div className="vertical-align-middle">
                    <label >13:10:15</label>
                    <ReactIcons group="fa" icon="FaClock" className='ml-3' />
                </div>
            </div>
        </>
    );


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
        const patterns = ['#0', '#0.00', '#0.0', '#0.0', '0'];
        const items = [
            {
                id: 'TANK01',
                name: 'TANK 01',
                tags: [34], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TANK02',
                name: 'TANK 02',
                tags: [35], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TANK03',
                name: 'TANK 03',
                tags: [33], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
        ];


        return (
            <>
                {
                    items.map((item) => {
                        return true ?
                            <DashCardCO2Tanks
                                key={'dashCardCO2_key_' + item.id}
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


    const CO2_Bilan = (() => {
        const icon_gr = 'md';
        const icon = 'MdCo2';
        const units = ['kg', 'bar', 'kg', '°C', 'u'];
        const patterns = ['#0', '#0.00', '#0.0', '#0.0', '0'];
        const items = [
            {
                id: 'co2_prod_secheur',
                name: 'Prod. Sécheurs',
                tags: [126], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TANK02',
                name: 'TANK 02',
                tags: [35], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TANK03',
                name: 'TANK 03',
                tags: [33], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
        ];


        return (
            <>
                {
                    items.map((item: any) => {
                        return true ?
                            <DashCardCO2Tanks
                                key={'dashCardCO2_key_' + item.id}
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






    const tabViewRef = useRef<any>();
    const [tabViewIndex, setTabViewIndex] = useState(0);
    const [tabViewIsInAuto, setTabViewIsInAuto] = useState(false);



    const [secondsPassed, setSecondsPassed] = useState(0);
    const [autoTime, setAutoTime] = useState<any>(60);
    const onAutoTimeChanged = (e: any) => {
        e.value >= 10 ? setAutoTime(e.value) : setAutoTime(60);
    };


    useEffect(() => {
        if (tabViewIsInAuto) {
            const intervalTimeRef = setInterval(() => {
                if (secondsPassed >= autoTime) {
                    onTabViewNext();
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



    const onTabViewPrevious = (() => {
        let tb: any = tabViewRef.current;
        if (tabViewIndex === 0 && tabViewRef.current) {
            setTabViewIndex(tb.props.children.length - 1);
        } else {
            setTabViewIndex(tabViewIndex - 1)
        }
    });

    const onPause = (() => {
        setTabViewIsInAuto(!tabViewIsInAuto);
    });
    const onPlay = (() => {
        setTabViewIsInAuto(!tabViewIsInAuto);
    });

    const onTabViewNext = (() => {
        let tb: any = tabViewRef.current;
        if (tabViewIndex === tb.props.children.length - 1) {
            setTabViewIndex(0);
        } else {
            setTabViewIndex(tabViewIndex + 1)
        }
    });



    const t = useTranslations('page');






    const [visible, setVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [hours, setHours] = useState(24);
    const hoursItems = [
        { name: '1h', value: 1 },
        { name: '8h', value: 8 },
        { name: '24h', value: 24 },
        { name: '48h', value: 48 },
        { name: '72h', value: 72 }
    ];
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        setChartOptions(options);
        if (visible) {
            PersistencesStandardsService.averageMinMaxHour(180, hours).then((data: any) => {
                // console.log(data);
                const labels = data.map((d: any) => d.Time).reverse();
                const average = data.map((d: any) => d.Average).reverse();
                const minimal = data.map((d: any) => d.Minimal).reverse();
                const maximal = data.map((d: any) => d.Maximal).reverse();
                // console.log(labels, average, minimal, maximal);
                const chartDatas = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Moyenne',
                            data: average,
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            tension: 0.4
                        },
                        {
                            label: 'Minima',
                            data: minimal,
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--pink-500'),
                            tension: 0.4
                        },
                        {
                            label: 'Maxima',
                            data: maximal,
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--pink-900'),
                            tension: 0.4
                        }
                    ]
                };
                setChartData(chartDatas);
            });
        }




    }, [visible, refresh, hours]);


    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image="//layout/images/obi/obi-signet-dim.svg" shape="circle" />
            <span className="font-bold white-space-nowrap">TBF CO2 Contre pression [bar]</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Actualiser" icon="pi pi-refresh" onClick={() => setRefresh(!refresh)} autoFocus />
            <Button label="Ok" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );



    return (
        <>
            <div className="flex">
                <div className="flex-initial flex align-items-center justify-content-center font-bold pr-5 border-round">
                    <h1 className=''>{t('dashboard.title')}</h1>
                </div>

                <Button icon="pi pi-angle-left"
                    className="mr-1 p-button-rounded p-button-help"
                    aria-label={t('dashboard.actions.previous')}
                    onClick={onTabViewPrevious}
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
                    onClick={onTabViewNext}
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
                        <OneSetCard
                            id='TBF_Pressure'
                            name='TBF CO2 Pres.'
                            tags={[180]}
                            icon_gr='md'
                            icon='MdCompress'
                            units={['bar']}
                            patterns={[2]}
                            onClick={() => setVisible(true)}
                        />
                        <Dialog visible={visible} modal
                            header={headerElement}
                            footer={footerContent}
                            maximizable={true}
                            style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                            <p className="m-0">
                                <div className="card flex justify-content-center mb-2">
                                    <div className="p-inputgroup flex-1 flex justify-content-center">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-clock"></i>
                                        </span>
                                        <SelectButton value={hours} onChange={(e) => setHours(e.value)} optionLabel="name" options={hoursItems} />
                                    </div>
                                </div>
                            </p>
                            <Chart type="line" className='card flex justify-content-center' data={chartData} options={chartOptions} />
                        </Dialog>

                    </div>
                    <hr />

                    <div className="grid">
                        {BBTs()}
                    </div>
                    <hr />
                </TabPanel>


                <TabPanel header={t('dashboard.CO2.title')} key="tab3" >
                    <h2>{t('dashboard.CO2.title')}</h2>
                    <p>{t('dashboard.CO2.description')}</p>

                    <div className="grid">
                        {CO2_Tanks()}
                    </div>
                    <div className="grid">
                        {CO2_Bilan()}
                    </div>
                    <hr />
                </TabPanel>

            </TabView>
        </>
    );
};


export default Dashboard;

