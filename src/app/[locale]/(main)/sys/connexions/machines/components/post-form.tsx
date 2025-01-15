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
import FieldInputMask from "@/src/obi/components/Inputs/FieldInputMask"
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
import { useTranslations } from "next-intl"
import FieldInputPassword from "@/src/obi/components/Inputs/FieldInputPassword"
import { Button } from "primereact/button"
import FieldDropDown from "@/src/obi/components/Inputs/FieldDropDown"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { RadioButton } from "primereact/radiobutton"
import { InputMask } from "primereact/inputmask"
import FieldInputIPv4 from "@/src/obi/components/Inputs/FieldInputIPv4"
import { MachinesDriversService } from "@/src/obi/service/connexions/MachinesDriversService"
import MachinesDriversDropDown from "../../drivers/components/MachinesDriversDropDown"



// Define the shape of the form errors locations
interface MachinesFormErrors {
    id?: string[];
    deleted?: string[];
    created?: string[];
    changed?: string[];


    company?: number[];
    address?: string[];
    mask?: string[];
    dns?: string[];
    ipv6?: string[];
    port?: number[];
    name?: string[];
    rack?: number[];
    slot?: number[];
    driver?: number[];
    mqtt?: boolean[];
    mqtt_user?: string[];
    mqtt_password?: string[];
    webhook?: boolean[];
    webhook_secret?: string[];
    bus?: number[];
    description?: string[];

    companies?: OBI.companies[][];
    drivers?: OBI.mach_drivers[][];
}

// Define the shape of the form state

// Define an interface for the form state
interface MachinesFormState {
    errors: {
        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];


        company?: number[];
        address?: string[];
        mask?: string[];
        dns?: string[];
        ipv6?: string[];
        port?: number[];
        name?: string[];
        rack?: number[];
        slot?: number[];
        driver?: number[];
        mqtt?: boolean[];
        mqtt_user?: string[];
        mqtt_password?: string[];
        webhook?: boolean[];
        webhook_secret?: string[];
        bus?: number[];
        description?: string[];

        companies?: OBI.companies[][];
        drivers?: OBI.mach_drivers[][];
    };
}

// Define the props that the PostForm component expects
interface MachinesPostFormProps {
    formAction: any; // The action to perform when the form is submitted
    type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
    initialData: {
        // The initial data for the form fields
        id: number;
        deleted: boolean;
        created: Date;
        changed: Date;

        company?: number;
        address?: string;
        mask?: string;
        dns?: string;
        ipv6?: string;
        port?: number;
        name?: string;
        rack?: number;
        slot?: number;
        driver?: number;
        mqtt?: boolean;
        mqtt_user?: string;
        mqtt_password?: string;
        webhook?: boolean;
        webhook_secret?: string;
        bus?: number;
        description?: string;

        companies?: {};
        drivers?: {};
    };

}



