'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { Column, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { Button } from 'primereact/button';

import { Admin, OBI } from '@/src/types/index';

import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import TableHeader from '@/src/obi/components/Tables/TableHeader';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import TableToolbar from '@/src/obi/components/Tables/TableToolbar';


import DialogError from '@/src/obi/components/Dialog/DialogError';
import { ContextMenu } from 'primereact/contextmenu';
import { useRouter } from 'next/navigation';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Machines = () => {


    const mqttPasswordtemplate = (rowData: any) => {
        let p = '*';
        for (let i = 0; i < rowData.mqtt_password?.length; i++)
            p += '*';
        return <label>{p}</label>
    }

    const webhookSecretetemplate = (rowData: any) => {
        let p = '*';
        for (let i = 0; i < rowData.webhook_secret?.length; i++)
            p += '*';
        return <label>{p}</label>
    }

    const model = new MachinesModel();
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [size, setSize] = useState<string>('small');
    const [filterDisplay, setFilterDisplay] = useState('menu');
    const [stateStorage, setStateStorage] = useState('session');
    const [dlgError, setDlgError] = useState();
    // Manage columns
    const [columns, setColumns]: OBI.ColumnMeta[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'text', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Chercher une société', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'mask', header: 'Mask', dataType: 'text', sortable: true, filter: true },
        { field: 'dns', header: 'DNS', dataType: 'text', sortable: true, filter: true },
        { field: 'ipv6', header: 'IPv6', dataType: 'text', sortable: true, filter: true },
        { field: 'port', header: 'Port', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'rack', header: 'Rack', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'slot', header: 'Slot', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'driver', header: 'Driver', dataType: 'text', bodyTemplate: templateHelper.country, sortable: true, filter: true, filterField: "driver", showFilterMatchModes: false, filterPlaceholder: 'Chercher par driver', filterElement: sysComponentsHelper.machines_drivers_lazyFilter },
        { field: 'mqtt', header: 'MQTT ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mqtt_user', header: 'MQTT Utilisateur', dataType: 'text', sortable: true, filter: true },
        { field: 'mqtt_password', header: 'MQTT Password', dataType: 'text', bodyTemplate: mqttPasswordtemplate, sortable: true, filter: true },
        { field: 'webhook', header: 'Webhook ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'webhook_secret', header: 'Webhook Secret', dataType: 'text', bodyTemplate: webhookSecretetemplate, sortable: true, filter: true },
        { field: 'bus', header: 'Bus', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'center' } },
        { field: 'description', header: 'Description', dataType: 'text', sortable: true, filter: true },

    ]);

    const exportColumnsStyle = {
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



    const defaultMultiSortMeta: Array<DataTableSortMeta> = MachinesService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = MachinesService.defaultFilters();

    const [globalFilterValue, setGlobalFilterValue] = useState(null);

    const standardParam = model.getStandardParam({ field: 'address', order: 1 }, defaultFilters);
    const [lazyParams, setLazyParams] = useState(standardParam);


    const cm = useRef(null);
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
                { label: 'Export CSV', icon: 'pi pi-fw pi-file', command: () => ExportsService.exportToCSV(MachinesService, lazyParams, 'machines') },
                { label: 'Export Excel', icon: 'pi pi-fw pi-file-excel', command: () => ExportsService.exportToExcel(MachinesService, lazyParams, 'machines') },
                { label: 'Export PDF', icon: 'pi pi-fw pi-file-pdf', command: () => ExportsService.exportToPDF(MachinesService, lazyParams, 'machines', columns, exportColumnsStyle) },
            ]
        },
    ];

    let loadLazyTimeout = useRef(null);
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
            console.log('Lazy Event Set ', lazyParams);

            // Get Lazy Data
            MachinesService.getLazy(lazyEventSet).then((data: any) => {
                // console.log('Lazy Data', data);
                if (data.status && data.status !== 200) {
                    setDlgError(data);
                    return;
                } else {
                    // On Good request process data count
                    MachinesService.getLazyCount(lazyEventSet).then((dataCount: any) => {
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
        params.filters = standardParam.filters;
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
            console.log(params);
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
                    title='Machines'
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
                <Button type="button" label='CSV' icon="pi pi-file" onClick={() => ExportsService.exportToCSV(MachinesService, lazyParams, 'machines')} className="mr-2" data-pr-tooltip="CSV" />
                <Button type="button" label='XLSX' icon="pi pi-file-excel" onClick={() => ExportsService.exportToExcel(MachinesService, lazyParams, 'machines')} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                <Button type="button" label='PDF' icon="pi pi-file-pdf" onClick={() => ExportsService.exportToPDF(MachinesService, lazyParams, 'machines', columns, exportColumnsStyle)} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </div>
        )
    }


    // Export / Import
    const dt = useRef(null);



    const onDelete = (id: number) => {
        MachinesService.delete(id).then(() => {
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
                onSizeChanged={(e) => setSize(e.size)}
                onFilterModeChanged={(e: any) => setFilterDisplay(e.filterMode)}
                onStateStorageChanged={(e: any) => setStateStorage(e.stateStorage)}
                onImportFile={(e) => router.push('./import')}
                onExportCSV={(e: any) => ExportsService.exportToCSV(MachinesService, lazyParams, 'machines')}
                onExportExcel={(e: any) => ExportsService.exportToExcel(MachinesService, lazyParams, 'machines')}
                onExportPDF={(e: any) => ExportsService.exportToPDF(MachinesService, lazyParams, 'machines', columns, exportColumnsStyle)}
            />

            <DialogError
                error={dlgError}
                onYes={(e: any) => { setLazyParams((lazyParams: any) => { return { ...lazyParams } }) }}
            />


            <ContextMenu model={menuModel} ref={cm}
            // onHide={() => setSelectedCatalog(null)} 
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
                stateStorage={stateStorage} stateKey={stateStorage === 'session' ? "obi-dt-state-machines-session" : "obi-dt-state-machines-local"}

                tableStyle={{ minWidth: '50rem' }}


            >


                {
                    columnsRender
                }
            </DataTable>
        </div >
    );
};

export default Machines;
