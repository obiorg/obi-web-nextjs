'use client';


import LocationDelete from "@/src/app/[locale]/(main)/sys/localisations/locations/components/post-delete";
import { OBI } from "@/src/types/obi";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import React, { useEffect, useRef, useState } from "react";


// Define the props that the PostForm component expects
interface TableHeaderProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
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

    size?: string; // should contain
    onSizeChanged?: (e: any) => void; // when change occur in mode

    globalFilter?: any; // should contain
    globalFilterPlaceholder?: string;
    onGlobalFilterChanged?: (e: any) => void;

    // Managing columns
    columns?: any; // ...
    onColumnChanged?: (e: any) => void;
}



export default function TableHeader({ id, name,
    title,
    createPath = './create', createLabel = 'Créer', createIcon = 'pi pi-plus', createClassName = 'mr-1 p-2',
    updateLabel = 'Éditer', updateIcon = 'pi pi-file-edit', updateClassName = 'mr-1 p-2',
    deleteLabel = 'Supprimer', deleteIcon = 'pi pi pi-trash', deleteClassName = 'mr-1 p-2', deleteId,
    filterLabel = 'Reset', filterIcon = 'pi pi-filter-slash', filterClassName = 'mr-1 p-2',
    onClear,
    catalogSelected,
    size = 'small', onSizeChanged,
    globalFilter , 
    globalFilterPlaceholder = 'Rechercher...', 
    onGlobalFilterChanged,

    columns,
    onColumnChanged
}: TableHeaderProps) {



    const [sizeOptions] = useState<OBI.SizeOption[]>([
        { label: 'Petit', value: 'small' },
        { label: 'Normale', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);

    // /**
    //  * 
    //  * @param event 
    //  */
    // const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault(); // Prevent the form from being submitted in the traditional way.
    //     deleteId ? deleteId(catalogSelected.id) : null;
    // };

    // Managing Columns
    const [selectedColumns, setSelectedColumns] = useState(columns);
    const onColumnToggle = (e: any) => {
        let selectedCols = e.value;
        let orderedSelectedColumns = columns.filter((col: any) => selectedCols.some((sCol: any) => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
        onColumnChanged && onColumnChanged(orderedSelectedColumns);
    }

    const [value, setValue] = useState(globalFilter);

    useEffect(() => {
        setValue(globalFilter);
    }, [globalFilter]);

    const onGlobalFilterChange = (e: any) => {
        console.log('onGlobalFilterChange', e.target.value);

        let filter = null;
        if (e.target.value !== '') {
            filter = e.target.value;
        } 
        setValue(filter);
        
        onGlobalFilterChanged && onGlobalFilterChanged(filter===''?null:filter);
    }

    return (
        <>
            <div className="container-fluid">
                <div className='row mb-3'>
                    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
                        <h2><span className="text-900">{title}</span></h2>


                        <div className='flex justify-content-center mb-0'>
                        </div>
                    </div>
                </div>




                <div className="row">
                    <div className="flex flex-wrap justify-content-between align-items-center">

                        <div className="flex justify-content-between align-items-center" style={{ textAlign: 'left' }}>
                            <MultiSelect
                                value={selectedColumns}
                                options={columns}
                                optionLabel='header'
                                onChange={onColumnToggle} style={{ width: '20em' }} />
                        </div>

                        <div className="flex justify-content-center align-items-center mb-0 gap-2">
                            <SelectButton value={size} onChange={onSizeChanged} options={sizeOptions} hidden />
                            {/* <Button icon="pi pi-refresh" raised rounded className='ml-2' /> */}
                        </div>


                        <div className="p-input-icon-left">
                            <i className="pi pi-search ml-3" />
                            <InputText
                                value={value}
                                onChange={onGlobalFilterChange}
                                placeholder={globalFilterPlaceholder}
                                className="pl-6"
                            />
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}