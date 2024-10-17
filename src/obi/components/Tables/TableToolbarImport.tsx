'use client';

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { ToggleButton } from "primereact/togglebutton";
import { Toolbar } from "primereact/toolbar";
import React, { useRef, useState } from "react";


// Define the props that the PostForm component expects
interface TableToolbarImportProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component


    createPath?: Url;
    createLabel?: string;
    createIcon?: string;
    createClassName?: string;
    createTooltip?: string;
    createTooltipOptions?: any;

    // updatePath?: Url;
    ieLabel?: string;
    ieIcon?: string;
    ieClassName?: string;
    ieTooltip?: string;
    ieTooltipOptions?: any;

    importLabel?: string;
    importIcon?: string;
    importClassName?: string;
    importTooltip?: string;
    importTooltipOptions?: any;
    onImportFile?: (e: any) => void;

    importCSVLabel?: string;
    importCSVIcon?: string;
    importCSVClassName?: string;
    importCSVTooltip?: string;
    importCSVTooltipOptions?: any;
    onImportCSV?: (e: any) => void;


    importExcelLabel?: string;
    importExcelIcon?: string;
    importExcelClassName?: string;
    importExcelTooltip?: string;
    importExcelTooltipOptions?: any;
    onImportExcel?: (e: any) => void;


    importPdfLabel?: string;
    importPdfIcon?: string;
    importPdfClassName?: string;
    importPdfTooltip?: string;
    importPdfTooltipOptions?: any;
    onImportPDF?: (e: any) => void;

    // updatePath?: Url;
    updateLabel?: string;
    updateIcon?: string;
    updateClassName?: string;
    updateTooltip?: string;
    updateTooltipOptions?: any;

    // copyPath?: Url;
    copyLabel?: string;
    copyIcon?: string;
    copyClassName?: string;
    copyTooltip?: string;
    copyTooltipOptions?: any;


    deleteId?: (id: number) => any;
    deleteLabel?: string;
    deleteIcon?: string;
    deleteClassName?: string;
    deleteTooltip?: string;
    deleteTooltipOptions?: any;

    filterLabel?: string;
    filterIcon?: string;
    filterClassName?: string;
    filterTooltip?: string;
    filterTooltipOptions?: any;
    onClear?: (e: any) => void;


    catalogSelected?: any;              // should contain id key


    reloadLabel?: string;
    reloadIcon?: string;
    reloadClassName?: string;
    reloadTooltip?: string;
    reloadTooltipOptions?: any;
    onReload?: (e: any) => void;


    onSizeChanged?: (e: any) => void;
    onFilterModeChanged?: (e: any) => void;
    onStateStorageChanged?: (e: any) => void;

    onReset?: (e: any) => void;

    onEditCells?: (e: any) => void;
    onUpload?: (e: any) => void;
}



