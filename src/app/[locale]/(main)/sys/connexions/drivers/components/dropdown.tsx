// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { EntitiesModel } from "@/src/obi/models/businesses/EntitiesModel"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

import { OBI } from "@/src/types"
import { Checkbox } from "primereact/checkbox"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"
import { Model } from "@/src/obi/models/model"
import { LocationsService } from "@/src/obi/service/Localisations/LocationsService"

const model = new EntitiesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function DropDownLocations({ formAction, type, initialData }: OBI.EntitiesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.EntitiesFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dialog
    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    // Used for dropdown list locations
    
    let loadLazyTimeout: number | undefined = 0;
    const [loading, setLoading] = useState(false);
    const [lazyItemsLocations, setLazyItemsLocations] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    const [entity, setEntity] = useState(model.defaults);
    const [dropdown, setDropDown] = useState({
        company: null,
        driver: null,
    });
    const globalModel = new Model();
    const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam());


    const onChangedDropDown = (e: any) => {
        // Case of input text
        if (e.target) {
            const { name, value, checked } = e.target;
            let obj = { entity: { id: null } };
            if (name === 'location') {
                obj = lazyItemsLocations[value];
                // console.log('company', lazyItemsCompanies[value])
            } else {
                // obj = lazyItemsLocations[value];
                // console.log('driver', lazyItemsLocations[value]);
            }

            // console.log('entityValue', obj.entity.id);
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

    
    const loadLazyDataLocations = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            LocationsService.getLazy(lazyEventSet).then((data: any) => {

                if (data?.length > 0) {
                    let _lazyItems = [data];
                    for (let i = lazyParams.first; i < data.length; i++) {
                        _lazyItems[i] = {
                            label: data[i].driver + ' - ' + data[i].designation + ' -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsLocations(_lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadLocations = (event: any) => {
        lazyParams.first = event.first;
        lazyParams.rows = event.last === 0 ? 10 : event.last - event.first;
        loadLazyDataLocations();
        // setLazyLoading(false);
    };

    // useEffect(() => {
    //     loadLazyDataLocations();
    //     // setLazyLoading(false);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return <>




        {/** Locations */}
        <div className="grid mb-2">
            <div className='col-12 md:col-2'>
                <label htmlFor="location" className="input-field">
                    Localisation
                </label>
            </div>

            <Dropdown id='location'
                name='location'
                value={initialData.location}
                options={lazyItemsLocations}
                className='col-12 md:col-5  mb-2 input-value'

                onChange={onChangedDropDown} virtualScrollerOptions={{
                    lazy: true, onLazyLoad: onLazyLoadLocations,
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
                tooltip='Specifier la localisation'
                tooltipOptions={{ position: 'top' }}
            />

            <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                {
                    formState.errors.location
                    && <div className="text-red-500">
                        {formState.errors.location?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }
            </div>
        </div>






    </>
}