const model = new MachinesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function PostForm({ formAction, type, initialData }: MachinesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<any>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<any>(null);
    const msg = useRef<any>();

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
    const [catalog, setCatalog] = useState<OBI.Locations>(null);



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

    }, [initialData]);


    /**
     * 
     * @param e Porcess submit form
     */
    const onSubmit = (e: any) => {
        // console.log('onSubmit', e.target, e)
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
                console.log('start create', formData);
                MachinesService.create(formState, formData).then((data: any) => {
                    console.log('Data saved', data);
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        toast.current.clear();
                        doMsgPrompt('error', 'Erreur de création : ', data.error.message + '\n\n' + data.error.stack, true)
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
                    console.log('Data saved', data);
                    if (data.errors || data.status === 500) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        toast.current.clear();
                        doMsgPrompt('error', 'Erreur de modification : ', data.error.message + '\n\n' + data.error.stack, true)
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
    const [drivers, setDrivers] = useState<any>([]);
    const [reload, setReload] = useState(false);

    const [lazyParams, setLazyParams] = useState(
        model.
            getStandardParam({ field: 'company', order: 1 }, CompaniesService.defaultFilters()));
    const [lazyParamsDrivers, setLazyParamsDrivers] = useState(
        model.
            getStandardParam({ field: 'driver', order: 1 }, MachinesDriversService.defaultFilters()));

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


        const lazyEventSetDrivers = { lazyEvent: JSON.stringify(lazyParamsDrivers) };
        MachinesDriversService.getLazy(lazyEventSetDrivers).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setDrivers(() => {
                    return data.map((item: any) => ({
                        label: item.driver + ' - ' + item.designation + ' [' + item.id + ']',
                        value: item.id,
                        catalogs: item
                    }));
                });
            }
        });
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps





    const [dlgError, setDlgError] = useState<any>();





    const g = useTranslations('global');
    const t = useTranslations('connectionMachine');

    const [update, setUpdate] = useState(false); //
    const [linkSource, setLinkSource] = useState('IPv4'); // Define linkSource state variable
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


                        {/** SELECTOR TYPE */}
                        <div className="grid mb-3">
                            <div className='col-12 md:col-2'>
                                <label htmlFor='linkSource' className="input-field">
                                    {t('Form.linkSrouce.label')}
                                </label>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="linkIP"
                                        name="linkIP"
                                        value='IPv4'
                                        onChange={(e: any) => {
                                            setLinkSource(e.value);
                                            initialData.mqtt = false; initialData.webhook = false; setUpdate(!update)
                                        }}
                                        checked={linkSource === 'IPv4'} />
                                    <label htmlFor="linkIP" className="ml-2">{t('Form.linkSource.IP.label')}</label>
                                </div>

                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="linkMQTT"
                                        name="linkMQTT"
                                        value='MQTT'
                                        onChange={(e: any) => {
                                            setLinkSource(e.value);
                                            initialData.mqtt = true; initialData.webhook = false; setUpdate(!update)
                                        }}
                                        checked={linkSource === 'MQTT'} />
                                    <label htmlFor="linkMQTT" className="ml-2">{t('Form.linkSource.MQTT.label')}</label>
                                </div>

                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="linkWebhook"
                                        name="linkWebhook"
                                        value='Webhook'
                                        onChange={(e: any) => {
                                            setLinkSource(e.value);
                                            initialData.mqtt = false; initialData.webhook = true; setUpdate(!update)
                                        }}
                                        checked={linkSource === 'Webhook'} />
                                    <label htmlFor="linkWebhook" className="ml-2">{t('Form.linkSource.Webhook.label')}</label>
                                </div>

                                <div className="flex align-items-center">
                                    <RadioButton
                                        inputId="linkBus"
                                        name="linkBus"
                                        value='Bus'
                                        onChange={(e: any) => {
                                            setLinkSource(e.value);
                                            initialData.mqtt = false; initialData.webhook = false; setUpdate(!update)
                                        }}
                                        checked={linkSource === 'Bus'} />
                                    <label htmlFor="linkBus" className="ml-2">{t('Form.linkSource.Bus.label')}</label>
                                </div>
                            </div>


                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {/* Non applicable */}
                            </div>

                        </div>



                        {/** Machines Drivers */}
                        <MachinesDriversDropDown
                            id='driver'
                            name="driver"
                            title={t('Form.driver.label')}
                            value={initialData?.driver}
                            options={drivers}
                            onChange={(e: any) => { initialData.driver = e.value; setUpdate(!update) }}
                            error={formState.errors?.driver}
                            placeholder={t('Form.driver.placeholder')}
                            tooltip={t('Form.driver.tooltip')}
                            render={linkSource === 'IPv4'}
                        />



                        <FieldInputIPv4
                            id="address"
                            name='address'
                            title={t('Form.addressIPv4.label')}
                            value={initialData?.address}
                            onChange={(e: any) => { initialData.address = e.value; setUpdate(!update) }}
                            error={formState.errors?.address}
                            placeholder={t('Form.addressIPv4.placeholder')}
                            tooltip={t('Form.addressIPv4.tooltip')}
                            render={linkSource === 'IPv4'}
                        />




                        {/* link address */}
                        <FieldInputText
                            id="address"
                            name='address'
                            title={t('Form.addressLink.label')}
                            value={initialData?.address}
                            error={formState.errors?.address}
                            placeholder={t('Form.addressLink.placeholder')}
                            tooltip={t('Form.addressLink.tooltip')}
                            render={linkSource !== 'IPv4' && linkSource !== 'Bus'}
                        />



                        {/** Mask */}
                        <FieldInputIPv4
                            id="mask"
                            name='mask'
                            title={t('Form.mask.label')}
                            value={initialData?.mask}
                            error={formState.errors?.mask}
                            placeholder={t('Form.mask.placeholder')}
                            tooltip={t('Form.mask.tooltip')}
                            render={linkSource === 'IPv4'}
                        />

                        {/** DNS */}
                        <FieldInputIPv4
                            id="dns"
                            name='dns'
                            title={t('Form.dns.label')}
                            value={initialData?.dns}
                            error={formState.errors?.dns}
                            placeholder={t('Form.dns.placeholder')}
                            tooltip={t('Form.dns.tooltip')}
                            render={linkSource === 'IPv4'}
                        />

                        {/** IPv6 */}
                        <FieldInputText
                            id="ipv6"
                            name='ipv6'
                            title={t('Form.IPv6.label')}
                            value={initialData?.ipv6}
                            error={formState.errors?.ipv6}
                            placeholder={t('Form.IPv6.placeholder')}
                            tooltip={t('Form.IPv6.tooltip')}
                            render={linkSource === 'IPv4'}
                        />

                        {/** Port */}
                        <FieldInputNumber
                            id="port"
                            name='port'
                            title={t('Form.port.label')}
                            value={initialData?.port}
                            error={formState.errors?.port}
                            placeholder={t('Form.port.placeholder')}
                            tooltip={t('Form.port.tooltip')}
                            render={linkSource === 'IPv4'}
                        />


                        {/** Rack */}
                        <FieldInputNumber
                            id="rack"
                            name='rack'
                            title={t('Form.rack.label')}
                            value={initialData?.rack}
                            error={formState.errors?.rack}
                            placeholder={t('Form.rack.placeholder')}
                            tooltip={t('Form.rack.tooltip')}
                            render={linkSource === 'IPv4'}
                        />

                        {/** Slot */}
                        <FieldInputNumber
                            id="slot"
                            name='slot'
                            title={t('Form.slot.label')}
                            value={initialData?.slot}
                            error={formState.errors?.slot}
                            placeholder={t('Form.slot.placeholder')}
                            tooltip={t('Form.slot.tooltip')}
                            render={linkSource === 'IPv4'}
                        />


                        {/** MQTT */}
                        <FieldInputCheckbox
                            id="mqtt"
                            name='mqtt'
                            title={t('Form.mqtt.label')}
                            value={initialData.mqtt}
                            onChange={(e: any) => { initialData.mqtt = e; setUpdate(!update) }}
                            error={formState.errors?.mqtt}
                            tooltip={t('Form.mqtt.tooltip')}
                            hidden={true}
                            render={linkSource === 'MQTT'}
                        />

                        {/** mqtt_user */}
                        <FieldInputText
                            id="mqtt_user"
                            name='mqtt_user'
                            title={t('Form.mqtt_user.label')}
                            value={initialData?.mqtt_user}
                            error={formState.errors?.mqtt_user}
                            placeholder={t('Form.mqtt_user.placeholder')}
                            tooltip={t('Form.mqtt_user.tooltip')}
                            render={initialData.mqtt === true}
                        />

                        {/** mqtt_password */}
                        <FieldInputPassword
                            id="mqtt_password"
                            name='mqtt_password'
                            title={t('Form.mqtt_password.label')}
                            value={initialData?.mqtt_password}
                            error={formState.errors?.mqtt_password}
                            placeholder={t('Form.mqtt_password.placeholder')}
                            tooltip={t('Form.mqtt_password.tooltip')}
                            render={initialData.mqtt === true}
                        />


                        {/** webhook */}
                        <FieldInputCheckbox
                            id="webhook"
                            name='webhook'
                            title={t('Form.webhook.label')}
                            value={initialData.webhook}
                            onChange={(e) => { initialData['webhook'] = e; setUpdate(!update) }}
                            error={formState.errors?.webhook}
                            tooltip={t('Form.webhook.tooltip')}
                            hidden={true}
                            render={linkSource === 'Webhook'}
                        />

                        {/** webhook_secret */}
                        <FieldInputPassword
                            id="webhook_secret"
                            name='webhook_secret'
                            title={t('Form.webhook_secret.label')}
                            value={initialData?.webhook_secret}
                            error={formState.errors?.webhook_secret}
                            placeholder={t('Form.webhook_secret.placeholder')}
                            tooltip={t('Form.webhook_secret.tooltip')}
                            render={initialData.webhook === true}
                        />


                        {/** Bus */}
                        <FieldInputNumber
                            id="bus"
                            name='bus'
                            title={t('Form.bus.label')}
                            value={initialData?.bus}
                            error={formState.errors?.bus}
                            placeholder={t('Form.bus.placeholder')}
                            tooltip={t('Form.bus.tooltip')}
                            render={linkSource === 'Bus'}
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





