'use client';

import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import ButtonSave from "./ButtonSave";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


// Define the props that the PostForm component expects
interface ButtonSaveProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    label?: string;                      // preceding title of dropdown

    createLabel?: string[];
    cancelLabel?: string;
    listLabel?: string;
    updateLabel?: string[];
    copyLabel?: string[];

    onSaveClick?: (e: any) => void;     // The callback function to be called when the button is clicked
    onCancelClick?: (e: any) => void;   // The callback function to
    onModeChanged?: (e: any) => void;   // when change occur in mode

    formAction?: any;                   //
    type?: number;                      // The type of button 0 : create 1: update
}


export default function ButtonBarCreate({
    id,
    name,
    label,
    createLabel, cancelLabel,
    listLabel, updateLabel, copyLabel,
    onSaveClick, onCancelClick, onModeChanged,
    type = 0,
    formAction }: ButtonSaveProps) {
    // To bloc during status
    const { pending } = useFormStatus();

    // Used for toast
    const toast = useRef<any>(null);

    // managing mode 
    const [mode, setMode] = useState(0); // see modes

    // Simulate click event
    const inputCancelElement = React.useRef<any>()



    /**
     * Preprocess cancel event
     * @param e event
     */
    const doCancel = (e: any) => {
        e.preventDefault();
        // console.log('ButtonBarCreate > doCancel', e)
        inputCancelElement.current.click();
        onCancelClick ? onCancelClick(e) : false;
        window.location.reload();
    }

    const { reset } = useForm();

    return (
        <>
            <div key={name + '_grid'} className='grid'>

                {/* Create / Update  */}
                <div key={name + '_createUpdate'} className='col-12 md:col-3 mt-0 '>
                    <ButtonSave
                        id={id + '_createUpdate'}
                        name={name + '_createUpdate'}
                        key={name + '_createUpdate'}
                        labelsType0={createLabel}
                        labelsType1={updateLabel}
                        labelsType2={copyLabel}
                        // onClick={onSaveClick}
                        onModeChanged={onModeChanged}
                        type={type}
                    />
                </div>


                {/* Cancel */}
                <Link
                    id={id + '_linkCancel'}
                    key={name + '_linkCancel'}
                    href="./"
                    className='col-12 md:col-3 mt-0 '>

                    <Button
                        id={id + '_cancel'}
                        name={name + '_cancel'}
                        key={name + '_cancel'}

                        label={cancelLabel ? cancelLabel : "Annuler"}
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

                    <button
                        id={id + '_linkButtonCancel'}
                        name={name + '_linkButtonCancel'}
                        key={name + '_linkButtonCancel'}
                        type='submit' ref={inputCancelElement} onClick={reset} className="hidden" ></button>
                </Link>

                {/* List  */}
                <Link
                    id={id + '_linkList'}
                    key={name + '_linkList'}
                    href={type === 0 ? "./../" : "./../../"}
                    className='col-12 md:col-3 mt-0 '>
                    <Button
                        id={id + '_linkButtonList'}
                        name={name + '_linkButtonList'}
                        key={name + '_linkButtonList'}
                        label="Lister" icon="pi pi-list"
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