// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { LocationsStatesModel } from "@/src/obi/models/localisations/LocationsStatesModel"
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
import { StatesService } from "@/src/obi/service/Localisations/StatesService"

const model = new LocationsStatesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function DropDownStates({ formAction, type, initialData }: OBI.StatesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.StatesFormState>(formAction, {
        errors: {},
    })

    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dialog
    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    // Used for dropdown list states
    
    let loadLazyTimeout: number | undefined = 0;
    const [loading, setLoading] = useState(false);
    const [lazyItemsCatalogs, setLazyItemsCatalogs] = useState<any>([]);
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
            if (name === 'state') {
                obj = lazyItemsCatalogs[value];
                // console.log('company', lazyItemsCompanies[value])
            } else {
                // obj = lazyItemsCatalogs[value];
                // console.log('driver', lazyItemsCatalogs[value]);
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

    
    const loadLazyDataCatalogs = () => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {

            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            StatesService.getLazy(lazyEventSet).then((data: any) => {

                if (data?.length > 0) {
                    let _lazyItems = [data];
                    for (let i = lazyParams.first; i < data.length; i++) {
                        _lazyItems[i] = {
                            label: data[i].name + ' (' + data[i].iso2 +')' + ' - ' + data[i].country_code + ' -  [' + data[i].id + ']',
                            value: i,
                            entity: data[i]
                        };
                    }

                    setLazyItemsCatalogs(_lazyItems);
                }
                setLazyLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };

    const onLazyLoadCatalogs = (event: any) => {
        lazyParams.first = event.first;
        lazyParams.rows = event.last === 0 ? 10 : event.last - event.first;
        loadLazyDataCatalogs();
        // setLazyLoading(false);
    };

    // useEffect(() => {
    //     loadLazyDataCatalogs();
    //     // setLazyLoading(false);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return <>




        {/** Catalogs */}
        <div className="grid mb-2">
            <div className='col-12 md:col-2'>
                <label htmlFor="state" className="input-field">
                    Province
                </label>
            </div>

            <Dropdown id='state'
                name='state'
                value={initialData.state}
                options={lazyItemsCatalogs}
                className='col-12 md:col-5  mb-2 input-value'

                onChange={onChangedDropDown} virtualScrollerOptions={{
                    lazy: true, onLazyLoad: onLazyLoadCatalogs,
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
                    formState.errors.state
                    && <div className="text-red-500">
                        {formState.errors.state?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }
            </div>
        </div>






    </>
}