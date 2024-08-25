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

import { OBI } from '@/src/types/obi';



import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import type { ChartDataState, ChartOptionsState } from '@/src/types';
import { LayoutContext } from '@/src/layout/context/layoutcontext';
import { PersistenceStandardService } from '@/src/obi/service/persistences/PersistenceStandardService';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { Skeleton } from 'primereact/skeleton';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService';
import { Model } from '@/src/obi/models/model';


const PersistanceStandard = () => {

    /**
     * Design input
     */
    const [totalRecords, setTotalRecords] = useState(0);
    const [tag, setTag] = useState(0);
    const [activePersistence, setActivePersistence] = useState(null);
    const [tagTotalRecords, setTagTotalRecords] = useState(0);


    /**
     * Persistence
     */
    const [persistences, setPersistences] = useState<OBI.persistences[]>([]);
    // const getPersistence = (data: OBI.persistences[]) => {
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



    /**
     * Count total amount of persistences with method standard
     */
    useEffect(() => {
        // Count total amount of persistences with method standard
        PersistenceStandardService.count().then((data) => {
            setTotalRecords(data);
        });

    }, [])

    /**
     * Get list of available persistences
     */
    useEffect(() => {
        // Get list of available persistence
        PersistencesService.findAll().then((data: OBI.persistences[]) => {
            // console.log(data)

            setPersistences(data);
        });
    }, []);


    useEffect(() => {
        // console.log(tag);
        if (tag !== undefined && tag !== null) {
            // console.log("Now call persistence service")
            PersistenceStandardService.findByTags(tag, 0, pointCollect, 'desc').then((data) => {
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
            labels: pers_standard.map((p) => p?.created),
            datasets: [
                {
                    label: 'Tag (' + tag + ')',
                    data: pers_standard.map((p) => p.vFloat),
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
        setSelectedTag(e.value);
        setTag(e.value);
    };

    const handleChangePointCollect = (e: any) => {
        setPointCollect(e.value);
    };


    const globalModel = new Model();
    const modelTag = new TagsModel();
    const [tagEntity, setTagEntity] = useState(modelTag.defaults);
    const [lazyItemsTags, setLazyItemsTags] = useState<any>([]);
    const [lazyItemsPersistences, setLazyItemsPersistences] = useState<OBI.persistences[]>([]);
    const [lazyLoading, setLazyLoading] = useState<any>(false);

    let loadLazyTimeout = 0;
    const [loading, setLoading] = useState(false);
    const [lazyParamsTags, setLazyParamsTags] = useState(globalModel.getStandardParam());
    const [lazyParamsPersistences, setLazyParamsPersistences] = useState(globalModel.getStandardParam());

    /**
     * Handle changes on drowpdown, input and number
     */
    const onChangedInputTags = (e: any) => {
        const { label, value, entity } = lazyItemsPersistences[e.target.value];

        setSelectedTag(entity.tag);
        setTag(entity.tag);
        setActivePersistence(value);
    }






    const loadLazyDataTags = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParamsTags) };

            // Get Lazy Data
            TagsService.getLazy(lazyEventSet).then((data: any) => {

                if (data?.length > 0) {
                    let _lazyItems = [data];
                    for (let i = lazyParamsTags.first; i < data.length; i++) {
                        _lazyItems[i] = {
                            label: data[i].name + ' - ' + data[i].comment + ' -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsTags(_lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadTags = (event: any) => {
        lazyParamsTags.first = event.first;
        lazyParamsTags.rows = event.last === 0 ? 10 : event.last;
        loadLazyDataTags();
        // setLazyLoading(false);
    };

    useEffect(() => {
        loadLazyDataTags();
        // setLazyLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps






    const loadLazyDataPersistences = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParamsPersistences) };

            // Get Lazy Data
            PersistencesService.getLazyInc(lazyEventSet).then((data: any) => {
                // console.log('persistences inc', data);
                if (data?.length > 0) {
                    let _lazyItems = [data];
                    // console.log(_lazyItems)
                    for (let i = lazyParamsPersistences.first; i < data.length; i++) {
                        _lazyItems[i] = {
                            label: data[i].tags?.name + ' - ' + data[i].tags?.comment + '(' + data[i].tags?.id + ') -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsPersistences(_lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadPersistences = (event: any) => {
        // console.log('onLazyLoadPersistences', event);
        lazyParamsTags.first = event.first;
        lazyParamsTags.rows = event.last === 0 ? 10 : event.last;
        loadLazyDataPersistences();
        // setLazyLoading(false);
    };

    useEffect(() => {
        loadLazyDataPersistences();
        // setLazyLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    return (
        <div className="grid col-12">
            <div className="card col-12">
                <h3>Persistence Standard - Analyse Graphique</h3>

                <p>Nombre total d enregistrement : {totalRecords}</p>

                {/** Référence Tag Id */}
                <div className='col-12 grid'>

                    <label className='md:col-2' htmlFor="inputTag">
                        Id Tag :
                    </label>

                    <InputNumber
                        inputId="inputTag"
                        className='md:col-6'
                        value={tag}
                        onValueChange={(e) => handleTagChanged(e)}
                        mode="decimal"
                        min={0} max={100}
                        showButtons
                    />

                    <label className='col-2'>
                        = {tagTotalRecords}  enregistrement(s)
                    </label>

                </div>

                {/** Référence Tag Id - List */}
                <div className='col-12 grid'>

                    <label className='md:col-2' htmlFor="selectedTag">
                        Tag :
                    </label>

                    <Dropdown
                        inputId='selectedTag'
                        className='md:col-6'
                        value={selectedTag}
                        options={persistences.map(persistence => persistence.tag)}
                        placeholder='Sélectionner un tag'
                        onChange={handleChangedTag}
                    />


                    <label className='col-2'>
                        actual selection id : {selectedTag}
                    </label>
                </div>

                {/** Référence Tag Id - lazy List */}
                <div className='col-12 grid'>

                    <label className='md:col-2' htmlFor="tags">
                        Tag :
                    </label>

                    <Dropdown id='tags'
                        name='tags'
                        value={activePersistence}
                        options={lazyItemsPersistences}

                        className='col-12 md:col-6  mb-2 input-value'

                        onChange={onChangedInputTags}
                        virtualScrollerOptions={{
                            lazy: true,
                            onLazyLoad: onLazyLoadPersistences,
                            itemSize: 28,
                            showLoader: true,
                            loading: lazyLoading, delay: 250,
                            loadingTemplate: (options) => {
                                return (
                                    <div className="flex align-items-center p-2" >
                                        <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                    </div>
                                )
                            }
                        }}
                        placeholder="Sélectionner"
                        // required
                        tooltip='Specifier le driver de la machine'
                        tooltipOptions={{ position: 'top' }}
                    />


                    <label className='col-2'>
                        entity.id : {tagEntity.id}
                    </label>
                </div>

                {/** Point - to collect */}
                <div className='col-12 grid'>

                    <label className='md:col-2' htmlFor="inputPointCollect">
                        Nombre de point:
                    </label>

                    <InputNumber
                        inputId="inputPointCollect"
                        className='col-12 md:col-6  mb-2 input-value'
                        value={pointCollect}
                        onValueChange={(e) => handleChangePointCollect(e)}
                        mode="decimal"
                        min={1}
                        showButtons
                    />

                </div>

                {/** Graphique */}
                <div className="card col-12">
                    <h4>Linear Chart</h4>
                    <Chart type="line"
                        data={data.lineData}
                        options={options.lineOptions}
                    ></Chart>
                </div>




            </div>
        </div>
    );
};

export default PersistanceStandard;
