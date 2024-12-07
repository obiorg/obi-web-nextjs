'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AnalysesAllowedModel } from '@/src/obi/models/analyses/AnalysesAllowedModel';
import { AnalysesAllowedService } from '@/src/obi/service/analyses/AnalysesAllowedService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AnalysesAllowed = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'point', header: 'Point', dataType: 'numeric', bodyTemplate: templateHelper.analysesPoint, sortable: true, filter: true, filterField: "point", showFilterMatchModes: false, filterPlaceholder: 'Point analyse...', filterElement: sysComponentsHelper.analysesPoints_lazyFilter },
        { field: 'type', header: 'Type', dataType: 'numeric', bodyTemplate: templateHelper.analysesType, sortable: true, filter: true, filterField: "type", showFilterMatchModes: false, filterPlaceholder: 'Type d\'analyse...', filterElement: sysComponentsHelper.analysesTypes_lazyFilter_lazyFilter },
        
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'enable', header: 'Activé', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tag...', filterElement: sysComponentsHelper.tags_lazyFilter },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        
    ]);



    return (<>

        <Table
            title='Analyses - autorisées'
            prefix='analyses_allowed'
            defaultParams={new AnalysesAllowedModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'point', order: 1 }, { field: 'type', order: 1 }, { field: 'designation', order: 1 }], AnalysesAllowedService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AnalysesAllowedService}
        />

    </>)

};

export default AnalysesAllowed;
