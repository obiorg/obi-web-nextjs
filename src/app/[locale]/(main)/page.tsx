/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';


import { ProductService } from '@/src/demo/service/ProductService';
import { LayoutContext } from '@/src/layout/context/layoutcontext';

import Link from 'next/link';
import { Demo } from '@/src/types';
import { ChartData, ChartOptions } from 'chart.js';

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
import { getIntl } from "@/src/lib/intl";
import ReactIcons from '@/src/obi/components/Icons/ReactIcons';
import { Card } from 'primereact/card';
import DashCard from '@/src/obi/components/App/DashCardCCT';
import DashCardCCT from '@/src/obi/components/App/DashCardCCT';
import DashCardCO2Tanks from '@/src/obi/components/App/DashCardCO2Tanks';

type HomeProps = {
    params: { locale: string };
};

const Dashboard = ({ params: { locale } }: HomeProps) => {
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




            // {
            //     id: 'TOD39',
            //     name: 'TOD 39',
            //     tags: [44, 5, 76, 60, 21], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD40',
            //     name: 'TOD 40',
            //     tags: [45, 6, 77, 61, 22], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD41',
            //     name: 'TOD 41',
            //     tags: [46, 7, 78, 62, 23], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD42',
            //     name: 'TOD 42',
            //     tags: [47, 8, 79, 63, 24], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },




            // {
            //     id: 'TOD43',
            //     name: 'TOD 43',
            //     tags: [48, 9, 80, 64, 25], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD44',
            //     name: 'TOD 44',
            //     tags: [49, 10, 81, 65, 26], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD45',
            //     name: 'TOD 45',
            //     tags: [50, 11, 82, 66, 27], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD46',
            //     name: 'TOD 46',
            //     tags: [51, 12, 83, 67, 28], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },



            // {
            //     id: 'TOD47',
            //     name: 'TOD 47',
            //     tags: [52, 13, 84, 68, 29], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD48',
            //     name: 'TOD 48',
            //     tags: [53, 14, 85, 69, 30], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD17',
            //     name: 'TOD 17',
            //     tags: [54, 15, 86, 70, 31], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // },
            // {
            //     id: 'TOD18',
            //     name: 'TOD 18',
            //     tags: [55, 16, 87, 71, 32], // Volume, Pression, T°milieu, T°basse, état
            //     icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            // }



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
                tags: [35, 2, 73, 57, 18], // Tons, Pressure, MaxCapacityTons, 
                icon_gr: icon_gr, icon: icon, units: units, patterns: patterns,
            },
            {
                id: 'TANK03',
                name: 'TANK 03',
                tags: [33, 3, 74, 58, 19], // Tons, Pressure, MaxCapacityTons, 
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

    return (
        <>

            <h1>TODs</h1>

            <div className="grid">
                {CCTs()}
            </div>

            <hr />
            <h1>TBF</h1>

            <div className="grid">
                {/* {CCTs()} */}
            </div>


            <hr />
            <h1>Stock CO2</h1>

            <div className="grid">
                {CO2_Tanks()}
            </div>
        </>
    );
};


export default Dashboard;

