'use client';



import { Url } from "next/dist/shared/lib/router/router";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
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
    globalFilter,
    globalFilterPlaceholder = 'Rechercher...',
    onGlobalFilterChanged,

    columns,
    onColumnChanged
}: TableHeaderProps) {





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
        // console.log('onGlobalFilterChange', e.target.value);

        let filter = null;
        if (e.target.value !== '') {
            filter = e.target.value;
        }
        setValue(filter);

        onGlobalFilterChanged && onGlobalFilterChanged(filter === '' ? null : filter);
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
                            {columns ?
                                <MultiSelect
                                    value={selectedColumns}
                                    options={columns}
                                    optionLabel='header'
                                    onChange={onColumnToggle} style={{ width: '20em' }} />
                                : null}
                        </div>



                        <div className="p-input-icon-left">
                            <i className="pi pi-search ml-3" />
                            {value ?
                                <InputText
                                    value={value}
                                    onChange={onGlobalFilterChange}
                                    placeholder={globalFilterPlaceholder}
                                    className="pl-6"
                                />
                                : null}
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}