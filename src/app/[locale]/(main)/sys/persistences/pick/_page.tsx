'use client';

import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';
import { PickList } from 'primereact/picklist';
import { ProductService } from '@/src/demo/service/ProductService';
import { useEffect, useState } from 'react';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService';





const PersistencesPick = () => {

    const [source, setSource] = useState<any>([]);
    const [target, setTarget] = useState<any>([]);






    const [lazyParams, setLazyParams] = useState(
        (new TagsModel()).
            getStandardParam(
                [{ field: 'company', order: 1 },
                { field: 'machine', order: 1 },
                { field: 'name', order: 1 }],
                TagsService.defaultFilters()));

    // catalog processing
    // const [selectedCatalog, setSelectedCatalog] = useState<any>(value);
    const [catalogs, setCatalogs] = useState<any>([]);
    const [lazyLoading, setLazyLoading] = useState(true);

    // Manage Timeout
    let loadLazyTimeout: any = undefined;



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
            TagsService.getLazy(lazyEventSet).then((data: any) => {
                // console.log(lazyParams.rows, data, catalogs);
                for (let i = lazyParams.first; (i < lazyParams.rows && i < data.length); i++) {
                    // console.log('for i', i, data[i])
                    _catalogs[i] = {
                        label: data[i].name + ' - [' + data[i].machines.name + ' - '
                            + data[i].machines.address + ']  [' + data[i].id + '] '
                            + data[i].comment,
                        value: data[i].id,
                        catalogs: data[i]
                    };
                }
                if (data.length < lazyParams.rows) {
                    _catalogs = _catalogs.slice(0, lazyParams.rows);
                }
                // console.log(_catalogs.filter(Boolean));
                // setCatalogs(_catalogs.filter(Boolean));
                setSource(_catalogs.filter(Boolean));
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













    const onChange = (event: any) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item: any) => {
        // console.log(item);
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                {item.label}
            </div>
        );
    };

    return (
        <div className="card">
            <PickList dataKey="id"
                source={source}
                target={target}

                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="name" breakpoint="1280px"

                sourceHeader="Available"
                targetHeader="Selected"

                sourceStyle={{ height: '16rem' }}
                targetStyle={{ height: '16rem' }}

                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name" 
                
                showSourceControls={false}
                showTargetControls={false}

                />
        </div>
    );
};

export default PersistencesPick;
