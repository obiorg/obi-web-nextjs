// src/components/post-form.tsx

// this is a client component
'use client'

import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { OBI } from "@/src/types"



import DialogError from "@/src/obi/components/Dialog/DialogError"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import OutputError from "@/src/obi/components/Output/OutputError"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { PersistencesMethodsModel } from "@/src/obi/models/persistences/PersistencesMethodsModel"
import { TagsModel } from "@/src/obi/models/tags/TagsModel"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { PersistencesMethodsService } from "@/src/obi/service/persistences/PersistencesMethodsService"
import { PersistencesService } from "@/src/obi/service/persistences/PersistencesService"
import { TagsService } from "@/src/obi/service/tags/TagsService"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { BlockUI } from "primereact/blockui"
import CompaniesDropDown from "../../businesses/companies/components/CompaniesDropDown"
import TagsDropDown from "../../tags/components/TagsDropDown"
import PersistencesMethodsDropDown from "../methods/components/PersistencesMethodsDropDown"


// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.LocationsPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.LocationsFormState>(formAction, {
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
    const onChangedTag = (e: any) => {
        initialData.tag = Number(e.value)
    }
    const onChangedMethod = (e: any) => {
        initialData.method = Number(e.value)
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
            initialData.tag = undefined;
            initialData.method = undefined;
        }
    }, [catalog]);


    useEffect(() => {
        if (initialData?.company) {
        }
        if (initialData?.tag) {
        }
        if (initialData?.method) {
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
                PersistencesService.create(formState, formData).then((data: any) => {
                    // console.log('Data saved', data);
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        setErrorCatalog(data)
                        doMsgPrompt('error', 'Erreur de création : ', data.error.message + '\n\n' + data.error.stack, true)
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        setErrorCatalog({});
                        showSuccess('Création réussie !', data.tag + ' - ' + data.method + '(' + data.company + ') [' + data.id + ']',);
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
                PersistencesService.update(formState, formData).then((data: any) => {
                    // console.log('Data saved', data);
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        setErrorCatalog(data)
                        doMsgPrompt('error', 'Erreur de création : ', data.error.message + '\n\n' + data.error.stack, true)
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        setErrorCatalog({});
                        showSuccess('Création réussie !', data.tag + ' - ' + data.method + '(' + data.company + ') [' + data.id + ']',);
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
        initialData.tag = undefined;
        initialData.method = undefined;
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
     * Catalogs
     */
    const [companies, setCompanies] = useState<any>([]);
    const [tag, setTag] = useState<any>([]);
    const [method, setMethod] = useState<any>([]);
    const [reload, setReload] = useState(false);

    const [lazyParams, setLazyParams] = useState(
        new CompaniesModel().
            getStandardParam({ field: 'company', order: 1 }, CompaniesService.defaultFilters()));
    const [lazyParamsTags, setLazyParamsTags] = useState(
        new TagsModel().
            getStandardParam([{ field: 'machine', order: 1 }, { field: 'table', order: 1 }, { field: 'name', order: 1 }], TagsService.defaultFilters()));
    const [lazyParamsMethods, setLazyParamsMethods] = useState(
        new PersistencesMethodsModel().
            getStandardParam([{ field: 'comapny', order: 1 }, { field: 'method', order: 1 }, { field: 'tag', order: 1 }], PersistencesMethodsService.defaultFilters()));


    useEffect(() => {
        // Get full data list
        const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
        CompaniesService.getLazy(lazyEventSet).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setCompanies(() => {
                    return data.map((item: any) => ({
                        label: item.company + ' - ' + item.designation
                            + ' [' + item.id + ']',
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });
        // Get full data list
        let lazyEventSetTag = { lazyEvent: JSON.stringify(lazyParamsTags) };
        TagsService.getLazy(lazyEventSetTag).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setTag(() => {
                    return data.map((item: any) => ({
                        label:
                            item.name + ' - [' + item.machines.name + ' - '
                            + item.machines.address + ']  [' + item.id + '] '
                            + item.comment,
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });

    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps






    const [dlgError, setDlgError] = useState<any>();

    const g = useTranslations('global');
    const t = useTranslations('persistences');

    const [update, setUpdate] = useState(false); //



    /**
     * Display the catalog
     */
    return <>
        <DialogError
            error={dlgError}
            onYes={(e: any) => {
                setReload((reload: any) => { return { ...reload } })
                setLazyParams((lazyParamsCompanies: any) => { return { ...lazyParamsCompanies } })
                setLazyParamsTags((lazyParamsTags: any) => { return { ...lazyParamsTags } })
                setLazyParamsTags((lazyParamsMethods: any) => { return { ...lazyParamsMethods } })
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


                        {/** TAG */}
                        <TagsDropDown
                            id='tag'
                            name="tag"
                            title={t('Form.tag.label')}
                            value={initialData?.tag}
                            options={tag}
                            onChange={(e: any) => { onChangedTag(e); }}
                            error={formState.errors?.tag}
                            placeholder={t('Form.tag.placeholder')}
                            tooltip={t('Form.tag.tooltip')}
                        />


                        {/** TAG */}
                        <PersistencesMethodsDropDown
                            id='method'
                            name="method"
                            title={t('Form.method.label')}
                            value={initialData?.method}
                            options={method}
                            onChange={(e: any) => { onChangedMethod(e); }}
                            error={formState.errors?.method}
                            placeholder={t('Form.method.placeholder')}
                            tooltip={t('Form.method.tooltip')}
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

                        {/** ERROR */}
                        <FieldInputCheckbox
                            id="activate"
                            name='activate'
                            title={t('Form.activate.label')}
                            value={initialData.activate}
                            onChange={(e) => { initialData.activate = e; setUpdate(!update) }}
                            error={formState.errors?.activate}
                            tooltip={t('Form.activate.tooltip')}
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