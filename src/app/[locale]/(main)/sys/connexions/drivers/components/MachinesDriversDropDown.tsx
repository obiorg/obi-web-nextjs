// this is a client component
'use client'


import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"


import { OBI } from "@/src/types"
import { Dropdown } from "primereact/dropdown"
import { MachinesDriversService } from "@/src/obi/service/connexions/MachinesDriversService"
import { Skeleton } from "primereact/skeleton"
import { MachinesDriversModel } from "@/src/obi/models/connexions/MachinesDriversModel"
import { DataTableFilterMeta } from "primereact/datatable"


// Define the props that the PostForm component expects
interface MachinesDriversDropDownProps {
    // id: string;                         // ID of the component
    // name: string;                       // Name of the component
    // title: string;                      // preceding title of dropdown
    value: any;
    onChanged?: (e: any) => void;       // The callback function to be called when the value changes

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip
}



export default function MachinesDriversDropDown({
    // id, name, title, 
    value,
    onChanged,
    placeholder, tooltip, tooltipOptions
}: MachinesDriversDropDownProps) {


    const model = new MachinesDriversModel();
    const defaultFilters: Array<DataTableFilterMeta> = MachinesDriversService.defaultFilters();
    const [lazyParams, setLazyParams] = useState(
        model.
            getStandardParam({ field: 'name', order: 1 }, defaultFilters));

    // catalog processing
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
            const _catalogs = Array.from({ length: 100000 });
            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };
            // Get Lazy Data
            MachinesDriversService.getLazy(lazyEventSet).then((data: any) => {
                for (let i = lazyParams.first; i < lazyParams.rows; i++) {
                    _catalogs[i] = {
                        label: data[i].driver + ' - ' + data[i].designation + ' [' + data[i].id + ']',
                        value: data[i].id,
                        catalogs: data[i]
                    };
                }
                setCatalogs(_catalogs);
                setLazyLoading(false);
            });
            setInitCatalog(true);
        }
        setSelectedCatalog(value);
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
            MachinesDriversService.getLazy(lazyEventSet).then((data: any) => {
                // console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].driver + ' - ' + data[i].designation + ' [' + data[i].id + ']',
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

        <Dropdown
            value={selectedCatalog}

            options={catalogs}
            onChange={onChangeCatalog}
            placeholder="Sélectionner un driver..."
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
