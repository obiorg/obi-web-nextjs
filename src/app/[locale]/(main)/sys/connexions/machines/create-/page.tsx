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

import { Model } from '@/src/obi/models/model';
import { InputUtil } from '@/src/obi/utilities/InputUtil';

import { scrollIntoViewHelper } from '@/src/obi/utilities/helpers/scrollIntoViewHelper';
import { creatorServiceHelper } from '@/src/obi/utilities/helpers/creatorServiceHelper';
import { MachinesService } from '@/src/obi/service/connexions/MachinesService';

const MachinesCreate = () => {


    let loadLazyTimeout: number | undefined = 0;
    const [loading, setLoading] = useState(false);

    const model = new MachinesModel();
    const [entity, setEntity] = useState(model.defaults);
    const [dropdown, setDropDown] = useState({
        company: null,
        driver: null,
    });

    const globalModel = new Model();
    const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam());





    const toast = useRef<Toast>(null);



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



    const onChangedDropDown = (e: any) => {
        // Case of input text
        if (e.target) {
            const { name, value, checked } = e.target;
            let obj = { entity: { id: null } };
            if (name === 'company') {
                obj = lazyItemsCompanies[value];
                console.log('company', lazyItemsCompanies[value])
            } else {
                obj = lazyItemsDrivers[value];
                console.log('driver', lazyItemsDrivers[value]);
            }

            console.log('entityValue', obj.entity.id);
            const entityValue = obj.entity.id;

            if (value !== null && value !== undefined) {
                setDropDown((prevState) => {
                    return {
                        ...prevState,
                        [name]: value,
                    };
                });
                setEntity((prevState) => {
                    return {
                        ...prevState,
                        [name]: entityValue,
                    };
                });
            }
        }
    };

    /**
     * Handle changes on drowpdown, input and number
     */
    const onChangedInput = (e: any) => {
        // Case of input text
        if (e.target) {
            const { name, value, checked } = e.target;
            if (value !== null && value !== undefined) {
                setEntity((prevState) => {
                    return {
                        ...prevState,
                        [name]: value,
                    };
                });
            } else {
                setEntity((prevState) => {
                    return {
                        ...prevState,
                        [name]: checked
                    };
                });
            }
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
        //  console.log('On change Entity param ' + name, entity)
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




    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    }




    const [showMessage, setShowMessage] = useState(false);
    const defaultValues = model.defaults;
    const [errors, setErrors] = useState(model.errorsEmpty);

    /**
     * Use before validation to reset state
     */
    const clearErrors = () => {
        setErrors(model.errorsEmpty);
        setErrors((errors) => {
            return {
                ...errors,
                error: false,
            };
        });
    }



    /**
     *
     * @param data
     * @returns
     */
    const validate = (data: any) => {
        // Reset validation
        clearErrors();

        // check company
        if (!entity.company) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    company: {
                        error: true,
                        msg: 'Sociéte est requise !'
                    },
                };
            });
        }


        // Check name
        if (!entity.name) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    name: {
                        error: true,
                        msg: 'Nom est requis !'
                    },
                };
            });
        }


        // Check address
        // console.log('entity address', entity.address, entity.address.length);
        if (entity.address == null || entity.address.length == 0) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    address: {
                        error: true,
                        msg: 'IP ou adresse est requis !'
                    },
                };
            });
        } else if (!InputUtil.isValidIPv4(entity.address)) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    address: {
                        error: true,
                        msg: 'Entrer une IP valide (###.###.###.###) !'
                    },
                };
            });
        }



        // Check mask
        if (entity.mask.length !== 0 && !InputUtil.isValidIPv4(entity.address)) {
            if (!InputUtil.isValidIPv4(entity.mask)) {
                setErrors((errors) => {
                    return {
                        ...errors,
                        error: true,
                        mask: {
                            error: true,
                            msg: 'Entrer un mask valide (###.###.###.###) !'
                        },
                    };
                });
            }
        }



        // Check DNS
        if (entity.dns.length !== 0) {
            if (!InputUtil.isValidIPv4(entity.dns)) {
                setErrors((errors) => {
                    return {
                        ...errors,
                        error: true,
                        dns: {
                            error: true,
                            msg: 'Entrer un dns valide (###.###.###.###) !'
                        },
                    };
                });
            }
        }



        // Check IPv6
        if (entity.ipv6.length !== 0) {
            if (!InputUtil.isValidIPv6(entity.ipv6)) {
                setErrors((errors) => {
                    return {
                        ...errors,
                        error: true,
                        ipv6: {
                            error: true,
                            msg: 'Entrer une address IPv6 valide ) !'
                        },
                    };
                });
            }
        }


        // Check Port
        if ((entity.port + '').length !== 0 && entity.port !== null) {
            if (!InputUtil.isValidPort(entity.port)) {
                setErrors((errors) => {
                    return {
                        ...errors,
                        error: true,
                        port: {
                            error: true,
                            msg: 'Entrer un port valide entre 1 et 65535 !'
                        },
                    };
                });
            }
        }



        // check driver
        if (!entity.driver) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    driver: {
                        error: true,
                        msg: 'Un driver est requis !'
                    },
                };
            });
        }

        // Check Rack
        if (!InputUtil.isInRange(entity.rack, 0, 32)) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    rack: {
                        error: true,
                        msg: 'Numéro de rack invalide permet 0 - 32 !'
                    },
                };
            });
        }

        // Check Slot
        if (!InputUtil.isInRange(entity.slot, 0, 32)) {
            setErrors((errors) => {
                return {
                    ...errors,
                    error: true,
                    slot: {
                        error: true,
                        msg: 'Numéro de slot invalide, permis 0 - 32 !'
                    },
                };
            });
        }





        // Check MQTT PATH
        if (entity.mqtt !== null) {
            if (entity.mqtt === true) {
                if (!entity.mqtt_user) {
                    setErrors((errors) => {
                        return {
                            ...errors,
                            error: true,
                            mqtt_user: {
                                error: true,
                                msg: 'L\'utilisateur mqtt est requis !'
                            },
                        };
                    });
                }

                if (!entity.mqtt_password) {
                    setErrors((errors) => {
                        return {
                            ...errors,
                            error: true,
                            mqtt_password: {
                                error: true,
                                msg: 'Le mot de passe mqtt est requis !'
                            },
                        };
                    });
                }
            }

        }


        // Check Webhook
        if (entity.webhook !== null) {
            if (entity.webhook === true) {
                if (!entity.webhook_secret) {
                    setErrors((errors) => {
                        return {
                            ...errors,
                            error: true,
                            webhook_secret: {
                                error: true,
                                msg: 'webhook secret est requis !'
                            },
                        };
                    });
                }
            }
        }


        // Check Bus
        // if (!InputUtil.isInRange(entity.bus, 0, 128)) {
        //     setErrors((errors) => {
        //         return {
        //             ...errors,
        //             error: true,
        //             bus: {
        //                 error: true,
        //                 msg: 'Numéro de bus invalide permet 0 - 128 !'
        //             },
        //         };
        //     });
        // }



        // console.log(errors.error, errors)
        return !errors.error;
    };

    useEffect(() => {
        onSubmit();
    }, [entity]);

    const onSubmit =  (e: any) => {
        if (e)
            e.preventDefault();
        setShowMessage(false);
        clearMessages();
        setLazyLoading(true);


        if (validate(e)) {
            console.log("On validation no error !", errors);
            const creator = creatorServiceHelper(entity);

            setLazyLoading(true);

            if (loadLazyTimeout) {
                clearTimeout(loadLazyTimeout);
            }


            loadLazyTimeout = setTimeout(() => {

                MachinesService.add(creator).then((data: any) => {
                    console.log('data', data);
                    if (data) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Machine creation',
                            detail: data, life: 5000
                        });
                    }
                    setLazyLoading(false);
                });

            }, Math.random() * 2000 + 250);


        } else {
            console.log("On validation error(s) !", errors);
            scrollIntoViewHelper(errors);
            console.log('error', errors.error)
            if (errors.error) {
                let counter = 0;
                for (const x in errors) {
                    if (errors[x]?.error)
                        counter++;
                }
                toast.current.show({ severity: 'error', summary: 'Machine creation', detail: counter + ' error(s) à corriger', life: 5000 });
                msgSubmitted.current.show({ severity: 'error', summary: 'Machine creation', detail: counter + ' error(s) à corriger', sticky: true });
            }
            setShowMessage(false);
        }
    };


    const getFormErrorMessage = (val: any) => {
        if (errors[val].error) {
            return (
                <Message className={'text-left pt-2 pb-2'} severity="error" text={errors[val].msg} />
            )
        }
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;







    const msgSubmitted = useRef(null);
    const addMessages = () => {
        msgSubmitted.current.show([
            { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true },
            { severity: 'info', summary: 'Info', detail: 'Message Content', sticky: true },
            { severity: 'warn', summary: 'Warning', detail: 'Message Content', sticky: true },
            { severity: 'error', summary: 'Error', detail: 'Message Content', sticky: true }
        ]);
    }

    const clearMessages = () => {
        msgSubmitted.current.clear();
    }

    return (

        <div className="card">

            {/** Message toaster display */}
            <Toast ref={toast} />

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
                    </p>
                    <ul>
                        <li>IP      &emsp;&emsp;: <b>{entity.address}</b></li>
                        <li>Rack    &emsp;&emsp;: <b>{entity.rack}</b></li>
                        <li>Slot    &emsp;&emsp;: <b>{entity.slot}</b></li>
                        <li>Driver  &emsp;&emsp;: <b>{entity.driver}</b></li>
                    </ul>
                </div>
            </Dialog>






            <h3>Création machine</h3>
            <hr />




            {/* <h5>Dynamic</h5>
            <Button type="button" onClick={addMessages} label="Show" className="mr-2" />
            <Button type="button" onClick={clearMessages} icon="pi pi-times" label="Clear" className="p-button-secondary" /> */}

            <Messages ref={msgSubmitted} />
            <hr className={errors.error ? '' : 'hidden'} />



            <form
                // onSubmit={onSubmit}
                className="p-fluid"
            >
                <div className="col-12">



                    {/** Company */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="company" > {/*className={classNames({ 'p-error': errors.name })}> */}
                                Société
                            </label>
                        </div>


                        <Dropdown value={dropdown.company}
                            id='company'
                            options={lazyItemsCompanies}
                            name='company'
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (errors.company.error ? 'p-invalid' : '')}
                            onChange={onChangedDropDown} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoadCompanies,
                                itemSize: 28, showLoader: true, loading: lazyLoading,
                                delay: 250, loadingTemplate: (options) => {
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
                            tooltipOptions={{ position: 'right' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
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
                            className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (errors.name.error ? 'p-invalid' : '')}

                            placeholder="Machine ABCD"
                            required
                            tooltip='Permet de définir un nom de machine'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('name')}
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

                        <InputText id="address"
                            name='address'
                            value={entity.address}
                            onChange={onChangedInput}
                            className='col-12 md:col-5  pl-2 mb-2 input-value'

                            placeholder="192.168.1.150 ou adresse MQTT ou adresse Webhook"
                            required
                            tooltip='Dans le cas ou la machine est identifier par son adresse IP sinon laisser vide'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('address')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('mask')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('dns')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('ipv6')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('port')}
                        </div>
                    </div>

                    <hr />


                    {/** Driver */}
                    <div className="grid mb-2">
                        <div className='col-12 md:col-2'>
                            <label htmlFor="driver" className="input-field">
                                Driver
                            </label>
                        </div>

                        <Dropdown id='driver'
                            name='driver'
                            value={dropdown.driver}
                            options={lazyItemsDrivers}
                            className='col-12 md:col-5  mb-2 input-value'

                            onChange={onChangedDropDown} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoadDrivers,
                                itemSize: 28, showLoader: true,
                                loading: lazyLoading, delay: 250,
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('driver')}
                        </div>
                    </div>

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
                            onValueChange={onChangedInput}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="0"
                            // required
                            tooltip='Specifier le rack de la machine, ex: siemens(0)'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('rack')}
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
                            onValueChange={onChangedInput}
                            onChange={onChangedInput}
                            className='col-12 md:col-5   ml-0 mb-2 input-value'

                            placeholder="2"
                            // required
                            tooltip='Specifier le slot au quel est la CPU, ex: souvent siemens (2)'
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('slot')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('mqtt')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('mqtt_user')}
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

                            autoComplete='off'
                            placeholder="Un mot de passe"
                            required={entity.mqtt}
                            tooltip="Spécifier un mot de passe d'accès MQTT"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('mqtt_password')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('webhook')}
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

                            autoComplete='off'
                            placeholder="secret access token"
                            required={entity.webhook}
                            tooltip="Information d'accès de communication webhook"
                            tooltipOptions={{ position: 'top' }}
                        />

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('webhook_secret')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('bus')}
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

                        <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                            {getFormErrorMessage('description')}
                        </div>


                        <div className='col-12 md:col-12   ml-0 mb-2 input-value'>
                            <Editor
                                id='description'
                                name='description'
                                value={entity.description}
                                className=''

                                onTextChange={(e) => { onChangedHtmlInput(e, 'description') }}

                            // placeholder="Description html ici"
                            // required={entity.}
                            />
                        </div>
                    </div>

                    <hr />



                    {/** Command options */}
                    <div className='grid'>
                        <Link href="#"
                            className='col-12 md:col-3 mt-0 '>
                            <Button label="Enregistrer" icon="pi pi-check"
                                type='submit'
                                severity="success"
                                // className='col-12 md:col-3 mt-0 '
                                tooltip='Enregistrer les informations'
                                tooltipOptions={{ position: 'bottom' }}
                                onClick={(e) => onSubmit(e)}
                            />
                        </Link>


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
            </form >


        </div >
    );
};

export default MachinesCreate;
