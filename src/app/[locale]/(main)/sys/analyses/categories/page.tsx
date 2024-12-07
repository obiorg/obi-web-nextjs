'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AnalysesCategoriesModel } from '@/src/obi/models/analyses/AnalysesCategoriesModel';
import { AnalysesCategoriesService } from '@/src/obi/service/analyses/AnalysesCategoriesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AnalysesCategories = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'business', header: 'Entreprise', dataType: 'numeric', bodyTemplate: templateHelper.business, sortable: true, filter: true, filterField: "business", showFilterMatchModes: false, filterPlaceholder: 'Entreprise...', filterElement: sysComponentsHelper.businesses_lazyFilter },
        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },

        { field: 'category', header: 'Catégorie', dataType: 'text', sortable: true, filter: true },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'description', header: 'Description', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Analyses - catégories'
            prefix='analyses_categories'
            defaultParams={new AnalysesCategoriesModel().getStandardParam([{ field: 'business', order: 1 }, { field: 'company', order: 1 }, { field: 'category', order: 1 }, { field: 'designation', order: 1 }], AnalysesCategoriesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AnalysesCategoriesService}
        />

    </>)

};

export default AnalysesCategories;
