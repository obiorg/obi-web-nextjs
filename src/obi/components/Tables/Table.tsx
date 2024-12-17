'use client'


import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react';

import TableHeader from '@/src/obi/components/Tables/TableHeader';
import TableToolbar from '@/src/obi/components/Tables/TableToolbar';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { Admin } from '@/src/types/index';


import DialogError from '@/src/obi/components/Dialog/DialogError';
import { useRouter } from 'next/navigation';
import { ContextMenu } from 'primereact/contextmenu';


const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');


interface TableProps {
    title: string; // Title to use
    prefix: string;    //  The prefixed name to be use for files
    defaultParams: any,                 // a structural parameter model
    columns: any, // columns representings the table
    exportColumnsStyle: any, //use for export columns
    services: any,                // a service allowing request
}





export default function Table({
    title = 'Default Title',
    prefix = 'defaultPrefixe_',
    defaultParams,
    columns,
    exportColumnsStyle,
    services,
}: TableProps) {

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
    const [size, setSize] = useState<any>('small');
    const [filterDisplay, setFilterDisplay] = useState<any>('menu');
    const [stateStorage, setStateStorage] = useState<any>('session');
    const [dlgError, setDlgError] = useState<any>();


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




    const [globalFilterValue, setGlobalFilterValue] = useState(null);

    const [lazyParams, setLazyParams] = useState(defaultParams);



    const cm = useRef<any>(null);
    const router = useRouter()
    const menuModel = [
        { label: 'Nouveau', icon: 'pi pi-fw pi-plus', url: './create' },
        { label: 'Modifier', icon: 'pi pi-fw pi-file-edit', url: `./${selectedCatalog?.id}/update` },
        { label: 'Copier', icon: 'pi pi-fw pi-copy', url: `./${selectedCatalog?.id}/copy` },
        { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => onDelete(selectedCatalog?.id) },
        { label: 'Filtre reset', icon: 'pi pi-fw pi-filter-slash', command: () => clearFilter() },
        { label: 'Actualiser', icon: 'pi pi-fw pi-refresh', command: () => setLazyParams((lazyParams: any) => { return { ...lazyParams } }) },
        { label: 'Importer...', icon: 'pi pi-fw pi-file-import', url: './import' },
        {
            label: 'Exporter...', icon: 'pi pi-fw pi-file-export',
            items: [
                { label: 'Export CSV', icon: 'pi pi-fw pi-file', command: () => ExportsService.exportToCSV(services, lazyParams, prefix) },
                { label: 'Export Excel', icon: 'pi pi-fw pi-file-excel', command: () => ExportsService.exportToExcel(services, lazyParams, prefix) },
                { label: 'Export PDF', icon: 'pi pi-fw pi-file-pdf', command: () => ExportsService.exportToPDF(services, lazyParams, prefix, columns, exportColumnsStyle) },
            ]
        },
    ];

    let loadLazyTimeout: any = undefined;
    /**
    * Loading data with lazy loading
    */
    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        // console.log('lazyParams', lazyParams);

        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            // console.log('Lazy Event Set ', lazyParams);

            // Get Lazy Data
            services.getLazy(lazyEventSet).then((data: any) => {
                // console.log('Lazy Data', data);
                if (data.status && data.status !== 200) {
                    setDlgError(data);
                    return;
                } else {
                    // On Good request process data count
                    services.getLazyCount(lazyEventSet).then((dataCount: any) => {
                        setTotalRecords(dataCount);
                    });

                    setCatalogs(data);
                    setLoading(false);
                }
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    };


    useEffect(() => {
        lazyParams;
        loadLazyData();
    }, [lazyParams]);



    /**
     *
     * @param event for page changed
     */
    const onPage = (event: Admin.lazy) => {
        let params = lazyParams
        params.first = event.first;
        params.rows = event.rows;
        params.page = event.page;
        params.pageCount = event.pageCount;
        setLazyParams(() => { return { ...params } });
    }

    /**
     *
     * @param event on sorting changed
     */
    const onSort = (event: Admin.Lazy) => {
        let params = lazyParams
        params.multiSortMeta = event.multiSortMeta;
        setLazyParams(() => { return { ...params } });
    }

    /**
     *
     * @param event on filter applied
     */
    const onFilter = (event: Admin.Lazy) => {
        let params = lazyParams;
        params.filters = event.filters;
        setLazyParams(() => { return { ...params } });
    }

    /**
     * Allow to reset filters
     */
    const clearFilter = () => {
        let params = lazyParams;
        params.filters = defaultParams.filters;
        setLazyParams(() => { return { ...params } });
    };



    /**
     * Global filter reaction
     */
    const doGlobalFilterChanged = () => {
        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        loadLazyTimeout = setTimeout(() => {
            let params = lazyParams;
            params.filters.global.value = globalFilterValue ? globalFilterValue : null;
            params.filters.global.matchMode = 'contains';
            // console.log(params);
            setLazyParams(() => { return { ...params } });
        }, Math.random() * 1000 + 500) as unknown as number;
    }
    useEffect(() => {
        doGlobalFilterChanged();
    }, [globalFilterValue]);










    const header = () => {
        return (
            <>
                <TableHeader
                    title={title}
                    catalogSelected={selectedCatalog}
                    onClear={clearFilter}
                    globalFilter={globalFilterValue}
                    onGlobalFilterChanged={(valueFilter) => setGlobalFilterValue(valueFilter === '' ? null : valueFilter)}
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
    const paginatorLeft = <React.Fragment>

        <div className="flex justify-content-between align-items-center">
        </div>
    </React.Fragment>;
    const paginatorRight = <React.Fragment>

        <div className="flex justify-content-between align-items-center">
            <Button type="button" label='CSV' icon="pi pi-file" onClick={() => ExportsService.exportToCSV(services, lazyParams, prefix)} className="mr-2" data-pr-tooltip="CSV" />
            <Button type="button" label='XLSX' icon="pi pi-file-excel" onClick={() => ExportsService.exportToExcel(services, lazyParams, prefix)} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            <Button type="button" label='PDF' icon="pi pi-file-pdf" onClick={() => ExportsService.exportToPDF(services, lazyParams, prefix, columns, exportColumnsStyle)} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
        </div>
    </React.Fragment>;


    // Export / Import
    const dt = useRef(null);



    const onDelete = (id: number) => {
        services.delete(id).then(() => {
            // console.log('Deleted successfully');
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
                onSizeChanged={(e) => setSize(e.size)}
                onFilterModeChanged={(e: any) => setFilterDisplay(e.filterMode)}
                onStateStorageChanged={(e: any) => setStateStorage(e.stateStorage)}
                onImportFile={(e) => router.push('./import')}
                onExportCSV={(e: any) => ExportsService.exportToCSV(services, lazyParams, prefix)}
                onExportExcel={(e: any) => ExportsService.exportToExcel(services, lazyParams, prefix)}
                onExportPDF={(e: any) => ExportsService.exportToPDF(services, lazyParams, prefix, columns, exportColumnsStyle)}
            />

            <DialogError
                error={dlgError}
                onYes={(e: any) => { setLazyParams((lazyParams: any) => { return { ...lazyParams } }) }}
            />


            <ContextMenu model={menuModel} ref={cm}

            />

            <DataTable
                id="dataTable"
                ref={dt}
                value={catalogs}
                selection={selectedCatalog}
                selectionMode="single"
                onSelectionChange={(e) => { setSelectedCatalog(e.value) }}


                // Context menu
                onContextMenu={(e) => cm?.current?.show(e.originalEvent)}
                contextMenuSelection={selectedCatalog}
                onContextMenuSelectionChange={(e) => { setSelectedCatalog(e.value) }}


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
                // metaKeySelection={metaKey}
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

                // storage
                stateStorage={stateStorage} stateKey={stateStorage === 'session' ? "obi-dt-state-" + prefix + "-session" : "obi-dt-state-" + prefix + "-local"}

                tableStyle={{ minWidth: '50rem' }}


            >


                {
                    columnsRender
                }
            </DataTable>
        </div >
    );
};