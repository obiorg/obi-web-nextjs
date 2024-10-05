'use client';


import LocationDelete from "@/src/app/[locale]/(main)/sys/localisations/locations/components/post-delete";
import { OBI } from "@/src/types/obi";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { MultiSelect } from "primereact/multiselect";
import { OverlayPanel } from "primereact/overlaypanel";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";


// Define the props that the PostForm component expects
interface TableToolbarProps {
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

    exportCSVLabel?: string;
    exportCSVIcon?: string;
    exportCSVClassName?: string;
    exportCSVTooltip?: string;
    exportCSVTooltipOptions?: any;
    onExportCSV?: (e: any) => void;


    exportExcelLabel?: string;
    exportExcelIcon?: string;
    exportExcelClassName?: string;
    exportExcelTooltip?: string;
    exportExcelTooltipOptions?: any;
    onExportExcel?: (e: any) => void;


    exportPdfLabel?: string;
    exportPdfIcon?: string;
    exportPdfClassName?: string;
    exportPdfTooltip?: string;
    exportPdfTooltipOptions?: any;
    onExportPDF?: (e: any) => void;

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
}



export default function TableToolbar({ id, name,
    createPath = './create', createLabel = '', createIcon = 'pi pi-plus', createClassName = 'mr-2', createTooltip = 'Créer/Ajouter', createTooltipOptions = { position: 'bottom' },
    ieLabel = '', ieIcon = 'pi pi-arrow-right-arrow-left', ieClassName = 'p-button-secondary mr-2', ieTooltip = 'Importer / Exporter', ieTooltipOptions = { position: 'top' },
    importLabel = 'Importer...', importIcon = 'pi pi-file-import', importClassName = 'p-button-success mr-2', importTooltip = 'Importer', importTooltipOptions = { position: 'bottom' },
    onImportFile,
    exportCSVLabel = 'CSV', exportCSVIcon = 'pi pi-file', exportCSVClassName = 'mr-2', exportCSVTooltip = 'Exporter au format CSV', exportCSVTooltipOptions = { position: 'bottom' },
    onExportCSV,
    exportExcelLabel = 'Excel', exportExcelIcon = 'pi pi-file-excel', exportExcelClassName = 'p-button-success mr-2', exportExcelTooltip = 'Exporter au format Excel', exportExcelTooltipOptions = { position: 'bottom' },
    onExportExcel,
    exportPdfLabel = 'PDF', exportPdfIcon = 'pi pi-file-pdf', exportPdfClassName = 'mr-2', exportPdfTooltip = 'Exporter au format PDF', exportPdfTooltipOptions = { position: 'bottom' },
    onExportPDF,

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
    onStateStorageChanged
}: TableToolbarProps) {


    // Options
    const menu = useRef(null);
    const toast = useRef(null);
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

    const menuImportExport = useRef(null);
    const modelImportExport = [
        {
            label: importLabel,
            icon: importIcon,
            command: (e: any) => {
                onImportFile && onImportFile(e);
                toast.current.show({ severity: 'info', summary: 'Importer', detail: 'Importation lancé', life: 3000 });
            }

        },
        {
            label: 'Exporter',
            icon: 'pi pi-file-export',

            items: [
                {
                    label: exportCSVLabel,
                    icon: exportCSVIcon,
                    command: (e: any) => {
                        onExportCSV && onExportCSV(e);
                        toast.current.show({ severity: 'info', summary: 'Exporter', detail: 'Export CSV lancé', life: 3000 });
                    }
                },
                {
                    label: exportExcelLabel,
                    icon: exportExcelIcon,
                    command: (e: any) => {
                        onExportExcel && onExportExcel(e);
                        toast.current.show({ severity: 'info', summary: 'Exporter', detail: 'Export Excel lancé', life: 3000 });
                    }
                },
                {
                    label: exportPdfLabel,
                    icon: exportPdfIcon,
                    command: (e: any) => {
                        onExportPDF && onExportPDF(e);
                        toast.current.show({ severity: 'info', summary: 'Ex^prter', detail: 'Export PDF lancé', life: 3000 });
                    }
                }
            ]
        }
    ];

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
            {/* Create  */}
            <Link href={createPath ? createPath : './create'} >
                <Button label={createLabel} icon={createIcon}
                    className={createClassName}
                    tooltip={createTooltip} tooltipOptions={createTooltipOptions} />
            </Link>


            {/* Import / Export  */}
            <Menu model={modelImportExport} popup ref={menuImportExport} id="popup_menu_ie" />
            <Button
                label={ieLabel}
                icon={ieIcon}
                onClick={(event) => menuImportExport?.current.toggle(event)}
                className={ieClassName}
                aria-controls="popup_menu_ie" aria-haspopup
                tooltip={ieTooltip} tooltipOptions={ieTooltipOptions}
            />


            {/* Edit  */}
            {catalogSelected ?
                <Link href={`./${catalogSelected.id}/update`}>
                    <Button label={updateLabel} icon={updateIcon}
                        severity="warning"
                        className={updateClassName}
                        tooltip={updateTooltip}
                        tooltipOptions={updateTooltipOptions} />
                </Link>
                : null}


            {/* Copy */}
            {catalogSelected ?
                <Link href={`./${catalogSelected.id}/copy`}>
                    <Button label={copyLabel} icon={copyIcon}
                        severity="help"
                        className={copyClassName}
                        tooltip={copyTooltip}
                        tooltipOptions={copyTooltipOptions} />
                </Link>
                : null}

        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            {catalogSelected ? <>
                <form onSubmit={deleteAction}>
                    <Button type='submit' label={deleteLabel} icon={deleteIcon} severity="danger" className={deleteClassName}
                        tooltip='Supprimer' tooltipOptions={{ position: 'bottom' }} />
                </form>
                <i className="pi pi-bars p-toolbar-separator ml=0 mr-2" />
            </> : null}

            <Button type="button" icon={filterIcon} label={filterLabel} outlined onClick={onClear} className={filterClassName} tooltip='Effacer Filtre' tooltipOptions={{ position: 'bottom' }} />
            <Button type="button" icon={reloadIcon} label={reloadLabel} onClick={onReload} className={reloadClassName} tooltip='Actualiser' tooltipOptions={{ position: 'bottom' }} />


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