'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface FieldInputTextSliderProps {
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
    disabled?: boolean; // disable edition

    render?: boolean; //

    min?: number; // minimum
    max?: number; // maximum
}


export default function FieldInputTextSlider({
    id,
    name,
    title,
    value,
    onChange,
    error, placeholder, tooltip, tooltipOptions,
    disabled,
    render = true,
    min = 0,
    max = 100
}: FieldInputTextSliderProps) {


    const [selectedCatalog, setSelectedCatalog] = useState<any>(0);
    /**
     * Update Selected Catalog
     */
    useEffect(() => {
        if (value)
            setSelectedCatalog(value);
    }, [value]);


    const onChangeCatalog = (e: any) => {
        // console.log('onChangeCatalog', e);
        let val = min;

        // From Slider
        if (e.value) {
            val = e.value
        }
        // From Input
        else if (e.target) {
            val = e.target.value;
            // Manage range
            if (val > max) val = max;
            if (val < min) val = min;

        }

        // Update Selected Catalog
        setSelectedCatalog(val);
        onChange ? onChange(e) : false;

    }


    return (
        <>
            {render !== true ? <></> :
                <div className={'grid mb-2 '}>
                    <div className='col-12 md:col-2'>
                        <label htmlFor={id} className="input-field">
                            {title}
                        </label>
                    </div>

                    <div key={'group_' + name + '-input'} className={'col-12 md:col-5  mb-2 input-value ' + (error ? 'p-invalid' : '')}>
                        <InputText
                            id={id}
                            name={name}
                            key={name + '-input'}
                            value={selectedCatalog}
                            // defaultValue={selectedCatalog}
                            onChange={onChangeCatalog}
                            className={'pl-2 input-value ' + (error ? 'p-invalid' : '')}

                            placeholder={placeholder}
                            // required
                            tooltip={tooltip}
                            tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}
                            disabled={disabled}
                            keyfilter='num'
                        />
                        <Slider
                            id={id}
                            name={name}
                            key={name + '-slider'}
                            min={0}
                            max={7}
                            value={selectedCatalog}
                            defaultValue={selectedCatalog}
                            onChange={onChangeCatalog}
                            className={' mb-2 ' + (error ? 'p-invalid' : '')}
                        />
                    </div>


                    <div key={'group_' + name + '-error'} className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
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