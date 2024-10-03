'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
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
import HighchartsReact from 'highcharts-react-official';
import OutputRecord from '@/src/obi/components/Output/OutputRecord';
import { BlockUI } from 'primereact/blockui';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import PersistencesDropDown from '../../components/PersistencesDropDown';
import FieldInputNumber from '@/src/obi/components/Inputs/FieldInputNumber';
import { FloatLabel } from 'primereact/floatlabel';
import ButtonSave from '@/src/obi/components/Validations/ButtonSave';
import { useFormState } from 'react-dom';
import { PersistenceStandardModel } from '@/src/obi/models/persistences/PersistenceStandardModel';


// Define an interface for the form state
interface PersistenceStandardChartFormState {
    errors: {

        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];

        company?: string[];
        tag?: string[];
        method?: string[];

        activate?: string[];
        comment?: string[];

        rowAmount?: string[];
        dateFrom?: string[];
        dateTo?: string[];

        _form?: string[];
    };
}

const PersistanceStandard = () => {

    /**
     * Messages system
     */
    // Used for toast
    const toast = useRef<Toast>(null);
    const msg = useRef(null);

    // state management
    const [onMessage, setOnMessage] = useState(false);
    const [msgSeverity, setMsgSeverity] = useState('info'); // success, info, warn, error
    const [msgSummary, setMsgSummary] = useState('Info'); // info as default
    const [msgDetail, setMsgDetail] = useState('Default detail'); // Message Content as default
    const [msgSticky, setMsgSticky] = useState(false); //

    const doMsgPrompt = (severity: string, summary: string, message: string, sticky?: boolean) => {
        setMsgSeverity(severity);
        setMsgSummary(summary);
        setMsgDetail(message);
        setOnMessage(true);
    }

    const doMsgRemove = (e: any) => {
        setOnMessage(false);
    }

    useEffect(() => {
        {
            onMessage ?
                msg?.current?.show([
                    { sticky: msgSticky, life: 5000, severity: msgSeverity, summary: msgSummary, detail: msgDetail },
                ])
                : ''
        }
    }, [onMessage]);

    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, sticky: true, closable: false });
    }
    const showSuccess = (title: string, message: string) => {
        toast.current.show({ severity: 'success', summary: title, detail: message, life: 5000, closable: true });
    }

    /**
     * Block form mecanism
     */
    const [blockedFrom, setBlockedForm] = useState(false);
    const blockForm = () => {
        setBlockedForm(true);
    }

    const unBlockForm = () => {
        setBlockedForm(false);
    }


    /**
     * List of available tags in persistence save
     */
    const [selectedPersistence, setSelectedPersistence] = useState<any>();
    const [rowAmount, setRowAmount] = useState<number>(500000);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const [saveMode, setSaveMode] = useState(0); // 0: save and reset; 1: save
    const formRef = React.useRef();



    /**
     * Chart construction
     */
    var Highcharts = require('highcharts');
    const [data, setData] = useState();
    const [options, setOptions] = useState({
        chart: {
            zooming: {
                type: 'x'
            }
        },

        title: {
            text: selectedPersistence !== 0 ? "Persistence for " + selectedPersistence + " charts" : 'Selectionner une donnée persistente',
            align: 'left'
        },

        subtitle: {
            text: 'Evolution de .... avec un volume de ' + rowAmount,
            align: 'left'
        },

        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<{headingTagName}>' +
                    '{chartTitle}</{headingTagName}><div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>' +
                    '{yAxisDescription}</div>'
            }
        },

        tooltip: {
            valueDecimals: 2
        },

        xAxis: {
            type: 'datetime'
        },

        yAxis: [{ // Primary axis
            className: 'highcharts-color-0',
            title: {
                text: 'pH'
            }
        }],

        series: [{
            data: data,
            lineWidth: 0.5,
            name: 'pH'
        }],
    });



    // Managing long request wating
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    let loadLazyTimeout = useRef(null);
    const persistencesStandardModel = new PersistenceStandardModel();
    const defaultFilters: Array<DataTableFilterMeta> = PersistenceStandardService.defaultFilters();
    const [lazyParams, setLazyParams] = useState(
        persistencesStandardModel.
            getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'created', order: -1 }], defaultFilters));

    /**
     * Event on selected persistence
     */
    useEffect(() => {
        let _options = options;
        _options.title.text = selectedPersistence !== 0 ?
            "Persistence for " + selectedPersistence?.tags.comment + " charts" : 'Selectionner une donnée persistente';
        setOptions(() => { return { ..._options } });
    }, [selectedPersistence]);
    useEffect(() => {
        let _options = options;
        _options.subtitle.text = 'Evolution de ' + dateFrom + ' à ' + dateTo + ' avec un volume de ' + rowAmount;
        setOptions(() => { return { ..._options } });
    }, [rowAmount]);


    const loadChart = () => {
        console.log('Loading chart');
    }

    const [formState] = useFormState<PersistenceStandardChartFormState>(loadChart, { errors: {} })

    const controlForm = (): number => {
        let errCnt = 0;
        formState.errors = {};

        if (selectedPersistence === undefined || selectedPersistence === 0) {
            formState.errors.tag = ['Choisir un tag !'];
            errCnt++;
        }

        if (rowAmount === undefined || rowAmount === 0) {
            formState.errors.rowAmount = ['Choisir au moins 2 valeurs !'];
            errCnt++;
        }
        if (dateFrom === undefined || dateFrom === null) {

            errCnt++;
        }
        if (dateTo === undefined || dateTo === null) {

            errCnt++;
        }
        return errCnt;
    }

    const onSubmit = (e: any) => {
        console.log('onSubmit', e)
        e.preventDefault();


        if (controlForm() > 0) {
            doMsgPrompt('error', 'Erreur d\'application : ', 'Veuillez corriger les paramètres');
            return;
        }

        // Update lazy params
        let _lazyParams = lazyParams;
        _lazyParams.filters.tag.constraints[0].value = selectedPersistence ? selectedPersistence.tag : null;
        _lazyParams.filters.tag.constraints[0].matchMode = 'equals';
        _lazyParams.rows = rowAmount;
        _lazyParams.filters.created.constraints[0].value = dateFrom;
        _lazyParams.filters.created.constraints[0].matchMode = FilterMatchMode.DATE_AFTER;
        if(!_lazyParams.filters.created.constraints[1]){
            _lazyParams.filters.created.constraints.push({ value: null, matchMode: FilterMatchMode.DATE_BEFORE });
        }
        _lazyParams.filters.created.constraints[1].value = dateTo;
        _lazyParams.filters.created.constraints[1].matchMode = FilterMatchMode.DATE_BEFORE;
        setLazyParams(() => { return { ..._lazyParams } });

        setLazyLoading(true);
        blockForm();

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            PersistenceStandardService.getLazy(lazyEventSet).then((pers_standard: any) => {
                console.log(pers_standard);
                let _options = options;
                _options.series[0].data = pers_standard.map((p: OBI.pers_standard) => { return [Date.parse(p.created), p.vFloat]; });
                setOptions(() => { return { ..._options } });
                console.log('options', options);
                setLazyLoading(false);
                unBlockForm();
            }).catch((err) => {
                console.error('Error : ', err);
                setLazyLoading(false);
                unBlockForm();
            });


        }, Math.random() * 1000 + 250);
    }








    return (
        <>
            <div className="card">

                {/** Message toaster display */}
                <Toast ref={toast} />

                <Messages ref={msg} onRemove={doMsgRemove} />



                <h3>Persistence Standard - Analyse Graphique</h3>
                <hr />

                <BlockUI blocked={blockedFrom}>
                    <form
                        id="formId"
                        ref={formRef}
                        onSubmit={onSubmit}
                        className="p-fluid"
                    >
                        <div className="col-12 m-0 p-0">


                            {/** Persistence dropdown */}
                            <PersistencesDropDown
                                id='tag'
                                name='tag'
                                title='Persistence - Tag'
                                value={selectedPersistence?.id}
                                onChanged={(e: any) => {
                                    setSelectedPersistence(e.value);
                                }}
                                error={formState.errors?.tag}
                            />

                            {/** Row Amount */}
                            <FieldInputNumber
                                id="rowAmount"
                                name='rowAmount'
                                title='Volume de données'
                                value={rowAmount}
                                onChange={(e: any) => { setRowAmount(e.value); }}
                                placeholder="quantité valeur... : ex: 500"
                                tooltip="Nombre de donnée à collecter..."

                                error={formState.errors?.rowAmount}
                            />





                            {/** Date From */}
                            <div className="grid m-0 p-0 mb-2">
                                <div className='col-12 md:col-2 line-height-3'>
                                    <label htmlFor='dateRange' className="input-field">
                                        Du...
                                    </label>
                                </div>


                                <Calendar
                                    inputId='dateFrom'
                                    id='dateFrom'
                                    name='dateTo'
                                    value={dateFrom}
                                    onChange={(e) => { console.log(e.value); setDateFrom(e.value) }}

                                    locale='fr'
                                    dateFormat="dd/mm/yy"
                                    maxDate={dateFrom}
                                    className={'col-12 md:col-5  p-0 mb-0 input-value '}
                                    showTime
                                    showButtonBar
                                    showIcon
                                    hourFormat="24"
                                />
                            </div>



                            {/** Date To */}
                            <div className="grid m-0 p-0 mb-1">
                                <div className='col-12 md:col-2 line-height-3'>
                                    <label htmlFor='dateRange' className="input-field">
                                        Au...
                                    </label>
                                </div>

                                <Calendar
                                    inputId='dateTo'
                                    id='dateTo'
                                    name='dateTo'
                                    value={dateTo}
                                    onChange={(e) => { console.log(e.value); setDateTo(e.value) }}

                                    locale='fr'
                                    dateFormat="dd/mm/yy"
                                    minDate={dateFrom}
                                    className={'col-12 md:col-5  p-0 mb-0 input-value '}
                                    showTime
                                    showButtonBar
                                    showIcon
                                    hourFormat="24"
                                />


                            </div>



                            <div className="grid m-0 p-0 mb-1">
                                <div className='col-12 md:col-2 line-height-3'>
                                    <label htmlFor='dateRange' className="input-field">

                                    </label>
                                </div>




                                <ButtonSave
                                    labelsType0={['Appliquer', 'Appliquer']}
                                    labelsType1={['Appliquer', 'Appliquer']}
                                    icons={["pi pi-chart-line", "pi pi-chart-line"]}
                                    className={'col-12 md:col-5 p-2 mt-2 mb-2  mb-0 input-value '}
                                    type={1}
                                />

                            </div>




                        </div>
                    </form>
                </BlockUI>



            </div>

            <div className="card p-2">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </>
    );
};

export default PersistanceStandard;
