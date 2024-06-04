'use client';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';

import { PersStandardService } from '@/obi/service/persistence/PersStandard';
import { OBI } from '@/types/obi';



import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import type { ChartDataState, ChartOptionsState } from '@/types';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { PersistenceService } from '@/obi/service/persistence/PersistenceService';


const PersStandard = () => {

    /**
     * Design input
     */
    const [totalRecords, setTotalRecords] = useState(0);
    const [tag, setTag] = useState(0);
    const [tagTotalRecords, setTagTotalRecords] = useState(0);


    /**
     * Persistence
     */
    const [persistence, setPersistence] = useState<OBI.persistence[]>([]);
    // const getPersistence = (data: OBI.persistence[]) => {
    //     return [...(data || [])].map((d) => {
    //         return d;
    //     });
    // };
    const [selectedTag, setSelectedTag] = useState<any>(null);
    // const getSelectedTag = (data: OBI.tags[]) => {
    //     console.log("Data: " + data);
    //     return [...(data || [])].map((d) => {
    //         return d;
    //     });
    // };
    /**
     * Persistence Method element
     */
    const [pointCollect, setPointCollect] = useState(60);
    const [pers_standard, setPersStandard] = useState<OBI.pers_standard[]>([]);
    // const getPersStandard = (data: OBI.pers_standard[]) => {
    //     return [...(data || [])].map((d) => {
    //         // d.created = new Date(d.created);
    //         return d;
    //     });
    // };


    /**
     * Chart élément
     * 
     */
    const [options, setOptions] = useState<ChartOptionsState>({});
    const [data, setChartData] = useState<ChartDataState>({});



    useEffect(() => {
        // Count total amount of persistence with method standard
        PersStandardService.count().then((data) => {
            setTotalRecords(data);
        });
    }, [])

    useEffect(() => {
        // Get list of available persistence
        PersistenceService.findAll().then((data) => {
            setPersistence(data);
        });
    }, []);

    useEffect(() => {
        // console.log(tag);
        if (tag !== null) {
            // console.log("Now call persistence service")
            PersStandardService.findByTags(tag, 0, pointCollect, 'desc').then((data) => {
                setPersStandard(data);
            });
        } else {
            console.log("Tag is not defined", tag);
        }
    }, [tag, pointCollect]);


    useEffect(() => {

        // PART CONCERN CHART
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';

        const lineData: ChartData = {
            labels: pers_standard.map(p => p.created),
            datasets: [
                {
                    label: 'Tag (' + tag + ')',
                    data: pers_standard.map(p => p.vFloat),
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
                    borderColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
                    tension: 0.1
                },
            ]
        };
        const lineOptions: ChartOptions = {
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
                    border: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    },
                    border: {
                        display: false
                    }
                }
            }
        };


        setOptions({
            lineOptions,
        });
        setChartData({
            lineData,
        });

    }, [tag, pers_standard]);





    // }, []);

    const handleTagChanged = (e: any) => {
        setTag(e.value);
        setSelectedTag('{id:' + e.value + ', name: "-"}');

    };



    const handleChangedTag = (e: { value: any }) => {
        console.log(e.value);
        setSelectedTag(e.value);
        setTag(e.value.id);
    };

    const handleChangePointCollect = (e: any) => {
        setPointCollect(e.value);
    };



 




    return (
        <div className="grid">

            <p>Nombre total d enregistrement : {totalRecords}</p>


            <div className="col-12">
                <div className="card">
                    <h5>Persistence Standard</h5>

                    <label htmlFor="inputTag">Id Tag : </label>

                    <InputNumber inputId="inputTag" value={tag}
                        onValueChange={(e) => handleTagChanged(e)}
                        mode="decimal"
                        min={0} max={100}
                        showButtons
                    />

                    = {tagTotalRecords}  enregistrement(s)
                    <br />
                    <label htmlFor="selectedTag">Tag : </label>
                    <Dropdown inputId='selectedTag'
                        value={selectedTag}
                        optionLabel="name"
                        options={persistence.map(p => p.tags)}
                        placeholder='Sélectionner un tag'
                        onChange={handleChangedTag}
                    />

                    <label htmlFor="inputPointCollect">Nombre de point: </label>

                    <InputNumber inputId="inputPointCollect" value={pointCollect}
                        onValueChange={(e) => handleChangePointCollect(e)}
                        mode="decimal"
                        min={1} 
                        showButtons
                    />


                    <div className="col-12">
                        <div className="card">
                            <h5>Linear Chart</h5>
                            <Chart type="line"
                                data={data.lineData}
                                options={options.lineOptions}
                            ></Chart>
                        </div>
                    </div>



                    {/* <DataTable value={pers_standard}>
                        <Column field="id" header="N°"></Column>
                        <Column field="deleted" header="Suppression"></Column>
                        <Column field="created" header="Créée le"></Column>
                        <Column field="changed" header="Changée le"></Column>
                        <Column field="company" header="Société"></Column>
                        <Column field="tag" header="Tag"></Column>
                        <Column field="vFloat" header="Float"></Column>
                        <Column field="vInt" header="Integer"></Column>
                        <Column field="vBool" header="Boolean"></Column>
                        <Column field="vStr" header="String"></Column>
                        <Column field="vDateTime" header="Date Heure"></Column>
                        <Column field="vStamp" header="Stamp"></Column>
                        <Column field="stampStart" header="Stamp Début"></Column>
                        <Column field="stampEnd" header="Stamp Fin"></Column>
                        <Column field="tbf" header="TBF"></Column>
                        <Column field="ttr" header="TTR"></Column>
                        <Column field="error" header="Erreur"></Column>
                        <Column field="errorMsg" header="Message"></Column>

                    </DataTable> */}

                </div>
            </div>







        </div>
    );
};

export default PersStandard;