export default function TableToolbarImport({ id, name,
    createPath = './create', createLabel = '', createIcon = 'pi pi-plus', createClassName = 'mr-2', createTooltip = 'Créer/Ajouter', createTooltipOptions = { position: 'bottom' },
    ieLabel = '', ieIcon = 'pi pi-arrow-right-arrow-left', ieClassName = 'p-button-secondary mr-2', ieTooltip = 'Importer / Exporter', ieTooltipOptions = { position: 'top' },
    importLabel = 'Importer...', importIcon = 'pi pi-file-import', importClassName = 'p-button-success mr-2', importTooltip = 'Importer', importTooltipOptions = { position: 'bottom' },
    onImportFile,
    importCSVLabel = 'CSV', importCSVIcon = 'pi pi-file', importCSVClassName = 'mr-2', importCSVTooltip = 'Exporter au format CSV', importCSVTooltipOptions = { position: 'bottom' },
    onImportCSV,
    importExcelLabel = 'Excel', importExcelIcon = 'pi pi-file-excel', importExcelClassName = 'p-button-success mr-2', importExcelTooltip = 'Exporter au format Excel', importExcelTooltipOptions = { position: 'bottom' },
    onImportExcel,
    importPdfLabel = 'PDF', importPdfIcon = 'pi pi-file-pdf', importPdfClassName = 'mr-2', importPdfTooltip = 'Exporter au format PDF', importPdfTooltipOptions = { position: 'bottom' },
    onImportPDF,

    updateLabel = '', updateIcon = 'pi pi-file-edit', updateClassName = 'mr-2', updateTooltip = 'Modifier la sélection', updateTooltipOptions = { position: 'bottom' },
    copyLabel = '', copyIcon = 'pi pi-copy', copyClassName = 'mr-2', copyTooltip = 'Copier la sélection', copyTooltipOptions = { position: 'bottom' },
    deleteLabel = '', deleteIcon = 'pi pi pi-trash', deleteClassName = 'mr-0', deleteId, deleteTooltip = 'Supprimer la sélection', deleteTooltipOptions = { position: 'bottom' },
    filterLabel = '', filterIcon = 'pi pi-filter-slash', filterClassName = 'mr-2', filterTooltip = 'Effacer les filtres', filterTooltipOptions = { position: 'bottom' },
    reloadLabel = '', reloadIcon = 'pi pi-refresh', reloadClassName = 'mr-2', reloadTooltip = 'Actualiser', reloadTooltipOptions = { position: 'top' },
    onClear,
    catalogSelected,

    onReload,
    onSizeChanged,
    onFilterModeChanged,
    onStateStorageChanged,

    onReset,
    onEditCells,
    onUpload
}: TableToolbarImportProps) {


    // Options
    const menu = useRef(null);
    const toast = useRef(null);
    const refFileUploadCSV = useRef(null);
    const refFileUploadExcel = useRef(null);
    const items = [
        {
            label: 'Taille',
            items: [
                {
                    label: 'Petite (*)',
                    icon: 'pi pi-minus-circle',
                    command: (e: any) => {
                        let _e = e;
                        _e.size = 'small';
                        onSizeChanged && onSizeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Taille', detail: 'Petite taille activée', life: 3000 });
                    }
                },
                {
                    label: 'Normal',
                    icon: 'pi pi-stop',
                    command: (e: any) => {
                        let _e = e;
                        _e.size = 'normal';
                        onSizeChanged && onSizeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Taille', detail: 'Taille normal activée', life: 3000 });
                    }
                },
                {
                    label: 'Grande',
                    icon: 'pi pi-plus-circle',
                    command: (e: any) => {
                        let _e = e;
                        _e.size = 'large';
                        onSizeChanged && onSizeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Taille', detail: 'Grande taille activée', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Mode Filtre',
            items: [
                {
                    label: 'Menu (défault)',
                    icon: 'pi pi-filter-fill',
                    command: (e: any) => {
                        let _e = e;
                        _e.filterMode = 'menu';
                        onFilterModeChanged && onFilterModeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Filtre', detail: 'Mode menu', life: 3000 });
                    }
                },
                {
                    label: 'En ligne',
                    icon: 'pi pi-align-justify',
                    command: (e: any) => {
                        let _e = e;
                        _e.filterMode = 'row';
                        onFilterModeChanged && onFilterModeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Filtre', detail: 'Mode ligne', life: 3000 });
                    }
                }
            ]
        },
        {
            label: 'Etat Stockage',
            items: [
                {
                    label: 'Session (défault)',
                    icon: 'pi pi-bookmark',
                    command: (e: any) => {
                        let _e = e;
                        _e.stateStorage = 'session';
                        onStateStorageChanged && onStateStorageChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Stockage', detail: 'Stockage session activé', life: 3000 });
                    }
                },
                {
                    label: 'Locale',
                    icon: 'pi pi-bookmark-fill',
                    command: (e: any) => {
                        let _e = e;
                        _e.stateStorage = 'local';
                        onStateStorageChanged && onStateStorageChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Stockage', detail: 'Stockage local activé', life: 3000 });
                    }
                }
            ]
        }
    ];

    const [editMode, setEditMode] = useState(false);
    /**
 * 
 * @param event 
 */
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.
        deleteId ? deleteId(catalogSelected.id) : null;
    };


    const startContent = (
        <React.Fragment>
            <FileUpload
                ref={refFileUploadCSV}
                name="csv[]"
                accept=".csv"
                customUpload={true}
                uploadHandler={onImportCSV}
                mode="basic"
                auto={true}
                className='mr-2 w-full sm:hidden '
                chooseOptions={{ label: 'C', icon: 'pi pi-file' }}
            />

            <FileUpload
                ref={refFileUploadCSV}
                name="csv[]"
                accept=".csv"
                customUpload={true}
                uploadHandler={onImportCSV}
                mode="basic"
                auto={true}
                className='mr-2 w-full hidden sm:block '
                chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }}
            />

            <FileUpload
                ref={refFileUploadExcel}
                name="demo[]"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                customUpload={true}
                uploadHandler={(e) => { e.ref = refFileUploadExcel; onImportExcel && onImportExcel(e); }}
                mode="basic"
                auto={true}
                className='mr-2 w-full sm:hidden '
                chooseOptions={{ label: 'E', icon: 'pi pi-file-excel', className: 'p-button-success' }}
            />
            <FileUpload
                ref={refFileUploadExcel}
                name="demo[]"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                customUpload={true}
                uploadHandler={(e) => { e.ref = refFileUploadExcel; onImportExcel && onImportExcel(e); }}
                mode="basic"
                auto={true}
                className='mr-2 w-full hidden sm:block '
                chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }}
            />

            {/* clear  */}
            <Button
                type="button"
                label=""
                icon="pi pi-ban"
                severity="danger"
                onClick={onReset}
                className='mr-2 pl-4 pr-4 sm:w-10rem sm:hidden'
                tooltip='Reset' tooltipOptions={{ position: 'top' }}
            />
            <Button
                type="button"
                label="Reset"
                icon="pi pi-ban"
                severity="danger"
                onClick={onReset}
                className='mr-2 w-full hidden sm:block '
                tooltip='Reset' tooltipOptions={{ position: 'top' }}
            />

            <ToggleButton
                checked={editMode}
                onChange={(e) => { setEditMode(e.value); e.value === true ? onEditCells && onEditCells('cell') : onEditCells && onEditCells(null) }}
                security="warning"
                onLabel="Edit.On"
                offLabel="Edit.Off"
                onIcon="pi pi-file-edit"
                offIcon="pi pi-file"
                className="w-full "
                aria-label="Confirmation"
                tooltip="Editer" tooltipOptions={{ position: 'top' }}
            />


        </React.Fragment>
    );

    const endContent = (


        <React.Fragment>

            <Button
                label='' icon='pi pi-upload' severity="warning" className='mr-2'
                tooltip='Uploader' tooltipOptions={{ position: 'bottom' }}

                onClick={(e) => { onUpload && onUpload(e) }}
            />



            {catalogSelected ? <>
                <form onSubmit={deleteAction}>
                    <Button
                        label={deleteLabel}
                        icon={deleteIcon}
                        severity="danger"
                        className={deleteClassName}
                        tooltip='Supprimer'
                        tooltipOptions={{ position: 'bottom' }}
                    />
                </form>
                <i className="pi pi-bars p-toolbar-separator ml=0 mr-2" />
            </> : null}


            {/* <i className="pi pi-bars p-toolbar-separator ml=0 " /> */}
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <Button icon="pi pi-bars"
                onClick={(event) => menu.current.toggle(event)}
                className="p-button-help"
                aria-controls="popup_menu" aria-haspopup
                tooltip='Options' tooltipOptions={{ position: 'bottom' }}
            />

        </React.Fragment>
    );


    return (
        <>
            <Toast ref={toast} />
            <Toolbar className="mb-4 p-1" start={startContent} end={endContent} />
        </>
    );
}