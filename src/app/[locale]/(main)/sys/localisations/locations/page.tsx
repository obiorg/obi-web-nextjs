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
import { LocationsService } from '@/src/obi/service/localisations/LocationsService';
import { Password } from 'primereact/password';
import Link from 'next/link';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';
import TableHeader from '@/src/obi/components/Tables/TableHeader';


const Locations = () => {



    const bodyTemplateId = (rowData: OBI.locations) => {
        return <InputNumber
            value={rowData.id} disabled readOnly />
    }

    const bodyTemplateDeleted = (rowData: OBI.locations) => {
        return (
            <Checkbox inputId={rowData.id + '_deleted'} checked={(rowData.deleted ? true : false)} />
        );
    }

    const bodyTemplateCreated = (rowData: OBI.locations) => {
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

    const bodyTemplateChanged = (rowData: OBI.locations) => {
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



    const bodyTemplateCountry = (rowData: OBI.locations) => {
        return <label>
            {rowData.loc_countries?.name + ' - '
                + rowData.loc_countries?.iso3
                + ' [' + rowData.loc_countries?.id + ']'} </label>
    }


    const bodyTemplateState = (rowData: OBI.locations) => {
        return <label>
            {rowData.loc_states?.name + ' - '
                + rowData.loc_states?.iso2
                + ' [' + rowData.loc_states?.id + ']'} </label>
    }


    const bodyTemplateCity = (rowData: OBI.locations) => {
        return <label>
            {rowData.loc_cities?.name + ' [' + rowData.loc_cities?.id + ']'} </label>
    }


    const bodyTemplateFloor = (rowData: OBI.locations) => {
        return <InputNumber
            value={rowData.floor} disabled readOnly />
    }







    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCatalog, setSelectedCatalog] = useState<OBI.locations>(null);

    const [selectionMode, setSelectionMode] = useState('multiple')
    const [selectedCatalogs, setSelectedCatalogs] = useState(null)
    const [selectedRepresentative, setSelectedRepresentative] = useState(null)
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [rowClick, setRowClick] = useState(true)

    const [size, setSize] = useState<string>('small');
    const [filterDisplay, setFilterDisplay] = useState('menu')





    const [catalogs, setCatalogs] = useState<any>([]);

    const columns: OBI.ColumnMeta[] = [
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deleted', header: 'Supp.', dataType: 'numeric', bodyTemplate: bodyTemplateDeleted, sortable: true, filter: true },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: bodyTemplateCreated, sortable: true, filter: true },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: bodyTemplateChanged, sortable: true, filter: true },

        { field: 'location', header: 'Localisation', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },

        { field: 'group', header: 'Groupe', dataType: 'text', sortable: true, filter: true },
        { field: 'country', header: 'Pays', dataType: 'numeric', bodyTemplate: bodyTemplateCountry, sortable: true, filter: true },
        { field: 'state', header: 'Province', dataType: 'numeric', bodyTemplate: bodyTemplateState, sortable: true, filter: true },
        { field: 'city', header: 'Ville', dataType: 'numeric', bodyTemplate: bodyTemplateCity, sortable: true, filter: true },

        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'address1', header: 'Adresse 1', dataType: 'text', sortable: true, filter: true },
        { field: 'address3', header: 'Adresse 2', dataType: 'text', sortable: true, filter: true },
        { field: 'bloc', header: 'Bloc', dataType: 'text', sortable: true, filter: true },
        { field: 'floor', header: 'Etage', dataType: 'numeric', sortable: true, filter: true },
        { field: 'number', header: 'Numéro', dataType: 'text', sortable: true, filter: true },
    ];







    const defaultMultiSortMeta: Array<DataTableSortMeta> = LocationsService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = LocationsService.defaultFilters();

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const locationModel = new LocationsModel();
    const [lazyParams, setLazyParams] = useState(
        locationModel.
            getStandardParam({ field: 'location', order: 1 }, defaultFilters));




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
            LocationsService.getLazy(lazyEventSet).then((data: any) => {
                // On Good request process data count
                LocationsService.getLazyCount(lazyEventSet).then((dataCount: any) => {
                    // console.log(dataCount, dataCount)
                    setTotalRecords(dataCount);
                });

                setCatalogs(data);
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
        console.log('onRowSelect : ', value)
    }

    const onRowUnselect = (event: any) => {
        const value = event.data
        //console.log('onRowUnselect  : ', value)
    }

    const onSelectionChange = (e: any) => {
        const value = e.value
        console.log('onSelectionChange', value)
        // setSelectedEntreprises(value)
        // setSelectAll(value.length === totalRecords)
        setSelectedCatalog(e.value);
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



    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...lazyParams.filters };

        _filters['global'].value = value;

        lazyParams.filters = _filters;
        setGlobalFilterValue(value);
        setLazyParams(lazyParams);

        loadLazyData()
    };










    const renderFooter = () => {

        if (!catalogs) {
            return (
                <div className=''>
                    Il y a {catalogs ? "" + catalogs.length + "/" + totalRecords : 0} résultat(s).
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




    const header = () => {
        return (
            <TableHeader
                title='Localisations'
                catalogSelected={selectedCatalog}
                onClear={clearFilter}
                onSizeChanged={(e) => setSize(e.value)}
                onGlobalFilterChanged={(e) => setGlobalFilterValue(e.value)}
            />
        )
    }
    const footer = renderFooter()
    const paginatorLeft = renderPaginatorLeft();
    const paginatorRight = renderPaginatorRight();








    return (
        <div className='container-fluid'>



            <DataTable
                id="dataTable"
                value={catalogs}
                selection={selectedCatalog}
                selectionMode="single"
                onSelectionChange={onSelectionChange}
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

export default Locations;
