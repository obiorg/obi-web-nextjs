'use client';


import LocationDelete from "@/src/app/[locale]/(main)/sys/localisations/locations/components/post-delete";
import { OBI } from "@/src/types/obi";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { MultiSelect } from "primereact/multiselect";
import { OverlayPanel } from "primereact/overlaypanel";
import { Panel } from "primereact/panel";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";


interface ErrorProps {
    error: {
        message: string,
        stack: string
    };
    message: string,
    name: string
}

// Define the props that the PostForm component expects
interface DialogErrorProps {
    error: ErrorProps
    onYes?: (e: any) => void;
}



export default function DialogError({
    error,
    onYes

}: DialogErrorProps) {


    useEffect(() => {
        if (error) {
            setDialogErr(true);
        } else {
            setDialogErr(false);
        }
    }, [error])



    const [dialogErr, setDialogErr] = useState(false);
    const renderFooter = () => {
        return (
            <div>
                <Button label="Non" icon="pi pi-times" onClick={() => setDialogErr(false)} className="p-button-text" />
                <Button label="Oui" icon="pi pi-check"
                    onClick={(e: any) => {
                        setDialogErr(false);
                        onYes && onYes(e);
                    }
                    } autoFocus />
            </div>
        );
    }
    return (
        <>

            <Dialog
                header={"Erreur(s) - " + error?.name}
                visible={dialogErr}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '50vw' }}
                headerClassName=' p-3 '
                contentClassName='pt-3'
                footer={renderFooter()}
                onHide={() => setDialogErr(false)}
                maximizable modal
            >
                <p>
                    <span className='p-text-bold'>{error?.message}</span>
                </p>
                <Panel header="Plus d'infos" toggleable collapsed={true} >
                    <p>
                        {error?.error?.stack}
                    </p>
                </Panel>

                <p><br />
                    Corriger... ! Voulez-vous actualiser ?
                </p>
            </Dialog>


        </>
    );
}