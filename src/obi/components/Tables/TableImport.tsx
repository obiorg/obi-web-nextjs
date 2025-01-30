'use client'


import React, { useState, useRef } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import TableToolbarImport from '@/src/obi/components/Tables/TableToolbarImport';
import DialogError from '@/src/obi/components/Dialog/DialogError';
import TableHeader from '@/src/obi/components/Tables/TableHeader';
import { InputText } from 'primereact/inputtext';


import '@/src/styles/obi/import.scss';
import { ArrayHelper } from '@/src/obi/utilities/helpers/arrayHelper';
import { useTranslations } from 'next-intl';
import OutputError from '../Output/OutputError';


interface TableImportProps {
    title?: string; // Title page
    params: any,                 // a structural parameter model
    services: any,                // a service allowing request
}





export default function TableImport({
    title = 'Import',
    // prefix = 'import_',
    // defaultParams,
    // columns,
    // exportColumnsStyle,
    params,
    services,
}: TableImportProps) {


    const [importedData, setImportedData] = useState();
    const [selectedImportedData, setSelectedImportedData] = useState([]);
    const [importedCols, setImportedCols] = useState([{ field: '', header: 'Header' }]);

    const dt = useRef(null);
    const toast = useRef<any>(null);

    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState<any>('small');
    const [filterDisplay, setFilterDisplay] = useState<any>('menu');
    const [stateStorage, setStateStorage] = useState<any>('session');
    const [dlgError, setDlgError] = useState<any>();

    const [selectionMode, setSelectionMode] = useState<any>("multiple");
    const [tableEditMode, setTableEditMode] = useState<any>();

    const [lazyParams, setLazyParams] = useState(params);




    const g = useTranslations('global');
    const t = useTranslations('connectionMachine');


    /**
     * 
     * @param param0 
     */
    const importCSVHandler = ({ files }: any) => {
        const [file] = files;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            let _importedCols = cols.map((col: any) => ({ field: col, header: toCapitalize(col.replace(/['"]+/g, '')) }));
            let _importedData = data.map((d: any) => {
                d = d.split(',');
                return cols.reduce((obj: any, c: any, i: any) => {
                    obj[c] = d[i].replace(/['"]+/g, '');
                    return obj;
                }, {});
            });
            //console.log(_importedCols)
            _importedCols.push('Comment');

            setImportedCols(_importedCols);
            setImportedData(_importedData);
        };

        reader.readAsText(file, 'UTF-8');
    }

    /**
     * 
     * @param param0 
     */
    const importExcelHandler = ({ ref, files }: any) => {
        const [file] = files;

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols: any = data[0];
                data.shift();

                let _importedCols: any = cols.map((col: any) => ({ field: col, header: toCapitalize(col) }));
                let _importedData: any = data.map((d: any) => {
                    return cols.reduce((obj: any, c: any, i: any) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });
                _importedCols = ArrayHelper.insertItemAtIndex(_importedCols, 1, {
                    "field": "commentRet",
                    "header": "Info Ret."
                }); Array

                setImportedCols(_importedCols);
                setImportedData(_importedData);
                setLoading(false);
            };

            reader.readAsArrayBuffer(file);
        });
        ref.current.clear();
    }


    const toCapitalize = (s: any) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const clear = () => {
        let dv: any = [];
        setImportedData(dv);
        setSelectedImportedData([]);
        setImportedCols([{ field: '', header: 'Header' }]);
        setErrorCatalog(null);
        setLoading(false);
    }

    const onImportSelectionChange = (e: any) => {
        setSelectedImportedData(e.value);
        // //console.log(e.value);
        if (e.value.length > 0) {
            const detail = e.value.map((d: any) => Object.values(d)[0]).join(', ');
            // toast.current.show({ severity: 'info', summary: 'Data Selected', detail, life: 3000 });
        }
    }








    const onDelete = (id: number) => {

        setLoading(true);
        let _importedData: any = importedData;
        let _selectedImportedData = selectedImportedData;

        //console.log(selectedImportedData);
        let _row: any = [];
        selectedImportedData.forEach((data: any) => {
            if (data && _importedData) {
                const index = _importedData.findIndex((id: any) => id === data?.id);
                _row.push(index);
                // console.log('result for id = ' + data.id, index);
            }
        });
        _row.sort();
        // console.log('_row', _row);
        for (let i = _row.length - 1; i >= 0; i--) {
            _importedData.splice(_row[i], 1);
            _selectedImportedData.splice(i, 1);
        }

        // console.log(_importedData)
        setImportedData(_importedData);
        setSelectedImportedData(_selectedImportedData);

        setLazyParams((lazyParams: any) => { return { ...lazyParams } });
        setLoading(false);
    };

    const header = () => {
        return (
            <>
                <TableHeader
                    title={title}
                    catalogSelected={selectedImportedData}
                    deleteId={onDelete}
                    onColumnChanged={(cols) => { setImportedCols(cols); }}
                />
            </>
        )
    }

    const paginatorLeft =
        <div className="flex justify-content-between align-items-center">
        </div>;
    const paginatorRight = <div className="flex justify-content-between align-items-center">
    </div>;


    const onCellEditComplete = (e: any) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue.trim().length > 0)
            rowData[field] = newValue;
        else
            event.preventDefault();
    }

    const cellEditor = (options: any) => {
        // if (options.field === 'price')
        //     return priceEditor(options);
        // else
        return textEditor(options);
    }
    const textEditor = (options: any) => {
        return <InputText type="text"
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)} />;
    }


    // state management
    const [onMessage, setOnMessage] = useState(false);
    const [msgSeverity, setMsgSeverity] = useState('info'); // success, info, warn, error
    const [msgSummary, setMsgSummary] = useState('Info'); // info as default
    const [msgDetail, setMsgDetail] = useState('Default detail'); // Message Content as default
    const [msgSticky, setMsgSticky] = useState(false); //

    // last created catalog
    const [catalog, setCatalog] = useState<any>(null);
    const [errorCatalog, setErrorCatalog] = useState<any>(null);
    const [lazyLoading, setLazyLoading] = useState<any>(false);

    const doMsgPrompt = (severity: string, summary: string, message: string, sticky?: boolean) => {
        setMsgSeverity(severity);
        setMsgSummary(summary);
        setMsgDetail(message);
        setOnMessage(true);
    }
    const doMsgRemove = (e: any) => {
        setOnMessage(false);
    }
    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, life: 5000, closable: true });
    }
    const showSuccess = (title: string, message: string) => {
        toast.current.show({ severity: 'success', summary: title, detail: message, life: 5000, closable: true });
    }




    const doProcessCreate = async (e: any) => new Promise((resolve, reject) => {
        if (e.create.length > 0) {
            services.createMany(e.create).then((datas: any) => {

                if ((datas?.errors) || (datas && datas[0] === null)) {


                    console.log('createMany - process error', datas);
                    e.create.forEach((catalog: any) => {
                        if (datas[0] !== null) {
                            let errCatalog: any = [];
                            datas.errors.forEach((err: any) => {
                                let keys = Object.keys(err.errors);
                                let commentError = '';
                                keys.forEach((k: any) => {
                                    commentError = commentError + ' | ' + k + '>' + err.errors[k];
                                });
                                if (importedData) {
                                    let dv: any = importedData[catalog.index];
                                    dv.transaction = -1;
                                    dv.commentRet = commentError;
                                }
                                if (keys.length > 0) errCatalog.push(err);
                                // const firstKey = Object.keys(err.errors)[0]; // Get first key
                                // console.log('catalog index', catalog.index, 'err index', err.index);
                                // if (catalog.index === err.index && importedData) {
                                //     let dv: any = importedData[catalog.index];
                                //     dv.transaction = -1;
                                //     dv.commentRet = '' + firstKey + ' > ' + err.errors[firstKey];
                                // }
                            })
                            setErrorCatalog(errCatalog);
                        }
                    });
                    showError('Erreur', 'Erreur lors de la création des données');
                } else if ((datas?.error)) {
                    setErrorCatalog(datas);

                } else {
                    //console.log('createMany - process success !');
                    e.create.forEach((catalog: any) => {
                        if (importedData) {
                            let dv: any = importedData[catalog.index];
                            dv.transaction = '';
                            dv.commentRet = 'success';
                        }
                    });
                }
                resolve(importedData);
            });
        } else {
            resolve('Skipped');
        }

    });


    /**
     * 
     * @param datas datas that need to be reduced as small payloads off 50
     * @returns new splitted data payloads
     */
    const payloadManagement = (datas: any[]) => {
        let c: number = -1;
        let a: any[] = [];
        datas.forEach((data: any, i: number) => {
            if (i % 50 === 0) {
                c++;
                a.push([]);
            }
            a[c].push(data);
        });
        return a;
    };


    const doProcessUpdate = async (e: any) => new Promise((resolve, reject) => {
        if (e.update.length > 0) {
            let dataUpdate = payloadManagement(e.update);
            // console.log('update - process', dataUpdate);
            dataUpdate.forEach(async (payload: any[], index: number) => {

                services.updateMany(payload).then((datas: any) => {
                    // If unable to update 
                    console.log('updateMany - result - index = ' + index, datas);


                    if ((datas?.errors) || (datas && datas[0] === null)) {
                        // console.log('updateMany - process error');
                        e.update.forEach((catalog: any) => {
                            if (datas[0] !== null) {
                                let errCatalog: any = [];
                                datas.errors.forEach((err: any) => {
                                    let keys = Object.keys(err.errors);
                                    let commentError = '';
                                    keys.forEach((k: any) => {
                                        commentError = commentError + ' | ' + k + '>' + err.errors[k];
                                    });
                                    if (importedData) {
                                        let dv: any = importedData[catalog.index];
                                        dv.transaction = -1;
                                        dv.commentRet = commentError;
                                    }
                                    if (keys.length > 0) errCatalog.push(err);
                                })
                                setErrorCatalog(errCatalog);
                            }
                        });
                        showError('Erreur', 'Erreur lors de la modification des données');
                    } else if ((datas?.error)) {
                        setErrorCatalog(datas);

                    } else {
                        //console.log('updateMany - process success !');
                        e.update.forEach((catalog: any) => {
                            if (importedData) {
                                let dv: any = importedData[catalog.index];
                                dv.transaction = '';
                                dv.commentRet = 'success';
                            }
                        });
                    }
                    resolve(importedData);
                });
            });
            // services.updateMany(e.update).then((datas: any) => {
            //     // If unable to update 
            //     console.log('updateMany - result', datas);
            //     if ((datas?.errors) || (datas && datas[0] === null)) {
            //         // console.log('updateMany - process error');
            //         e.update.forEach((catalog: any) => {
            //             if (datas[0] !== null) {
            //                 let errCatalog: any = [];
            //                 datas.errors.forEach((err: any) => {
            //                     let keys = Object.keys(err.errors);
            //                     let commentError = '';
            //                     keys.forEach((k: any) => {
            //                         commentError = commentError + ' | ' + k + '>' + err.errors[k];
            //                     });
            //                     if (importedData) {
            //                         let dv: any = importedData[catalog.index];
            //                         dv.transaction = -1;
            //                         dv.commentRet = commentError;
            //                     }
            //                     if (keys.length > 0) errCatalog.push(err);
            //                 })
            //                 setErrorCatalog(errCatalog);
            //             }
            //         });
            //         showError('Erreur', 'Erreur lors de la modification des données');
            //     } else if ((datas?.error)) {
            //         setErrorCatalog(datas);

            //     } else {
            //         //console.log('updateMany - process success !');
            //         e.update.forEach((catalog: any) => {
            //             if (importedData) {
            //                 let dv: any = importedData[catalog.index];
            //                 dv.transaction = '';
            //                 dv.commentRet = 'success';
            //             }
            //         });
            //     }
            //     resolve(importedData);
            // });
        } else {
            resolve('Skipped');
        }

    });
    const doProcessDelete = async (e: any) => new Promise((resolve, reject) => {

        if (e.delete.length > 0) {
            services.deleteMany(e.delete).then((datas: any) => {
                // If unable to delete 
                //console.log('deleteMany - result', datas);
                if ((datas?.errors && datas?.errors?.status === 500) || datas[0] === null) {
                    //console.log('deleteMany - process error');
                    e.delete.forEach((catalog: any) => {
                        //console.log('data erros', datas.errors, 'data errors items', datas.errors.items, 'errors items lenght', datas.errors.items.length);
                        if (datas.errors.items.length > 0) {
                            datas.errors.items.forEach((item: any) => {
                                if (catalog.location === item.location && importedData) {
                                    let dv: any = importedData[catalog.index];
                                    dv.transaction = -1;
                                    dv.commentRet = datas?.errors.message;
                                }
                            })
                        } else {
                            if (importedData) {
                                let dv: any = importedData[catalog.index];
                                dv.transaction = -1;
                                dv.commentRet = datas?.errors.message;
                            }
                        }
                    });
                    showError('Erreur', 'Erreur lors de la modification des données');
                } else {
                    //console.log('deleteMany - process success !');
                    e.delete.forEach((catalog: any) => {
                        if (importedData) {
                            let dv: any = importedData[catalog.index];
                            dv.transaction = '';
                            dv.commentRet = 'success';
                        }
                    });
                }

                resolve(importedData);
            });
        } else {
            resolve('Skipped');
        }
    });


    /**
     * Main upload action
     * @param e 
     */
    const onUpload = (e: any) => {
        setLazyLoading(true);
        // Get data to process
        if (importedData) {
            let dv: any = importedData;
            if (dv.length > 0) {
                let toCreate: any = [];
                let toUpdate: any = [];
                let toDelete: any = [];
                dv.forEach((row: any, index: number) => {
                    let id = row.id;
                    let trans = row.transaction;
                    let r = row;
                    r.index = index;
                    if (row.transaction === null || row.transaction === 0 || row.transaction === '0' || row.transaction === undefined) { // to create
                        r.id = null;
                        delete r.transaction;
                        toCreate.push(r);
                    } else if (row.transaction === 1 || row.transaction === '1') { // update
                        delete r.transaction;
                        toUpdate.push(r);
                    } else if (row.transaction === 2 || row.transaction === '2') { // to remove
                        delete r.transaction;
                        toDelete.push(r);
                    } else {
                        console.log('Unknown transaction state', row.transaction);
                        row.transaction = -1;
                        row.commentRet = 'Unkown transaction state : allowed are 0: create, 1: update, 2: remove'; // g('import');
                        // showError('Erreur', 'Erreur lors de la modification des données');
                        // return;
                    }
                    row.id = id;
                    row.transaction = trans;
                });
                //console.log('toCreate', toCreate, 'toUpdate', toUpdate, 'toRemove', toDelete);

                setLazyParams((lazyParams: any) => { return { ...lazyParams } });


                setLoading(true);
                e.create = toCreate;
                e.update = toUpdate;
                e.delete = toDelete;

                doProcessCreate(e).then(() => {
                    //console.log('now process update');
                    doProcessUpdate(e).then(() => {
                        //console.log('now process delete');
                        doProcessDelete(e).then(() => {
                            //console.log('now process actualisation');
                            setLoading(false);

                            let _importedData = importedData;
                            setImportedData(_importedData);
                        });
                    })
                })

            }
        } else {
            toast.current.show({ severity: 'error', summary: g('error.summary'), detail: g('error.import.nodata'), life: 5000 });
            setLoading(false);
            setLazyLoading(false);
        }



    }


    /**
     * Allow to display state line
     * @param data column data
     * @returns color class
     */
    const rowClass = (data: any) => {
        if (data.transaction === -1) {
            return {
                'row-error': true,
            }
        } else if (data.commentRet === 'success') {
            return {
                'row-success': true
            }
        }
    }

    return (
        <div className='container-fluid p-0 m-0  datatable-import'>
            <TableToolbarImport catalogSelected={selectedImportedData}
                deleteId={onDelete}
                onSizeChanged={(e) => setSize(e.size)}
                onFilterModeChanged={(e: any) => setFilterDisplay(e.filterMode)}
                onStateStorageChanged={(e: any) => setStateStorage(e.stateStorage)}
                onImportCSV={(e) => { setLoading(true); setSelectedImportedData([]); importCSVHandler(e) }}
                onImportExcel={(e: any) => {
                    setLoading(true);
                    setSelectedImportedData([]);
                    importExcelHandler(e);
                }}
                onReset={(e: any) => clear()}
                onEditCells={(e) => {
                    //console.log(e);
                    setTableEditMode(e);
                    e === 'cell' ? setSelectionMode('none') : setSelectionMode('multiple');
                }}
                onUpload={(e) => { onUpload(e) }}

            />

            <DialogError
                error={dlgError}
            // onYes={(e: any) => { setLazyParams((lazyParams: any) => { return { ...lazyParams } }) }}
            />

            <Toast ref={toast} />






            <DataTable
                id="dataTable"
                key='dataTable'
                ref={dt}
                value={importedData}
                rowClassName={rowClass}

                selectionMode={selectionMode}
                selection={selectedImportedData}
                onSelectionChange={onImportSelectionChange}


                emptyMessage="Aucun enregistrement trouvé !"

                // header and footer
                header={header}

                // Chargement en cours
                loading={loading}

                // Taille
                size={size}
                resizableColumns

                // Affichage de grille
                showGridlines

                // Affichage striée des lignes
                stripedRows


                // SortMode
                sortMode={lazyParams.sortMode}  //"multiple" // / !\ require metakey
                dataKey={lazyParams.dataKey}    //"ad_id"
                // metaKeySelection={metaKey}
                multiSortMeta={lazyParams.multiSortMeta}    // Default
                removableSort
                // onSort={onSort}

                paginator
                rows={lazyParams.rows} rowsPerPageOptions={[5, 10, 15, 25, 50, 100, 500, 1000]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink  Page : JumpToPageInput"
                currentPageReportTemplate="{first} à {last} sur {totalRecords} "
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                //totalRecords={totalRecords}
                // onPage={onPage}


                // storage
                stateStorage={stateStorage} stateKey={stateStorage === 'session' ? "obi-dt-state-location-session" : "obi-dt-state-location-local"}

                tableStyle={{ minWidth: '50rem' }}

                editMode={tableEditMode}
                columnResizeMode="expand"
            >
                {
                    importedCols.map(
                        (col, index) =>
                            <Column
                                key={col.field + '_' + index}
                                field={col.field}
                                header={col.header}
                                editor={(options) => cellEditor(options)}
                                onCellEditComplete={onCellEditComplete}
                                style={{ textAlign: 'left', width: '10rem' }}
                            />

                    )
                }
            </DataTable>


            {/* Display last record */}
            {/* <OutputRecord catalog={catalog} loading={lazyLoading} /> */}
            <OutputError catalog={errorCatalog} loading={loading} />
        </div>


    );
}
