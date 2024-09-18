'use client';


import LocationDelete from "@/src/app/[locale]/(main)/sys/localisations/locations/components/post-delete";
import { OBI } from "@/src/types/obi";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
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
}



export default function TableToolbar({ id, name,
    createPath = './create', createLabel = '', createIcon = 'pi pi-plus', createClassName = 'mr-2',
    updateLabel = '', updateIcon = 'pi pi-file-edit', updateClassName = 'mr-2',
    deleteLabel = '', deleteIcon = 'pi pi pi-trash', deleteClassName = 'mr-0', deleteId,
    filterLabel = '', filterIcon = 'pi pi-filter-slash', filterClassName = 'mr-2',
    reloadLabel = '', reloadIcon = 'pi pi-refresh', reloadClassName = 'mr-2',
    onClear,
    catalogSelected,

    onReload
}: TableToolbarProps) {


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
            <Button type="button" icon={reloadIcon} label={reloadLabel} onClick={onReload}  className={reloadClassName} />
            
        </React.Fragment>
    );


    return (
        <>
            <Toolbar className="mb-4 p-1" start={startContent} end={endContent} />
        </>
    );
}