// this is a client component
'use client'


import { Toast } from "primereact/toast"
import { lazy, useEffect, useRef, useState } from "react"


import { OBI } from "@/src/types"
import { Dropdown } from "primereact/dropdown"
import { CitiesService } from "@/src/obi/service/localisations/CitiesService"
import { LocationsCitiesModel } from "@/src/obi/models/localisations/LocationsCitiesModel"

import { Model } from "@/src/obi/models/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"




// Define the props that the PostForm component expects
interface LocationsCitiesDropDownProps {
    id: string;                         // ID of the component
    name: string;                       // Name of the component
    title: string;                      // preceding title of dropdown
    country: number;                    // Number of countries
    state: number;                      // Number of states
    value: any;
    handleOnchange: (e: any) => void; // The callback function to be called when the value changes
    formState: OBI.LocationsFormState; // The form state
}

const model = new LocationsCitiesModel();

export default function DropDownStates({ id, name, title, country, state, value, handleOnchange, formState }: LocationsCitiesDropDownProps) {



    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dropdown list catalog
    const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
    const [catalogs, setCatalogs] = useState<any>([]);

    const globalModel = new Model();
    const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam({ field: 'name', order: 1 },
        {   "global": { value: null, matchMode: 'contains' }, 
            "country_id": { operator: 'and', constraints: [{ value: country, matchMode: 'equals' }] },
            "state_id": { operator: 'and', constraints: [{ value: state, matchMode: 'equals' }] }
        }
    ));




    useEffect(() => {

        CitiesService.count().then((count: any) => {
            setLazyParams(
                () => {
                    return {
                        ...lazyParams,
                        filters: {
                            "global": { value: null, matchMode: 'contains' },
                            "country_id": { operator: 'and', constraints: [{ value: country, matchMode: 'equals' }] },
                            "state_id": { operator: 'and', constraints: [{ value: state, matchMode: 'equals' }] }
                        },
                        rows: count,

                    }
                }
            );
        });
        // Initialize once default selected catalog
        setSelectedCatalog(value);
    }, [country, state]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

        // Get full data list
        CitiesService.getLazy(lazyEventSet).then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setCatalogs(() => {
                    return data.map((item: OBI.loc_cities) => ({
                        label: item.name + ' (' + item.state_code + ') - ' + item.country_code + ' -  [' + item.id + ']',
                        value: item.id,
                        catalog: item
                    }));
                });
            }
        });
    }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeCatalog = (e: any) => {
        handleOnchange(e);
        setSelectedCatalog(e.value);
    }


    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message, sticky: true, closable: false });
    }

    return <>
        <Toast ref={toast} />

        {/** Catalogs */}
        <div className="grid mb-2">
            <div className='col-12 md:col-2'>
                <label htmlFor={name} className="input-field">
                    {title}
                </label>
            </div>

            <Dropdown
                id={id}
                name={name}
                value={selectedCatalog}
                options={catalogs}
                onChange={onChangeCatalog}
                placeholder="Sélectionner une ville..."
                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.city ? 'p-invalid' : '')}
                showClear
                filter
                showFilterClear
                emptyFilterMessage="Recherche sans résultat..."
                emptyMessage="Vide !"
            />

            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                {
                    formState.errors?.city
                    &&
                    <div className="text-red-500">
                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                        {formState.errors?.city?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }

            </div>
        </div>
    </>
}
