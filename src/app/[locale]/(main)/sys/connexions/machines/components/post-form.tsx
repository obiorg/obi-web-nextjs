// src/components/post-form.tsx

// this is a client component
'use client'

import { MachinesModel } from "@/src/obi/models/connexions/MachinesModel"
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { OBI } from "@/src/types"



import DialogError from "@/src/obi/components/Dialog/DialogError"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldInputIP from "@/src/obi/components/Inputs/FieldInputIP"
import FieldInputNumber from "@/src/obi/components/Inputs/FieldInputNumber"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import { MachinesService } from "@/src/obi/service/connexions/MachinesService"
import { useRouter } from "next/navigation"
import { BlockUI } from "primereact/blockui"
import { Messages } from "primereact/messages"
import CompaniesDropDown from "../../../businesses/companies/components/CompaniesDropDown"
import FieldInputMask from "@/src/obi/components/Inputs/FieldInputMask"




const model = new MachinesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.LocationsPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.LocationsFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<Toast>(null);
    const msg = useRef(null);

    // Managing long request wating
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    let loadLazyTimeout = useRef(null);


    // state management
    const [onMessage, setOnMessage] = useState(false);
    const [msgSeverity, setMsgSeverity] = useState('info'); // success, info, warn, error
    const [msgSummary, setMsgSummary] = useState('Info'); // info as default
    const [msgDetail, setMsgDetail] = useState('Default detail'); // Message Content as default
    const [msgSticky, setMsgSticky] = useState(false); //

    // last created catalog
    const [catalog, setCatalog] = useState<OBI.Locations>(null);



    // To manage validation
    const [saveMode, setSaveMode] = useState(0); // 0: save and reset; 1: save
    const formRef = React.useRef();
    const [enableOnupdate, setEnableOnupdate] = useState(true); //



    /**
     * Depends on save mode it will process reset or keed elements
     */
    const router = useRouter();
    const saveModeProcess = () => {
        if (saveMode === 0) {
            if (type === 0) {
                formRef.current.reset();
            } else {
                router.push('./../..')
            }
        } else {
            // nothing yet
        }
    };


    const onChangedCompany = (e: any) => {
        initialData.company = e.value
    }


    const doMsgPrompt = (severity: string, summary: string, message: string, sticky?: boolean) => {
        setMsgSeverity(severity);
        setMsgSummary(summary);
        setMsgDetail(message);
        setOnMessage(true);
    }

    const doMsgRemove = (e: any) => {
        setOnMessage(false);
    }

    useEffect(() => {
        {
            onMessage ?
                msg?.current?.show([
                    { sticky: msgSticky, life: 5000, severity: msgSeverity, summary: msgSummary, detail: msgDetail },
                ])
                : ''
        }
    }, [onMessage]);

    useEffect(() => {
        if (saveMode === 0) {
            initialData.company = undefined;
        }
    }, [catalog]);


    useEffect(() => {
        if (initialData?.company) {
        }

    }, [initialData]);


    /**
     * 
     * @param e Porcess submit form
     */
    const onSubmit = (e: any) => {
        //console.log('onSubmit', e)
        e.preventDefault();
        const formData = new FormData(e.target);

        setLazyLoading(true);
        blockForm();

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }


        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Manage create processing
            if (type === 0 || type === 2) {
                console.log('start create');
                MachinesService.create(formState, formData).then((data: any) => {
                    if (data.errors) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        doMsgPrompt('error', 'Erreur de création : ', 'Veuillez corriger les erreurs')
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        showSuccess('Création réussie !', data.address + ' - ' + data.name + ' (' + data.description + ') [' + data.id + ']');
                        saveModeProcess()
                    }
                    setLazyLoading(false);
                    unBlockForm();
                }).catch((err) => {
                    console.error('Error : ', err);
                    setLazyLoading(false);
                    unBlockForm();
                });
            }
            // Manage update processing
            else if (type === 1) {
                MachinesService.update(formState, formData).then((data: any) => {
                    if (data.errors) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        doMsgPrompt('error', 'Erreur de modification : ', 'Veuillez corriger les erreurs')
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        showSuccess('Modification réussie!', data.address + '-' + data.name + ' (' + data.description + ') [' + data.id + ']');
                        saveModeProcess()
                    }
                    setLazyLoading(false);
                    unBlockForm();
                }).catch((err) => {
                    console.error('Error : ', err);
                    setLazyLoading(false);
                    unBlockForm();
                });
            } else {
                console.error('Unknow type state  ', type);
                setLazyLoading(false);
                unBlockForm();
            }


        }, Math.random() * 1000 + 250);
    }

    /**
     * 
     * @param e Reset the form
     */
    const onCancel = (e: any) => {
        e.preventDefault();
        initialData.company = undefined;
        formRef.current.reset();
    }



    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, sticky: true, closable: false });
    }
    const showSuccess = (title: string, message: string) => {
        toast.current.show({ severity: 'success', summary: title, detail: message, life: 5000, closable: true });
    }

    const [blockedFrom, setBlockedForm] = useState(false);

    const blockForm = () => {
        setBlockedForm(true);
    }

    const unBlockForm = () => {
        setBlockedForm(false);
    }

    /**
     * Allows to handle change overs mode save button
     * @param mode a number that define state of the button save 0: save and reset, 1: save
     */
    const handleModeChanged = (mode: number) => {
        // console.log('handleModeChanged change to', mode);
        setSaveMode(mode);
    }

    /**
     * Countries catalog update list
     */
    const [companies, setCompanies] = useState<any>([]);
    const [reload, setReload] = useState(false);
    // useEffect(() => {
    //     // Get full data list
    //     CompaniesService.getLazy().then((data: any) => {
    //         if (data.status) {
    //             showError(data.status, data.message);
    //         } else {
    //             setCompanies(() => {
    //                 return data.map((item: any) => ({
    //                     label: item.name + ' - ' + item.iso3 + ' (' + item.numeric_code + ') ' + ' -  [' + item.id + ']',
    //                     value: item.id,
    //                     catalog: item
    //                 }));
    //             });
    //         }
    //     });
    // }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps





    const [dlgError, setDlgError] = useState();







    /**
     * Display the catalog
     */
    return <>
        <DialogError
            error={dlgError}
            onYes={(e: any) => {
                setReload((reload: any) => { return { ...reload } })
            }}
        />
        <div className="card">

            {/** Message toaster display */}
            <Toast ref={toast} />

            <Messages ref={msg} onRemove={doMsgRemove} />



            <h3>{type === 0 ? 'Création' : 'Modification'} d'une machine</h3>
            <hr />

            <BlockUI blocked={blockedFrom}>
                <form
                    id="formId"
                    ref={formRef}
                    onSubmit={onSubmit}
                    className="p-fluid"
                >
                    <div className="col-12">

                        {type === 1 ? <>
                            {/** id */}
                            <FieldOutputLabel
                                id="id"
                                name='id'
                                title='ID'
                                value={initialData.id}
                                error={formState.errors?.id}
                                placeholder="ID Code..."
                                tooltip="reference code d'identification ..."
                                disabled
                            />


                            {/** Created */}
                            <FieldOutputLabel
                                id="created"
                                name='created'
                                title='Créé le '
                                value={initialData?.created}
                                error={formState.errors?.created}
                                placeholder="Créé le ..."
                                tooltip="date de création ..."
                                disabled
                                type="datetime"
                            />



                            {/** Changed */}
                            <FieldOutputLabel
                                id="changed"
                                name='changed'
                                title='Changé le'
                                value={initialData?.changed}
                                error={formState.errors?.changed}
                                placeholder="Changé le ..."
                                tooltip="date de changement ..."
                                disabled
                                type="datetime"
                            />


                            {/** Delete */}
                            <FieldInputCheckbox
                                id="deleted"
                                name='deleted'
                                title='Supprimer'
                                value={initialData.deleted}
                                onChange={(e) => { initialData['deleted'] = e.value }}
                                error={formState.errors?.delete}
                                tooltip="suppression logique ..."
                            />
                        </> : null
                        }




                        {/** Company */}
                        <CompaniesDropDown
                            id='company'
                            name="company"
                            title='Société'
                            value={initialData?.company}
                            onChanged={(e: any) => { onChangedCompany(e) }}
                            error={formState.errors?.country}
                            placeholder="Société ..."
                            tooltip="Sélectionner une société..."
                        />

                        {/** Location */}
                        {type !== 1 ?
                            <FieldInputText
                                id="location"
                                name='location'
                                title='Localisation'
                                value={initialData?.location}
                                error={formState.errors?.location}
                                placeholder="Code..."
                                tooltip="code d'identification ..."
                                disabled={type === 1}
                            />
                            :
                            <FieldOutputLabel
                                id="location"
                                name='location'
                                title='Localisation'
                                value={initialData?.location}
                                error={formState.errors?.location}
                                placeholder="Code..."
                                tooltip="code d'identification ..."
                                disabled={type === 1}
                            />
                        }

                        {/** Adress */}
                        <FieldInputMask
                            id="ipaddress"
                            name='ipaddress'
                            title='IP'
                            value={initialData?.address}
                            error={formState.errors?.address}
                            placeholder="0.0.0.0"
                            tooltip="Adresse IP..."
                            mask="(9?99.9?99.9?99.9?99)" 
                        />









                        {/** Address */}
                        <FieldInputText
                            id="address"
                            name='address'
                            title='Adresse'
                            value={initialData?.address}
                            error={formState.errors?.address}
                            placeholder="Adresse..."
                            tooltip="adresse associée..."
                        />

                        {/** Address 1 */}
                        <FieldInputText
                            id="address1"
                            name='address1'

                            value={initialData?.address1}
                            error={formState.errors?.address1}
                            placeholder="adresse 1 ..."
                            tooltip="adresse complémentaire 1 associée..."
                        />

                        {/** Address 3 */}
                        <FieldInputText
                            id="address3"
                            name='address3'

                            value={initialData?.address3}
                            error={formState.errors?.address3}
                            placeholder="adresse 2 ..."
                            tooltip="adresse complémentaire 2 associée..."
                        />



                        {/** bloc */}
                        <FieldInputText
                            id="bloc"
                            name='bloc'
                            title='Bloc'
                            value={initialData?.bloc}
                            error={formState.errors?.bloc}
                            placeholder="bloc... : ex: 3 ou 3B"
                            tooltip="Bloc ou bâtiment dans un lotissement ou parc industriel..."
                        />





                        {/** floor */}
                        <FieldInputNumber
                            id="floor"
                            name='floor'
                            title='Étage'
                            value={initialData?.floor}
                            error={formState.errors?.floor}
                            placeholder="étage... : ex: 3"
                            tooltip="numéro d'étage, du plateau..."
                        />





                        {/** number */}
                        <FieldInputText
                            id="number"
                            name='number'
                            title='Numéro'
                            value={initialData.number}
                            error={formState.errors?.number}
                            placeholder="numéro... : ex: 6B ou 3, 3A"
                            tooltip="numéro de porte de destination..."
                        />







                        {/** Command options */}
                        <ButtonBarCreate
                            // onSaveClick={onSubmit}
                            onCancelClick={onCancel}
                            onModeChanged={e => handleModeChanged(e)}
                            type={type}
                        />

                    </div>
                </form>
            </BlockUI>

            {/* Display last record */}
            <OutputRecord catalog={catalog} loading={lazyLoading} />

        </div>


    </>
}