// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { LocationsModel } from "@/src/obi/models/localisations/LocationsModel"
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

import { OBI } from "@/src/types"
import { Checkbox } from "primereact/checkbox"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"
import DropDownLocations from "../../../connexions/drivers/components/dropdown"
import DropDownCountries from "../../counties/components/dropdown"
import DropDownStates from "../../states/components/dropdown"
import DropDownCities from "../../cities/components/dropdown"
import { Message } from "primereact/message"



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { Messages } from "primereact/messages"
import ButtonSave from "@/src/obi/components/Validations/ButtonSave"
import { LocationsService } from "@/src/obi/service/localisations/LocationsService"
import { useForm } from "react-hook-form"
import { BlockUI } from "primereact/blockui"
import { ToggleButton } from "primereact/togglebutton"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldDropDown from "@/src/obi/components/Inputs/FieldDropDown"
import { CountryService } from "@/src/demo/service/CountryService"
import { CountriesService } from "@/src/obi/service/Localisations/CountriesService"


// Define the shape of the form errors locations
interface LocationsFormErrors {
    id?: string[];
    deleted?: string[];
    created?: string[];
    changed?: string[];

    location?: string[];
    designation?: string[];
    group?: string[];

    country?: string[];
    state?: string[];
    city?: string[];
    address?: string[];
    address1?: string[];
    address3?: string[];
    bloc?: string[];
    floor?: string[];
    number?: string[];
}

// Define the shape of the form state
interface LocationsFormState {
    errors: LocationsFormErrors;
}

// Define the props that the PostForm component expects
interface LocationsPostFormProps {
    formAction: any; // The action to perform when the form is submitted
    type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
    initialData: {
        // The initial data for the form fields
        id: number;
        deleted: boolean;
        created: date;
        changed: date;

        location: string;
        designation: string;
        group: string;
        country: number;
        state: number;
        city: number;
        address: string;
        address1: string;
        address3: string;
        bloc: string;
        floor: number;
        number: string;
        businesses: {},
        companies: {},
        entities: {},
    };
}


