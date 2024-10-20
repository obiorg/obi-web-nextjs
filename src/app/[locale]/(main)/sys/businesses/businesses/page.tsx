'use client';
import React, { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { EntitiesModel } from '@/src/obi/models/businesses/EntitiesModel';
import { EntitiesService } from '@/src/obi/service/businesses/EntitiesService';
import { CompaniesModel } from '@/src/obi/models/businesses/CompaniesModel';
import { CompaniesService } from '@/src/obi/service/businesses/CompaniesService';
import { BusinessesModel } from '@/src/obi/models/businesses/BusinessesModel';
import { BusinessesService } from '@/src/obi/service/businesses/BusinessesService';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Businesses = () => {


    // Manage columns
    const [columns, setColumns]: OBI.ColumnMeta[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'business', header: 'Société', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },

        { field: 'builded', header: 'Année', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'main', header: 'Princip.', dataType: 'boolean', body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'activated', header: 'Activé', dataType: 'boolean', body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'logoPath', header: 'Logo', dataType: 'text', sortable: true, filter: true },
        { field: 'location', header: 'Localisation', dataType: 'numeric', bodyTemplate: templateHelper.localisation, sortable: true, filter: true, filterField: "localisation", showFilterMatchModes: false, filterPlaceholder: 'Chercher une localisation', filterElement: sysComponentsHelper.location_lazyFilter },
        { field: 'entity', header: 'Entité', dataType: 'numeric', bodyTemplate: templateHelper.entity, sortable: true, filter: true, filterField: "entity", showFilterMatchModes: false, filterPlaceholder: 'Chercher une entité', filterElement: sysComponentsHelper.entity_lazyFilter },


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
            title='Entreprises'
            prefix='businesses'
            defaultParams={new BusinessesModel().getStandardParam({ field: 'business', order: 1 }, BusinessesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={exportColumnsStyle}
            services={BusinessesService}
        />

    </>)

};

export default Businesses;