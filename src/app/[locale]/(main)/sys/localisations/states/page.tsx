'use client';
import { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { LocationsStatesModel } from '@/src/obi/models/localisations/LocationsStatesModel';
import { LocationsStatesService } from '@/src/obi/service/localisations/LocationsStatesService';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const States = () => {


    // Manage columns
    const [columns, setColumns]: any[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        
        { field: 'country_id', header: 'Pays', dataType: 'text', bodyTemplate: templateHelper.country, sortable: true, filter: true, filterField: "country_id", showFilterMatchModes: false, filterPlaceholder: 'Pays...', filterElement: sysComponentsHelper.countries_lazyFilter },
        { field: 'country_code', header: 'Code pays', dataType: 'text', sortable: true, filter: true },
        { field: 'fips_code', header: 'Code fips', dataType: 'text', sortable: true, filter: true },
        { field: 'iso2', header: 'iso2', dataType: 'text', sortable: true, filter: true },
        { field: 'type', header: 'Type', dataType: 'text', sortable: true, filter: true },
        
        { field: 'latitude', header: 'latitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'longitude', header: 'longitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'created_at', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'updated_at', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'flag', header: 'drapeau', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'wikiDataId', header: 'Wiki Data Id', dataType: 'text', sortable: true, filter: true },


    ]);



    const exportColumnsStyle = {
        0: { halign: 'right', valign: 'middle', fontSize: 8, cellPadding: 1, minCellWidth: 20, cellWidth: 'wrap' }, // id //fillColor: [0, 255, 0]
        1: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        2: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        3: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        4: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }, // localisation
        5: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        6: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        7: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },   // country
        8: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        9: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' }, // ville
        10: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        11: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        12: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        13: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        14: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        15: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }
    }



    return (<>

        <Table
            title='Etats'
            prefix='states'
            defaultParams={new LocationsStatesModel().getStandardParam([{ field: 'country_id', order: 1 },{ field: 'name', order: 1 }], LocationsStatesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={exportColumnsStyle}
            services={LocationsStatesService}
        />

    </>)

};

export default States;
