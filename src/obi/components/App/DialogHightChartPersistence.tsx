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
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Define the props that the PostForm component expects
interface DialogHightChartPersistenceProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component

    title?: string;                      // preceding title of dropdown
    subtitle?: string;                     // Subtitle of the dialog

    tags: number[];         // Table containing tags number in the order Volume, Pression, T°middle, T°Bottom, State
    units: string[]; // Table containing units in corresponding to each tags
    patterns?: number[]; // Define the patterns corresponding to each tags
    varDeltas?: boolean[]; // Define the corresponding tags as delta values not changing value
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
        varDeltas = [false],
        visible = false,
        onChangedVisible,

    }: DialogHightChartPersistenceProps, props: HighchartsReact.Props) {


    //
    const [update, setUpdate] = useState(false);
    const chartComponentRef = useRef<any>();
    const dialogChartContent = useRef<any>();
    const dialogChart = useRef<any>();
    const [maximized, setMaximized] = useState(false);
    const [graphHeight, setGraphHeight] = useState('100%');
    const [options, setOptions] = useState<any>({
        lang: {
            locale: 'fr',
            accessibility: {
            },
        },
        chart: {

            type: 'spline',
            zooming: {
                type: 'x'
            },
            // height: ((9 / 16) * 100) + '%' // 16:9 ratio
            // Managing chart color
            // backgroundColor: {
            //     linearGradient: [0, 0, 500, 500],
            //     stops: [
            //         [0, 'rgb(255, 255, 255)'],
            //         [1, 'rgb(240, 240, 255)']
            //     ]
            // },
            // borderWidth: 2,
            // plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            // plotShadow: true,
            // plotBorderWidth: 1,
        },


        accessibility: {
            enabled: true,
            screenReaderSection: {
                beforeChartFormat: '<{headingTagName}>' +
                    '{chartTitle}</{headingTagName}><div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>' +
                    '{yAxisDescription}</div>'
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

        exporting: {
            chartOptions: { // specific options for the exported image
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            fallbackToExportServer: false
        },
    }
    );




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
        { name: '1800m', value: 1800, default: false },
        { name: '3600m', value: 3600, default: false },
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




    const onResize = (e: any) => {
        // console.log(e.target.innerHeight);
        // options.chart.height = ((9 / 16) * e.target.innerHeight) + '%';
        // setOptions(options);
        // console.log('onResize', dialogChart.current.getContent().clientHeight);
    }

    const onMaximize = (e: any) => {
        // console.log(e.target.innerHeight);
        // options.chart.height = ((9 / 16) * e.target.innerHeight) + '%';
        // setOptions(options);
        // console.log('onMaximize',
        //     // 'ChartContent : ', dialogChartContent,
        //     'Event', e,
        //     'OriginalEvent.view.outerHeight', e.originalEvent.view.outerHeight,
        //     'OriginalEvent.view.outerWidth', e.originalEvent.view.outerWidth,
        //     // 'DialogChart', dialogChart,
        //     // 'DialogChartProps', dialogChart.current.props,
        //     // 'DialogChartGetContent', dialogChart.current.getContent(),
        //     'DialogChartGetContentHeight', dialogChart.current.getContent().clientHeight,
        //     // 'DialogChart.children', dialogChart.current.getContent().children[0],
        //     // 'DialogChart.children[0].clientHeight', dialogChart.current.getContent().children[0].clientHeight,
        // );

        // // console.log('onMaximize', 'clientHeight = ', dialogChart.current.getContent().clientHeight, 
        // //                 'clientWidth = ', dialogChart.current.getContent().clientWidth);
        // // e.maximized ? setGraphHeight('100%') : setGraphHeight('50%');
        // setMaximized(e.maximized);


        // console.log('chartComponentRef',
        //     chartComponentRef
        // );
        // chartComponentRef.current.container.current.clientHeight = dialogChart.current.getContent().clientHeight;

        setMaximized(e.maximized);
    }

    const onShow = () => {
        // console.log('onShow', 'clientHeight = ', dialogChart.current.getContent().clientHeight,
        //     'clientWidth = ', dialogChart.current.getContent().clientWidth);
        // // setOptions(() => {
        // //     return {
        // //         ...options,
        // //         chart: {
        // //             // height: ((9 / 16) * dialogChart.current.getContent().clientHeight) + '%',
        // //             height: dialogChart.current.clientHeight,
        // //         }
        // //     }
        // // })
        // console.log('onShow', dialogChart.current);
        // setGraphHeight(dialogChart.current.getContent().clientHeight + '%');
    }



    useEffect(() => {
        if (visible) {
            let tag = tags[0];
            setLoading(true);
            if (period === 0) {
                if (varDeltas[0]===false) {
                    onMinutesChange(tag, minutes);
                } else {
                    onMinutesDeltaChange(tag, minutes);
                }
            } else if (period === 1) {
                if (varDeltas[0]===false) {
                    onHoursChange(tag, hours);
                } else {
                    onHoursDeltaChange(tag, hours);
                }
            } else if (period === 2) {
                if (varDeltas[0]===false) {
                    onDaysChange(tag, days);
                } else {
                    onDaysDeltaChange(tag, days);
                }
            } else if (period === 4) {
                if (varDeltas[0]===false) {
                    onMonthsChange(tag, months);
                } else {
                    onMonthsDeltaChange(tag, months);
                }
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, update, period, minutes, hours, days, months, tags, varDeltas]);

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


    const onMinutesDeltaChange = (tag: number, limits: number) => {
        PersistencesStandardsService.deltaInMinutes(tag, limits).then((data: any) => {
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.created)).getTime(), d.delta]).reverse(),
                    lineWidth: 1.0,
                    name: 'Delta'
                },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onHoursDeltaChange = (tag: number, limits: number) => {
        PersistencesStandardsService.deltaInHours(tag, limits).then((data: any) => {
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.created)).getTime(), d.delta]).reverse(),
                    lineWidth: 1.0,
                    name: 'Delta'
                },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onDaysDeltaChange = (tag: number, limits: number) => {
        PersistencesStandardsService.deltaInDays(tag, limits).then((data: any) => {
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.created)).getTime(), d.delta]).reverse(),
                    lineWidth: 1.0,
                    name: 'Delta'
                },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }
    const onMonthsDeltaChange = (tag: number, limits: number) => {
        PersistencesStandardsService.deltaInMonths(tag, limits).then((data: any) => {
            let _options = options;
            _options.series = [];
            _options.series.push(
                {
                    data: data.map((d: any) => [(new Date(d.created)).getTime(), d.delta]).reverse(),
                    lineWidth: 1.0,
                    name: 'Delta'
                },
            )
            setOptions(() => { return { ..._options } });
            setLoading(false);
        });
    }



    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            {/* <Avatar image="/layout/images/obi/obi-signet-dim.svg" shape="circle" />
            <Image src='//layout/images/obi/obi-signet-dim.svg' className='circle' width="32" height="32" /> */}
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
                ref={dialogChart}
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                maximizable={true}
                maximized={maximized}
                // style={{ width: '50rem' }} 
                onHide={() => { if (!visible) return; onChangedVisible && onChangedVisible(false); }}
                onResize={onResize}
                onMaximize={onMaximize}
                onShow={onShow}
            >
                <BlockUI blocked={loading} >
                    <div key={'DialogChartPersistence_dialog_menu_' + id}
                        className="card flex justify-content-center mb-2 p-2"
                    >
                        <div key='DialogChartPersistence_dialog_menu_period'
                            className="p-inputgroup flex-1 flex justify-content-center">
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
                        ref={dialogChartContent}
                        className="border-1 border-primary-500 p-10 min-h-full"
                    >

                        <HighchartsReact
                            highcharts={Highcharts}
                            ref={chartComponentRef}
                            options={options}
                            {...props}
                            containerProps={{ style: { height: { graphHeight } } }}
                        />
                    </div>
                </BlockUI>
            </Dialog>
        </>
    );
}