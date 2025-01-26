'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { InputMask, Track } from "@react-input/mask";
import { set } from "date-fns";
import { useTranslations } from "next-intl";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FormEvent } from "primereact/ts-helpers";
import { useEffect, useRef, useState } from "react";



// Define the props that the PostForm component expects
interface FieldInputIPv4Props {
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

    // mask?: string; // text mask

    render?: boolean; // display or not component default true
}


export default function FieldInputIPv4(
    { id, name, title,
        value,
        onChange,
        error, placeholder, tooltip, tooltipOptions,
        disabled,
        render = true
    }: FieldInputIPv4Props) {

    // Lanugage
    const g = useTranslations('global');

    // Used for toast
    const toast = useRef<any>(null);
    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, sticky: false, closable: true });
    }
    const showSuccess = (title: string, message: string) => {
        toast.current.show({ severity: 'success', summary: title, detail: message, life: 5000, closable: true });
    }


    const [lValue, setLValue] = useState(value);

    useEffect(() => {
        let s = value?.split('.');
        setLValue(value);
    }, [value]);


    /**
     * Allow to get last char
     * @param value string value where to get last char
     * @returns the last char
     */
    const charEnd = (value: string): string => {
        return value.substring(value.length - 1, value.length);
    }

    /**
     * Allow to check if char is a dot
     * @param char string value to be check if is a dot 
     * @returns true if is a dot
     */
    const isDot = (char: string): boolean => {
        return char === '.';
    }

    /**
     * Allow to check if char is a numeric value between 0 and 9
     * @param value one dit to be checked as numeric value 0...9
     * @returns true if is a numeric value
     */
    const isNumeric = (value: number | string | null): boolean => {

        if (value === null || value === undefined)
            return false;

        let num = Number(value);
        if (isNaN(num)) return false;
        if (num < 0 || num > 9) return false;

        return true;
    }

    const fillPart = (value: string): string => {
        let s = value.split('.');
        let l: string = '';
        // console.log('adjustSequence : s = ', s);
        for (let i = 0; i < s.length - 1; i++) {
            if (s[i].length < 3 && i < 3) {
                l += s[i].padEnd(3, ' ') + '.';
            } else if (s[i].length === 3) {
                l += s[i] + '.';
            } else {
                l += s[i];
            }
            // console.log('adjustSequence ' + i + ' l = ' + l);
        }
        return l;
    }

    const clearPart = (value: string): string => {
        let s = value.split('.');
        let l: string = '';
        // console.log('clearSequence : s = ', s);
        for (let i = 0; i < s.length; i++) {
            // if (s[i].length < 3 && i < 3) {
            //     l += s[i].padEnd(3, ' ') + '.';
            // } else if (s[i].length === 3) {
            //     l += s[i] + '.';
            // } else {
            //     l += s[i];
            // }
            if (i === s.length - 1) {
                l += s[i].replaceAll(' ', '');
            } else {
                l += s[i] + '.';
            }
            // console.log('clearSequence ' + i + ' l = ' + l);
        }
        return l;
    }






    const RED = "\u001b[31m";
    const RESET = "\u001b[0m";
    const YELLOW = "\u001b[33m";
    const GREEN = "\u001b[32m";
    const BLUE = "\u001b[34m";
    const MAGENTA = "\u001b[35m";
    const CYAN = "\u001b[36m";
    const WHITE = "\u001b[37m";
    const BLACK = "\u001b[30m";

    const onChanging = (e: any) => {

        // console.log('onInput', e, e.target.value, lValue);
        // Avoid dot duplication
        let _value = e.target.value.replaceAll('..', '.');
        let l: string = '';
        // console.log('onInput : _value, lValue (>' + lValue + '<, >' + lValue + '<)');

        // Detect Mode depend on size insert
        let editing: boolean = false;
        let editingDirection: string = ''; // 'backward' or 'forward' depending state
        // Check edit by inserting one character from empty value
        if (lValue === undefined) {
            editing = _value.length === 1;
        }
        // Check edit by existing _value depend on new one
        else if (Math.abs(lValue.length - _value.length) === 1) {
            editing = true;
            editingDirection = _value.length > lValue.length ? 'forward' : 'backward';
        }

        // Stop if no change between _value and lvalue
        else if (_value === lValue) {
            // console.log('==> onChanging : no change');
            return;
        }





        // Discard IPv4 length
        if (_value.length >= 16) {
            // console.log('==> onChanging : discarding IPv4 length');
            return;
        }

        //
        l = _value;
        if (editing) {
            // Get last character
            let lastChar = charEnd(_value);
            // console.log('onChanging : editing char = ' + lastChar);

            // Discard if editing an alphanumeric except dot
            if (!isNumeric(lastChar) && !isDot(lastChar)) {
                // console.log('==> onChanging : discarding alfa char');
                return;
            }

            if (isDot(lastChar)) {
                // console.log('==> onChanging : dot');
                if (lValue && isDot(charEnd(lValue))) {
                    // do nothing
                } else {
                    l = fillPart(_value);
                }
            }
            // On delete mean backwards
            else if (editingDirection == 'backward' && lValue) {
                // If last character is a dot, remove it
                if (isDot(charEnd(lValue))) {
                    l = clearPart(_value);
                }
            }
            // On forward editing different from dot
            else if (editingDirection == 'forward') {
                // limit _value in good range
                let splited = l.split('.');
                let partOn = splited[splited.length - 1];
                // console.log('==> onChanging : forwards partOn = ' + partOn);

                l = '';
                if (partOn.length >= 3) {
                    let n = Number(partOn);
                    if (n > 255) n = 255;
                    splited[splited.length - 1] = n.toString() + '.';
                }
                for (let i = 0; i < splited.length; i++) {
                    l += splited[i];
                    if (i + 1 !== splited.length) {
                        l += '.';
                    }
                }
            }


        } else {
            // Make full process

            // Split with dot '.'
            let splited = _value.split('.');
            let part: any = [];
            // console.log('on paste splitted: ', splited)

            // Fill with space
            let j = 0;
            for (let i = 0; i < splited.length; i++) {
                // check if _value inserted
                let n = Number(splited[i]);
                // console.log('checking _value i=' + GREEN + i + ' n= ' + RED + n);
                if (!isNaN(n) && splited[i] !== '') {
                    if (n < 0) n = 0;
                    if (n > 255) n = 255;
                    if (j < 2) {
                        part[j] = n.toString().padEnd(3, ' ');
                    } else {
                        part[j] = n.toString().replace(' ', '');
                    }
                    j++;
                }
            }
            // console.log('onPaste : ' + part);
            l = part.join('.');

        }









        setLValue(l);
        onChange ? onChange(l) : false;
    }


    return (
        <>

            {render !== true ? <></> :
                <div className="grid mb-2">
                    <Toast ref={toast} />
                    <div className='col-12 md:col-2'>
                        <label htmlFor={id} className="input-field">
                            {title}
                        </label>
                    </div>

                    <InputText
                        id={id}
                        name={name}
                        // defaultValue={lValue?lValue:''}
                        value={lValue?lValue:''}
                        onChange={onChanging}

                        className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}

                        placeholder={placeholder}
                        // required
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
            }
        </>
    );
}