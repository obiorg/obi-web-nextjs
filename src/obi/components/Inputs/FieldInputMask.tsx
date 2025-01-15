'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";


// Define the props that the PostForm component expects
interface FieldInputMaskProps {
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

    mask?: string; // text mask

    render?: boolean; // render the component or not, default is true
}


export default function FieldInputMask({ 
        id, 
        name, 
        title,
        value,
        onChange,
        error, placeholder, tooltip, tooltipOptions,
        disabled,
        mask,
        render = true, // render the component or not
    }: FieldInputMaskProps) {




    return (
        <>
            {render !== true ? <></> :
                <div className="grid mb-2">
                    <div className='col-12 md:col-2'>
                        <label htmlFor={id} className="input-field">
                            {title}
                        </label>
                    </div>

                    <InputMask
                        id={id}
                        name={name}
                        defaultValue={value}
                        onChange={onChange}
                        className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}

                        placeholder={placeholder}
                        // required
                        tooltip={tooltip}
                        tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}
                        disabled={disabled}

                        mask={mask}
                        
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