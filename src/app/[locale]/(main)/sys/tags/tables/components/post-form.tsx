// src/components/post-form.tsx

// this is a client component
'use client'

import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { OBI } from "@/src/types"



import DialogError from "@/src/obi/components/Dialog/DialogError"
import FieldDropDown from "@/src/obi/components/Inputs/FieldDropDown"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldInputNumber from "@/src/obi/components/Inputs/FieldInputNumber"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import { TagsTablesService } from "@/src/obi/service/tags/TagsTablesService"
import { useRouter } from "next/navigation"
import { BlockUI } from "primereact/blockui"
import { DataTableFilterMeta } from "primereact/datatable"
import { Messages } from "primereact/messages"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { useTranslations } from "next-intl"
import CompaniesDropDown from "../../../businesses/companies/components/CompaniesDropDown"
import OutputError from "@/src/obi/components/Output/OutputError"









// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.TagsTablesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.TagsTablesFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<any>(null);
    const msg = useRef<any>(null);

    // Managing long request wating
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    let loadLazyTimeout: any = undefined;


    // state management
    const [onMessage, setOnMessage] = useState(false);
    const [msgSeverity, setMsgSeverity] = useState('info'); // success, info, warn, error
    const [msgSummary, setMsgSummary] = useState('Info'); // info as default
    const [msgDetail, setMsgDetail] = useState('Default detail'); // Message Content as default
    const [msgSticky, setMsgSticky] = useState(false); //

    // last created catalog
    const [catalog, setCatalog] = useState<OBI.Tags>(null);
    const [errorCatalog, setErrorCatalog] = useState<any>(null);

    // To manage validation
    const [saveMode, setSaveMode] = useState(0); // 0: save and reset; 1: save
    const formRef = React.useRef(document.createElement('form')); //



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
        initialData.company = Number(e.value)
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
            // console.log('initialData useEffect catalog', initialData);
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
                // console.log('start create');
                TagsTablesService.create(formState, formData).then((data: any) => {
                    // console.log('Data saved', data);
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        setErrorCatalog(data)
                        doMsgPrompt('error', 'Erreur de création : ', data.error.message + '\n\n' + data.error.stack, true)
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        setErrorCatalog(undefined);
                        showSuccess('Création réussie !', data.table + ' - ' + data.designation + '(' + data.companies + ') [' + data.id + ']',);
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
                TagsTablesService.update(formState, formData).then((data: any) => {
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        setErrorCatalog(data)
                        doMsgPrompt('error', 'Erreur de création : ', data.error.message + '\n\n' + data.error.stack, true)
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        setErrorCatalog(undefined);
                        showSuccess('Création réussie !', data.table + ' - ' + data.designation + '(' + data.companies + ') [' + data.id + ']',);
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

    const [lazyParams, setLazyParams] = useState(
        new CompaniesModel().
            getStandardParam({ field: 'company', order: 1 }, CompaniesService.defaultFilters()));


    useEffect(() => {
        // Get full data list
        const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
        CompaniesService.getLazy(lazyEventSet).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setCompanies(() => {
                    return data.map((item: any) => ({
                        label: item.name + ' - ' + item.iso3 + ' (' + item.numeric_code + ') ' + ' -  [' + item.id + ']',
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps










    const [dlgError, setDlgError] = useState<any>();

    const g = useTranslations('global');
    const t = useTranslations('tagstables');

    const [update, setUpdate] = useState(false); //




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

            {/* <Messages ref={msg} onRemove={doMsgRemove} /> */}


            <h3>{type === 0 ? t('Create.title') : t('Edit.title')}</h3>
            <p>{type === 0 ? t('Create.subTitle') : t('Edit.subTitle')}</p>
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
                                title={g('Form.id.label')}
                                value={initialData.id}
                                error={formState.errors?.id}
                                placeholder={g('Form.id.placeholder')}
                                tooltip={g('Form.id.tooltip')}
                                disabled
                            />


                            {/** Created */}
                            <FieldOutputLabel
                                id="created"
                                name='created'
                                title={g('Form.created.label')}
                                value={initialData?.created}
                                error={formState.errors?.created}
                                placeholder={g('Form.created.placeholder')}
                                tooltip={g('Form.created.tooltip')}
                                disabled
                                type="datetime"
                            />



                            {/** Changed */}
                            <FieldOutputLabel
                                id="changed"
                                name='changed'
                                title={g('Form.changed.label')}
                                value={initialData?.changed}
                                error={formState.errors?.changed}
                                placeholder={g('Form.changed.placeholder')}
                                tooltip={g('Form.changed.tooltip')}
                                disabled
                                type="datetime"
                            />


                            {/** Delete */}
                            <FieldInputCheckbox
                                id="deleted"
                                name='deleted'
                                title={g('Form.deleted.label')}
                                value={initialData.deleted}
                                onChange={(e) => { initialData['deleted'] = e.value }}
                                error={formState.errors?.delete}
                                tooltip={g('Form.deleted.tooltip')}
                            />
                        </> : null
                        }



                        {/** Company */}
                        <CompaniesDropDown
                            id='company'
                            name="company"
                            title={t('Form.company.label')}
                            value={initialData?.company}
                            options={companies}
                            onChange={(e: any) => { onChangedCompany(e); }}
                            error={formState.errors?.company}
                            placeholder={t('Form.company.placeholder')}
                            tooltip={t('Form.company.tooltip')}
                        />


                        {/** TABLE */}
                        <FieldInputText
                            id="table"
                            name='table'
                            title={t('Form.table.label')}
                            value={initialData?.table}
                            error={formState.errors?.table}
                            placeholder={t('Form.table.placeholder')}
                            tooltip={t('Form.table.tooltip')}
                        />


                        {/** Designation */}
                        <FieldInputText
                            id="designation"
                            name='designation'
                            title={t('Form.designation.label')}
                            value={initialData?.designation}
                            error={formState.errors?.designation}
                            placeholder={t('Form.designation.placeholder')}
                            tooltip={t('Form.designation.tooltip')}
                        />

                        {/** COMMENT */}
                        <FieldInputText
                            id="comment"
                            name='comment'
                            title={t('Form.comment.label')}
                            value={initialData?.comment}
                            error={formState.errors?.comment}
                            placeholder={t('Form.comment.placeholder')}
                            tooltip={t('Form.comment.tooltip')}
                        />









                        {/** Command options */}
                        <ButtonBarCreate
                            name="buttonBarCreate"
                            key='buttonBarCreate'
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
            <OutputError catalog={errorCatalog} loading={lazyLoading} />

        </div>


    </>
}