// src/components/post-form.tsx

// this is a client component
'use client'

import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"

import { OBI } from "@/src/types"



import DialogError from "@/src/obi/components/Dialog/DialogError"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldInputDateTime from "@/src/obi/components/Inputs/FieldInputDateTime"
import FieldInputEditor from "@/src/obi/components/Inputs/FieldInputEditor"
import FieldInputNumber from "@/src/obi/components/Inputs/FieldInputNumber"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldInputTextSlider from "@/src/obi/components/Inputs/FieldInputTextSlider"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import OutputError from "@/src/obi/components/Output/OutputError"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import { AlarmsModel } from "@/src/obi/models/alarms/AlarmsModel"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { MachinesModel } from "@/src/obi/models/connexions/MachinesModel"
import { MeasuresUnitsModel } from "@/src/obi/models/measures/MeasuresUnitsModel"
import { TagsListModel } from "@/src/obi/models/tags/TagsListModel"
import { TagsMemoriesModel } from "@/src/obi/models/tags/TagsMemoriesModel"
import { TagsTablesModel } from "@/src/obi/models/tags/TagsTablesModel"
import { TagsTypesModel } from "@/src/obi/models/tags/TagsTypesModel"
import { AlarmsService } from "@/src/obi/service/alarms/AlarmsService"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { MachinesService } from "@/src/obi/service/connexions/MachinesService"
import { MeasuresUnitsService } from "@/src/obi/service/measures/MeasuresUnitsService"
import { TagsMemoriesService } from "@/src/obi/service/tags/TagsMemoriesService"
import { TagsService } from "@/src/obi/service/tags/TagsService"
import { TagsTablesService } from "@/src/obi/service/tags/TagsTablesService"
import { TagsTypesService } from "@/src/obi/service/tags/TagsTypesService"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { BlockUI } from "primereact/blockui"
import AlarmsDropDown from "../../alarms/components/AlarmsDropDown"
import CompaniesDropDown from "../../businesses/companies/components/CompaniesDropDown"
import MachinesDropDown from "../../connexions/machines/components/MachinesDropDown"
import MeasuresUnitsDropDown from "../../measures/units/components/MeasuresUnitsDropDown"
import TagsListsDropDown from "../list/components/TagsListsDropDown"
import TagsMemoriesDropDown from "../memories/components/TagsMemoriesDropDown"
import TagsTablesDropDown from "../tables/components/TagsTablesDropDown"
import TagsTypesDropDown from "../types/components/TagsTypesDropDown"
import { TagsListService } from "@/src/obi/service/tags/TagsListService"









// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: OBI.TagsPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.TagsFormState>(formAction, {
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
    const onChangedMachine = (e: any) => {
        initialData.machine = Number(e.value)
    }
    const onChangedType = (e: any) => {
        initialData[type] = Number(e.value)
    }
    const onChangedMemory = (e: any) => {
        initialData.memory = Number(e.value)
    }
    const onChangedTable = (e: any) => {
        initialData.table = Number(e.value)
    }
    const onChangedMeasureUnits = (e: any) => {
        initialData.mesureUnits = Number(e.value)
    }
    const onChangedAlarms = (e: any) => {
        initialData.alarms = Number(e.value)
    }
    const onChangedLists = (e: any) => {
        initialData.list = Number(e.value)
    }



    const doMsgPrompt = (severity: string, summary: string, message: string, sticky?: any) => {
        setMsgSeverity(severity);
        setMsgSummary(summary);
        setMsgDetail(message);
        setMsgSticky(sticky);
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
        if (initialData?.machine) {
        }
        if (initialData?.memory) {
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
                TagsService.create(formState, formData).then((data: any) => {
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
                        showSuccess('Création réussie !', data.name + ' - ' + data.machines + '(' + data.companies + ') [' + data.id + ']',);
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
                TagsService.update(formState, formData).then((data: any) => {
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
                        showSuccess('Création réussie !', data.name + ' - ' + data.machines + '(' + data.business + '/' + data.companies + ') [' + data.id + ']',);
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
     * Catalogs
     */
    const [companies, setCompanies] = useState<any>([]);
    const [machines, setMachines] = useState<any>([]);
    const [types, setTypes] = useState<any>([]);
    const [memories, setMemories] = useState<any>([]);
    const [tables, setTables] = useState<any>([]);
    const [measureUnits, setMeasureUnits] = useState<any>([]);
    const [alarms, setAlarms] = useState<any>([]);
    const [lists, setLists] = useState<any>([]);
    const [reload, setReload] = useState(false);

    const [lazyParams, setLazyParams] = useState(
        new CompaniesModel().
            getStandardParam({ field: 'company', order: 1 }, CompaniesService.defaultFilters()));
    const [lazyParamsMachines, setLazyParamsMachines] = useState(
        new MachinesModel().
            getStandardParam({ field: 'name', order: 1 }, MachinesService.defaultFilters()));
    const [lazyParamsTypes, setLazyParamsTypes] = useState(
        new TagsTypesModel().
            getStandardParam({ field: 'type', order: 1 }, TagsTypesService.defaultFilters()));
    const [lazyParamsMemories, setLazyParamsMemories] = useState(
        new TagsMemoriesModel().
            getStandardParam({ field: 'name', order: 1 }, TagsMemoriesService.defaultFilters()));
    const [lazyParamsTables, setLazyParamsTables] = useState(
        new TagsTablesModel().
            getStandardParam({ field: 'company', order: 1 }, { field: 'tables', order: 1 }, TagsTablesService.defaultFilters()));
    const [lazyParamsMeasureUnits, setLazyParamsMeasureUnits] = useState(
        new MeasuresUnitsModel().
            getStandardParam({ field: 'entity', order: 1 }, { field: 'sizeName', order: 1 }, MeasuresUnitsService.defaultFilters()));
    const [lazyParamsAlarms, setLazyParamsAlarms] = useState(
        new AlarmsModel().
            getStandardParam([{ field: 'company', order: 1 }, { field: 'alarm', order: 1 }, { field: 'name', order: 1 }],
                AlarmsService.defaultFilters()));
    const [lazyParamsLists, setLazyParamsLists] = useState(
        new TagsListModel().
            getStandardParam([{ field: 'business', order: 1 },
            { field: 'company', order: 1 }, { field: 'tag', order: 1 },
            { field: 'group', order: 1 }, { field: 'name', order: 1 }],
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


        // const lazyEventSetMachines = { lazyEvent: JSON.stringify(lazyParamsMachines) };
        // MachinesService.getLazy(lazyEventSetMachines).then((data: any) => {
        //     if (data.status) {
        //         showError(data.status, data.message);
        //     } else {
        //         setMachines(() => {
        //             return data.map((item: any) => ({
        //                 label: item.name
        //                     + ' (' + item.address + ' / '
        //                     + item.mask + ') [' + item.id + ']'
        //                     + ' - ' + item.description,
        //                 value: item.id,
        //                 catalogs: item
        //             }));
        //         });
        //     }
        // });
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps





    const [dlgError, setDlgError] = useState<any>();

    const g = useTranslations('global');
    const t = useTranslations('tags');

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
                setLazyParamsMachines((lazyParamsMachines: any) => { return { ...lazyParamsMachines } })
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



                        {/** Name */}
                        <FieldInputText
                            id="name"
                            name='name'
                            title={t('Form.name.label')}
                            value={initialData?.name}
                            error={formState.errors?.name}
                            placeholder={t('Form.name.placeholder')}
                            tooltip={t('Form.name.tooltip')}
                        />


                        {/** Machines */}
                        <MachinesDropDown
                            id='machine'
                            name="machine"
                            title={t('Form.machine.label')}
                            value={initialData?.machine}
                            options={machines}
                            onChange={(e: any) => { onChangedMachine(e); }}
                            error={formState.errors?.machine}
                            placeholder={t('Form.machine.placeholder')}
                            tooltip={t('Form.machine.tooltip')}
                        />


                        {/** Type */}
                        <TagsTypesDropDown
                            id='type'
                            name="type"
                            title={t('Form.type.label')}
                            value={initialData?.type}
                            options={types}
                            onChange={(e: any) => { onChangedType(e); }}
                            error={formState.errors?.type}
                            placeholder={t('Form.type.placeholder')}
                            tooltip={t('Form.type.tooltip')}
                        />


                        {/** Memory */}
                        <TagsMemoriesDropDown
                            id='memory'
                            name="memory"
                            title={t('Form.memory.label')}
                            value={initialData?.memory}
                            options={memories}
                            onChange={(e: any) => { onChangedMemory(e); }}
                            error={formState.errors?.memory}
                            placeholder={t('Form.memory.placeholder')}
                            tooltip={t('Form.memory.tooltip')}
                        />


                        {/** Tables */}
                        <TagsTablesDropDown
                            id='table'
                            name="table"
                            title={t('Form.table.label')}
                            value={initialData?.table}
                            options={tables}
                            onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.table}
                            placeholder={t('Form.table.placeholder')}
                            tooltip={t('Form.table.tooltip')}
                        />

                        {/** DB */}
                        <FieldInputNumber
                            id='db'
                            name="db"
                            title={t('Form.DB.label')}
                            value={initialData?.db}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.db}
                            placeholder={t('Form.DB.placeholder')}
                            tooltip={t('Form.DB.tooltip')}
                        />

                        {/** BYTE */}
                        <FieldInputNumber
                            id='byte'
                            name="byte"
                            title={t('Form.BYTE.label')}
                            value={initialData?.byte}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.byte}
                            placeholder={t('Form.BYTE.placeholder')}
                            tooltip={t('Form.BYTE.tooltip')}
                        />

                        {/** BIT Offset */}
                        <FieldInputTextSlider
                            id='bit'
                            name="bit"
                            title={t('Form.BIT.label')}
                            value={initialData?.bit}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.bit}
                            placeholder={t('Form.BIT.placeholder')}
                            tooltip={t('Form.BIT.tooltip')}
                            min={0}
                            max={7}
                        />




                        {/** ACTIVE */}
                        <FieldInputCheckbox
                            id="active"
                            name='active'
                            title={t('Form.active.label')}
                            value={initialData.active}
                            onChange={(value) => { initialData.active = value; setUpdate(!update) }}
                            error={formState.errors?.active}
                            tooltip={t('Form.active.tooltip')}
                        />

                        {/** CYCLE */}
                        <FieldInputNumber
                            id='cycle'
                            name="cycle"
                            title={t('Form.cycle.label')}
                            value={initialData?.cycle}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.cycle}
                            placeholder={t('Form.cycle.placeholder')}
                            tooltip={t('Form.cycle.tooltip')}
                            render={initialData.active === true}
                        />

                        {/** DELTA */}
                        <FieldInputCheckbox
                            id="delta"
                            name='delta'
                            title={t('Form.delta.label')}
                            value={initialData.delta}
                            onChange={(e) => { initialData.delta = e; setUpdate(!update) }}
                            error={formState.errors?.delta}
                            tooltip={t('Form.delta.tooltip')}
                            render={initialData.active === true}
                        />

                        {/** Delta Float */}
                        <FieldInputNumber
                            id='deltaFloat'
                            name="deltaFloat"
                            title={t('Form.deltaFloat.label')}
                            value={initialData?.deltaFloat}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.deltaFloat}
                            placeholder={t('Form.deltaFloat.placeholder')}
                            tooltip={t('Form.deltaFloat.tooltip')}
                            render={initialData.active === true && initialData.delta === true}
                        />

                        {/** Delta Int */}
                        <FieldInputNumber
                            id='deltaInt'
                            name="deltaInt"
                            title={t('Form.deltaInt.label')}
                            value={initialData?.deltaInt}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.deltaInt}
                            placeholder={t('Form.deltaInt.placeholder')}
                            tooltip={t('Form.deltaInt.tooltip')}
                            render={initialData.active === true && initialData.delta === true}
                        />

                        {/** DELTA Bool */}
                        <FieldInputCheckbox
                            id="deltaBool"
                            name='deltaBool'
                            title={t('Form.deltaBool.label')}
                            value={initialData.deltaBool}
                            onChange={(e) => { initialData.deltaBool = e; setUpdate(!update) }}
                            error={formState.errors?.deltaBool}
                            tooltip={t('Form.deltaBool.tooltip')}
                            render={initialData.active === true && initialData.delta === true}
                        />

                        {/** DELTA DateTime */}
                        <FieldInputDateTime
                            id='deltaDateTime'
                            name="deltaDateTime"
                            title={t('Form.deltaDateTime.label')}
                            value={initialData?.deltaDateTime}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.deltaDateTime}
                            placeholder={t('Form.deltaDateTime.placeholder')}
                            tooltip={t('Form.deltaDateTime.tooltip')}
                            render={initialData.active === true && initialData.delta === true}
                        />



                        {/** DEFAULT */}
                        <FieldInputCheckbox
                            id="vDefault"
                            name='vDefault'
                            title={t('Form.vDefault.label')}
                            value={initialData.vDefault}
                            onChange={(e) => { initialData.vDefault = e; setUpdate(!update) }}
                            error={formState.errors?.vDefault}
                            tooltip={t('Form.vDefault.tooltip')}
                        />

                        {/** Default Float */}
                        <FieldInputNumber
                            id='vFloat'
                            name="vFloat"
                            title={t('Form.vFloat.label')}
                            value={initialData?.vFloat}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.vFloat}
                            placeholder={t('Form.vFloat.placeholder')}
                            tooltip={t('Form.vFloat.tooltip')}
                            render={initialData.vDefault === true}
                        />

                        {/** Default Int */}
                        <FieldInputNumber
                            id='vInt'
                            name="vInt"
                            title={t('Form.vInt.label')}
                            value={initialData?.vInt}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.vInt}
                            placeholder={t('Form.vInt.placeholder')}
                            tooltip={t('Form.vInt.tooltip')}
                            render={initialData.vDefault === true}
                        />

                        {/** Default Bool */}
                        <FieldInputCheckbox
                            id="vBool"
                            name='vBool'
                            title={t('Form.vBool.label')}
                            value={initialData.vBool}
                            onChange={(e) => { initialData.vBool = e; setUpdate(!update) }}
                            error={formState.errors?.vBool}
                            tooltip={t('Form.vBool.tooltip')}
                            render={initialData.vDefault === true}
                        />

                        {/** Default DateTime */}
                        <FieldInputDateTime
                            id='vDateTime'
                            name="vDateTime"
                            title={t('Form.vDateTime.label')}
                            value={initialData?.vDateTime}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.vDateTime}
                            placeholder={t('Form.vDateTime.placeholder')}
                            tooltip={t('Form.vDateTime.tooltip')}
                            render={initialData.vDefault === true}
                        />


                        {/** COUNTER */}
                        <FieldInputCheckbox
                            id="counter"
                            name='counter'
                            title={t('Form.counter.label')}
                            value={initialData.counter}
                            onChange={(e) => { initialData.counter = e; setUpdate(!update) }}
                            error={formState.errors?.counter}
                            tooltip={t('Form.counter.tooltip')}
                        />

                        {/** COMPTEUR TYPE */}
                        <FieldInputNumber
                            id='counterType'
                            name="counterType"
                            title={t('Form.counterType.label')}
                            value={initialData?.counterType}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.counterType}
                            placeholder={t('Form.counterType.placeholder')}
                            tooltip={t('Form.counterType.tooltip')}
                            render={initialData.counter === true}
                        />


                        {/** MESURE */}
                        <FieldInputCheckbox
                            id="mesure"
                            name='mesure'
                            title={t('Form.mesure.label')}
                            value={initialData.mesure}
                            onChange={(e) => { initialData.mesure = e; setUpdate(!update) }}
                            error={formState.errors?.mesure}
                            tooltip={t('Form.mesure.tooltip')}
                        />

                        {/** MESURE MIN */}
                        <FieldInputNumber
                            id='mesureMin'
                            name="mesureMin"
                            title={t('Form.mesureMin.label')}
                            value={initialData?.mesureMin}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.mesureMin}
                            placeholder={t('Form.mesureMin.placeholder')}
                            tooltip={t('Form.mesureMin.tooltip')}
                            render={initialData.mesure === true}
                        />

                        {/** MESURE MAX */}
                        <FieldInputNumber
                            id='mesureMax'
                            name="mesureMax"
                            title={t('Form.mesureMax.label')}
                            value={initialData?.mesureMax}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.mesureMax}
                            placeholder={t('Form.mesureMax.placeholder')}
                            tooltip={t('Form.mesureMax.tooltip')}
                            render={initialData.mesure === true}
                        />


                        {/** MESURE Unit */}
                        <MeasuresUnitsDropDown
                            id='measureUnit'
                            name="measureUnit"
                            title={t('Form.measureUnit.label')}
                            value={initialData?.measureUnit}
                            options={measureUnits}
                            onChange={(e: any) => { onChangedMeasureUnits(e); }}
                            error={formState.errors?.measureUnit}
                            placeholder={t('Form.measureUnit.placeholder')}
                            tooltip={t('Form.measureUnit.tooltip')}
                            render={initialData.mesure === true}
                        />

                        {/** MQTT TOPICS */}
                        <FieldInputText
                            id="mqtt_topic"
                            name='mqtt_topic'
                            title={t('Form.mqtt_topic.label')}
                            value={initialData?.mqtt_topic}
                            error={formState.errors?.mqtt_topic}
                            placeholder={t('Form.mqtt_topic.placeholder')}
                            tooltip={t('Form.mqtt_topic.tooltip')}
                        />

                        {/** WEBHOOK PATH */}
                        <FieldInputText
                            id="webhook"
                            name='webhook'
                            title={t('Form.webhook.label')}
                            value={initialData?.webhook}
                            error={formState.errors?.webhook}
                            placeholder={t('Form.webhook.placeholder')}
                            tooltip={t('Form.webhook.tooltip')}
                        />


                        {/** LABORATORY */}
                        <FieldInputCheckbox
                            id="laboratory"
                            name='laboratory'
                            title={t('Form.laboratory.label')}
                            value={initialData.laboratory}
                            onChange={(e) => { initialData.laboratory = e; setUpdate(!update) }}
                            error={formState.errors?.laboratory}
                            tooltip={t('Form.laboratory.tooltip')}
                        />


                        {/** FORMULA */}
                        <FieldInputCheckbox
                            id="formula"
                            name='formula'
                            title={t('Form.formula.label')}
                            value={initialData.formula}
                            onChange={(e) => { initialData.formula = e; setUpdate(!update) }}
                            error={formState.errors?.formula}
                            tooltip={t('Form.formula.tooltip')}
                        />

                        {/** FORMULA CALCULUS */}
                        <FieldInputEditor
                            id="formCalculus"
                            name='formCalculus'
                            title={t('Form.formCalculus.label')}
                            value={initialData?.formCalculus}
                            error={formState.errors?.formCalculus}
                            placeholder={t('Form.formCalculus.placeholder')}
                            tooltip={t('Form.formCalculus.tooltip')}
                            render={initialData.formula === true}
                        />

                        {/** FORMULA PROCESSING */}
                        <FieldInputNumber
                            id='formProcessing'
                            name="formProcessing"
                            title={t('Form.formProcessing.label')}
                            value={initialData?.formProcessing}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.formProcessing}
                            placeholder={t('Form.formProcessing.placeholder')}
                            tooltip={t('Form.formProcessing.tooltip')}
                            render={initialData.formula === true}
                        />

                        {/** ERROR */}
                        <FieldInputCheckbox
                            id="error"
                            name='error'
                            title={t('Form.error.label')}
                            value={initialData.error}
                            onChange={(e) => { initialData.error = e; setUpdate(!update) }}
                            error={formState.errors?.error}
                            tooltip={t('Form.error.tooltip')}
                            disabled={type !== 2}
                        />

                        {/** MESSAGE D'ERREUR */}
                        <FieldInputText
                            id="errorMsg"
                            name='errorMsg'
                            title={t('Form.errorMsg.label')}
                            value={initialData?.errorMsg}
                            error={formState.errors?.errorMsg}
                            // placeholder={t('Form.errorMsg.placeholder')}
                            tooltip={t('Form.errorMsg.tooltip')}
                            render={initialData.error === true}
                            disabled={type !== 2}
                        />

                        {/** MESSAGE D'ERREUR STAMP*/}
                        <FieldInputText
                            id="errorStamp"
                            name='errorStamp'
                            title={t('Form.errorStamp.label')}
                            value={initialData?.errorStamp}
                            error={formState.errors?.errorStamp}
                            // placeholder={t('Form.errorStamp.placeholder')}
                            tooltip={t('Form.errorStamp.tooltip')}
                            render={initialData.error === true}
                            disabled={type !== 2}
                        />

                        {/** ALARM ENABLE */}
                        <FieldInputCheckbox
                            id="alarmEnable"
                            name='alarmEnable'
                            title={t('Form.alarmEnable.label')}
                            value={initialData.alarmEnable}
                            onChange={(e) => { initialData.alarmEnable = e; setUpdate(!update) }}
                            error={formState.errors?.alarmEnable}
                            tooltip={t('Form.alarmEnable.tooltip')}
                        />


                        {/** ALARM */}
                        <AlarmsDropDown
                            id='alarm'
                            name="alarm"
                            title={t('Form.alarm.label')}
                            value={initialData?.alarm}
                            options={alarms}
                            onChange={(e: any) => { onChangedAlarms(e); }}
                            error={formState.errors?.alarm}
                            placeholder={t('Form.alarm.placeholder')}
                            tooltip={t('Form.alarm.tooltip')}
                            render={initialData.alarmEnable === true}
                        />


                        {/** PERSISTENCE ENABLE */}
                        <FieldInputCheckbox
                            id="persistenceEnable"
                            name='persistenceEnable'
                            title={t('Form.persistenceEnable.label')}
                            value={initialData.persistenceEnable}
                            onChange={(e) => { initialData.persistenceEnable = e; setUpdate(!update) }}
                            error={formState.errors?.persistenceEnable}
                            tooltip={t('Form.persistenceEnable.tooltip')}
                        />

                        {/** PERSISTENCE OFFSET ENABLE*/}
                        <FieldInputCheckbox
                            id="persOffsetEnable"
                            name='persOffsetEnable'
                            title={t('Form.persOffsetEnable.label')}
                            value={initialData.persOffsetEnable}
                            onChange={(e) => { initialData.persOffsetEnable = e; setUpdate(!update) }}
                            error={formState.errors?.persOffsetEnable}
                            tooltip={t('Form.persOffsetEnable.tooltip')}
                            render={initialData.persistenceEnable === true}
                        />

                        {/** PERSISTENCE OFFSET FLOAT*/}
                        <FieldInputNumber
                            id='persOffsetFloat'
                            name="persOffsetFloat"
                            title={t('Form.persOffsetFloat.label')}
                            value={initialData?.persOffsetFloat}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.persOffsetFloat}
                            placeholder={t('Form.persOffsetFloat.placeholder')}
                            tooltip={t('Form.persOffsetFloat.tooltip')}
                            render={initialData.persistenceEnable === true && initialData.persOffsetEnable === true}
                        />

                        {/** PERSISTENCE OFFSET INT*/}
                        <FieldInputNumber
                            id='persOffsetInt'
                            name="persOffsetInt"
                            title={t('Form.persOffsetInt.label')}
                            value={initialData?.persOffsetInt}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.persOffsetInt}
                            placeholder={t('Form.persOffsetInt.placeholder')}
                            tooltip={t('Form.persOffsetInt.tooltip')}
                            render={initialData.persistenceEnable === true && initialData.persOffsetEnable === true}
                        />

                        {/** PERSISTENCE OFFSET BOOLEAN*/}
                        <FieldInputCheckbox
                            id="persOffsetBool"
                            name='persOffsetBool'
                            title={t('Form.persOffsetBool.label')}
                            value={initialData.persOffsetBool}
                            onChange={(e) => { initialData.persOffsetBool = e; setUpdate(!update) }}
                            error={formState.errors?.persOffsetBool}
                            tooltip={t('Form.persOffsetBool.tooltip')}
                            render={initialData.persistenceEnable === true && initialData.persOffsetEnable === true}
                        />

                        {/** PERSISTENCE OFFSET DATETIME*/}
                        <FieldInputDateTime
                            id='persOffsetDateTime'
                            name="persOffsetDateTime"
                            title={t('Form.persOffsetDateTime.label')}
                            value={initialData?.persOffsetDateTime}
                            // onChange={(e: any) => { onChangedTable(e); }}
                            error={formState.errors?.persOffsetDateTime}
                            placeholder={t('Form.persOffsetDateTime.placeholder')}
                            tooltip={t('Form.persOffsetDateTime.tooltip')}
                            render={initialData.persistenceEnable === true && initialData.persOffsetEnable === true}
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

                        {/** LIST */}
                        <TagsListsDropDown
                            id='list'
                            name="list"
                            title={t('Form.list.label')}
                            value={initialData?.list}
                            options={lists}
                            onChange={(e: any) => { onChangedLists(e); }}
                            error={formState.errors?.list}
                            placeholder={t('Form.list.placeholder')}
                            tooltip={t('Form.list.tooltip')}
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