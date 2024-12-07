'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AnalysesPointsModel } from '@/src/obi/models/analyses/AnalysesPointsModel';
import { AnalysesPointsService } from '@/src/obi/service/analyses/AnalysesPointsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AnalysesPoints = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },
        
        { field: 'point', header: 'Point', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'available', header: 'Disponible', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'picture', header: 'Photo', dataType: 'text', sortable: true, filter: true },
        { field: 'equipement', header: 'Equipement', dataType: 'numeric', bodyTemplate: templateHelper.equipement, sortable: true, filter: true, filterField: "equipement", showFilterMatchModes: false, filterPlaceholder: 'Equipement...', filterElement: sysComponentsHelper.equipements_lazyFilter },
        { field: 'description', header: 'Description', dataType: 'text', sortable: true, filter: true },
        
    ]);



    return (<>

        <Table
            title='Analyses - Points'
            prefix='analyses_points'
            defaultParams={new AnalysesPointsModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'point', order: 1 },  { field: 'designation', order: 1 }], AnalysesPointsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AnalysesPointsService}
        />

    </>)

};

export default AnalysesPoints;
