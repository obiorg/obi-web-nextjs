'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface FieldDropDownProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
    value?: string;
    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // The callback function to be called when the value changes
    error?: any; // child of formState ex: formState.erros?.location

    placeholder?: string; // placeholder
    tooltip?: string; // tooltip text
    tooltipOptions?: any; // options for tooltip

    options?: any; // options

    emptyFilterMessage?: string; //
    emptyMessage?: string; // Message to display when no items are found

    render?: boolean; //
}



export default function FieldDropDown(
    { id, name, title, value, options, onChange, error,
        placeholder = "Rechercher ...'",
        tooltip, tooltipOptions,
        emptyFilterMessage = "Recherche sans résultat...",
        emptyMessage = 'vide !',
        render = true }: FieldDropDownProps) {

    // Used for dropdown list catalog
    const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
    const [catalogs, setCatalogs] = useState<any>([]);

    // Use to refresh the dropdown list
    const [refresh, setRefresh] = useState(false);

    // Used for toast
    const toast = useRef<Toast>(null);
    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, sticky: true, closable: false });
    }

    /**
     * Collect the catalogs and prepare the display
     */
    useEffect(() => {
        setCatalogs(options);
    }, [options]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Update Selected Catalog
     */
    useEffect(() => {
        setSelectedCatalog(value);
    }, [value]);


    /**
     * 
     * @param e 
     */
    const onChangeCatalog = (e: any) => {
        onChange(e);
        setSelectedCatalog(e.value);
    }


    return (
        <>
            {render !== true ? <></> :
                <div className="grid mb-2">
                    <div className='col-12 md:col-2'>
                        <label htmlFor={id} className="input-field">
                            {title}
                        </label>
                    </div>

                    <Dropdown
                        id={id}
                        name={name}
                        value={selectedCatalog}
                        options={catalogs}
                        onChange={onChangeCatalog}
                        className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}
                        placeholder={placeholder}
                        // required
                        tooltip={tooltip}
                        tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}

                        showClear
                        filter
                        showFilterClear
                        emptyFilterMessage={emptyFilterMessage ? emptyFilterMessage : "Recherche sans résultat..."}
                        emptyMessage={emptyMessage ? emptyMessage : "Vide !"}
                    />

                    <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                        {
                            error
                            &&
                            <div className="text-red-500">
                                <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                {error?.join(', ')} {/* // Display form errors related to the title field*/}
                            </div >
                        }
                    </div>

                </div>
            }
        </>
    );
}