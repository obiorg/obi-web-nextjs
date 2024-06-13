'use client';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { Column, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { Admin, OBI } from '@/src/types/index';


import { Checkbox } from 'primereact/checkbox';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';


import { useSession, signIn, signOut } from 'next-auth/react'
import { InputText } from 'primereact/inputtext';

const Persistences = () => {



    const bodyTemplateId = (rowData: OBI.persistences) => {
        return <InputNumber
            value={rowData.id} disabled readOnly />
    }

    const bodyTemplateDeleted = (rowData: OBI.persistences) => {
        return (
            <Checkbox inputId={rowData.id + '_deleted'} checked={(rowData.deleted ? true : false)} />
        );
    }

    const bodyTemplateCreated = (rowData: OBI.persistences) => {
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

    const bodyTemplateChanged = (rowData: OBI.persistences) => {
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

    const bodyTemplateActivate = (rowData: OBI.persistences) => {
        return (
            <Checkbox inputId={rowData.id + '_activate'} checked={(rowData?.activate ? true : false)} />
        );
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



    const [entity, setEntity] = useState<OBI.persistences[]>([]);

    const columns: OBI.ColumnMeta[] = [
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deleted', header: 'Supp.', dataType: 'numeric', bodyTemplate: bodyTemplateDeleted, sortable: true, filter: true },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: bodyTemplateCreated, sortable: true, filter: true },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: bodyTemplateChanged, sortable: true, filter: true },

        { field: 'company', header: 'Société', dataType: 'numeric', sortable: true, filter: true },
        { field: 'tag', header: 'Tag', dataType: 'numeric', sortable: true, filter: true },

        { field: 'method', header: 'Méthode', dataType: 'text', sortable: true, filter: true },
        { field: 'activate', header: 'Activé.', dataType: 'numeric', bodyTemplate: bodyTemplateActivate, sortable: true, filter: true },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },

    ];


    const defaultMultiSortMeta: Array<DataTableSortMeta> = PersistencesService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = PersistencesService.defaultFilters();

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
            { field: 'tag', order: 1 },
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
            PersistencesService.getLazy(lazyEventSet).then((data) => {
                // On Good request process data count
                PersistencesService.getLazyCount(lazyEventSet).then((dataCount) => {
                    // console.log(dataCount, dataCount)
                    setTotalRecords(dataCount);
                });

                setEntity(data);
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
                        <span className="text-xl text-900 font-bold">Liste des archivages standard</span>

                        <div className='flex justify-content-center mb-0'>
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

        if (!entity) {
            return (
                <div className=''>
                    Il y a {entity ? "" + entity.length + "/" + totalRecords : 0} résultat(s).
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
                value={entity}
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

export default Persistences;
