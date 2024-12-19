'use client';
import { useState } from 'react';


import Table from '@/src/obi/components/Tables/Table';
import { LocationsRegionsModel } from '@/src/obi/models/localisations/LocationsRegionsModel';
import { LocationsRegionsService } from '@/src/obi/service/localisations/LocationsRegionsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Regions = () => {


    // Manage columns
    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'translations', header: 'Traduction', dataType: 'text', sortable: true, filter: true },

        { field: 'created_at', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'updated_at', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'flag', header: 'drapeau', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'wikiDataId', header: 'Wiki Data Id', dataType: 'text', sortable: true, filter: true },


    ]);





    return (<>

        <Table
            title='Continents'
            prefix='regions'
            defaultParams={new LocationsRegionsModel().getStandardParam({ field: 'name', order: 1 }, LocationsRegionsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={LocationsRegionsService}
        />

    </>)

};

export default Regions;
