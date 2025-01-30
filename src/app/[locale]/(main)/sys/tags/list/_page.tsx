'use client';

import Table from '@/src/obi/components/Tables/Table';
import { TagsListModel } from '@/src/obi/models/tags/TagsListModel';
import { TagsListService } from '@/src/obi/service/tags/TagsListService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const TagsList = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.deleted, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', body: templateHelper.datetimeCreated, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },
        { field: 'changed', header: 'Changé', dataType: 'date', body: templateHelper.datetimeChanged, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter, style: { textAlign: 'center', minWidth: '15rem' } },
        { field: 'type', header: 'Type', dataType: 'numeric', bodyTemplate: templateHelper.tags_lists_types, sortable: true, filter: true, filterField: "type", showFilterMatchModes: false, filterPlaceholder: 'Type...', filterElement: sysComponentsHelper.tags_lists_types_lazyFilter, style: { textAlign: 'left', minWidth: '15rem' } },

        { field: 'list', header: 'Liste', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'designation', header: 'Designation', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

    ]);



    return (<>

        <Table
            title='Tags - Liste'
            prefix='tags_lists'
            defaultParams={new TagsListModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'type', order: 1 }, { field: 'list', order: 1 }], TagsListService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={TagsListService}
        />

    </>)

};

export default TagsList;
