// this is a client component
'use client'


import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"


import { OBI } from "@/src/types"
import { Dropdown } from "primereact/dropdown"
import { CompaniesService } from "@/src/obi/service/businesses/CompaniesService"
import { Skeleton } from "primereact/skeleton"
import { CompaniesModel } from "@/src/obi/models/businesses/CompaniesModel"
import { DataTableFilterMeta } from "primereact/datatable"
import ReactIcons from "@/src/obi/components/Icons/ReactIcons"


// Define the props that the PostForm component expects
interface CompaniesDropDownProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown

    value: any;
    onChanged?: (e: any) => void;       // The callback function to be called when the value changes


    error?: any; // child of formState ex: formState.erros?.location

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip

    emptyFilterMessage?: string; //
    emptyMessage?: string; // Message to display when no items are found
    render?: boolean; //
}



export default function CompaniesDropDown({
    id, name, title,
    value,
    onChanged,
    error,
    placeholder = "Rechercher ...'",
    tooltip, tooltipOptions,
    emptyFilterMessage = "Recherche sans résultat...",
    emptyMessage = 'vide !',
    render = true,
}: CompaniesDropDownProps) {


    const model = new CompaniesModel();
    const defaultFilters: Array<DataTableFilterMeta> = CompaniesService.defaultFilters();
    const [lazyParams, setLazyParams] = useState(
        model.
            getStandardParam({ field: 'company', order: 1 }, defaultFilters));

    // catalog processing
    const [selectedCatalog, setSelectedCatalog] = useState<any>(value);
    const [catalogs, setCatalogs] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState(true);
    const [initCatalog, setInitCatalog] = useState(false);


    let loadLazyTimeout = useRef(null);



    /**
     * Restaure data on init
     */
    useEffect(() => {
        // if (initCatalog === false) {
        //     const _catalogs = Array.from({ length: 100000 });
        //     const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
        //     // Get Lazy Data
        //     CompaniesService.getLazy(lazyEventSet).then((data: any) => {
        //         for (let i = lazyParams.first; i < lazyParams.rows; i++) {
        //             _catalogs[i] = {
        //                 label: data[i].company + ' - ' + data[i].designation + ' [' + data[i].id + ']',
        //                 value: data[i].id,
        //                 catalogs: data[i]
        //             };
        //         }
        //         setCatalogs(_catalogs);
        //         setLazyLoading(false);
        //     });
        //     setInitCatalog(true);
        // }
    }, [value]);


    const onChangeCatalog = (e: { value: any }) => {
        // console.log('onLazyItemChange', e);
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
     * 
     * 
     */
    const loadCatalogs = () => {
        // console.log('useEffect reload');
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
            CompaniesService.getLazy(lazyEventSet).then((data: any) => {
                console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].company + ' - ' + data[i].designation + ' [' + data[i].id + ']',
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
    };

    /**
     * Main data effect depending on lazyParams
     */
    useEffect(() => {
        loadCatalogs();
    }, [lazyParams]);














    return <>
        {render !== true ? <></> :
            <div className="grid mb-2">
                <div className='col-12 md:col-2'>
                    <label htmlFor={id} className="input-field">
                        {title}
                    </label>
                </div>
                <Dropdown
                    value={selectedCatalog}

                    options={catalogs}
                    onChange={onChangeCatalog}

                    className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}
                    placeholder="Sélectionner une société..."
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

                <div className={'col-12 md:col-4 p-0 m-0 text-left align-content-center'}>
                    {
                        error
                        &&
                        <div className="text-red-500">
                            <ReactIcons group="bi" icon="BiSolidCommentError"
                            /> &nbsp;
                            {error?.join(', ')} {/* // Display form errors related to the title field*/}
                        </div >
                    }
                </div>

            </div>
        }
    </>
}
