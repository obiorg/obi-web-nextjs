// src/components/post-form.tsx

// this is a client component
'use client'

import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { OBI } from "@/src/types"



import DialogError from "@/src/obi/components/Dialog/DialogError"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import OutputError from "@/src/obi/components/Output/OutputError"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { TagsListModel } from "@/src/obi/models/tags/TagsListModel"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { TagsListContentsService } from "@/src/obi/service/tags/TagsListContentsService"
import { TagsListService } from "@/src/obi/service/tags/TagsListService"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { BlockUI } from "primereact/blockui"
import CompaniesDropDown from "../../../businesses/companies/components/CompaniesDropDown"
import TagsListsDropDown from "../../list/components/TagsListsDropDown"
import FieldInputNumber from "@/src/obi/components/Inputs/FieldInputNumber"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"





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
                if (formRef)
                    if (formRef.current)
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
    const onChangedList = (e: any) => {
        initialData.list = Number(e.value)
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
            initialData.city = undefined;
            initialData.list = undefined;
        }
    }, [catalog]);


    useEffect(() => {
        if (initialData?.company) {
        }
        if (initialData?.list) {
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
                TagsListContentsService.create(formState, formData).then((data: any) => {
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
                        showSuccess('Création réussie !', data.content + ' - ' + data.value + '(l: ' + data.list + '/c: ' + data.company + ') [' + data.id + ']',);
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
                TagsListContentsService.update(formState, formData).then((data: any) => {
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
                        showSuccess('Création réussie !', data.content + ' - ' + data.value + '(l: ' + data.list + '/c: ' + data.company + ') [' + data.id + ']',);
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
        initialData.list = undefined;
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
    const [lists, setLists] = useState<any>([]);
    const [reload, setReload] = useState(false);

    const [lazyParams, setLazyParams] = useState(
        new CompaniesModel().
            getStandardParam({ field: 'company', order: 1 }, CompaniesService.defaultFilters()));
    const [lazyParamsLists, setLazyParamsLists] = useState(
        new TagsListModel().
            getStandardParam([
                { field: 'company', order: 1 },
                { field: 'type', order: 1 },
                { field: 'list', order: 1 }
            ],
                TagsListService.defaultFilters()));



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


        const lazyEventSetLists = { lazyEvent: JSON.stringify(lazyParamsLists) };
        TagsListService.getLazy(lazyEventSetLists).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setLists(() => {
                    return data.map((item: any) => ({
                        label: item.list
                            + ' - ' + item.designation
                            + ' (t:' + item.type + ' / c:'
                            + item.company + ') [' + item.id + ']'
                        ,
                        value: item.id,
                        catalogs: item
                    }));
                });
            }
        });
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps





    const [dlgError, setDlgError] = useState<any>();

    const g = useTranslations('global');
    const t = useTranslations('tagsListContents');

    const [update, setUpdate] = useState(false); //



    /**
     * Display the catalog
     */
    return <>
        <DialogError
            error={dlgError}
            onYes={(e: any) => {
                setReload((reload: any) => { return { ...reload } })
                setLazyParams((lazyParams: any) => { return { ...lazyParams } })
                setLazyParamsLists((lazyParamsList: any) => { return { ...lazyParamsLists } })
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
                            title={g('Form.company.label')}
                            value={initialData?.company}
                            options={companies}
                            onChange={(e: any) => { onChangedCompany(e); }}
                            error={formState.errors?.company}
                            placeholder={g('Form.company.placeholder')}
                            tooltip={g('Form.company.tooltip')}
                        />


                        {/** List */}
                        <TagsListsDropDown
                            id='list'
                            name="list"
                            title={g('Form.list.label')}
                            value={initialData?.list}
                            options={lists}
                            onChange={(e: any) => { onChangedList(e); }}
                            error={formState.errors?.list}
                            placeholder={g('Form.list.placeholder')}
                            tooltip={g('Form.list.tooltip')}
                        />

                        {/** CONTENT */}
                        <FieldInputNumber
                            id='content'
                            name="content"
                            title={t('Form.content.label')}
                            value={initialData?.content}
                            onChange={(e: any) => { initialData['content'] = e.value; console.log(initialData.content); setUpdate(!update) }}
                            error={formState.errors?.content}
                            placeholder={t('Form.content.placeholder')}
                            tooltip={t('Form.content.tooltip')}
                        />

                        {/** VALUE */}
                        <FieldInputText
                            id="value"
                            name='value'
                            title={t('Form.value.label')}
                            value={initialData?.value}
                            error={formState.errors?.value}
                            placeholder={t('Form.value.placeholder')}
                            tooltip={t('Form.value.tooltip')}

                        />



                        {/** DEFAULT */}
                        <FieldInputCheckbox
                            id="default"
                            name='default'
                            title={t('Form.default.label')}
                            value={initialData.default}
                            onChange={(e) => { initialData.default = e; setUpdate(!update) }}
                            error={formState.errors?.default}
                            tooltip={t('Form.default.tooltip')}
                        />


                        {/** WIDTH */}
                        <FieldInputNumber
                            id='width'
                            name="width"
                            title={t('Form.width.label')}
                            value={initialData?.width}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.width}
                            placeholder={t('Form.width.placeholder')}
                            tooltip={t('Form.width.tooltip')}
                        />

                        {/** HIGHT */}
                        <FieldInputNumber
                            id='height'
                            name="height"
                            title={t('Form.height.label')}
                            value={initialData?.height}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.height}
                            placeholder={t('Form.height.placeholder')}
                            tooltip={t('Form.height.tooltip')}
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