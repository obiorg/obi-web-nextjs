// this is a client component
'use client'


import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"


import { OBI } from "@/src/types"
import { Dropdown } from "primereact/dropdown"
import { CountriesService } from "@/src/obi/service/Localisations/CountriesService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { Skeleton } from "primereact/skeleton"
import { LocationsCountriesModel } from "@/src/obi/models/localisations/LocationsCountriesModel"
import { DataTableFilterMeta } from "primereact/datatable"


// Define the props that the PostForm component expects
interface CountriesDropDownProps {
    // id: string;                         // ID of the component
    // name: string;                       // Name of the component
    // title: string;                      // preceding title of dropdown
    value: any;
    onChanged?: (e: any) => void;       // The callback function to be called when the value changes

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip
}



export default function CountriesDropDown({
    // id, name, title, 
    value,
    onChanged,
    placeholder, tooltip, tooltipOptions
}: CountriesDropDownProps) {


    /**
     * Modling of country
     */
    const countriesModel = new LocationsCountriesModel();
    const defaultFilters: Array<DataTableFilterMeta> = CountriesService.defaultFilters();
    const [lazyParams, setLazyParams] = useState(
        countriesModel.
            getStandardParam({ field: 'name', order: 1 }, defaultFilters));

    /**
     * Managing catlog
     */
    const [selectedCatalog, setSelectedCatalog] = useState<any>(value);
    const [catalogs, setCatalogs] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState(true);
    const [initCatalog, setInitCatalog] = useState(false);
    const [currentValue, setCurrentValue] = useState();


    let loadLazyTimeout = useRef(null);



    /**
     * Restaure data on init
     */
    useEffect(() => {
        if (initCatalog === false) {
            // CountriesService.count().then((count) => {
            // const _catalogs = Array.from({ length: count });
            const _catalogs = Array.from({ length: 100000 });
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            // Get Lazy Data
            CountriesService.getLazy(lazyEventSet).then((data: any) => {
                for (let i = lazyParams.first; i < lazyParams.rows; i++) {
                    _catalogs[i] = {
                        label: data[i].name + ' - ' + data[i].iso3 + ' (' + data[i].numeric_code + ') ' + ' -  [' + data[i].id + ']',
                        value: data[i].id,
                        catalogs: data[i]
                    };
                }
                setCatalogs(_catalogs);
                setLazyLoading(false);
            });
            // });
            setInitCatalog(true);

        }
        setSelectedCatalog(value);
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps


    const onChangeCatalog = (e: { value: any }) => {
        console.log('onLazyItemChange', e);
        setSelectedCatalog(e.value)
        onChanged && onChanged(e);
    }

    const onChangedFilter = (e: any) => {

        let _lazyParams = lazyParams;
        _lazyParams.filters.global.value = e.filter === '' ? null : e.filter;
        _lazyParams.filters.global.matchMode = 'contains';
        setLazyParams(() => { return { ..._lazyParams } });
        // console.log('onChangedFilter', e, lazyParams);

    }

    /**
     * Fetch data asynchronously
     * @param e first, last, filter 
     */
    const onLazyLoad = (e: any) => {
        // Prépare lazy parameters Set
        const { first, last, filter } = e;
        let _lazyParams = lazyParams;
        _lazyParams.first = first;
        _lazyParams.rows = last;
        _lazyParams.filters.global.value = filter === '' ? null : filter;
        _lazyParams.filters.global.matchMode = 'contains';
        setLazyParams(() => { return { ..._lazyParams } });
        // console.log('onLazyLoad', e, lazyParams);
    }

    /**
     * Main data effect depending on lazyParams
     */
    useEffect(() => {
        console.log('useEffect reload');
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Get Preset Data
            // let _catalogs = [...catalogs];
            let _catalogs = Array.from({ length: 100000 });

            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            CountriesService.getLazy(lazyEventSet).then((data: any) => {
                console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].name + ' - ' + data[i].iso3 + ' (' + data[i].numeric_code + ') ' + ' -  [' + data[i].id + ']',
                        value: data[i].id,
                        catalogs: data[i]
                    };
                }
                if (data.length < lazyParams.rows) {
                    _catalogs = _catalogs.slice(0, lazyParams.rows);
                }
                setCatalogs(_catalogs);
                setLazyLoading(false);
            });

        }, Math.random() * 1000 + 250);
    }, [lazyParams]);














    return <>

        <Dropdown
            // id="countries-dropdown"
            // name="countries-dropdown"
            value={selectedCatalog}

            options={catalogs}
            onChange={onChangeCatalog}
            placeholder="Sélectionner un pays..."
            showClear
            filter
            onFilter={onChangedFilter}
            showFilterClear
            emptyFilterMessage="Recherche sans résultat..."
            emptyMessage="Vide !"

            // loading={lazyLoading}
            virtualScrollerOptions={
                {
                    lazy: true,
                    onLazyLoad: onLazyLoad,
                    itemSize: 28,
                    showLoader: true,
                    loading: lazyLoading,
                    delay: 250,
                    loadingTemplate: (options) => {
                        return (
                            <div className="flex align-items-center p-2" style={{ height: '28px' }}>
                                <Skeleton width={options.even ? '60%' : '50%'} height="0.5rem" />
                            </div>
                        )
                    }
                }}
        />

    </>
}
