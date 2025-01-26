'use client';

import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";


// Define the props that the PostForm component expects
interface OutputErrorProps {
    id?: string;                         // ID of the component
    title?: string; // Title of the component
    catalog?: any;                      // object child list
    loading?: boolean; // loading state
    loadingTitle?: string; // Title of the
    classMain?: string;
    classLoadingTitle?: string;  // Title of the component
    classTitle?: string; // Title of the component
    childn?: number; // sequence in the recursive number, default 0
}


export default function OutputError({
    id,
    title,
    catalog,
    loading,
    loadingTitle = '... Error processing ...',
    classMain = "",
    classLoadingTitle = "",
    classTitle = "",
    childn = 0
}: OutputErrorProps) {

    useEffect(() => {
        // console.log("OutputError", loading);
        // console.log(catalog);
    }, [loading]);



    return (
        <>
            <div className={'p-message p-component p-message-error p-message-enter-done'
                + (loading || catalog ? '' : 'hidden')}
                key={'Main_' + childn}
            >


                {loading ?
                    <div
                        key={'LoadingContent_' + childn}>
                        <label><i className={'p-message-wrapper pi pi-spin pi-clock ' + classLoadingTitle}></i> {loadingTitle}</label>
                    </div>
                    :
                    <>
                        {catalog ?
                            <>
                                <span className={(childn > 0 ? 'text-1xl ' : 'text-2xl ') + classTitle}>{title ? title : 'Détails d\'erreur'}</span>
                                <div key={'Content_' + childn} className="col-12 ">

                                    {Object.keys(catalog).length > 0 ?
                                        Object.keys(catalog).map((keySet: any, i: number) => {
                                            if (keySet != 'issues') {
                                                // console.log('typeOf: ' + keySet, typeof (catalog[keySet]));
                                                if (typeof catalog[keySet] === 'object' && catalog[keySet] !== null) {
                                                    // console.log('parse ' + keySet + ' ' +  (catalog[keySet]));
                                                    if (!catalog[keySet].stack) {
                                                        return <>
                                                            <OutputError
                                                                key={'OutputError_' + (childn + 1)}
                                                                catalog={catalog[keySet]}
                                                                title={keySet} loading={loading}
                                                                childn={(childn + 1)}
                                                            />
                                                        </>;
                                                    } else {
                                                        return <>
                                                            <div key={keySet + '_' + childn + '_stack'} className="grid mb-2">
                                                                <label className='col-12 md:col-2 p-0 m-0 text-primary'
                                                                    key={'a_' + keySet + '_' + childn + '_stack'}>Stack</label>
                                                                <label className='col-12 md:col-10 p-0 m-0 text-primary'
                                                                    key={'b_' + keySet + '_' + childn + '_stack'}>{catalog[keySet].stack}</label>
                                                            </div>
                                                            <div key={keySet + '_' + childn + '_message'} className="grid mb-2">
                                                                <label className='col-12 md:col-2 p-0 m-0 text-primary'
                                                                    key={'a_' + keySet + '_' + childn + '_stack'}>Message</label>
                                                                <label className='col-12 md:col-10 p-0 m-0 text-primary'
                                                                    key={'b_' + keySet + '_' + childn + '_message'}>{catalog[keySet].message}</label>
                                                            </div>
                                                        </>;
                                                    }
                                                } else {
                                                    return <>
                                                        <div key={keySet + '_' + childn + '_' + i} className="grid mb-2">
                                                            <label className='col-12 md:col-2 p-0 m-0 text-primary'
                                                                key={'a_' + keySet + '_' + childn + '_' + i}>{keySet}</label>
                                                            <label className='col-12 md:col-10 p-0 m-0 text-primary'
                                                                key={'b_' + keySet + '_' + childn + '_' + i}>{catalog[keySet]}</label>
                                                        </div>
                                                    </>
                                                }
                                            }
                                        })
                                        :
                                        <div key={'NoData_' + childn} className="grid mb-2"><label className='col-12 md:col-2 p-0 m-0 text-primary'
                                            key={'NoDataA_' + childn}>Error in execution</label>
                                            <label className='col-12 md:col-10 p-0 m-0 text-primary'
                                                key={'NoDataB_' + childn}>Please check CTRL+F12 for more info</label>
                                        </div>
                                    }


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