const model = new LocationsModel();




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

    // Used for dialog
    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    // Sub state dropdown selection
    const [countryOn, setCountryOn] = useState(false);
    const [stateOn, setStateOn] = useState(false);

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

    const { register, handleSubmit, errors } = useForm<OBI.LocationsFormState>({
        defaultValues: initialData,
        mode: "onBlur",
    });
    /**
     * Depends on save mode it will process reset or keed elements
     */
    const saveModeProcess = () => {
        if (saveMode === 0) {
            formRef.current.reset();
        } else {
            // nothing yet
        }
    };


    const onChangedCountry = (e: any) => {
        initialData.country = e.value
        if (initialData.country !== undefined) {
            setCountryOn(true);
        } else {
            setCountryOn(false);
        }
    }

    const onChangedState = (e: any) => {
        initialData.state = e.value
        if (initialData.state !== undefined) {
            setStateOn(true);
        } else {
            setStateOn(false);
        }
    }

    const onChangedCity = (e: any) => {
        initialData.city = e.value
        if (initialData.city !== undefined) {
            // setStateOn(true);
        } else {
            // setStateOn(false);
        }
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
            initialData.state = undefined;
            initialData.country = undefined;
            setStateOn(false);
            setCountryOn(false);
        }
    }, [catalog]);



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

            LocationsService.createPost(formState, formData).then((data: any) => {
                if (data.errors) {
                    formState.errors = { errors: {} };
                    formState.errors = data.errors;
                    doMsgPrompt('error', 'Erreur de création : ', 'Veuillez corriger les erreurs')
                } else {
                    formState.errors = { errors: {} };
                    setCatalog(data);
                    showSuccess('Création réussie !', data.location + ' - ' + data.designation + ' [' + data.id + ']');
                    saveModeProcess()
                }
            }).catch((err) => {
                console.error('Error : ', err);
            });
            setLazyLoading(false);
            unBlockForm();
        }, Math.random() * 1000 + 250);
    }

    /**
     * 
     * @param e Reset the form
     */
    const onCancel = (e: any) => {
        e.preventDefault();
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
    const [countries, setCountries] = useState<any>([]);
    useEffect(() => {
        // Get full data list
        CountriesService.list().then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setCountries(() => {
                    return data.map((item: any) => ({
                        label: item.name + ' - ' + item.iso3 + ' (' + item.numeric_code + ') ' + ' -  [' + item.id + ']',
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    /**
     * Display the catalog
     */
    return <>

        <div className="card">

            {/** Message toaster display */}
            <Toast ref={toast} />

            <Messages ref={msg} onRemove={doMsgRemove} />



            <h3>{type === 0 ? 'Création' : 'Modification'} d'une Localisation</h3>
            <hr />

            <BlockUI blocked={blockedFrom}>
                <form
                    id="formId"
                    ref={formRef}
                    onSubmit={onSubmit}
                    className="p-fluid"
                >
                    <div className="col-12">


                        {/** Location */}
                        <FieldInputText
                            id="location"
                            name='location'
                            title='Localisation'
                            value={initialData.location}
                            error={formState.errors?.location}
                            placeholder="Code..."
                            tooltip="code d'identification ..."
                        />

                        {/** Designation */}
                        <FieldInputText
                            id="designation"
                            name='designation'
                            title='Designation'
                            value={initialData.designation}
                            error={formState.errors?.designation}
                            placeholder="Désignation..."
                            tooltip="désignation associée..."
                        />

                        {/** Group */}
                        <FieldInputText
                            id="group"
                            name='group'
                            title='Groupe'
                            value={initialData.group}
                            error={formState.errors?.group}
                            placeholder="Groupe..."
                            tooltip="grouper via un nom..."
                        />

                        {/** Country */}
                        <FieldDropDown
                            id='country'
                            name="country"
                            title='Pays'
                            value={initialData.country}
                            options={countries}
                            onChange={(e: any) => { onChangedCountry(e) }}
                            error={formState.errors?.country}
                            placeholder="Pays ..."
                            tooltip="Sélectionner un pays..."
                        />




                        {/** Country */}
                        {/* <DropDownCountries
                            id='country'
                            name="country"
                            title='Pays'
                            handleOnchange={(e: any) => { onChangedCountry(e) }}
                            value={initialData.country}
                            formState={formState}
                        /> */}



                        {/** State */}
                        {countryOn ?
                            <DropDownStates
                                id='state'
                                name="state"
                                title='Etat/Province'
                                country={initialData.country}
                                handleOnchange={(e: any) => { onChangedState(e) }}
                                value={initialData.state}
                                formState={formState}
                            />
                            : ''}


                        {/** City */}
                        {(stateOn && countryOn) ?
                            <DropDownCities
                                id='city'
                                name="city"
                                title='Ville'
                                country={initialData.country}
                                state={initialData.state}
                                handleOnchange={(e: any) => { onChangedCity(e) }}
                                value={initialData.city}
                                formState={formState}
                            />
                            : ''}





                        {/** address */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="address" className="input-field">
                                    Adresse
                                </label>
                            </div>

                            <InputText id="address"
                                name='address'
                                value={initialData.address}
                                // onChange={onChangedInput}
                                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.address ? 'p-invalid' : '')}

                                placeholder="ex: rue de la devanture..."
                                // required
                                tooltip="Correspond à la totalité ou partie de la rue, avenue..."
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.address
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.address?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>
                        </div>


                        {/** address1 */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="address1" className="input-field">
                                    Adresse suite 1
                                </label>
                            </div>

                            <InputText id="address1"
                                name='address1'
                                value={initialData.address1}
                                // onChange={onChangedInput}
                                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.address1 ? 'p-invalid' : '')}

                                placeholder="ex: derrière la rue du chêne..."
                                // required
                                tooltip="Complément d'infos sur l'adresse..."
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.address1
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.address1?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>
                        </div>


                        {/** address3 */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="address3" className="input-field">
                                    Adresse suite 2
                                </label>
                            </div>

                            <InputText id="address3"
                                name='address3'
                                value={initialData.address3}
                                // onChange={onChangedInput}
                                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.address3 ? 'p-invalid' : '')}

                                placeholder="ex: entre les palmiers..."
                                // required
                                tooltip="Complément d'informations sur l'adresse..."
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.address3
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.address3?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>
                        </div>



                        {/** bloc */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="bloc" className="input-field">
                                    Bloc
                                </label>
                            </div>

                            <InputText id="bloc"
                                name='bloc'
                                value={initialData.bloc}
                                // onChange={onChangedInput}
                                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.bloc ? 'p-invalid' : '')}

                                placeholder="Bloc ex: 3 ou 3B ..."
                                // required
                                tooltip="Bloc ou bâtiment dans un lotissement ou parc industriel..."
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.bloc
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.bloc?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>
                        </div>


                        {/** floor */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="floor" className="input-field">
                                    Étage
                                </label>
                            </div>

                            <InputNumber id="floor"
                                name='floor'
                                value={initialData.floor}
                                // onChange={onChangedInput}
                                className='col-12 md:col-5   ml-0 mb-2 input-value'

                                placeholder="ex: 3"
                                // required={entity.}
                                tooltip="Numéro d'étage ou de plateau"
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.floor
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.floor?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>
                        </div>


                        {/** number */}
                        <div className="grid mb-2">
                            <div className='col-12 md:col-2'>
                                <label htmlFor="number" className="input-field">
                                    Numéro
                                </label>
                            </div>

                            <InputText id="number"
                                name='number'
                                value={initialData.number}
                                // onChange={onChangedInput}
                                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.number ? 'p-invalid' : '')}

                                placeholder="ex: 6B ou 3, 3A..."
                                // required
                                tooltip="Numéro de porte"
                                tooltipOptions={{ position: 'top' }}
                            />

                            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                                {
                                    formState.errors?.number
                                    && <div className="text-red-500">
                                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                                        {formState.errors?.number?.join(', ')} {/* // Display form errors related to the title field*/}
                                    </div >
                                }
                            </div>


                        </div>












                        {/** Command options */}
                        <ButtonBarCreate
                            // onSaveClick={onSubmit}
                            onCancelClick={onCancel}
                            onModeChanged={e => handleModeChanged(e)}
                        />

                    </div>
                </form>
            </BlockUI>

            {/* Display last record */}
            <OutputRecord catalog={catalog} loading={lazyLoading} />

        </div>


    </>
}