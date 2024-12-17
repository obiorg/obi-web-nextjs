// this is a client component
'use client'


import { useEffect, useRef, useState } from "react"


import { PersistencesModel } from "@/src/obi/models/persistences/PersistencesModel"
import { PersistencesService } from "@/src/obi/service/persistences/PersistencesService"
import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"


// Define the props that the PostForm component expects
interface PersistencesDropDownProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    value: any;
    onChanged?: (e: any) => void;       // The callback function to be called when the value changes

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip
}



export default function PersistencesDropDown({
    id,
    name,
    value,
    onChanged,
    placeholder, tooltip, tooltipOptions
}: PersistencesDropDownProps) {



    const [lazyParams, setLazyParams] = useState(
        new PersistencesModel().
            getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'method', order: 1 }, { field: 'created', order: -1 }],
                PersistencesService.defaultFilters()));

    /**
     * Managing catlog
     */
    const [selectedCatalog, setSelectedCatalog] = useState<any>(value);
    const [catalogs, setCatalogs] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState(true);
    const [initCatalog, setInitCatalog] = useState(false);


    let loadLazyTimeout:any = undefined;



    /**
     * Restaure data on init
     */
    useEffect(() => {
        // if (initCatalog === false) {
        //     const _catalogs = Array.from({ length: 100000 });
        //     const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
        //     // Get Lazy Data
        //     PersistencesService.getLazy(lazyEventSet).then((data: any) => {
        //         console.log(data);
        //         for (let i = lazyParams.first; i < lazyParams.rows; i++) {
        //             _catalogs[i] = {
        //                 label: data[i]?.tags?.name + ' - ' + data[i].pers_method?.name + '(' + data[i].company + ') [' + data[i].id + ']',
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
        setSelectedCatalog(e.value)
        onChanged && onChanged(e);
    }

    const onChangedFilter = (e: any) => {
        let _lazyParams = lazyParams;
        _lazyParams.filters.global.value = e.filter === '' ? null : e.filter;
        _lazyParams.filters.global.matchMode = 'contains';
        setLazyParams(() => { return { ..._lazyParams } });

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
    }

    const loadData = () => {
        // console.log('useEffect reload');
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
                // console.log(lazyParams.rows, data, catalogs);
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


    /**
     * Main data effect depending on lazyParams
     */
    useEffect(() => {
        loadData();
    }, [lazyParams]);





    return <>

        <Dropdown
            id={id}
            name={name}
            value={selectedCatalog}

            options={catalogs}
            onChange={onChangeCatalog}

            placeholder="Persistences..."
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
