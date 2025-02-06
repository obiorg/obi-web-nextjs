'use client';

import 'moment-timezone';
import { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { TagsService } from "../../service/tags/TagsService";
import ReactIcons from "../Icons/ReactIcons";
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { BlockUI } from 'primereact/blockui';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { PersistencesStandardsService } from '../../service/persistences/PersistencesStandardsService';
import { SelectButton } from 'primereact/selectbutton';


// Define the props that the PostForm component expects
interface DialogChartPersistenceProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component

    title?: string;                      // preceding title of dropdown

    tags: number[];         // Table containing tags number in the order Volume, Pression, T°middle, T°Bottom, State
    units: string[]; // Table containing units in corresponding to each tags
    patterns?: number[]; // Define the patterns corresponding to each tags

    visible?: boolean; // enable automatic refresh defaulat true
    onChangedVisible?: (e: boolean) => void; // The callback function to be called when the button is clicked
}


export default function DialogChartPersistence(
    {
        id,
        name,
        title = 'Titre Graphique de persistance',
        tags,
        units,

        visible = false,
        onChangedVisible,

    }: DialogChartPersistenceProps) {


    const [update, setUpdate] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [hours, setHours] = useState(24);
    const [days, setDays] = useState(7);
    const [months, setMonths] = useState(12);
    const [period, setPeriod] = useState(0);
    const [loading, setLoading] = useState(false);

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
        { name: 'Heure', value: 0 },
        { name: 'Jour', value: 1 },
        // { name: 'Semaine', value: 2 },
        { name: 'Mois', value: 3 },
        // { name: 'Année', value: 4 }
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
                    },
                    // type: 'time',
                    // time:{
                    //     displayFormats: {
                    //         quarter: 'DD/MM/YYYY'
                    //     }
                    // }
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
            let tag = tags[0];
            setLoading(true);
            if (period === 0) {
                onHoursChange(tag, hours);
            } else if (period === 1) {
                onDaysChange(tag, days);
            } else if (period === 3) {
                onMonthsChange(tag, months);
            }
        }




    }, [visible, update, period, hours, days, months]);

    const onHoursChange = (tag: number, limits: number) => {
        const documentStyle = getComputedStyle(document.documentElement);
        PersistencesStandardsService.averageMinMaxHours(tag, limits).then((data: any) => {
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
            setLoading(false);
        });
    }

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image="../../../../public/layout/images/obi/obi-signet-dim.svg" shape="circle" />
            <span className="font-bold white-space-nowrap">{title}</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Actualiser" icon="pi pi-refresh" onClick={() => setUpdate(!update)} autoFocus />
            <Button label="Ok" icon="pi pi-check" onClick={() => onChangedVisible && onChangedVisible(false)} autoFocus />
        </div>
    );


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
                            {period === 0 ?
                                <SelectButton key={'DialogChartPersistence_dialog_menu_SelectHours_' + id} value={hours} onChange={(e) => setHours(e.value)} optionLabel="name" options={hoursItems} />
                                :
                                period === 1 ?
                                    <SelectButton key={'DialogChartPersistence_dialog_menu_SelectDays_' + id} value={days} onChange={(e) => setDays(e.value)} optionLabel="name" options={daysItems} />
                                    :
                                    period === 3 &&
                                    <SelectButton key={'DialogChartPersistence_dialog_menu_SelectMonths_' + id} value={months} onChange={(e) => setMonths(e.value)} optionLabel="name" options={monthsItems} />
                            }
                        </div>

                    </div>
                    <Chart key={'DialogChartPersistence_dialog_charts_' + id} type="line" className='card flex justify-content-center' data={chartData} options={chartOptions} />

                </BlockUI>
            </Dialog>
        </>
    );
}