// this is a client component
'use client'


import { useEffect, useRef, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"
import { DataTableFilterMeta } from "primereact/datatable"
import { PersistencesModel } from "@/src/obi/models/persistences/PersistencesModel"
import { PersistencesService } from "@/src/obi/service/persistences/PersistencesService"


// Define the props that the PostForm component expects
interface PersistencesDropDownProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown
    value: any;
    onChanged?: (e: any) => void;       // The callback function to be called when the value changes

    error?: any; // child of formState ex: formState.erros?.location

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip
}



export default function PersistencesDropDown({
    id,
    name,
    title,
    value,
    onChanged,
    error,
    placeholder = 'Sélectionner ...',
    tooltip = 'Sélectionner une persistence',
    tooltipOptions
}: PersistencesDropDownProps) {


    /**
     * Modling of country
     */
    const persistencesModel = new PersistencesModel();
    const defaultFilters: Array<DataTableFilterMeta> = PersistencesService.defaultFilters();
    const [lazyParams, setLazyParams] = useState(
        persistencesModel.
            getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'method', order: 1 }], defaultFilters));

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
        // if (initCatalog === false) {
        //     // PersistencesService.count().then((count) => {
        //     // const _catalogs = Array.from({ length: count });
        //     const _catalogs = Array.from({ length: 100000 });
        //     const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
        //     // Get Lazy Data
        //     PersistencesService.getLazy(lazyEventSet).then((data: any) => {
        //         console.log(data);
        //         for (let i = lazyParams.first; i < lazyParams.rows; i++) {
        //             _catalogs[i] = {
        //                 label: data[i].tags.name + '(' + data[i].tag + ') - ' + data[i].pers_method.name + '(' + data[i].method + ') ' + ' -  [' + data[i].id + ']',
        //                 value: data[i].id,
        //                 catalogs: data[i]
        //             };
        //         }
        //         setCatalogs(_catalogs);
        //         setLazyLoading(false);
        //     });
        //     // });
        //     setInitCatalog(true);

        // }
        // setSelectedCatalog(value);
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
        doLazyLoad();
    }, [lazyParams]);


    const doLazyLoad = () => {
        console.log('useEffect reload');
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Get Preset Data
            let _catalogs = Array.from({ length: 100000 });

            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            PersistencesService.getLazy(lazyEventSet).then((data: any) => {
                console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].tags.name + '(' + data[i].tag + ') - ' + data[i].pers_method.name + '(' + data[i].method + ') ' + ' -  [' + data[i].id + ']',
                        value: data[i],
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
    }











    return <>

        <div className="grid mb-2">
            {title ?
                <div className='col-12 md:col-2'>
                    <label htmlFor={id} className="input-field">
                        {title}
                    </label>
                </div>
                : null}

            <Dropdown
                id={id}
                name={name}
                value={selectedCatalog}

                options={catalogs}
                onChange={onChangeCatalog}
                className={'col-12 md:col-5  p-0 mb-0 input-value ' + (error ? 'p-invalid' : '')}

                placeholder={placeholder}
                tooltip={tooltip}
                tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}

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

            <div className={'col-12 md:col-4 p-0 m-0 ml-2 text-left align-content-center'}>
                {
                    error
                    &&
                    <div className="text-red-500">
                        <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;
                        {error?.join(', ')} {/* // Display form errors related to the title field*/}
                    </div >
                }
            </div>

        </div>

    </>
}
