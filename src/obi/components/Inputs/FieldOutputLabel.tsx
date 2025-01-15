'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { format } from 'date-fns';

// Define the props that the PostForm component expects
interface FieldOutputLabelProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
    value?: string | number | Date ;
    type?: string;                       // type of input field (text, date, number, password, etc.)   
    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // when change occur in mode
    error?: any; // child of formState ex: formState.erros?.location

    placeholder?: string; // placeholder
    tooltip?: string; // tooltip text
    tooltipOptions?: any; // options for tooltip
    disabled?: any; // disable edition
}


export default function FieldOutputLabel(
    { id, name, title,
        value,
        onChange,
        error, placeholder, tooltip, tooltipOptions,
        disabled,
        type = 'text',
    }: FieldOutputLabelProps) {

    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (type === 'text') {
            setDisplayValue(value);
        } else if (type === 'datetime') {
            let dt = '';
            // console.log('Value', value);
            let date = new Date(value ? value : new Date());
            // console.log(date);
            // console.log('date.toISOString()', date.toISOString());
            // console.log('date.toUTCString()', date.toUTCString());
            // console.log('date.toLocaleDateString()', date.toLocaleDateString());
            // console.log('date.getHours()', date.getHours());
            // console.log('date.getMinutes()', date.getMinutes());
            // console.log('date.getSeconds()', date.getSeconds());
            if (value) {
                // dt = date.toISOString().replace('T', ' ').replace('Z', '').replace('.' + date.getMilliseconds(), ''); //
                // dt = date.toLocaleString('fr-FR', {
                //     day: '2-digit',
                //     month: '2-digit',
                //     year: 'numeric',
                //     hour: '2-digit',
                //     minute: '2-digit',
                //     second: '2-digit'
                // })
                dt = format(date, 'dd/MM/yyyy HH:mm:ss');
                // console.log(dt);

            }
            // console.log(dt);
            setDisplayValue(dt);
            // value={new Date(initialData?.changed).toLocaleString() + ' ' +  new Date(initialData?.changed).getTime().toString()}
            // setDisplayValue(value);
        } else if (type === 'date') {

        } else if (type === 'time') {
            setDisplayValue(new Date(value?value:new Date()).toLocaleTimeString());
        } else if (type === 'number') {
            setDisplayValue(value ? String(Number(value).toFixed(2)):'0');
        } else if (type === 'password') {
            setDisplayValue('*****');
        }
    }, [value, type]);


    return (
        <>
            <div className="grid mb-2">
                <div className='col-12 md:col-2'>
                    <label htmlFor={id} className="input-field">
                        {title}
                    </label>
                </div>

                <div
                    className={'col-12 md:col-5  pl-2 mb-1 input-value  text-left align-content-center p-0' + (error ? 'p-invalid' : '')}
                >
                    <label>
                        {displayValue}
                    </label>
                    <input type="text" id={id} name={name} defaultValue={value} hidden className="rounded p-2 w-full" />
                </div>


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

        </>
    );
}