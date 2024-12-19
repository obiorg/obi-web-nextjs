// src/components/post-form.tsx

// this is a client component
'use client'

import { useFormState } from "react-dom"
import { LocationsModel } from "@/src/obi/models/localisations/LocationsModel"
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"

import { OBI } from "@/src/types"



import { Messages } from "primereact/messages"
import { LocationsService } from "@/src/obi/service/localisat/LocationsService"
import { BlockUI } from "primereact/blockui"
import OutputRecord from "@/src/obi/components/Output/OutputRecord"
import ButtonBarCreate from "@/src/obi/components/Validations/ButtonBarCreate"
import FieldInputText from "@/src/obi/components/Inputs/FieldInputText"
import FieldDropDown from "@/src/obi/components/Inputs/FieldDropDown"
import { LocationsStatesModel } from "@/src/obi/models/localisations/LocationsStatesModel"
import { LocationsCitiesModel } from "@/src/obi/models/localisations/LocationsCitiesModel"
import FieldInputNumber from "@/src/obi/components/Inputs/FieldInputNumber"
import FieldInputCheckbox from "@/src/obi/components/Inputs/FieldInputCheckbox"
import FieldLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import FieldOutputLabel from "@/src/obi/components/Inputs/FieldOutputLabel"
import { useRouter } from "next/navigation"
import DialogError from "@/src/obi/components/Dialog/DialogError"
import { DataTableFilterMeta } from "primereact/datatable"
import { LocationsCitiesService } from "@/src/obi/service/localisat/LocationsCitiesService"
import { LocationsStatesService } from "@/src/obi/service/localisat/LocationsStatesService"


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
        created: Date;
        changed: Date;

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
    const toast = useRef<any>(null);
    const msg = useRef<any>(null);

    // Managing long request wating
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    let loadLazyTimeout:any = undefined;


    // Sub state dropdown selection
    const [countryOn, setCountryOn] = useState(initialData?.country !== undefined ? true : false);
    const [stateOn, setStateOn] = useState(initialData?.state ? true : false);

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
    const formRef = React.useRef(document.createElement('form'));
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


    const onChangedCountry = (e: any) => {
        initialData.country = e.value
        if (initialData?.country !== undefined) {
            setCountryOn(true);
            // LocationsStatesService.count().then((count: any) => {
            //     setLazyParamsStates(
            //         () => {
            //             return {
            //                 ...lazyParamsStates,
            //                 filters: {
            //                     "global": { value: null, matchMode: 'contains' },
            //                     "country_id": { operator: 'and', constraints: [{ value: e.value, matchMode: 'equals' }] }
            //                 },
            //                 rows: count,
            //             }
            //         }
            //     );
            // });
        } else {
            setCountryOn(false);
        }
    }

    const onChangedState = (e: any) => {
        initialData.state = e.value
        if (initialData?.state !== undefined) {
            setStateOn(true);
            // CitiesService.count().then((count: any) => {
            //     setLazyParamsCities(
            //         () => {
            //             return {
            //                 ...lazyParamsCities,
            //                 filters: {
            //                     "global": { value: null, matchMode: 'contains' },
            //                     "country_id": { operator: 'and', constraints: [{ value: initialData?.country, matchMode: 'equals' }] },
            //                     "state_id": { operator: 'and', constraints: [{ value: e.value, matchMode: 'equals' }] }
            //                 },
            //                 rows: count,
            //             }
            //         }
            //     );
            // });
        } else {
            setStateOn(false);
        }
    }

    const onChangedCity = (e: any) => {
        initialData.city = e.value
        if (initialData?.city !== undefined) {
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


    useEffect(() => {
        // console.log(initialData)
        if (initialData?.country) {
            setCountryOn(true);
        }
        if (initialData?.state) {
            setStateOn(true);
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
                LocationsService.create(formState, formData).then((data: any) => {
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
                LocationsService.update(formState, formData).then((data: any) => {
                    if (data.errors) {
                        formState.errors = { errors: {} };
                        formState.errors = data.errors;
                        doMsgPrompt('error', 'Erreur de modification : ', 'Veuillez corriger les erreurs')
                    } else {
                        formState.errors = { errors: {} };
                        setCatalog(data);
                        showSuccess('Modification réussie!', data.location + '-' + data.designation + '[' + data.id + ']');
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
        initialData.city = undefined;
        initialData.state = undefined;
        initialData.country = undefined;
        setStateOn(false);
        setCountryOn(false);
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
    const [reload, setReload] = useState(false);
    useEffect(() => {
        // Get full data list
        // CountriesService.list().then((data: any) => {
        //     if (data.status) {
        //         showError(data.status, data.message);
        //     } else {
        //         setCountries(() => {
        //             return data.map((item: any) => ({
        //                 label: item.name + ' - ' + item.iso3 + ' (' + item.numeric_code + ') ' + ' -  [' + item.id + ']',
        //                 value: item.id,
        //                 catalog: item
        //             }));
        //         });
        //     }
        // });
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps


    /**
     * States catalog update list
     */
    const [states, setStates] = useState<any>([]);
    const stateModel = new LocationsStatesModel();
    const defaultFiltersStates: Array<DataTableFilterMeta> = LocationsStatesService.defaultFilters();
    const [lazyParamsStates, setLazyParamsStates] = useState(
        stateModel.getStandardParam({ field: 'name', order: 1 },
            {
                ...defaultFiltersStates,
                // "global": { value: null, matchMode: 'contains' },
                "country_id": { operator: 'and', constraints: [{ value: initialData?.country, matchMode: 'equals' }] }
            }, 0
        ));


    const [dlgError, setDlgError] = useState<any>();
    useEffect(() => {
        const lazyEventSet = { lazyEvent: JSON.stringify(lazyParamsStates) };
        console.log(lazyParamsStates);
        // Get full data list
        LocationsStatesService.getLazy(lazyEventSet).then((data: any) => {
            if (data.status && data.status !== 200) {
                setDlgError(data);
                return;
            } else {
                setStates(() => {
                    return data.map((item: OBI.loc_states) => ({
                        label: item.name + ' (' + item.iso2 + ') - ' + item.country_code + ' -  [' + item.id + ']',
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });
    }, [lazyParamsStates]);


    /**
     * States catalog update list
     */
    const [cities, setCities] = useState<any>([]);
    const cityModel = new LocationsCitiesModel();
    const defaultFiltersCities: Array<DataTableFilterMeta> = LocationsCitiesService.defaultFilters();
    const [lazyParamsCities, setLazyParamsCities] = useState(
        cityModel.getStandardParam({ field: 'name', order: 1 },
            {
                ...defaultFiltersCities,
                "country_id": { operator: 'and', constraints: [{ value: initialData?.country, matchMode: 'equals' }] },
                "state_id": { operator: 'and', constraints: [{ value: initialData?.state, matchMode: 'equals' }] }
            }, 0
        ));
    useEffect(() => {
        const lazyEventSet = { lazyEvent: JSON.stringify(lazyParamsCities) };

        // Get full data list
        // CitiesService.getLazy(lazyEventSet).then((data: any) => {
        //     if (data.status) {
        //         showError(data.status, data.message);
        //     } else {
        //         setCities(() => {
        //             // console.log('cities', data)
        //             return data?.map((item: OBI.loc_cities) => ({
        //                 label: item.name + ' (' + item.state_code + ') - ' + item.country_code + ' -  [' + item.id + ']',
        //                 value: item.id,
        //                 catalog: item
        //             }));
        //         });
        //     }
        // });
    }, [lazyParamsCities]);





    /**
     * Display the catalog
     */
    return <>
        <DialogError
            error={dlgError}
            onYes={(e: any) => {
                setReload((reload: any) => { return { ...reload } })
                setLazyParamsStates((lazyParamsStates: any) => { return { ...lazyParamsStates } })
                setLazyParamsCities((lazyParamsCities: any) => { return { ...lazyParamsCities } })
            }}
        />
        <div className="card">

            {/** Message toaster display */}
            <Toast ref={toast} />

            <Messages ref={msg} onRemove={doMsgRemove} />



            <h3>{type === 0 ? 'Création' : 'Modification'} d une Localisation</h3>
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

                        {/** Designation */}
                        <FieldInputText
                            id="designation"
                            name='designation'
                            title='Designation'
                            value={initialData?.designation}
                            error={formState.errors?.designation}
                            placeholder="Désignation..."
                            tooltip="désignation associée..."
                        />

                        {/** Group */}
                        <FieldInputText
                            id="group"
                            name='group'
                            title='Groupe'
                            value={initialData?.group}
                            error={formState.errors?.group}
                            placeholder="Groupe..."
                            tooltip="grouper via un nom..."
                        />

                        {/** Country */}
                        <FieldDropDown
                            id='country'
                            name="country"
                            title='Pays'
                            value={initialData?.country}
                            options={countries}
                            onChange={(e: any) => { onChangedCountry(e) }}
                            error={formState.errors?.country}
                            placeholder="Pays ..."
                            tooltip="Sélectionner un pays..."
                        />

                        {/** State */}
                        <FieldDropDown
                            id='state'
                            name="state"
                            title='Etat/Province'
                            value={initialData?.state}
                            options={states}
                            onChange={(e: any) => { onChangedState(e) }}
                            error={formState.errors?.state}
                            placeholder="Etat\Province ..."
                            tooltip="Sélectionner un\une état\province..."
                            render={countryOn}
                        />

                        {/** City */}
                        <FieldDropDown
                            id='city'
                            name="city"
                            title='Ville'
                            value={initialData?.city}
                            options={cities}
                            onChange={(e: any) => { onChangedCity(e) }}
                            error={formState.errors?.city}
                            placeholder="Ville ..."
                            tooltip="Sélectionner une ville..."
                            render={stateOn}
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