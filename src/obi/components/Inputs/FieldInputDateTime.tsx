'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";


// Define the props that the PostForm component expects
interface FieldInputDateTimeProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown

    value?: string | number | undefined;

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



export default function FieldInputDateTime({
    id,
    name,
    title,
    value,
    options,
    onChange,
    error,
    placeholder = "Rechercher ...'",
    tooltip, tooltipOptions,
    emptyFilterMessage = "Recherche sans résultat...",
    emptyMessage = 'vide !',
    render = true }: FieldInputDateTimeProps) {

    // Used for dropdown list catalog
    const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
    const [catalogs, setCatalogs] = useState<any>([]);



    // Used for toast
    const toast = useRef<any>(null);
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
        onChange ? onChange(e) : false;
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



                    <Calendar
                        id={id}
                        name={name}
                        inputId={name}
                        value={selectedCatalog}
                        onChange={onChangeCatalog}
                        className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}
                        placeholder={placeholder}
                        // required
                        tooltip={tooltip}
                        tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}


                        locale='fr'
                        dateFormat="dd/mm/yy"
                        // maxDate={dateFrom}

                        showTime
                        showButtonBar
                        showIcon
                        hourFormat="24"
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