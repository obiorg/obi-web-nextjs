// this is a client component
'use client'


import { useEffect, useRef, useState } from "react"


import { TagsListContentsModel } from "@/src/obi/models/tags/TagsListContentsModel"
import { TagsListContentsService } from "@/src/obi/service/tags/TagsListContentsService"
import { Dropdown } from "primereact/dropdown"
import { Skeleton } from "primereact/skeleton"
import ReactIcons from "@/src/obi/components/Icons/ReactIcons"


// Define the props that the PostForm component expects
interface TagsListContentsDropDownProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component
    title?: string;                      // preceding title of dropdown

    value?: string | number | undefined;
    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // The callback function to be called when the value changes

    error?: any; // child of formState ex: formState.erros?.location

    placeholder?: string;               // placeholder
    tooltip?: string;                   // tooltip text
    tooltipOptions?: any;               // options for tooltip

    options?: any; // options

    emptyFilterMessage?: string; //
    emptyMessage?: string; // Message to display when no items are found

    render?: boolean; //
}



export default function TagsListContentsDropDown({
    id,
    name,
    title,
    value,
    onChange,
    error,
    placeholder = "Rechercher ...'",
    tooltip,
    tooltipOptions,
    emptyFilterMessage = "Recherche sans résultat...",
    emptyMessage = 'vide !',
    render = true,
}: TagsListContentsDropDownProps) {



    const [lazyParams, setLazyParams] = useState(
        new TagsListContentsModel().
            getStandardParam([
                { field: 'company', order: 1 },
                { field: 'list', order: 1 },
                { field: 'content', order: 1 }],
                TagsListContentsService.defaultFilters()));

    // catalog processing
    const [selectedCatalog, setSelectedCatalog] = useState<any>(value);
    const [catalogs, setCatalogs] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState(true);

    // Manage Timeout
    let loadLazyTimeout: any = undefined;

    const focusInputRef = useRef<any>('');



    /**
     * Restaure data on init
     */
    useEffect(() => {

        if (value && value !== undefined && value !== null) {
            // console.log('reload value defined', value);
            let filters: any = lazyParams.filters;
            // console.log('reload filter defined', filters);
            // USING ID
            //
            filters.id = {
                "operator": "and",
                "constraints": [
                    {
                        "value": value,
                        "matchMode": "equals",
                        "type": "numeric"
                    }
                ]
            };
            let _lazyParams = lazyParams;
            _lazyParams.filters = filters;
            setLazyParams(() => { return { ..._lazyParams } });

            console.log('InputRef', focusInputRef);
            // focusInputRef?.currentValue = value;

            loadData();
        } else {
            // console.log('reload value else', value);
            setLazyParams(() => {
                return {
                    ...(new TagsListContentsModel()).
                        getStandardParam(
                            [{ field: 'company', order: 1 },
                            { field: 'list', order: 1 },
                            { field: 'content', order: 1 }],
                            TagsListContentsService.defaultFilters())
                }
            });
            loadData();
        }
        // setSelectedCatalog(value);
    }, [value]);


    const onChangeCatalog = (e: { value: any }) => {
        setSelectedCatalog(e.value)
        onChange && onChange(e);
    }

    const onChangedFilter = (e: any) => {
        let filters: any = lazyParams.filters;
        if (e.filter === '') {
            filters.id = {
                "operator": "and",
                "constraints": [
                    {
                        "value": value,
                        "matchMode": "equals",
                        "type": "numeric"
                    }
                ]
            };
        } else {
            filters.id = {
                "operator": "and",
                "constraints": [
                    {
                        "value": null,
                        "matchMode": "equals",
                        "type": "numeric"
                    }
                ]
            };
        }
        let _lazyParams = lazyParams;
        _lazyParams.filters = filters;
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
            // let _catalogs = [...catalogs];
            let _catalogs = Array.from({ length: 100000 });

            const lazyEventSet = { lazyEvent: JSON.stringify(lazyParams) };

            // Get Lazy Data
            TagsListContentsService.getLazy(lazyEventSet).then((data: any) => {
                // console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].content + ' - ' + data[i].value + '(l: ' + data[i].list + '/c: ' + data[i].company + ') [' + data[i].id + ']',
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
    }

    /**
     * Main data effect depending on lazyParams
     */
    useEffect(() => {
        loadData();
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
                    id={id}
                    name={name}
                    value={selectedCatalog}

                    options={catalogs}
                    onChange={onChangeCatalog}

                    className={'col-12 md:col-5  pl-2 mb-2 input-value ' + (error ? 'p-invalid' : '')}
                    placeholder={placeholder}
                    // required
                    tooltip={tooltip}
                    tooltipOptions={tooltipOptions ? tooltipOptions : { position: 'bottom' }}


                    showClear
                    filter
                    onFilter={onChangedFilter}
                    showFilterClear
                    focusInputRef={focusInputRef}

                    emptyFilterMessage={emptyFilterMessage}
                    emptyMessage={emptyMessage}
                    checkmark={true} highlightOnSelect={false}
                    // editable
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