// 127.0.0.1
function InputIPAddress(props) {
    function checkIpValue(value: any) {
        const subips = value.split('.')
        if (subips.length > 4) {
            return false
        }
        const invalidSubips = subips.filter((ip: any) => {
            ip = parseInt(ip)
            return ip < 0 || ip > 255
        })
        if (invalidSubips.length !== 0) {
            return false
        }
        let emptyIpCount = 0
        subips.forEach((ip: any) => {
            if (ip === "") {
                emptyIpCount++
            }
        })
        if (emptyIpCount > 1) {
            return false
        }
        return true
    }

    return (
        <InputMask
            formatChars={{
                '9': '[0-9\.]',
            }}
            mask="999999999999999"
            maskChar={null}
            alwaysShowMask={false}
            beforeMaskedValueChange={(newState: any, oldState: any, userInput: any) => {
                let value = newState.value;
                const oldValue = oldState.value;
                let selection = newState.selection;
                let cursorPosition = selection ? selection.start : null;
                const result = checkIpValue(value)
                if (!result) {
                    value = value.trim()
                    // try to add . before the last char to see if it is valid ip address
                    const newValue = value.substring(0, value.length - 1) + "." + value.substring(value.length - 1);
                    if (checkIpValue(newValue)) {
                        cursorPosition++
                        selection = { start: cursorPosition, end: cursorPosition };
                        value = newValue
                    } else {
                        value = oldValue
                    }
                }

                return {
                    value,
                    selection
                };
            }}
        />
    )
}

