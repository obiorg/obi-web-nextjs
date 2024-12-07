'use client';

import Table from '@/src/obi/components/Tables/Table';
import { PersistencesMethodsModel } from '@/src/obi/models/persistences/PersistencesMethodsModel';
import { PersistencesMethodsService } from '@/src/obi/service/persistences/PersistencesMethodsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const PersistencesMethods = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Persistences - Méthodes'
            prefix='persistences_methods'
            defaultParams={new PersistencesMethodsModel().getStandardParam([{ field: 'name', order: 1 }], PersistencesMethodsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={PersistencesMethodsService}
        />

    </>)

};

export default PersistencesMethods;
