'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';

import { Admin, OBI } from '@/src/types/index';
// import { Admin } from '@/src/types/index';






import DialogError from '@/src/obi/components/Dialog/DialogError';
import TableHeader from '@/src/obi/components/Tables/TableHeader';
import TableToolbar from '@/src/obi/components/Tables/TableToolbar';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService copy';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { useRouter } from 'next/navigation';
import { ContextMenu } from 'primereact/contextmenu';


const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Tags = () => {

    const tagsModel = new TagsModel();
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [size, setSize] = useState<string>('small');
    const [filterDisplay, setFilterDisplay] = useState('menu');
    const [stateStorage, setStateStorage] = useState('session');
    const [dlgError, setDlgError] = useState();

    const columns: OBI.ColumnMeta[] = [
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'company', header: 'Société', dataType: 'numeric', sortable: true, filter: true },
        { field: 'table', header: 'Table', dataType: 'numeric', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'machine', header: 'Machines', dataType: 'numeric', sortable: true, filter: true },
        { field: 'type', header: 'Types', dataType: 'numeric', sortable: true, filter: true },

        { field: 'memory', header: 'Mémoire', dataType: 'numeric', sortable: true, filter: true },
        { field: 'db', header: 'DB', dataType: 'numeric', sortable: true, filter: true },
        { field: 'byte', header: 'Byte', dataType: 'numeric', sortable: true, filter: true },
        { field: 'bit', header: 'Bit', dataType: 'numeric', sortable: true, filter: true },

        { field: 'active', header: 'Activé.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'cycle', header: 'Cycle', dataType: 'numeric', sortable: true, filter: true },

        { field: 'delta', header: 'Delta ON.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaFloat', header: 'Delta float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaInt', header: 'Delta Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaBool', header: 'Delta Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaDateTime', header: 'Delta Date Heure', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'vFloat', header: 'Val. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vInt', header: 'Val. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBool', header: 'Val. Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStr', header: 'Val. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTime', header: 'Val. Date Heure', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStamp', header: 'Val. Stamp', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vDefault', header: 'Val. Default On', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vFloatDefault', header: 'Val. Def. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vIntDefault', header: 'Val. Def. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBoolDefault', header: 'Val. Def. Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStrDefault', header: 'Val. Def. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTimeDefault', header: 'Val. Def. D.H', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStampDefault', header: 'Val. Def. Stamp', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'counter', header: 'Compteur ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'counterType', header: 'Type Compteur', dataType: 'numeric', sortable: true, filter: true },

        { field: 'mesure', header: 'Mesure ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mesureMin', header: 'Mesure Min.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesureMax', header: 'Mesure Max.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'measureUnit', header: 'Mesure Unité', dataType: 'numeric', sortable: true, filter: true },

        { field: 'mqtt_topic', header: 'MQTT TOPIC', dataType: 'text', sortable: true, filter: true },
        { field: 'webhook', header: 'WEBHOOK', dataType: 'text', sortable: true, filter: true },

        { field: 'laboratory', header: 'Laboratoire ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'formula', header: 'Formule ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'formCalculus', header: 'Formule Calc.', dataType: 'text', sortable: true, filter: true },
        { field: 'formProcessing', header: 'Formule Processing', dataType: 'numeric', sortable: true, filter: true },

        { field: 'error', header: 'Erreur ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'errorMsg', header: 'Msg. Erreur', dataType: 'text', sortable: true, filter: true },
        { field: 'errorStamp', header: 'Stamp Erreur', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'alarmEnable', header: 'Alarme ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'alarm', header: 'Alarme', dataType: 'numeric', sortable: true, filter: true },

        { field: 'persOffsetEnable', header: 'Pers. Offset  ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetFloat', header: 'Pers. Offset Fl.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persOffsetInt', header: 'Pers. Offset Int', dataType: 'numeric', sortable: true, filter: true },

        { field: 'persOffsetBool', header: 'Pers. Offset Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetDateTime', header: 'Pers. Offset D.H.', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },
        { field: 'list', header: 'Liste', dataType: 'numeric', sortable: true, filter: true },
    ];

    const exportColumnsStyle = {
        0: { halign: 'right', valign: 'middle', fontSize: 8, cellPadding: 1, minCellWidth: 20, cellWidth: 'wrap' }, // id //fillColor: [0, 255, 0]
        1: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        2: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        3: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        4: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }, // 
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


    const defaultMultiSortMeta: Array<DataTableSortMeta> = TagsService.defaultMultiSortMeta();
    const defaultFilters: Array<DataTableFilterMeta> = TagsService.defaultFilters();

    const [globalFilterValue, setGlobalFilterValue] = useState(null);

    const [lazyParams, setLazyParams] = useState(
        tagsModel.
            getStandardParam([{ field: 'machine', order: 1 }, { field: 'name', order: 1 }], TagsService.defaultFilters()));


    const cm = useRef(null);
    const router = useRouter();
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
                { label: 'Export CSV', icon: 'pi pi-fw pi-file', command: () => ExportsService.exportToCSV(TagsService, lazyParams, 'tags') },
                { label: 'Export Excel', icon: 'pi pi-fw pi-file-excel', command: () => ExportsService.exportToExcel(TagsService, lazyParams, 'tags') },
                { label: 'Export PDF', icon: 'pi pi-fw pi-file-pdf', command: () => ExportsService.exportToPDF(TagsService, lazyParams, 'tags', columns, exportColumnsStyle) },
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


        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // console.log('lazyParams', lazyParams);
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            console.log('Lazy Event Set ', lazyEventSet.lazyEvent);

            // Get Lazy Data
            TagsService.getLazy(lazyEventSet).then((data: any) => {
                // console.log('Lazy Data', data);
                if (data.status && data.status !== 200) {
                    setDlgError(data);
                    return;
                } else {
                    // On Good request process data count
                    TagsService.getLazyCount(lazyEventSet).then((dataCount: any) => {
                        console.log('Data Count', dataCount);
                        if (dataCount.status && dataCount.status !== 200) {
                            setDlgError(data);
                            return;
                        } else {

                            setTotalRecords(dataCount);
                        }
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
        params.filters = tagsModel.
            getStandardParam([{ field: 'machine', order: 1 }, { field: 'name', order: 1 }], defaultFilters).filters;
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
            params.filters.global.value = globalFilterValue;
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
                    title='Tags'
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
                <Button type="button" label='CSV' icon="pi pi-file" onClick={() => ExportsService.exportToCSV(TagsService, lazyParams, 'tags')} className="mr-2" data-pr-tooltip="CSV" />
                <Button type="button" label='XLSX' icon="pi pi-file-excel" onClick={() => ExportsService.exportToExcel(TagsService, lazyParams, 'tags')} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                <Button type="button" label='PDF' icon="pi pi-file-pdf" onClick={() => ExportsService.exportToPDF(TagsService, lazyParams, 'tags', columns, exportColumnsStyle)} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </div>
        )
    }


    // Export / Import
    const dt = useRef(null);



    const onDelete = (id: number) => {
        TagsService.delete(id).then(() => {
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
                onExportCSV={(e: any) => ExportsService.exportToCSV(TagsService, lazyParams, 'tags')}
                onExportExcel={(e: any) => ExportsService.exportToExcel(TagsService, lazyParams, 'tags')}
                onExportPDF={(e: any) => ExportsService.exportToPDF(TagsService, lazyParams, 'tags', columns, exportColumnsStyle)}
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
                stateStorage={stateStorage} stateKey={stateStorage === 'session' ? "obi-dt-state-tag-session" : "obi-dt-state-tag-local"}

                tableStyle={{ minWidth: '50rem' }}


            >


                {
                    columnsRender
                }
            </DataTable>
        </div >
    );
};

export default Tags;
