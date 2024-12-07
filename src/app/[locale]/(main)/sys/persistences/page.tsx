'use client';

import Table from '@/src/obi/components/Tables/Table';
import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Persistences = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },
        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tags...', filterElement: sysComponentsHelper.tags_lazyFilter },
        { field: 'method', header: 'Méthode', dataType: 'numeric', bodyTemplate: templateHelper.persistencesMethod, sortable: true, filter: true, filterField: "method", showFilterMatchModes: false, filterPlaceholder: 'Méthode...', filterElement: sysComponentsHelper.persistencesMethods_lazyFilter },

        { field: 'activate', header: 'Activé', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'comment', header: 'comment', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Persistences'
            prefix='persistences'
            defaultParams={new PersistencesModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'method', order: 1 }, { field: 'created', order: -1 }], PersistencesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={PersistencesService}
        />

    </>)

};

export default Persistences;
