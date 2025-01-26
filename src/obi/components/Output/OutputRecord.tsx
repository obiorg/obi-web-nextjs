'use client';

import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface OutputRecordProps {
    id?: string;                         // ID of the component
    title?: string; // Title of the component
    catalog?: any;                      // object child list
    loading?: boolean; // loading state
}


export default function OutputRecord({ id, title, catalog, loading }: OutputRecordProps) {

    useEffect(() => {
        // console.log("OutputRecord", loading);
    }, [loading]);


    return (
        <>
            <div className={"p-fluid border-1 p-2 mt-4 color-greens " + (loading || catalog ? '' : 'hidden')}
                style={{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '3rem' }}
            >


                {loading ?
                    <div >
                        <label><i className="pi pi-spin pi-clock"></i> ... En cours....</label>
                    </div>
                    :
                    <>
                        {catalog ? 
                            <>
                               
                                <h5>{title ? title : 'Dernier enregistrement'}</h5>
                                <div  className="col-12 ">
                                    {Object.keys(catalog).map((key, index) => (
                                        <div key={key} className="grid mb-2">
                                            <label className='col-12 md:col-2 p-0 m-0 text-primary'
                                                key={'a_' + key}>{key}</label>
                                            <label
                                                key={'b_' + key}>
                                                {
                                                    catalog[key] === null
                                                        || catalog[key] === ''
                                                        || catalog[key] === 0
                                                        || catalog[key] === undefined
                                                        ? '-' :
                                                        (
                                                            typeof (catalog[key]) === "boolean"
                                                                ?
                                                                (catalog[key] ? 'true' : 'false')
                                                                :
                                                                catalog[key])
                                                }</label>
                                        </div>
                                    ))}
                                </div>
                            </>
                            :
                            null
                        }
                    </>
                }
            </div>
        </>
    );
}