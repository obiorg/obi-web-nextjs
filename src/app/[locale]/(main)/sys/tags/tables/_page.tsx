'use client';

import Table from '@/src/obi/components/Tables/Table';
import { TagsTablesModel } from '@/src/obi/models/tags/TagsTablesModel';
import { TagsTablesService } from '@/src/obi/service/tags/TagsTablesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const TagsTablesPage = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter, style: { textAlign: 'center', minWidth: '15rem' } },

        

        { field: 'table', header: 'Table', dataType: 'text', sortable: true, filter: true , style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'designation', header: 'Désignation', dataType: 'text', sortable: true, filter: true , style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'comment', header: 'Commentaires', dataType: 'text', sortable: true, filter: true , style: { textAlign: 'left', minWidth: '20rem' } }

    ]);



    return (<>

        <Table
            title='Tags - Tables'
            prefix='tags_tables'
            defaultParams={new TagsTablesModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'table', order: 1 }], TagsTablesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={TagsTablesService}
        />

    </>)

};

export default TagsTablesPage;
