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

    // updatePath?: Url;
    updateLabel?: string;
    updateIcon?: string;
    updateClassName?: string;

    deleteId?: (id: number) => any;
    deleteLabel?: string;
    deleteIcon?: string;
    deleteClassName?: string;

    filterLabel?: string;
    filterIcon?: string;
    filterClassName?: string;
    onClear?: (e: any) => void;


    catalogSelected?: any;              // should contain id key


    reloadLabel?: string;
    reloadIcon?: string;
    reloadClassName?: string;
    onReload?: (e: any) => void;


    onSizeChanged?: (e: any) => void;
    onFilterModeChanged?: (e: any) => void;
    onStateStorageChanged?: (e: any) => void;
}



export default function TableToolbar({ id, name,
    createPath = './create', createLabel = '', createIcon = 'pi pi-plus', createClassName = 'mr-2',
    updateLabel = '', updateIcon = 'pi pi-file-edit', updateClassName = 'mr-2',
    deleteLabel = '', deleteIcon = 'pi pi pi-trash', deleteClassName = 'mr-0', deleteId,
    filterLabel = '', filterIcon = 'pi pi-filter-slash', filterClassName = 'mr-2',
    reloadLabel = '', reloadIcon = 'pi pi-refresh', reloadClassName = 'mr-0',
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
                    command: (e:any) => {
                        let _e = e;
                        _e.size = 'small';
                        onSizeChanged && onSizeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Taille', detail: 'Petite taille activée', life: 3000 });
                    }
                },
                {
                    label: 'Normal',
                    icon: 'pi pi-stop',
                    command: (e:any) => {
                        let _e = e;
                        _e.size = 'normal';
                        onSizeChanged && onSizeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Taille', detail: 'Taille normal activée', life: 3000 });
                    }
                },
                {
                    label: 'Grande',
                    icon: 'pi pi-plus-circle',
                    command: (e:any) => {
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
                    command: (e:any) => {
                        let _e = e;
                        _e.filterMode = 'menu';
                        onFilterModeChanged && onFilterModeChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Filtre', detail: 'Mode menu', life: 3000 });
                    }
                },
                {
                    label: 'En ligne',
                    icon: 'pi pi-align-justify',
                    command: (e:any) => {
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
                    command: (e:any) => {
                        let _e = e;
                        _e.stateStorage = 'session';
                        onStateStorageChanged && onStateStorageChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Stockage', detail: 'Stockage session activé', life: 3000 });
                    }
                },
                {
                    label: 'Locale',
                    icon: 'pi pi-bookmark-fill',
                    command: (e:any) => {
                        let _e = e;
                        _e.stateStorage = 'local';
                        onStateStorageChanged && onStateStorageChanged(_e);
                        toast.current.show({ severity: 'info', summary: 'Stockage', detail: 'Stockage local activé', life: 3000 });
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
            <Link href={createPath ? createPath : './create'} >
                <Button label={createLabel} icon={createIcon} className={createClassName} tooltip='Créer' tooltipOptions={{ position: 'top' }} />
            </Link>
            {catalogSelected ?
                <Link href={`./${catalogSelected.id}/update`}>
                    <Button label={updateLabel} icon={updateIcon} severity="warning" className={updateClassName} />
                </Link>
                : null}

            {false ? <>
                <i className="pi pi-bars p-toolbar-separator mr-2" />
                <Button label="XLSX" icon="pi pi-upload" className="p-button-success hidden" tooltip='Importer XLSX' tooltipOptions={{ position: 'top' }} />
                <Button label="XLSX" icon="pi pi-upload" className="p-button-success hidden" tooltip='Importer XLSX' tooltipOptions={{ position: 'top' }} />
            </> : null}
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            {/* <Button icon="pi pi-search" className="mr-2" />
            <Button icon="pi pi-calendar" className="p-button-success mr-2" />
            <Button icon="pi pi-times" className="p-button-danger" /> */}

            {catalogSelected ? <>
                <form onSubmit={deleteAction}>
                    {/* <button type="submit" className="text-sm opacity-30 text-red-500">Delete</button> */}
                    <Button type='submit' label={deleteLabel} icon={deleteIcon} severity="danger" className={deleteClassName} />
                </form>
                <i className="pi pi-bars p-toolbar-separator ml=0 mr-2" />
            </>
                : null}

            <Button type="button" icon={filterIcon} label={filterLabel} outlined onClick={onClear} className={filterClassName} />
            <Button type="button" icon={reloadIcon} label={reloadLabel} onClick={onReload} className={reloadClassName}  />


            <i className="pi pi-bars p-toolbar-separator ml=0 " />
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <Button icon="pi pi-bars" 
                onClick={(event) => menu.current.toggle(event)} 
                className="p-button-help"
                aria-controls="popup_menu" aria-haspopup />

        </React.Fragment>
    );


    return (
        <>
            <Toast ref={toast} />
            <Toolbar className="mb-4 p-1" start={startContent} end={endContent} />
        </>
    );
}