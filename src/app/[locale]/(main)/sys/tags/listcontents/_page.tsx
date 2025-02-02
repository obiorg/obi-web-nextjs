'use client';

import Table from '@/src/obi/components/Tables/Table';
import { TagsListContentsModel } from '@/src/obi/models/tags/TagsListContentsModel';
import { TagsListContentsService } from '@/src/obi/service/tags/TagsListContentsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { classNames } from 'primereact/utils';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const TagsListContents = () => {

    const defaultValue = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.activate,
                'false-icon pi-times text-red-600': !rowData?.activate
            })} />;
    }

    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.deleted, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', body: templateHelper.datetimeCreated, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },
        { field: 'changed', header: 'Changé', dataType: 'date', body: templateHelper.datetimeChanged, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'list', header: 'Liste', dataType: 'numeric', bodyTemplate: templateHelper.tagsListContent, sortable: true, filter: true, filterField: "list", showFilterMatchModes: false, filterPlaceholder: 'Liste...', filterElement: sysComponentsHelper.tagsLists_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'content', header: 'Clé', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'value', header: 'Valeur', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'default', header: 'Défaut', dataType: "boolean", body: defaultValue, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'width', header: 'Largeur', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'height', header: 'Hauteur', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },


        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

    ]);



    return (<>

        <Table
            title='Liste de contenu - Tags'
            prefix='tags_list_contents'
            defaultParams={new TagsListContentsModel()
                .getStandardParam([
                    { field: 'company', order: 1 },
                    { field: 'list', order: 1 },
                    { field: 'content', order: 1 },
                ], TagsListContentsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={TagsListContentsService}
        />

    </>)

};

export default TagsListContents;
