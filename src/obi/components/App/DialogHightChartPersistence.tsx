'use client';



import 'moment-timezone';
import { Avatar } from 'primereact/avatar';
import { BlockUI } from 'primereact/blockui';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from "react";
import { PersistencesStandardsService } from '../../service/persistences/PersistencesStandardsService';

import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Load Highcharts modules
require('highcharts/modules/accessibility')(Highcharts);
import '/src/styles/hightchart/hightchart.css'

// Define the props that the PostForm component expects
interface DialogHightChartPersistenceProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component

    title?: string;                      // preceding title of dropdown
    subtitle?: string;                     // Subtitle of the dialog

    tags: number[];         // Table containing tags number in the order Volume, Pression, T°middle, T°Bottom, State
    units: string[]; // Table containing units in corresponding to each tags
    patterns?: number[]; // Define the patterns corresponding to each tags

    visible?: boolean; // enable automatic refresh defaulat true
    onChangedVisible?: (e: boolean) => void; // The callback function to be called when the button is clicked
}


export default function DialogHightChartPersistence(
    {
        id,
        name,
        title = 'Titre Graphique',
        subtitle = undefined,
        tags,
        units,

        visible = false,
        onChangedVisible,

    }: DialogHightChartPersistenceProps) {


    const [update, setUpdate] = useState(false);
    Highcharts.setOptions({
        lang: {
            // locale: 'fr',
            accessibility: {

            }
        },
        chart: {
            // backgroundColor: {
            //     linearGradient: [0, 0, 500, 500],
            //     stops: [
            //         [0, 'rgb(255, 255, 255)'],
            //         [1, 'rgb(240, 240, 255)']
            //     ]
            // },
            borderWidth: 2,
            // plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            plotBorderWidth: 1
        },

    });
    const [options, setOptions] = useState({
        lang: {
            locale: 'fr'
        },

        accessibility: {
            enabled: true,
            // screenReaderSection: {
            //     beforeChartFormat: '<{headingTagName}>' +
            //         '{chartTitle}</{headingTagName}><div>{chartSubtitle}</div>' +
            //         '<div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>' +
            //         '{yAxisDescription}</div>'
            // }
        },

        chart: {
            type: 'spline',
            zooming: {
                type: 'x'
            }
        },

        title: {
            text: title,
            // align: 'left'
        },


        subtitle: {
            text: (subtitle ? subtitle : ''),
            align: 'left'
        },

        tooltip: {
            valueDecimals: 2,
            crosshairs: true,
            shared: true
        },

        xAxis: {
            type: 'datetime'
        },

        yAxis: [{ // Primary axis
            className: 'highcharts-color-0',
            title: {
                text: units[0]
            },
            labels: {
                format: '{value}'
            }
        }],

        units: [[
            'millisecond', // unit name
            [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
        ], [
            'second',
            [1, 2, 5, 10, 15, 30]
        ], [
            'minute',
            [1, 2, 5, 10, 15, 30]
        ], [
            'hour',
            [1, 2, 3, 4, 6, 8, 12]
        ], [
            'day',
            [1, 2]
        ], [
            'week',
            [1, 2]
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ], [
            'year',
            null

        ]],

        series: [{
            data: [],
            lineWidth: 4,
            name: title
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
    });
    const [minutes, setMinutes] = useState(60);
    const [hours, setHours] = useState(24);
    const [days, setDays] = useState(7);
    const [months, setMonths] = useState(12);
    const [period, setPeriod] = useState(0);
    const [loading, setLoading] = useState(false);

    const minutesItems = [
        { name: '10m', value: 10, default: false },
        { name: '15m', value: 15, default: false },
        { name: '30m', value: 30, default: false },
        { name: '60m', value: 60, default: true },
        { name: '120m', value: 120, default: false },
    ];
    const hoursItems = [
        { name: '1h', value: 1, default: false },
        { name: '8h', value: 8, default: false },
        { name: '24h', value: 24, default: true },
        { name: '48h', value: 48, default: false },
        { name: '72h', value: 72, default: false },
    ];
    const daysItems = [
        { name: '3 jr.', value: 3, default: false },
        { name: '5 jr.', value: 5, default: false },
        { name: '7 jr.', value: 7, default: true },
        { name: '10 jr', value: 10, default: false },
    ];
    const monthsItems = [
        { name: '3m', value: 3, default: false },
        { name: '4m', value: 4, default: false },
        { name: '6m', value: 6, default: false },
        { name: '12m', value: 12, default: true },
    ];

    const periodItems = [
        { name: 'Minutes', value: 0 },
        { name: 'Heure', value: 1 },
        { name: 'Jour', value: 2 },
        // { name: 'Semaine', value: 3 },
        { name: 'Mois', value: 4 },
        // { name: 'Année', value: 5 }
    ];

    const hightChartRef = React.useRef<any>();
    const hightChartDivRef = React.useRef<any>();
    useEffect(() => {
        console.log(hightChartDivRef); //($(window).height());
        console.log(hightChartRef); //($(window).height());
    }, [])




    useEffect(() => {
        if (visible) {
            let tag = tags[0];
            setLoading(true);
            if (period === 0) {
                onMinutesChange(tag, minutes);
            } else if (period === 1) {
                onHoursChange(tag, hours);
            } else if (period === 2) {
                onDaysChange(tag, days);
            } else if (period === 4) {
                onMonthsChange(tag, months);
            }
        }
    }, [visible, update, period, minutes, hours, days, months]);

    const onMinutesChange = (tag: number, limits: number) => {
        PersistencesStandardsService.averageMinMaxMinutes(tag, limits).then((data: any) => {
            // console.log(data);
            const labels = data.map((d: any) => d.Time).reverse();
            const average = data.map((d: any) => d.Average).reverse();
            const minimal = data.map((d: any) => d.Minimal).reverse();
            const maximal = data.map((d: any) => d.Maximal).reverse();
            // console.log(labels, average, minimal, maximal);
            // console.log(new Date(data[0].Time), (new Date(data[0].Time).getTime()));
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Average]).reverse(),
                    lineWidth: 1.0,
                    name: 'Moyenne'
                }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Minimal]).reverse(),
                lineWidth: 0.5,
                name: 'Minima'
            }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Maximal]).reverse(),
                lineWidth: 0.5,
                name: 'Maxima'
            },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onHoursChange = (tag: number, limits: number) => {
        PersistencesStandardsService.averageMinMaxHours(tag, limits).then((data: any) => {
            // console.log(data);
            const labels = data.map((d: any) => d.Time).reverse();
            const average = data.map((d: any) => d.Average).reverse();
            const minimal = data.map((d: any) => d.Minimal).reverse();
            const maximal = data.map((d: any) => d.Maximal).reverse();
            // console.log(labels, average, minimal, maximal);
            // console.log(new Date(data[0].Time), (new Date(data[0].Time).getTime()));
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Average]).reverse(),
                    lineWidth: 1.0,
                    name: 'Moyenne'
                }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Minimal]).reverse(),
                lineWidth: 0.5,
                name: 'Minima'
            }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Maximal]).reverse(),
                lineWidth: 0.5,
                name: 'Maxima'
            },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onDaysChange = (tag: number, limits: number) => {
        const documentStyle = getComputedStyle(document.documentElement);
        PersistencesStandardsService.averageMinMaxDays(tag, limits).then((data: any) => {
            // console.log(data);
            const labels = data.map((d: any) => d.Time).reverse();
            const average = data.map((d: any) => d.Average).reverse();
            const minimal = data.map((d: any) => d.Minimal).reverse();
            const maximal = data.map((d: any) => d.Maximal).reverse();
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Average]).reverse(),
                    lineWidth: 1.0,
                    name: 'Moyenne'
                }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Minimal]).reverse(),
                lineWidth: 0.5,
                name: 'Minima'
            }, {
                data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Maximal]).reverse(),
                lineWidth: 0.5,
                name: 'Maxima'
            },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onMonthsChange = (tag: number, limits: number) => {
        const documentStyle = getComputedStyle(document.documentElement);
        PersistencesStandardsService.averageMinMaxMonths(tag, limits).then((data: any) => {
            // console.log(data);
            const labels = data.map((d: any) => d.Time).reverse();
            const average = data.map((d: any) => d.Average).reverse();
            const minimal = data.map((d: any) => d.Minimal).reverse();
            const maximal = data.map((d: any) => d.Maximal).reverse();
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Average]).reverse(),
                    lineWidth: 1.0,
                    name: 'Moyenne'
                },
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Minimal]).reverse(),
                    lineWidth: 0.5,
                    name: 'Minima'
                },
                {
                    data: data.map((d: any) => [(new Date(d.Time)).getTime(), d.Maximal]).reverse(),
                    lineWidth: 0.5,
                    name: 'Maxima'
                },
            )
            setOptions(() => { return { ..._options } });
            // setChartData(chartDatas);
            setLoading(false);
        });
    }




    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image="/layout/images/obi/obi-signet-dim.svg" shape="circle" />
            <Image src='//layout/images/obi/obi-signet-dim.svg' className='circle' width="32" height="32" />
            <span className="font-bold white-space-nowrap">{title}</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Actualiser" icon="pi pi-refresh" onClick={() => setUpdate(!update)} autoFocus />
            <Button label="Ok" icon="pi pi-check" onClick={() => onChangedVisible && onChangedVisible(false)} autoFocus />
        </div>
    );

    const renderMenuPeriod = () => {
        switch (period) {
            case 0:
                return <SelectButton key={'DialogChartPersistence_dialog_menu_SelectMinutes_' + id} value={minutes} onChange={(e) => setMinutes(e.value)} optionLabel="name" options={minutesItems} />;
            case 1:
                return <SelectButton key={'DialogChartPersistence_dialog_menu_SelectHours_' + id} value={hours} onChange={(e) => setHours(e.value)} optionLabel="name" options={hoursItems} />;
            case 2:
                return <SelectButton key={'DialogChartPersistence_dialog_menu_SelectDays_' + id} value={days} onChange={(e) => setDays(e.value)} optionLabel="name" options={daysItems} />;
            case 4:
                return <SelectButton key={'DialogChartPersistence_dialog_menu_SelectMonths_' + id} value={months} onChange={(e) => setMonths(e.value)} optionLabel="name" options={monthsItems} />;
            default:
                return null;
        }
    };


    return (
        <>
            <Dialog
                key={'DialogChartPersistence_dialog_' + id}
                visible={visible} modal
                header={headerElement}
                footer={footerContent}
                maximizable={true}
                style={{ width: '50rem' }} onHide={() => { if (!visible) return; onChangedVisible && onChangedVisible(false); }}>
                <BlockUI blocked={loading} >
                    <div key={'DialogChartPersistence_dialog_menu_' + id} className="card flex justify-content-center mb-2">
                        <div key='DialogChartPersistence_dialog_menu_period' className="p-inputgroup flex-1 flex justify-content-center">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <SelectButton key={'DialogChartPersistence_dialog_menu_SelectPeriod_' + id} value={period} onChange={(e) => setPeriod(e.value)} optionLabel="name" options={periodItems} />
                        </div>


                        <div key={'DialogChartPersistence_dialog_menu_set_' + id} className="p-inputgroup flex-1 flex justify-content-center">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            {renderMenuPeriod()}
                        </div>

                    </div>

                    <div key={'DialogChartPersistence_dialog_charts_' + id}
                        className="graphic-container"
                        ref={hightChartDivRef}
                        >
                        <HighchartsReact highcharts={Highcharts} ref={hightChartRef}  options={options}
                            className='' />
                    </div>
                </BlockUI>
            </Dialog>
        </>
    );
}