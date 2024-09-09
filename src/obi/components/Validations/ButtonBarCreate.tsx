'use client';

import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import ButtonSave from "./ButtonSave";
import Link from "next/link";
import { useForm } from "react-hook-form";


// Define the props that the PostForm component expects
interface ButtonSaveProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    label?: string;                      // preceding title of dropdown

    createLabel?: string;
    cancelLabel?: string;
    listLabel?: string;
    updateLabel?: string;

    onSaveClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onCancelClick?: (e: any) => void; // The callback function to
    onModeChanged?: (e: any) => void; // when change occur in mode

    formaAction?:any; //
}


export default function ButtonBarCreate({ id, name, label, createLabel, cancelLabel, listLabel, updateLabel, onSaveClick, onCancelClick, onModeChanged, formAction }: ButtonSaveProps) {
    // To bloc during status
    const { pending } = useFormStatus();

    // Used for toast
    const toast = useRef<Toast>(null);

    // managing mode 
    const [mode, setMode] = useState(0); // see modes

    // Simulate click event
    const inputCancelElement = React.useRef()



    const doCancel = (e:any) => {
        e.preventDefault();
        console.log('ButtonBarCreate > doCancel', e)
        inputCancelElement.current.click();
        onCancelClick(e);
    }
    
    const { reset } = useForm();

    return (
        <>
            <div className='grid'>
                <div className='col-12 md:col-3 mt-0 '>
                    <ButtonSave
                        label={createLabel}
                        // onClick={onSaveClick}
                        onModeChanged={onModeChanged}
                    />
                </div>


                <Link href="./"
                    className='col-12 md:col-3 mt-0 '>
                    <Button label={cancelLabel ? cancelLabel : "Annuler"}
                        icon="pi pi-undo"
                        severity="secondary"
                        type="submit"
                        formAction={formAction}
                        // // className="col-12 md:col-2  m-1"
                        // tooltip='Annuler en effaçant les informations enregistré'
                        // tooltipOptions={{ position: 'bottom' }}
                        onClick={doCancel}
                        // onClick={reset}
                    />

                    <button type='submit'  ref={inputCancelElement} onClick={reset} className="hidden" ></button>
                </Link>
                <Link href="./../"
                    className='col-12 md:col-3 mt-0 '>
                    <Button label="Lister" icon="pi pi-list"
                        severity="info"
                        // className="col-12 md:col-2  m-1"
                        tooltip='Retourner au tableau de données'
                        tooltipOptions={{ position: 'bottom' }}
                    />
                </Link>
            </div>
        </>
    );
}