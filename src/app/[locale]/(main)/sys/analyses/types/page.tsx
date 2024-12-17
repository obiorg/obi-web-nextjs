'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AnalysesTypesModel } from '@/src/obi/models/analyses/AnalysesTypesModel';
import { AnalysesTypesService } from '@/src/obi/service/analyses/AnalysesTypesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AnalysesTypes = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'business', header: 'Entreprise', dataType: 'numeric', bodyTemplate: templateHelper.business, sortable: true, filter: true, filterField: "business", showFilterMatchModes: false, filterPlaceholder: 'Entreprise...', filterElement: sysComponentsHelper.businesses_lazyFilter },
        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },

        { field: 'type', header: 'Type', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'unit', header: 'Unité', dataType: 'numeric', bodyTemplate: templateHelper.unit, sortable: true, filter: true, filterField: "unit", showFilterMatchModes: false, filterPlaceholder: 'Unités...', filterElement: sysComponentsHelper.measuresUnits_lazyFilter },
        { field: 'method', header: 'Méthode', dataType: 'numeric', bodyTemplate: templateHelper.analysesMethod, sortable: true, filter: true, filterField: "method", showFilterMatchModes: false, filterPlaceholder: 'Méthodes...', filterElement: sysComponentsHelper.analysesMethods_lazyFilter },
        { field: 'category', header: 'Catégorie', dataType: 'numeric', bodyTemplate: templateHelper.analysesCategorie, sortable: true, filter: true, filterField: "category", showFilterMatchModes: false, filterPlaceholder: 'Catégorie...', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'description', header: 'description', dataType: 'text', sortable: true, filter: true },
        
    ]);



    return (<>

        <Table
            title='Analyses - Types'
            prefix='analyses_types'
            defaultParams={new AnalysesTypesModel().getStandardParam([{ field: 'business', order: 1 },{ field: 'company', order: 1 }, { field: 'point', order: 1 }, { field: 'type', order: 1 }], AnalysesTypesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AnalysesTypesService}
        />

    </>)

};

export default AnalysesTypes;
