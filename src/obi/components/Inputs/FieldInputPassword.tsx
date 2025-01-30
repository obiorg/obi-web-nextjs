'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Password } from "primereact/password";


// Define the props that the PostForm component expects
interface FieldInputPasswordProps {
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

    feedback?: boolean; // display feedback icon or not
    render?: boolean; //
}


export default function FieldInputPassword(
    { id, name, title,
        value,
        onChange,
        error, placeholder, tooltip, tooltipOptions,
        disabled,
        feedback = false,
        render = true
    }: FieldInputPasswordProps) {




    return (
        <>
            {render !== true ? <></> :
                <div className={'grid mb-2 '}>
                    <div className='col-12 md:col-2'>
                        <label htmlFor={id} className="input-field">
                            {title}
                        </label>
                    </div>

                    <Password
                        id={id}
                        name={name}
                        defaultValue={value}
                        onChange={onChange}
                        className={'col-12 md:col-5  pl-0 mb-2 input-value ' + (error ? 'p-invalid' : '')}

                        placeholder={placeholder}
                        // required
                        tooltip={tooltip}
                        tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}
                        disabled={disabled}

                        feedback={false}
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