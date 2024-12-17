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

import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { OBI } from '@/src/types/obi';



import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import type { ChartDataState, ChartOptionsState } from '@/src/types';
import { LayoutContext } from '@/src/layout/context/layoutcontext';
import { Checkbox } from 'primereact/checkbox';
import { Messages } from 'primereact/messages';


const Persistence = () => {

    /**
     * Design input
     */



    return (

        <div className="grid">
            <div className="col-12">
                <div className="card p-fluid">
                    <h5>Ceci est la liste des persistence</h5>
                    <div className="field grid">
                        <label htmlFor="name3" className="col-12 mb-2 md:col-2 md:mb-0">
                            Name
                        </label>
                        <div className="col-12 md:col-5">
                            <InputText id="name3" type="text" />
                        </div>
                        <div className="col-12 md:col-5">
                            <Messages id="name3Error"  />
                        </div>
                    </div>

                    <div className="field grid">
                        <label htmlFor="email3" className="col-12 mb-2 md:col-2 md:mb-0">
                            Email
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText id="email3" type="text" />
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Persistence;
