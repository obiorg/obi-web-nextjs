'use client';


import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import { ScrollPanel } from "primereact/scrollpanel";
import React, { useEffect, useRef, useState } from "react";



interface ErrorProps {
    error: {
        message: string,
        stack: string,
    };
    message: string,
    name: string,
    url:string
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




                <div className="flex flex-column justify-content-center">
                    <div className="flex flex-column align-items-center">
                        <img src="/layout/images/obi/obi-signet-danger.svg"
                            alt="obi-signet-danger svg"
                            className="mb-3 w-6rem flex-shrink-0 align-items-center" />
                    </div>
                    <div
                        style={{
                            borderRadius: '56px',
                            padding: '0.3rem',
                            background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)'
                        }}
                    >
                        <div className=" surface-card py-6 px-5 sm:px-8 flex flex-column"
                            style={{ borderRadius: '53px' }}>

                            <div className="flex flex-column align-items-center">
                                <div className="flex flex-column justify-content-center align-items-center  bg-pink-500 border-circle "
                                    style={{ height: '3.2rem', width: '3.2rem' }}>
                                    <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                                </div>
                            </div>

                            <h5>{error?.message}</h5>
                            <Panel
                                id="errorId"
                                header="Plus d'infos"
                                toggleable
                                collapsed={false}
                                className="flex-column align-items-start ml-0 pl-0"
                            >
                                <ScrollPanel className="m-0" style={{ width: '100%', height: '120px' }} >
                                    <p>{error?.error?.stack}</p>
                                    <p>{error?.url}</p>
                                </ScrollPanel>
                            </Panel>

                            <div className="flex flex-column align-items-center justify-content-between p-0 ">
                                <div className="text-600 mt-3 mb-5">Voulez-vous actualiser ?</div>
                                <img src="/demo/images/error/asset-error.svg" alt="Error" className="mb-2" width="80%" />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>


        </>
    );
}