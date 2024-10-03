// this is a client component
'use client'


import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"


import { OBI } from "@/src/types"
import { Dropdown } from "primereact/dropdown"
import { CountriesService } from "@/src/obi/service/Localisations/CountriesService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"


// Define the props that the PostForm component expects
interface LocationsCountriesDropDownProps {
    id: string;                         // ID of the component
    name: string;                       // Name of the component
    title: string;                      // preceding title of dropdown
    value: any;
    handleOnchange?: (e: any) => void; // The callback function to be called when the value changes
    formState: OBI.LocationsCountriesFormState; // The form state

    placeholder?: string; // placeholder
    tooltip?: string; // tooltip text
    tooltipOptions?: any; // options for tooltip
}



export default function DropDownCountries({ 
    id, name, title, value, 
    handleOnchange, formState , 
    placeholder, tooltip, tooltipOptions}: LocationsCountriesDropDownProps) {

    // Used for toast
    const toast = useRef<Toast>(null);

    // Used for dropdown list catalog
    const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
    const [catalogs, setCatalogs] = useState<any>([]);

    // Use to refresh the dropdown list
    const [refresh, setRefresh] = useState(false);

    /**
     * Collect the catalogs and prepare the display
     */
    useEffect(() => {
        // Get full data list
        CountriesService.list().then((data: any) => {
            if (data.status) {
                showError(data.status, data.message);
            } else {
                setCatalogs(() => {
                    return data.map((item: OBI.loc_countries) => ({
                        label: item.name + ' - ' + item.iso3 + ' (' + item.numeric_code + ') ' + ' -  [' + item.id + ']',
                        value: item.id
                    }));
                });
            }
        });
        // Initialize once default selected catalog
        setSelectedCatalog(value);
    }, [value, refresh]); // eslint-disable-line react-hooks/exhaustive-deps



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
                placeholder="Sélectionner un pays..."
                className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (formState.errors?.country ? 'p-invalid' : '')}
                showClear
                filter
                showFilterClear
                emptyFilterMessage="Recherche sans résultat..."
                emptyMessage="Vide !"
            />

            <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                {
                    formState.errors?.country
                    &&
                    <div className="text-red-500">
                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                        {formState.errors?.country?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }

            </div>
        </div>
    </>
}
