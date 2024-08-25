'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { OBI } from '@/src/types/obi';
import { Skeleton } from 'primereact/skeleton';
import { CompaniesService } from '@/src/obi/service/businesses/CompaniesService';


import '@/src/styles/obi/obi.scss';
import { CompaniesModel } from '@/src/obi/models/businesses/CompaniesModel';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import { InputNumber } from 'primereact/inputnumber';
import { MachinesDriversService } from '@/src/obi/service/connexions/MachinesDriversService';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { Editor } from 'primereact/editor';
import Link from 'next/link';



import { useForm, Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Form } from 'react-final-form';
import { Model } from '@/src/obi/models/model';

const MachinesCreate = () => {


    let loadLazyTimeout: number | undefined = 0;
    const [loading, setLoading] = useState(false);

    const [company, setCompany] = useState(null);
    const [companies, setCompanies] = useState<OBI.companies[] | null>([]);
    const model = new MachinesModel();
    const [entity, setEntity] = useState(model.defaults);

    const globalModel = new Model();
    const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam());





    const toast = useRef<Toast>(null);
    const message = useRef<Messages>(null);






    const [lazyItemsCompanies, setLazyItemsCompanies] = useState<any>([]);
    const [lazyItemsDrivers, setLazyItemsDrivers] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState<any>(false);



    const loadLazyDataCompanies = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            CompaniesService.getLazy(lazyEventSet).then((data: any) => {

                if (data?.length > 0) {
                    let _lazyItems = [data];
                    for (let i = lazyParams.first; i < data.length; i++) {
                        // console.log(i, data[i].company + ' - ' + data[i].designation + ' -  [' + data[i].id + ']');
                        _lazyItems[i] = {
                            label: data[i].company + ' - ' + data[i].designation + ' -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsCompanies(_lazyItems);
                    // console.log('lazyItems:', _lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadCompanies = (event: any) => {
        setLazyLoading(true);
        lazyParams.first = event.first;
        lazyParams.rows = event.last === 0 ? 10 : event.last - event.first;
        loadLazyDataCompanies();
        // setLazyLoading(false);
    };

    useEffect(() => {
        setLazyLoading(true);
        loadLazyDataCompanies();
        // setLazyLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadLazyDataDrivers = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            MachinesDriversService.getLazy(lazyEventSet).then((data: any) => {

                if (data?.length > 0) {
                    let _lazyItems = [data];
                    for (let i = lazyParams.first; i < data.length; i++) {
                        _lazyItems[i] = {
                            label: data[i].driver + ' - ' + data[i].designation + ' -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsDrivers(_lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadDrivers = (event: any) => {
        lazyParams.first = event.first;
        lazyParams.rows = event.last === 0 ? 10 : event.last - event.first;
        loadLazyDataDrivers();
        // setLazyLoading(false);
    };

    useEffect(() => {
        loadLazyDataDrivers();
        // setLazyLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    /**
     * Handle changes on drowpdown, input and number
     */
    const onChangedInput = (e: any) => {
        // Case of input text
        if (e.target) {
            const { name, value, checked } = e.target;
            setEntity((prevState) => {
                return {
                    ...prevState,
                    [name]: value || checked
                };
            });
        }
        // case of input number
        else {
            const { originalEvent, value } = e;
            const { name } = originalEvent.target;
            setEntity((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                };
            });
        }
    }

    /**
     * Handle change on html input element, required name of element
     * @param e html input event 
     * @param name to be use for entity
     */
    const onChangedHtmlInput = (e: any, name: string) => {
        const { source, delta, textValue, htmlValue } = e;
        setEntity((prevState) => {
            return {
                ...prevState,
                [name]: htmlValue
            };
        });
    }


    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = model.defaults;
    // const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    /**
     * 
     * @param data 
     * @returns 
     */
    const validate = (data: any) => {
        console.log("validate", data);
        let errors = {};


        console.log('entity.name', errors.name);
        if (!entity.name) {

            errors.name = 'Name is required.';
            console.log('entity.name', errors.name);
        }

        // if (!data.email) {
        //     errors.email = 'Email is required.';
        // }
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        //     errors.email = 'Invalid email address. E.g. example@email.com';
        // }

        // if (!data.password) {
        //     errors.password = 'Password is required.';
        // }

        // if (!data.accept) {
        //     errors.accept = 'You need to agree to the terms and conditions.';
        // }

        return errors;
    };


    const onSubmit = (data: any) => {
        console.log('on submit', data);
        if (validate(data)) {

        } else {
            setFormData(data);
            setShowMessage(true);
            // form.restart();
        }

        // form.restart();
    };


    const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (name: any) => {

        //return <Message className='text-left pt-2 pb-2' severity="error" text="Please specify a company" />
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;





    return (

        <div className="card">

            {/** Display Dialog box  */}
            <Dialog visible={showMessage}
                onHide={() => setShowMessage(false)}
                position="center"
                footer={dialogFooter} showHeader={true} header={(<h3>Confirmation</h3>)} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-0 px-3">
                    <h5 className='vertical-align-middle'>
                        <i className="pi pi-check-circle mr-4 vertical-align-middle"
                            style={{ fontSize: '3rem', color: 'var(--green-500)' }}></i>
                        Création machine - réussie !
                    </h5>

                    <p className='mt-3'>
                        Machine  &quot;<b>{entity.name}</b>&quot; créée avec succès : <br />
                        <ul>
                            <li>IP      : <b>{entity.address}</b></li>
                            <li>Rack    : <b>{entity.rack}</b></li>
                            <li>Slot    : <b>{entity.slot}</b></li>
                            <li>Driver    : <b>{entity.driver}</b></li>
                        </ul>
                    </p>
                </div>
            </Dialog>






            <h3>Création machine</h3>
            <hr />




            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="col-12">



                    {/** Company */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="company" > {/*className={classNames({ 'p-error': errors.name })}> */}
                                Société
                            </label>
                        </div>


                        <Dropdown value={entity.company}
                            id='company'
                            options={lazyItemsCompanies}
                            name='company'
                            className='col-12 md:col-5  mb-2 input-value {fieldState.invalid ? "p-invalid":""}'
                            onChange={onChangedInput} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoadCompanies, itemSize: 28, showLoader: true, loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="flex align-items-center p-2" >
                                            <Skeleton width={options.even ? '60%' : '50%'} height="2rem" />
                                        </div>
                                    )
                                }
                            }}
                            placeholder="Sélectionner"
                            required
                            tooltip='Définir la société ou est installé la machine'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            {getFormErrorMessage('company')}
                        </div>
                    </div>



                    {/** Name */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="name" className="input-field">
                                Nom
                            </label>
                        </div>

                        <InputText id="name"
                            name='name'
                            value={entity.name}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="Machine ABCD"
                            required
                            tooltip='Permet de définir un nom de machine'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 '}>
                            <Message className={'text-left pt-2 pb-2' + (errors?.name ? '' : 'hidden')} severity="error" text={errors.name} />
                        </div>
                    </div>

                    <hr />

                    {/** IP Address */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="adresse" className="input-field">
                                Adresse
                            </label>
                        </div>

                        <InputText id="adresse"
                            name='address'
                            value={entity.address}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="192.168.1.150 ou adresse MQTT ou adresse Webhook"
                            required
                            tooltip='Dans le cas ou la machine est identifier par son adresse IP sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />
                        {/* className="p-invalid" */}

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify mask" />
                        </div>
                    </div>

                    {/** IP Mask */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="mask" className="input-field">
                                Mask
                            </label>
                        </div>

                        <InputText id="mask"
                            name='mask'
                            value={entity.mask}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="255.255.255.0"
                            required
                            tooltip='Si identifié par IP, veuillez définir le mask, sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify mask" />
                        </div>
                    </div>

                    {/** IP DNS */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="dns" className="input-field">
                                DNS
                            </label>
                        </div>

                        <InputText id="dns"
                            name='dns'
                            value={entity.dns}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="8.8.8.8"

                            tooltip='Si identifié par IP et que la DNS est nécessaire renseigner, sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify dns" />
                        </div>
                    </div>

                    {/** IP IPv6 */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="ipv6" className="input-field">
                                IPv6
                            </label>
                        </div>

                        <InputText id="ipv6"
                            name='ipv6'
                            value={entity.ipv6}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="2c0f:ef58:204:8a00:2fd9:8dd0:94f3:9d84"
                            // required
                            tooltip='Si identifié par IPv6, veuillez le définir, sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify ipv6" />
                        </div>
                    </div>

                    {/** IP port */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="port" className="input-field">
                                Port
                            </label>
                        </div>

                        <InputNumber id="port"
                            name='port'
                            value={entity.port}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="8080"
                            // required
                            tooltip='Veuillez définir un port si nécessaire sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify port" />
                        </div>
                    </div>

                    <hr />


                    {/** RACK */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="rack" className="input-field">
                                Rack
                            </label>
                        </div>

                        <InputNumber id="rack"
                            name='rack'
                            value={entity.rack}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="0"
                            // required
                            tooltip='Specifier le rack de la machine, ex: siemens(0)'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier le rack" />
                        </div>
                    </div>

                    {/** SLOT */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="slot" className="input-field">
                                Slot
                            </label>
                        </div>

                        <InputNumber id="slot"
                            name='slot'
                            value={entity.slot}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="2"
                            // required
                            tooltip='Specifier le slot au quel est la CPU, ex: souvent siemens (2)'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier le slot" />
                        </div>
                    </div>

                    {/** Driver */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="driver" className="input-field">
                                Driver
                            </label>
                        </div>

                        <Dropdown id='driver'
                            name='driver'
                            value={entity.driver}
                            options={lazyItemsDrivers}
                            className='col-12 md:col-5  mb-2 input-value'

                            onChange={onChangedInput} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoadDrivers, itemSize: 28, showLoader: true, loading: lazyLoading, delay: 250,
                                loadingTemplate: (options) => {
                                    return (
                                        <div className="flex align-items-center p-2" >
                                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }}
                            placeholder="Sélectionner"
                            // required
                            tooltip='Specifier le driver de la machine'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Please specify a company" />
                        </div>
                    </div>

                    <hr />

                    {/** MQTT */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="mqtt" className="input-field">
                                MQTT
                            </label>
                        </div>
                        <Checkbox id="mqtt"
                            name='mqtt'
                            checked={entity.mqtt == true ? true : false}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="Sélectionner"
                            // required
                            tooltip='Active une communication via MQTT'
                            tooltipOptions={{ position: 'right' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier MQTT" />
                        </div>
                    </div>


                    {/** mqtt user */}
                    <div className={'grid mb-2 ' + (!entity.mqtt ? 'hidden' : '')}>
                        <div className='col-12 md:col-2'>
                            <label htmlFor="mqtt_user" className="input-field">
                                MQTT Utilisateur
                            </label>
                        </div>

                        <InputText id="mqtt_user"
                            name='mqtt_user'
                            value={entity.mqtt_user}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 w-100 input-value'

                            placeholder="Utilisateur"
                            required={entity.mqtt}
                            tooltip="Spécifier l'utilisateur d'accès MQTT"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier un utilisateur mqtt" />
                        </div>
                    </div>


                    {/** MQTT Password */}
                    <div className={'grid mb-2 ' + (!entity.mqtt ? 'hidden' : '')}>
                        <div className='col-12 md:col-2'>
                            <label htmlFor="mqtt_password" className="input-field">
                                MQTT Mot de passe
                            </label>
                        </div>

                        <Password id="mqtt_password"
                            name='mqtt_password'
                            value={entity.mqtt_password}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   mb-2 input-value'

                            placeholder="Un mot de passe"
                            required={entity.mqtt}
                            tooltip="Spécifier un mot de passe d'accès MQTT"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier un mot de passe mqtt" />
                        </div>
                    </div>

                    <hr />


                    {/** Webhook */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="webhook" className="input-field">
                                Webhook
                            </label>
                        </div>
                        <Checkbox id="webhook"
                            name='webhook'
                            checked={entity.webhook == true ? true : false}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="check"
                            // required={entity.webhook}
                            tooltip="Activer l'usage de communication webhook"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier Webhook" />
                        </div>
                    </div>





                    {/** Webhook Secret */}
                    <div className={'grid mb-2 ' + (!entity.webhook ? 'hidden' : '')}>
                        <div className='col-12 md:col-2'>
                            <label htmlFor="webhook_secret" className="input-field">
                                Webhook Secret
                            </label>
                        </div>

                        <Password id="webhook_secret"
                            name='webhook_secret'
                            value={entity.webhook_secret}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   mb-2 input-value'

                            placeholder="secret access token"
                            required={entity.webhook}
                            tooltip="Information d'accès de communication webhook"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier un mot de passe webhook" />
                        </div>
                    </div>


                    <hr />



                    {/** Bus */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="bus" className="input-field">
                                Adresse Bus
                            </label>
                        </div>

                        <InputNumber id="bus"
                            name='bus'
                            value={entity.bus}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="102"
                            // required={entity.}
                            tooltip="Information de communication modbus"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier le Bus" />
                        </div>
                    </div>

                    <hr />

                    {/** Description */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="description" className="input-field">
                                Description
                            </label>
                        </div>

                        <div className='col-12 md:col-4 p-0 m-0 hidden'>
                            <Message className='text-left pt-2 pb-2' severity="error" text="Spécifier le Bus" />
                        </div>

                        <div className='col-12 md:col-12   ml-0 mb-2 input-value'>
                            <Editor
                                id='description'
                                name='description'
                                value={entity.description}
                                className=''

                                onTextChange={(e) => { onChangedHtmlInput(e, 'descriptions') }}

                            // placeholder="Description html ici"
                            // required={entity.}
                            />
                        </div>


                    </div>

                    <hr />



                    {/** Command optiosn */}
                    <div className='grid'>
                        {/* <Link href="#" 
                            className='col-12 md:col-3 mt-0 '>*/}
                        <Button label="Enregistrer" icon="pi pi-check"
                            type='submit'
                            severity="success"
                            className='col-12 md:col-3 mt-0 '
                            tooltip='Enregistrer les informations'
                            tooltipOptions={{ position: 'bottom' }}
                            onClick={onSubmit}
                        />
                        {/* </Link> */}
                        <Link href="#"
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Annuler" icon="pi pi-undo"
                                severity="secondary"
                                // className="col-12 md:col-2  m-1"
                                tooltip='Annuler en effaçant les informations enregistré'
                                tooltipOptions={{ position: 'bottom' }}
                                onClick={e => setEntity(model.defaults)}
                            />
                        </Link>
                        <Link href="./../"
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Lister" icon="pi pi-list"
                                severity="info"
                                // className="col-12 md:col-2  m-1"
                                tooltip='Retourner au tableau de données'
                                tooltipOptions={{ position: 'bottom' }}
                            />
                        </Link>

                    </div>

                </div >

            </form>


        </div>
    );
};

export default MachinesCreate;
