'use client';


import { OBI } from "@/src/types/obi";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import React, { useRef, useState } from "react";


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

    // deletePath?: Url;   
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

    globalFilter?: string; // should contain
    globalFilterPlaceholder?: string;
    onGlobalFilterChanged?: (e: any) => void;
}



export default function TableHeader({ id, name,
    title,
    createPath = './create', createLabel = 'Créer', createIcon = 'pi pi-plus', createClassName = 'mr-1 p-2',
    updateLabel = 'Éditer', updateIcon = 'pi pi-file-edit', updateClassName = 'mr-1 p-2',
    deleteLabel = 'Supprimer', deleteIcon = 'pi pi pi-trash', deleteClassName = 'mr-1 p-1',
    filterLabel = 'Reset', filterIcon = 'pi pi-filter-slash', filterClassName = 'mr-1 p-2',
    onClear,
    catalogSelected,
    size = 'small', onSizeChanged,
    globalFilter =  '', globalFilterPlaceholder = 'Rechercher...', onGlobalFilterChanged
}: TableHeaderProps) {



    const [sizeOptions] = useState<OBI.SizeOption[]>([
        { label: 'Petit', value: 'small' },
        { label: 'Normale', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);


    return (
        <>
            <div className="container">
                <div className='row mb-3'>
                    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
                        <h2><span className="text-900">{title}</span></h2>


                        <div className='flex justify-content-center mb-0'>
                            <Link href={createPath ? createPath : './create'} className='mr-1'>
                                <Button label={createLabel} icon={createIcon} severity="success" className={createClassName} />
                            </Link>

                            {catalogSelected ?
                                <>
                                    <Link href={`./${catalogSelected.id}/update`}
                                    >
                                        <Button label={updateLabel} icon={updateIcon} severity="warning" className={updateClassName} />
                                    </Link>
                                    <Button label={deleteLabel} icon={deleteIcon} severity="danger" className={deleteClassName} />

                                </>
                                : null}

                            <Button type="button" icon={filterIcon} label={filterLabel} outlined onClick={onClear} className={filterClassName} />
                        </div>
                    </div>
                </div>





                <div className="flex justify-content-between align-items-center">

                    <div className="flex justify-content-between align-items-center">
                        <SelectButton value={size} onChange={onSizeChanged} options={sizeOptions} />
                        {/* <Button icon="pi pi-refresh" raised rounded className='ml-2' /> */}
                    </div>
                    {/* 
                    <div className="flex justify-content-center align-items-center mb-0 gap-2">
                        <div className="col-md-2">
                            <span>
                                <label>Metakey</label>
                                <InputSwitch
                                    checked={metaKey}
                                    onChange={onMetakeyChange}
                                />
                            </span>
                            <span>
                                {metaKey === true ? 'Oui' : 'Non'}
                            </span>
                        </div>

                        <div className="col-md-2">
                            <label>Row Click</label>{' '}
                            <InputSwitch
                                checked={rowClick}
                                onChange={(e) => setRowClick(e.value)}
                            />
                            <span>{rowClick === true ? 'Oui' : 'Non'}</span>
                        </div>

                        <div className="col-md-2">
                            <label>Filter Row</label>{' '}
                            <InputSwitch
                                checked={filterDisplay === 'row'}
                                onChange={onFilterDisplayChange}
                            />
                            <span>{filterDisplay === 'menu' ? 'Menu' : 'Ligne'}</span>
                        </div>
                    </div> */}


                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilter}
                            onChange={onGlobalFilterChanged}
                            placeholder={globalFilterPlaceholder}
                        />
                    </span>

                </div>
            </div>

        </>
    );
}