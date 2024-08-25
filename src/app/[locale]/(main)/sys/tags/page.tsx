'use client';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { Column, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { Admin, OBI } from '@/src/types/index';
// import { Admin } from '@/src/types/index';



import { Checkbox } from 'primereact/checkbox';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';



import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Link from 'next/link';
import { TagsService } from '@/src/obi/service/tags/TagsService';


const Tags = () => {

    const bodyTemplateDateTime = (rowData: any) => {
        if (rowData.length === 1) {
            return '';
        }
        var dateParts = rowData.changed.split('-')
        var jsDate = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2].substr(0, 2),
            dateParts[2].substr(3, 2),
            dateParts[2].substr(6, 2),
            dateParts[2].substr(9, 2)
        )
        return (
            <span>
                {jsDate.toLocaleDateString('fr') +
                    ' ' +
                    jsDate.toLocaleTimeString('fr')}
            </span>
        )
    }


    const bodyTemplateId = (rowData: OBI.tags) => {
        return <InputNumber
            value={rowData.id} disabled readOnly />
    }

    const bodyTemplateDeleted = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_deleted'} checked={(rowData.deleted ? true : false)} />
        );
    }

    const bodyTemplateCreated = (rowData: OBI.tags) => {
        if (rowData === undefined) {
            return '';
        }
        var dateParts = rowData.created.split('-')
        var jsDate = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2].substr(0, 2),
            dateParts[2].substr(3, 2),
            dateParts[2].substr(6, 2),
            dateParts[2].substr(9, 2)
        )
        return (
            <span>
                {jsDate.toLocaleDateString('fr') +
                    ' ' +
                    jsDate.toLocaleTimeString('fr')}
            </span>
        )
    }

    const bodyTemplateChanged = (rowData: OBI.tags) => {
        if (rowData.length === 1) {
            return '';
        }
        var dateParts = rowData.changed.split('-')
        var jsDate = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2].substr(0, 2),
            dateParts[2].substr(3, 2),
            dateParts[2].substr(6, 2),
            dateParts[2].substr(9, 2)
        )
        return (
            <span>
                {jsDate.toLocaleDateString('fr') +
                    ' ' +
                    jsDate.toLocaleTimeString('fr')}
            </span>
        )
    }

    const bodyTemplateActive = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_active'} checked={(rowData.active ? true : false)} />
        );
    }

    const bodyTemplateDelta = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_delta'} checked={(rowData.delta ? true : false)} />
        );
    }

    const bodyTemplateDeltaDateTime = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }

    const bodyTemplateVBool = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_vBool'} checked={(rowData.vBool ? true : false)} />
        );
    }

    const bodyTemplateVDateTime = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }

    const bodyTemplateVStamp = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }


    const bodyTemplateVDefault = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_vDefault'} checked={(rowData.vDefault ? true : false)} />
        );
    }

    const bodyTemplateVBoolDefault = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_vBoolDefault'} checked={(rowData.vBoolDefault ? true : false)} />
        );
    }

    const bodyTemplateVDateTimeDefault = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }

    const bodyTemplateVStampDefault = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }

    const bodyTemplateCounter = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_counter'} checked={(rowData.counter ? true : false)} />
        );
    }

    const bodyTemplateMeasure = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_measure'} checked={(rowData.measure ? true : false)} />
        );
    }

    const bodyTemplateLaboratory = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_laboratory'} checked={(rowData.laboratory ? true : false)} />
        );
    }

    const bodyTemplateFormula = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_formula'} checked={(rowData.formula ? true : false)} />
        );
    }

    const bodyTemplateError = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_error'} checked={(rowData.error ? true : false)} />
        );
    }

    const bodyTemplateErrorStamp = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }

    const bodyTemplateAlarmEnable = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_alarmEnable'} checked={(rowData.alarmEnable ? true : false)} />
        );
    }

    const bodyTemplatePersistenceEnabled = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_persistenceEnabled'} checked={(rowData.persistenceEnabled ? true : false)} />
        );
    }

    const bodyTemplatePersOffsetEnable = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_persOffsetEnable'} checked={(rowData.persOffsetEnable ? true : false)} />
        );
    }

    const bodyTemplatePersOffsetBool = (rowData: OBI.tags) => {
        return (
            <Checkbox inputId={rowData.id + '_persOffsetBool'} checked={(rowData.persOffsetBool ? true : false)} />
        );
    }

    const bodyTemplatePersOffsetDateTime = (rowData: OBI.tags) => {
        return bodyTemplateDateTime(rowData);
    }




    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const [selectionMode, setSelectionMode] = useState('multiple')
    const [selectedEntities, setSelectedEntities] = useState(null)
    const [selectedRepresentative, setSelectedRepresentative] = useState(null)
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [rowClick, setRowClick] = useState(true)
    const [sizeOptions] = useState<OBI.SizeOption[]>([
        { label: 'Petit', value: 'small' },
        { label: 'Normale', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState<string>(sizeOptions[0].value);
    const [filterDisplay, setFilterDisplay] = useState('menu')



    const [entities, setEntities] = useState<OBI.tags[]>([]);

    const columns: OBI.ColumnMeta[] = [
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deleted', header: 'Supp.', dataType: 'numeric', bodyTemplate: bodyTemplateDeleted, sortable: true, filter: true },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: bodyTemplateCreated, sortable: true, filter: true },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: bodyTemplateChanged, sortable: true, filter: true },

        { field: 'company', header: 'Société', dataType: 'numeric', sortable: true, filter: true },
        { field: 'table', header: 'Table', dataType: 'numeric', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'machine', header: 'Machines', dataType: 'numeric', sortable: true, filter: true },
        { field: 'type', header: 'Types', dataType: 'numeric', sortable: true, filter: true },
        { field: 'memory', header: 'Mémoire', dataType: 'numeric', sortable: true, filter: true },
        { field: 'db', header: 'DB', dataType: 'numeric', sortable: true, filter: true },
        { field: 'byte', header: 'Byte', dataType: 'numeric', sortable: true, filter: true },
        { field: 'bit', header: 'Bit', dataType: 'numeric', sortable: true, filter: true },
        { field: 'active', header: 'Activé', dataType: 'numeric', bodyTemplate: bodyTemplateActive, sortable: true, filter: true },
        { field: 'cycle', header: 'Cycle', dataType: 'numeric', sortable: true, filter: true },
        { field: 'delta', header: 'Delta ON', dataType: 'numeric', bodyTemplate: bodyTemplateDelta, sortable: true, filter: true },
        { field: 'deltaFloat', header: 'Delta float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaInt', header: 'Delta Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaBool', header: 'Delta Bool', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaDateTime', header: 'Delta Date Heure', dataType: 'date', bodyTemplate: bodyTemplateDeltaDateTime, sortable: true, filter: true },
        { field: 'vFloat', header: 'Val. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vInt', header: 'Val. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBool', header: 'Val. Bool', dataType: 'numeric', bodyTemplate: bodyTemplateVBool, sortable: true, filter: true },
        { field: 'vStr', header: 'Val. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTime', header: 'Val. Date Heure', dataType: 'date', bodyTemplate: bodyTemplateVDateTime, sortable: true, filter: true },
        { field: 'vStamp', header: 'Val. Stamp', dataType: 'date', bodyTemplate: bodyTemplateVStamp, sortable: true, filter: true },
        { field: 'vDefault', header: 'Val. Default On', dataType: 'numeric', bodyTemplate: bodyTemplateVDefault, sortable: true, filter: true },
        { field: 'vFloatDefault', header: 'Val. Def. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vIntDefault', header: 'Val. Def. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBoolDefault', header: 'Val. Def. Bool', dataType: 'numeric', bodyTemplate: bodyTemplateVBoolDefault, sortable: true, filter: true },
        { field: 'vStrDefault', header: 'Val. Def. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTimeDefault', header: 'Val. Def. D.H.', dataType: 'date', bodyTemplate: bodyTemplateVDateTime, sortable: true, filter: true },
        { field: 'vStampDefault', header: 'Val. Def. Stamp', dataType: 'date', bodyTemplate: bodyTemplateVStampDefault, sortable: true, filter: true },
        { field: 'counter', header: 'Compteur ON', dataType: 'numeric', bodyTemplate: bodyTemplateCounter, sortable: true, filter: true },
        { field: 'counterType', header: 'Type Compteur', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesure', header: 'Mesure On', dataType: 'numeric', bodyTemplate: bodyTemplateMeasure, sortable: true, filter: true },
        { field: 'mesureMin', header: 'Mesure Min.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesureMax', header: 'Mesure Max.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesureUnit', header: 'Mesure Unit', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mqtt_topic', header: 'MQTT TOPIC', dataType: 'text', sortable: true, filter: true },
        { field: 'webhook', header: 'WEBHOOK', dataType: 'text', sortable: true, filter: true },
        { field: 'laboratory', header: 'Laboratory ON', dataType: 'numeric', bodyTemplate: bodyTemplateLaboratory, sortable: true, filter: true },
        { field: 'formula', header: 'Formule ON', dataType: 'numeric', bodyTemplate: bodyTemplateFormula, sortable: true, filter: true },
        { field: 'formCalculus', header: 'Formule Calc.', dataType: 'text', sortable: true, filter: true },
        { field: 'formProcessing', header: 'Formule Processing', dataType: 'numeric', sortable: true, filter: true },
        { field: 'error', header: 'Error ON', dataType: 'numeric', bodyTemplate: bodyTemplateError, sortable: true, filter: true },
        { field: 'errorMsg', header: 'Error Msg', dataType: 'text', sortable: true, filter: true },
        { field: 'errorStamp', header: 'Error Stamp', dataType: 'date', bodyTemplate: bodyTemplateErrorStamp, sortable: true, filter: true },
        { field: 'alarmEnable', header: 'Alarme ON', dataType: 'numeric', bodyTemplate: bodyTemplateAlarmEnable, sortable: true, filter: true },
        { field: 'alarm', header: 'Alarme', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persistenceEnabled', header: 'Persistence ON', dataType: 'numeric', bodyTemplate: bodyTemplatePersistenceEnabled, sortable: true, filter: true },
        { field: 'persOffsetEnable', header: 'Pers. Offset ON', dataType: 'numeric', bodyTemplate: bodyTemplatePersOffsetEnable, sortable: true, filter: true },
        { field: 'persOffsetFloat', header: 'Pers. Offset Fl.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persOffsetInt', header: 'Pers. Offset Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persOffsetBool', header: 'Pers. Offset Bool', dataType: 'numeric', bodyTemplate: bodyTemplatePersOffsetBool, sortable: true, filter: true },
        { field: 'persOffsetDateTime', header: 'Pers. Offset D.H.', dataType: 'date', bodyTemplate: bodyTemplatePersOffsetDateTime, sortable: true, filter: true },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },
        { field: 'list', header: 'Liste', dataType: 'numeric', sortable: true, filter: true },
    ];







    const defaultMultiSortMeta: Array<DataTableSortMeta> = TagsService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = TagsService.defaultFilters();

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        pageCount: 0,
        pk: 'id',
        dataKey: 'id', // Create for datakey purpose
        selectionMode: 'multiple',
        sortMode: 'multiple' as string,
        sortField: '',
        sortOrder: -1,

        //multiSortMeta: defaultMultiSortMeta,
        multiSortMeta: [
            { field: 'id', order: -1 },
        ],

        filters: defaultFilters as unknown as DataTableFilterMeta,
    });



    let loadLazyTimeout = 0;

    useEffect(() => {
        loadLazyData();
    }, [lazyParams]);

    /**
     * Loading data with lazy loading
     */
    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            //console.log('Lazy Event Set ', lazyEventSet.lazyEvent);

            // Get Lazy Data
            TagsService.getLazy(lazyEventSet).then((data: any) => {
                // On Good request process data count
                TagsService.getLazyCount(lazyEventSet).then((dataCount: any) => {
                    // console.log(dataCount, dataCount)
                    setTotalRecords(dataCount);
                });

                // console.log('data', data);
                // console.log('error', data[0].error);
                // console.log('message', data.message);
                if (!data[0]?.error) {
                    setEntities(data);
                }else{
                    setEntities([]);
                }
                setLoading(false);
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    };


    /**
     * 
     * @param event for page changed
     */
    const onPage = (event: Admin.lazy) => {
        // console.log('onPage', event);
        lazyParams.first = event.first;
        lazyParams.rows = event.rows;
        lazyParams.page = event.page;
        lazyParams.pageCount = event.pageCount;
        // console.log('onPage LazyParams', lazyParams);
        setLazyParams(lazyParams);
        loadLazyData(); //
    }


    /**
     * 
     * @param event on sorting changed
     */
    const onSort = (event: Admin.Lazy) => {
        // console.log('onSort', event);
        lazyParams.multiSortMeta = event.multiSortMeta;
        setLazyParams(lazyParams);
        loadLazyData(); //
    }

    /**
     * 
     * @param event on filter applied
     */
    const onFilter = (event: Admin.Lazy) => {
        //  console.log('onFilter >> event.filters >> ', event.filters);
        //  console.log('onFilter >> First event.filters  key >> ', Object.keys(event.filters)[0]);

        // event['first'] = 0
        // console.log('onFilter event', event)
        // setLazyParams(event)

        // Create new filter and restore global filter
        let filters = {} as any;
        filters['global'] = lazyParams.filters["global"];

        // Loop overs all filters and keep only defined ones
        for (let j = 1; j < Object.keys(event.filters).length; j++) {
            // console.log('onFilter >> First event.filters  key['+ j + '] >> ', Object.keys(event.filters)[j] + ' >> ' + event.filters [Object.keys(event.filters)[j]].constraints[0].value);
            // Get corresponding field filter
            let filter = event.filters[Object.keys(event.filters)[j]];
            // Loop over contains existing filters
            for (let i = 0; i < filter.constraints.length; i++) {
                if (filter.constraints[i].value !== null) {
                    // console.log(filter);
                    filters[Object.keys(event.filters)[j]] = filter;
                }
            }
        }

        // console.log('filters :', filters);
        // Update Lazy parameters filters
        lazyParams.filters = filters;

        // Update data
        loadLazyData();
    }

    /**
     * Allow to reset filters
     */
    const clearFilter = () => {
        initFilters();
    };

    /**
     * 
     */
    const initFilters = () => {
        console.log('init', defaultFilters)
        lazyParams.filters = defaultFilters;
        setGlobalFilterValue('');
        loadLazyData();
    };


    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };


    const booleanItemTemplate = (option: any) => {
        return <Checkbox checked={option} disabled></Checkbox>;
        //return <Tag value={option} severity={getSeverity(option)} />;
    };











    /**
     * OnSortEvent is called when onSort event is called on the dataTable element.
     * @param {*} event 
     */
    const onSortEvent = (event: any) => {
        event.sortMode = lazyParams.sortMode;
        //console.log("lazyParams before event apply: ", lazyParams);
        setLazyParams(event);
        //console.log("lazyParams after event apply: ", lazyParams);
    }



    const onFilterDisplayChange = (e: any) => {
        console.log('onFilterDisplayChange ', e.value);
        const value = e.value;
        setFilterDisplay(value ? 'row' : 'menu');
        setLazyParams(lazyParams);
    }

    const onMetakeyChange = (e: any) => {
        const value = e.value
        setMetaKey(value)
    }

    const onRowSelect = (event: any) => {
        const value = event.data
        //console.log('onRowSelect : ', value)
    }

    const onRowUnselect = (event: any) => {
        const value = event.data
        //console.log('onRowUnselect  : ', value)
    }

    const onSelectionChange = (e: any) => {
        const value = e.value
        //console.log('onSelectionChange', value)
        setSelectedEntreprises(value)
        setSelectAll(value.length === totalRecords)
    }

    const onSelectAllChange = (event: any) => {
        const selectAll = event.checked
        //console.log('onSelectAllChange', event)
        if (selectAll) {
            entrepriseService.getEntreprises().then((data) => {
                //console.log('onSelectionChange Data', data)
                setSelectAll(true)
                setSelectedEntreprises(data)
            })
        } else {
            setSelectAll(false)
            setSelectedEntreprises([])
        }
    }

    // const representativeBodyTemplate = (rowData) => {
    //     return (
    //         <React.Fragment>
    //             <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
    //             <span className="image-text">{rowData.representative.name}</span>
    //         </React.Fragment>
    //     );
    // }

    // const countryBodyTemplate = (rowData) => {
    //     return (
    //         <React.Fragment>
    //             <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
    //             <span className="image-text">{rowData.country.name}</span>
    //         </React.Fragment>
    //     );
    // }

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...lazyParams.filters };

        _filters['global'].value = value;

        lazyParams.filters = _filters;
        setGlobalFilterValue(value);
        setLazyParams(lazyParams);

        loadLazyData()
    };








    const renderHeader = () => {
        return (
            <div className="container">
                <div className='row mb-3'>
                    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
                        <span className="text-xl text-900 font-bold">Liste des tags (connexions)</span>

                        <div className='flex justify-content-center mb-0'>


                            <Link href="./create" className='mr-2'>
                                <Button label="Ajouter" icon="pi pi-plus" severity="success" className=" mr-1" />
                            </Link>
                            <Button label="Delete" icon="pi pi-trash" severity="danger" disabled={!selectedEntities || !(selectedEntities as any).length}
                                className=" mr-3" />

                            <Button type="button" icon="pi pi-filter-slash" label="Effacer" outlined onClick={clearFilter} />
                        </div>
                    </div>
                </div>





                <div className="flex justify-content-between align-items-center">
                    <div className="flex justify-content-between align-items-center">

                        <SelectButton value={size} onChange={(e) => setSize(e.value)} options={sizeOptions} />
                        <Button icon="pi pi-refresh" raised rounded className='ml-2' />

                    </div>

                    <div className="flex justify-content-center align-items-center mb-0 gap-2">
                        <div className="col-md-2">
                            <span>
                                <label>Metakey</label>
                                <InputSwitch
                                    checked={metaKey}
                                    onChange={onMetakeyChange}
                                />
                            </span>
                            <span>
                                {metaKey === true ? 'Oui' : 'Non'}
                            </span>
                        </div>

                        <div className="col-md-2">
                            <label>Row Click</label>{' '}
                            <InputSwitch
                                checked={rowClick}
                                onChange={(e) => setRowClick(e.value)}
                            />
                            <span>{rowClick === true ? 'Oui' : 'Non'}</span>
                        </div>

                        <div className="col-md-2">
                            <label>Filter Row</label>{' '}
                            <InputSwitch
                                checked={filterDisplay === 'row'}
                                onChange={onFilterDisplayChange}
                            />
                            <span>{filterDisplay === 'menu' ? 'Menu' : 'Ligne'}</span>
                        </div>
                    </div>


                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Valeur recherché..."
                        />
                    </span>

                </div>
            </div>


        )
    }

    const renderFooter = () => {

        if (!entities) {
            return (
                <div className=''>
                    Il y a {entities ? "" + entities.length + "/" + totalRecords : 0} résultat(s).
                </div>

            );
        }
        // return renderGlobalFilter();
    }

    const renderPaginatorLeft = () => {
        //const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Do action refresh</h5>
            </div>
        )
    }

    const renderPaginatorRight = () => {
        //const paginatorRight = <Button type="button" icon="pi pi-download" text />;
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Do action download</h5>

            </div>
        )
    }




    const header = renderHeader()
    const footer = renderFooter()
    const paginatorLeft = renderPaginatorLeft();
    const paginatorRight = renderPaginatorRight();








    return (
        <div className='container-fluid'>



            <DataTable
                id="dataTable"
                value={entities}
                lazy

                emptyMessage="Aucun enregistrement trouvé !"

                // header and footer
                header={header}
                footer={footer}

                // Chargement en cours
                loading={loading}

                // Taille 
                size={size}

                // Affichage de grille
                showGridlines

                // Affichage striée des lignes
                stripedRows

                // Filter 
                filterDisplay={filterDisplay}
                filters={lazyParams.filters}
                onFilter={onFilter}


                // SortMode
                sortMode={lazyParams.sortMode}  //"multiple" // / !\ require metakey
                dataKey={lazyParams.dataKey}    //"ad_id"
                metaKeySelection={metaKey}
                multiSortMeta={lazyParams.multiSortMeta}    // Default
                removableSort
                onSort={onSort}

                // Pagination
                first={lazyParams.first}
                paginator rows={lazyParams.rows} rowsPerPageOptions={[5, 10, 15, 25, 50, 100, 500, 1000]}
                //paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink  Page : JumpToPageInput"
                currentPageReportTemplate="{first} à {last} sur {totalRecords} "
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                totalRecords={totalRecords}
                onPage={onPage}

                tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} dataType={col.dataType}
                        filter={col.filter} filterField={col.field} filterPlaceholder={col.filterPlaceholder}
                        body={col.bodyTemplate} sortable={col.sortable} />
                ))}
            </DataTable>
        </div >
    );
};

export default Tags;
