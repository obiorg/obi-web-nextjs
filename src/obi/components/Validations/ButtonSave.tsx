'use client';

import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface ButtonSaveProps {
    id?: string;                        // ID of the component
    name?: string;                      // Name of the component
    labelsType0?: string[];                     // preceding title 
    labelsType1?: string[];                     // preceding title 
    icons?: string[];                     // preceding title 
    className?: string; //
    onClick?: (e: any) => void;         // The callback function to be called when the button is clicked
    onModeChanged?: (e: any) => void;   // when change occur in mode

    type?: number;                      // The type of button 0 : create 1: update
}


export default function ButtonSave(
    { id, name,
        labelsType0 = ['Créer & Reset', 'Enreg. & Voir'],
        labelsType1 = ['Créer', 'Enreg. partiel'],
        icons = ['pi pi-save', 'pi pi-spin pi-save'],
        className = '',
        onClick, onModeChanged,
        type = 0
    }

        : ButtonSaveProps) {
    // To bloc during status
    const { pending } = useFormStatus();

    // Used for toast
    const toast = useRef<Toast>(null);

    // managing mode 
    const [mode, setMode] = useState(0); // see modes

    // Simulate click event
    const inputElement = React.useRef()

    const modes = [
        {
            label: type === 0 ? labelsType0[0] : labelsType1[0],
            icon: icons[0],
            command: (e) => {
                toast.current.show({ severity: 'success', summary: 'Mode Sauvegarde', detail: 'Mode sauvegarde et reset activé' });
                setMode(0);
                { onModeChanged ? onModeChanged(0) : null }
            }
        },
        {
            label: type === 0 ? labelsType0[1] : labelsType1[1],
            icon: icons[1],
            command: (e) => {
                toast.current.show({ severity: 'success', summary: 'Delete', detail: 'Mode sauvegarde seul activé' });
                setMode(1);
                { onModeChanged ? onModeChanged(1) : null }
            }
        },
    ]


    /**
     * Allows to process main button click events
     * @param e 
     */
    const doSubmit = (e: any) => {
        e.preventDefault();
        inputElement.current.click();
    }

    return (
        <>
            {/** Message toaster display */}
            <Toast ref={toast} />

            <SplitButton
                id={id}
                label={pending ? "En cours..." : modes[mode].label}
                icon={modes[mode].icon}
                severity="success"
                disabled={pending}
                onClick={doSubmit}
                model={modes}
                
                className={className}
            />

            <button type='submit' ref={inputElement} className="hidden" ></button>

        </>
    );
}