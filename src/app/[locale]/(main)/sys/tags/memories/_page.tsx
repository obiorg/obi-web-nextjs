'use client';

import Table from '@/src/obi/components/Tables/Table';
import { TagsMemoriesModel } from '@/src/obi/models/tags/TagsMemoriesModel';
import { TagsMemoriesService } from '@/src/obi/service/tags/TagsMemoriesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const TagsMemories = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'name', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'comment', header: 'description', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Tags - Mémoires (area)'
            prefix='tags_memories'
            defaultParams={new TagsMemoriesModel().getStandardParam([{ field: 'name', order: 1 }, ], TagsMemoriesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={TagsMemoriesService}
        />

    </>)

};

export default TagsMemories;
