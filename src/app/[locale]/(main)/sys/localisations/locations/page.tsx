'use client';
import { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';
import { LocationsService } from '@/src/obi/service/localisat/LocationsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Locations = () => {


    // Manage columns
    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'location', header: 'Localisation', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },

        { field: 'group', header: 'Groupe', dataType: 'text', sortable: true, filter: true },
        { field: 'country', header: 'Pays', dataType: 'text', bodyTemplate: templateHelper.country, sortable: true, filter: true, filterField: "country", showFilterMatchModes: false, filterPlaceholder: 'Chercher par pays', filterElement: sysComponentsHelper.countries_lazyFilter },
        { field: 'state', header: 'Province', dataType: 'numeric', bodyTemplate: templateHelper.state, sortable: true, filter: true, filterField: "state", showFilterMatchModes: false, filterPlaceholder: 'Chercher par province', filterElement: sysComponentsHelper.states_lazyFilter },
        { field: 'city', header: 'Ville', dataType: 'numeric', bodyTemplate: templateHelper.city, sortable: true, filter: true, filterField: "city", showFilterMatchModes: false, filterPlaceholder: 'Chercher par ville', filterElement: sysComponentsHelper.cities_lazyFilter },

        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'address1', header: 'Adresse 1', dataType: 'text', sortable: true, filter: true },
        { field: 'address3', header: 'Adresse 2', dataType: 'text', sortable: true, filter: true },
        { field: 'bloc', header: 'Bloc', dataType: 'text', sortable: true, filter: true },
        { field: 'floor', header: 'Etage', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'center' } },
        { field: 'number', header: 'Numéro', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'center' } },
    ]);



    return (<>

        <Table
            title='Localisation'
            prefix='locations'
            defaultParams={new LocationsModel().getStandardParam({ field: 'location', order: 1 }, LocationsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={LocationsService}
        />

    </>)

};

export default Locations;
