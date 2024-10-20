'use client';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';

import { PersistenceService } from '@/src/obi/service/persistences/PersistencesService copy';
import { OBI } from '@/src/types/obi';



import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import type { ChartDataState, ChartOptionsState } from '@/src/types';
import { LayoutContext } from '@/src/layout/context/layoutcontext';
import { Checkbox } from 'primereact/checkbox';


const Persistence = () => {

    /**
     * Design input
     */
    const [totalRecords, setTotalRecords] = useState(0);
    const [tag, setTag] = useState(1);
    const [tagTotalRecords, setTagTotalRecords] = useState(0);


    /**
     * Persistence element
     */
    const [persistence, setPersistence] = useState<OBI.persistence[]>([]);
    const getPersistence = (data: OBI.persistence[]) => {
        console.log(data);
        return [...(data || [])].map((d) => {
            //console.log("d", d);
            // d.id = data.id;
            // d.deleted = data.deleted;
            // d.created = data.created;
            // d.changed = data.changed;
            // d.company = data.company;
            // d.tag = data.tag;
            // d.method = data.method;
            // d.activated = data.activated;
            // d.comments = data.comments;
            // d.created = new Date(d.created);
            return d;
        });
    };




    useEffect(() => {
        PersistenceService.count().then((data) => {
            setTotalRecords(data);
        });

    }, []);


    useEffect(() => {

        PersistenceService.findByPage(0, 20, 'desc').then((data) => {
            setPersistence(data);
        });


    }, []);

 

    const handleTagChanged = (e: any) => {
        setTag(tag => e.value);
    };


    const bodyTemplateDeleted = (rowData: any) => {
        return <Checkbox inputId="binary" checked={rowData.deleted} />;
    };

    const bodyTemplateActivate = (rowData: any) => {
        return <Checkbox inputId="binary" checked={rowData.activate} />;
    };


    return (

        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Liste de Persistence</h5>
                    <p>Nombre total d enregistrement : {totalRecords}</p>


                    <DataTable value={persistence}>
                        <Column field="id" header="N°"></Column>
                        <Column field="deleted" header="Suppression" body={bodyTemplateDeleted}></Column>
                        <Column field="created" header="Créée le"></Column>
                        <Column field="changed" header="Changée le"></Column>
                        <Column field="company" header="Société"></Column>
                        <Column field="tag" header="Tag"></Column>
                        <Column field="method" header="Méthode"></Column>
                        <Column field="activate" header="Activé" body={bodyTemplateActivate}></Column>
                        <Column field="comment" header="Commentaire"></Column>
                    </DataTable>

                </div>
            </div>

        </div>
    );
};

export default Persistence;
