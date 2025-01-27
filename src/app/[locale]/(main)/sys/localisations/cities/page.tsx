'use client';
import { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { LocationsCitiesModel } from '@/src/obi/models/localisations/LocationsCitiesModel';
import { LocationsCitiesService } from '@/src/obi/service/localisations/LocationsCitiesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Cities = () => {


    // Manage columns
    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'state_id', header: 'Etat', dataType: 'text', bodyTemplate: templateHelper.state, sortable: true, filter: true, filterField: "state_id", showFilterMatchModes: false, filterPlaceholder: 'Etat...', filterElement: sysComponentsHelper.states_lazyFilter },
        { field: 'state_code', header: 'Etat Code', dataType: 'text', sortable: true, filter: true },

        { field: 'country_id', header: 'Pays', dataType: 'text', bodyTemplate: templateHelper.country, sortable: true, filter: true, filterField: "country_id", showFilterMatchModes: false, filterPlaceholder: 'Pays...', filterElement: sysComponentsHelper.countries_lazyFilter },
        { field: 'country_code', header: 'country_code', dataType: 'text', sortable: true, filter: true },

        { field: 'latitude', header: 'latitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'longitude', header: 'longitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'created_at', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'updated_at', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'flag', header: 'drapeau', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'wikiDataId', header: 'Wiki Data Id', dataType: 'text', sortable: true, filter: true },

    ]);




    return (<>

        <Table
            title='Villes'
            prefix='cities'
            defaultParams={new LocationsCitiesModel().getStandardParam([{ field: 'country_id', order: 1 }, { field: 'state_id', order: 1 }, { field: 'name', order: 1 }], LocationsCitiesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={LocationsCitiesService}
        />

    </>)

};

export default Cities;
