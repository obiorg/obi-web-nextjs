// src/components/post-form.tsx

// this is a client component
'use client'

import Link from "next/link"
import { useFormState } from "react-dom"
import { LocationsCountriesModel } from "@/src/obi/models/localisations/LocationsCountriesModel"
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
import { CountriesService } from "@/src/obi/service/Localisations/CountriesService"
import { AutoComplete } from "primereact/autocomplete"

const model = new LocationsCountriesModel();




// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function DropDownCountries({ formAction, type, initialData }: OBI.CountriesPostFormProps) {
    // Initialize the form state and action
    const [formState, action] = useFormState<OBI.CountriesFormState>(formAction, {
        errors: {},
    })


    const [lazyItems, setLazyItems] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState<any>(false);
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [selectedCity2, setSelectedCity2] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [selectedGroupedCity, setSelectedGroupedCity] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [selectedItem2, setSelectedItem2] = useState<any>(null);
    const [filteredCountries, setFilteredCountries] = useState<any>(null);

    const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));



    const globalModel = new Model();
    const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam());

    let loadLazyTimeout = useRef(null);


    const toast = useRef(null);
    const showError = (title: string, message: string) => {
        toast.current.show({ severity: 'error', summary: title, detail: message });
    }

    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }));
        CountriesService.count().then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setLazyItems(Array.from({ length: data }));
            }
        });

        // const _lazyItems: any = [];
        // const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };



    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const searchCountry = (event: { query: string }) => {
        setTimeout(() => {
            let _filteredCountries;
            if (!event.query.trim().length) {
                _filteredCountries = [...lazyItems];
            }
            else {
                _filteredCountries = lazyItems.filter((country: any) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredCountries(_filteredCountries);
        }, 250);
    }


    const onLazyLoad = (event: any) => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;

            // setLazyParams((lazyParams) => {
            //     return {
            //         ...lazyParams,
            //         multiSortMeta: [
            //             // { field: 'region', order: 0},
            //             { field: 'name', order: 0},
            //         ]
            //     }
            // })

            setLazyParams({

                multiSortMeta: [
                    // { field: 'region', order: 0},
                    { field: 'name', order: 0 },
                ]
            })

            console.log("first", first, "last", last);
            console.log(lazyParams);

            const firstNext = (first + 1) * lazyParams.rows;
            lazyParams["first"] = first;
            lazyParams["rows"] = last;
            console.log("lazyParams", lazyParams);
            // Create lazy event object with stringify lazy parameter
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            const _lazyItems = [...lazyItems];

            CountriesService.getLazy(lazyEventSet).then((data: OBI.loc_countries[]) => {
                console.log("first", first, "last", last);
                console.log('param first', lazyParams.first, 'param last', lazyParams.rows);

                for (let i = lazyParams.first; i < data.length; i++) {
                    _lazyItems[i] = {
                        label: data[i].name + ' - ' + data[i].iso3 + ' (' + data[i].numeric_code + ') ' + ' -  [' + data[i].id + ']',
                        value: i,
                        catalog: data[i]
                    };
                }
                console.log(_lazyItems);

            });
            setLazyItems(_lazyItems);
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    }


    function countryOptionTemplate(option: any) {
        return (
            <div className="country-item">
                {/* <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
                <div>{option.name}</div>
            </div>
        )
    }


    const itemTemplate = (item: any) => {
        return (
            <div className="country-item">
                {/* <img alt={item.name} src={`images/flag/flag_placeholder.png`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${item.code.toLowerCase()}`} /> */}
                <div>{item.label}</div>
            </div>
        );
    }


    return <>

        <Toast ref={toast} />
        {/** Countries */}
        <div className="grid mb-2">
            <div className='col-12 md:col-2'>
                <label htmlFor="country" className="input-field">
                    Pays
                </label>
            </div>


            <AutoComplete
                value={initialData.country}
                suggestions={filteredCountries}
                completeMethod={searchCountry}
                className='col-12 md:col-5  mb-2 input-value'
                field="name"
                dropdown
                forceSelection
                itemTemplate={itemTemplate}
                onChange={(e) => initialData.country = e.value}
                aria-label="Countries"
                dropdownAriaLabel="Sélectionner..."
                virtualScrollerOptions={{
                    lazy: true,
                    onLazyLoad: onLazyLoad,
                    itemSize: 38,
                    showLoader: true,
                    loading: lazyLoading,
                    delay: 250,
                    loadingTemplate: (options) => {
                        return (
                            <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                                <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                            </div>
                        )
                    }
                }}
            />



            {/* <Dropdown
                value={selectedItem2}
                options={lazyItems}
                onChange={onLazyItemChange}

                filter showClear
                filterBy="label"
                placeholder="Sélectionner ..."
                className='col-12 md:col-5  mb-2 input-value'
                virtualScrollerOptions={{
                    lazy: true,
                    onLazyLoad: onLazyLoad,
                    itemSize: 24,
                    showLoader: true,
                    loading: lazyLoading,
                    delay: 250,
                    loadingTemplate: (options) => {
                        return (
                            <div className="flex align-items-center p-2" style={{ height: '28px' }}>
                                <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                            </div>
                        )
                    }
                }}
            /> */}


            <div className={'col-12 md:col-4 p-0 m-0 text-left'}>
                {
                    formState.errors.country
                    && <div className="text-red-500">
                        {formState.errors.country?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }
            </div>
        </div>






    </>
}



{/* <Dropdown id='country'
                name='country'
                value={initialData.country}
                options={lazyItemsCatalogs}
                className='col-12 md:col-5  mb-2 input-value'

                onChange={onChangedDropDown}
                virtualScrollerOptions={{
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
                filter
                showClear
                filterBy="label"
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                placeholder="Sélectionner"
                // required
                tooltip='Specifier la localisation'
                tooltipOptions={{ position: 'top' }}
            /> */}







            
    // // Used for toast
    // const toast = useRef<Toast>(null);

    // // Used for dialog
    // const [showMessage, setShowMessage] = useState(false);
    // const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    // // Used for dropdown list locations

    // let loadLazyTimeout: number | undefined = 0;
    // const [loading, setLoading] = useState(false);
    // const [lazyItemsCatalogs, setLazyItemsCatalogs] = useState<any>([]);
    // const [lazyLoading, setLazyLoading] = useState<any>(false);
    // const [entity, setEntity] = useState(model.defaults);
    // const [dropdown, setDropDown] = useState({
    //     company: null,
    //     driver: null,
    // });
    // const globalModel = new Model();
    // const [lazyParams, setLazyParams] = useState(globalModel.getStandardParam());


    // const onChangedDropDown = (e: any) => {
    //     // Case of input text
    //     if (e.target) {
    //         const { name, value, checked } = e.target;
    //         initialData["country"] = value;
    //         console.log(initialData, name, value, checked);
    //         console.log("value", value);
    //         console.log("Lazy items vlaue", lazyItemsCatalogs[value]);
    //         console.log('country', initialData.country)

    //     }
    // };


    // const loadLazyDataCatalogs = () => {
    //     setLazyLoading(true);

    //     if (loadLazyTimeout) {
    //         clearTimeout(loadLazyTimeout);
    //     }

    //     //imitate delay of a backend call
    //     loadLazyTimeout = setTimeout(() => {

    //         // Create lazy event object with stringify lazy parameter
    //         const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

    //         const _lazyItems = [...lazyItemsCatalogs];

    //         // Get Lazy Data
    //         CountriesService.getLazy(lazyEventSet).then((data: any) => {

    //             if (data?.length > 0) {

    //                 for (let i = lazyParams.first; i < data.length; i++) {
    //                     _lazyItems[i] = {
    //                         label: data[i].name + ' - ' + data[i].iso3 + ' (' + data[i].numeric_code + ') ' + ' -  [' + data[i].id + ']',
    //                         value: i,
    //                         catalog: data[i]
    //                     };
    //                 }

    //                 setLazyItemsCatalogs(_lazyItems);
    //             }
    //             setLazyLoading(false);
    //         });
    //     }, Math.random() * 1000 + 250);
    // };

    // const onLazyLoadCatalogs = (event: any) => {
    //     lazyParams.first = event.first;
    //     lazyParams.rows = event.last === 0 ? 10 : event.last - event.first;
    //     loadLazyDataCatalogs();
    // };




    // // To allow filtering
    // const [filterValue, setFilterValue] = useState('');
    // const filterInputRef = useRef();

    // const countryOptionTemplate = (option: any) => {
    //     return (
    //         <div className="country-item">
    //             {/* <img alt={option.name} src="images/flag/flag_placeholder.png" 
    //             onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
    //                 className={`flag flag-${option.code.toLowerCase()}`} /> */}
    //             <div>{option.label}</div>
    //         </div>
    //     );
    // }
    // const selectedCountryTemplate = (option: { label: string, code: string }, props: { placeholder: string }) => {
    //     if (option) {
    //         return (
    //             <div className="country-item country-item-value">
    //                 {/* <img alt={option.label} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
    //                 <div>{option.label}</div>
    //             </div>
    //         );
    //     }

    //     return (
    //         <span>
    //             {props.placeholder}
    //         </span>
    //     );
    // }
