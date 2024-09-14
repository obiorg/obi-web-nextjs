'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface FieldOutputLabelProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
    value?: string;
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
        disabled
    }: FieldOutputLabelProps) {




    return (
        <>
            <div className="grid mb-2">
                <div className='col-12 md:col-2'>
                    <label htmlFor={id} className="input-field">
                        {title}
                    </label>
                </div>

                {/* <Output
                    id={id}
                    name={name}
                    defaultValue={value}
                    onChange={onChange}
                    className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}

                    placeholder={placeholder}
                    // required
                    tooltip={tooltip}
                    tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'right' }}
                    disabled={disabled}
                /> */}
                <div
                    className={'col-12 md:col-5  pl-2 mb-1 input-value  text-left align-content-center p-0' + (error ? 'p-invalid' : '')}
                >
                    <label>
                        {value}
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