'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";


// Define the props that the PostForm component expects
interface FieldInputCheckboxProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
    value?: boolean; // true
    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // when change occur in mode
    error?: any; // child of formState ex: formState.erros?.location


    tooltip?: string; // tooltip text
    tooltipOptions?: any; // options for tooltip
    disabled?: any; // disable edition
}


export default function FieldInputCheckbox(
    { id, name, title,
        value = false,
        onChange,
        error,
        tooltip, tooltipOptions,
        disabled
    }: FieldInputCheckboxProps) {

    const [checked, setChecked] = useState<boolean>(false);

    const onCheck = (e: any) => {
        console.log('onCheck', e);
        setChecked(e.target.checked);
        onChange(e.target.checked);
    }


    return (
        <>
            <div className="grid mb-2">
                <div className='col-12 md:col-2'>
                    <label htmlFor={id} className="input-field">
                        {title}
                    </label>
                </div>

                <Checkbox
                    id={id}
                    inputId={id}
                    name={name}
                    checked={checked}
                    onChange={onCheck}
                    className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}


                    tooltip={tooltip}
                    tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}
                    disabled={disabled}
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

        </>
    );
}