'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { Column, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import { Admin, OBI } from '@/src/types/index';

import { LocationsService } from '@/src/obi/service/localisations/LocationsService';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';
import TableHeader from '@/src/obi/components/Tables/TableHeader';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import TableToolbar from '@/src/obi/components/Tables/TableToolbar';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import DropDownCountries from '../countries/components/dropdown';
import CountriesDropDown from '../countries/components/CountriesDropDown';


import { useRouter } from 'next/navigation';


const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');

const Locations = () => {


    const bodyTemplateDeleted = (rowData: OBI.locations) => {
        return <i className={classNames('pi', { 'true-icon pi-check text-red-600': rowData.deleted, 'false-icon pi-times text-green-600': !rowData.deleted })} />;
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


    const representativeFilterCountry = (options: OBI.loc_countries) => {
        console.log('Options', options);
        return <CountriesDropDown
            value={options.value}
            onChanged={(e: any) => {
                options.filterCallback(e.value);
            }}
        />;
    }


    const locationModel = new LocationsModel();
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

    // Manage columns
    const [columns, setColumns]: OBI.ColumnMeta[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: locationModel.intergerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.state, sortable: true, filter: true, filterElement: locationModel.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.date, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: locationModel.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.date, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: locationModel.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'location', header: 'Localisation', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },

        { field: 'group', header: 'Groupe', dataType: 'text', sortable: true, filter: true },
        { field: 'country', header: 'Pays', dataType: 'text', bodyTemplate: bodyTemplateCountry, sortable: true, filter: true, filterField: "country", showFilterMatchModes: false, filterPlaceholder: 'Chercher par pays', filterElement: representativeFilterCountry, },
        { field: 'state', header: 'Province', dataType: 'numeric', bodyTemplate: bodyTemplateState, sortable: true, filter: true },
        { field: 'city', header: 'Ville', dataType: 'numeric', bodyTemplate: bodyTemplateCity, sortable: true, filter: true },

        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'address1', header: 'Adresse 1', dataType: 'text', sortable: true, filter: true },
        { field: 'address3', header: 'Adresse 2', dataType: 'text', sortable: true, filter: true },
        { field: 'bloc', header: 'Bloc', dataType: 'text', sortable: true, filter: true },
        { field: 'floor', header: 'Etage', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'center' } },
        { field: 'number', header: 'Numéro', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'center' } },
    ]);

    // DataTable columns toggle
    const [selectedColumns, setSelectedColumns] = useState<any>(columns);
    const columnsRender = selectedColumns?.map((col: any, i: number) => {
        return <Column key={col.field} field={col.field} header={col.header} dataType={col.dataType}

            body={col.bodyTemplate ? col.bodyTemplate : col.body} sortable={col.sortable} style={col.style ? col.style : { width: '10%' }}
            filter={col.filter} filterField={col.field} filterPlaceholder={col.filterPlaceholder} filterElement={col.filterElement}
            showFilterMatchModes={col.showFilterMatchModes}
        />;
    });




    const [catalogs, setCatalogs] = useState<any>([]);






    const defaultMultiSortMeta: Array<DataTableSortMeta> = LocationsService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = LocationsService.defaultFilters();

    const [globalFilterValue, setGlobalFilterValue] = useState(null);

    const [lazyParams, setLazyParams] = useState(
        locationModel.
            getStandardParam({ field: 'location', order: 1 }, defaultFilters));




    const router = useRouter();
    let loadLazyTimeout = 0;
    /**
    * Loading data with lazy loading
    */
    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        console.log('lazyParams', lazyParams);

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            console.log('Lazy Event Set ', lazyEventSet.lazyEvent);

            // Get Lazy Data
            LocationsService.getLazy(lazyEventSet).then((data: any) => {
                console.log('Lazy Data', data);
                if (data.status && data.status !== 200) {
                    console.error('Error:', data.error);
                    // window.location.replace("./../../../../(full-page)/pages/connection/");
                    router.push('/(full-page)/pages/connection/')
                    setLoading(false);
                    return;
                } else {
                    console.log('lazyData no error', data);
                    // On Good request process data count
                    LocationsService.getLazyCount(lazyEventSet).then((dataCount: any) => {
                        // console.log(dataCount, dataCount)
                        setTotalRecords(dataCount);
                    });

                    setCatalogs(data);
                    setLoading(false);
                }
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    };



    useEffect(() => {
        loadLazyData();
    }, [lazyParams]);




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
        // Create new filter and restore global filter
        let params = {} as any;
        params = lazyParams;
        params.filters = event.filters;
        setLazyParams(() => { return { ...params } });
    }

    /**
     * Allow to reset filters
     */
    const clearFilter = () => {
        initFilters();
    };





    const onFilterDisplayChange = (e: any) => {
        console.log('onFilterDisplayChange ', e.value);
        const value = e.value;
        setFilterDisplay(value ? 'row' : 'menu');
        setLazyParams(lazyParams);
    }



    /**
 *
 */
    const initFilters = () => {
        // console.log('init', defaultFilters)
        let params = {} as any;
        params = lazyParams;
        // params.filters = defaultFilters;
        // params.filters.global.matchMode = 'contains';
        setLazyParams(() => { return { ...params } });
    };
    /**
     * Global filter reaction
     */
    useEffect(() => {
        let params = {} as any;
        params = lazyParams;
        params.filters.global.value = globalFilterValue;
        params.filters.global.matchMode = 'contains';
        setLazyParams(() => { return { ...params } });
    }, [globalFilterValue]);










    const header = () => {
        return (
            <>
                <TableHeader
                    title='Localisations'
                    catalogSelected={selectedCatalog}
                    onClear={clearFilter}
                    onSizeChanged={(e) => setSize(e.value)}
                    globalFilter={globalFilterValue}
                    // onGlobalFilterChanged={(valueFilter) => setGlobalFilterValue(valueFilter === '' ? null : valueFilter)}
                    deleteId={onDelete}

                    columns={columns}
                    onColumnChanged={(cols) => { setSelectedColumns(cols); }}
                />
            </>
        )
    }
    const footer = () => {

        if (!catalogs) {
            return (
                <div className=''>
                    Il y a {catalogs ? "" + catalogs.length + "/" + totalRecords : 0} résultat(s).
                </div>
            );
        } else {
            return (
                <div className=''>
                    Il y a {catalogs ? "" + catalogs.length + "/" + totalRecords : 0} résultat(s).
                </div>
            );
        }
        // return renderGlobalFilter();
    }
    const paginatorLeft = () => {
        //const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
        return (
            <div className="flex justify-content-between align-items-center">
            </div>
        )
    }
    const paginatorRight = () => {
        //const paginatorRight = <Button type="button" icon="pi pi-download" text />;
        return (
            <div className="flex justify-content-between align-items-center">
                <Button type="button" label='CSV' icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV" />
                <Button type="button" label='XLSX' icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                <Button type="button" label='PDF' icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </div>
        )
    }


    // Export / Import
    const dt = useRef(null);
    const exportCSV = (vale: boolean) => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            LocationsService.download(lazyEventSet).then((data: any) => {
                // dt.current.exportCSV(data);
                ExportsService.downloadAsCSV(data, "locations_" + Math.floor(Date.now() / 1000))
                setLoading(false);
            });
        }, Math.random() * 1000 + 500) as unknown as number;

    }
    const exportExcel = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            LocationsService.download(lazyEventSet).then((data: any) => {
                ExportsService.downloadAsXLSX(data, "locations_" + Math.floor(Date.now() / 1000))
                setLoading(false);
            });
        }, Math.random() * 1000 + 500) as unknown as number;

    }
    const exportPdf = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            LocationsService.download(lazyEventSet).then((data: any) => {
                const exportColumns = columns.map((col: any) => ({ title: col.header, dataKey: col.field }));
                const columnsStyle = {
                    0: { halign: 'right', valign: 'middle', fontSize: 8, cellPadding: 1, minCellWidth: 20, cellWidth: 'wrap' }, // id //fillColor: [0, 255, 0]
                    1: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    2: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
                    3: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
                    4: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }, // localisation
                    5: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    6: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    7: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },   // country
                    8: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    9: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' }, // ville
                    10: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    11: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    12: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    13: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    14: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
                    15: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }
                }
                ExportsService.downloadAsPdf(exportColumns, data, "locations_" + Math.floor(Date.now() / 1000) + '.pdf', columnsStyle);

                setLoading(false);
            });
        }, Math.random() * 1000 + 500) as unknown as number;

    }
    const onImportCSV = (e: any) => {
        // handle file upload and import logic here
        ExportsService.importCSV(e);
    };
    const onImportExcel = (e: any) => {
        // handle file upload and import logic here
        ExportsService.importExcel(e);
    };

    const onDelete = (id: number) => {
        LocationsService.delete(id).then(() => {
            console.log('Deleted successfully');
            loadLazyData();
        });
    };












    return (
        <div className='container-fluid p-0 m-0'>

            <TableToolbar
                catalogSelected={selectedCatalog}
                onClear={clearFilter}
                deleteId={onDelete}
                onReload={(e) => setLazyParams((lazyParams: any) => { return { ...lazyParams } })}
            />


            <DataTable
                id="dataTable"
                ref={dt}
                value={catalogs}
                selection={selectedCatalog}
                selectionMode="single"
                onSelectionChange={(e) => { setSelectedCatalog(e.value) }}

                lazy

                reorderableColumns

                emptyMessage="Aucun enregistrement trouvé !"

                // header and footer
                header={header}
                // footer={footer}

                // Chargement en cours
                loading={loading}

                // Taille
                size={size}
                resizableColumns

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


                {
                    columnsRender
                }
            </DataTable>
        </div >
    );
};

export default Locations;
