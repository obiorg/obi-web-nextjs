'use client';

import Table from '@/src/obi/components/Tables/Table';
import { MachinesDriversModel } from '@/src/obi/models/connexions/MachinesDriversModel';
import { MachinesDriversService } from '@/src/obi/service/connexions/MachinesDriversService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const MachinesDrivers = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'driver', header: 'Driver', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },


    ]);



    return (<>

        <Table
            title='Connexions - Drivers'
            prefix='machines_drivers'
            defaultParams={new MachinesDriversModel().getStandardParam([{ field: 'driver', order: 1 }, { field: 'designation', order: 1 }], MachinesDriversService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={MachinesDriversService}
        />

    </>)

};

export default MachinesDrivers;
