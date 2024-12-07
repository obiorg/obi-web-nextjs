'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AlarmsClassesModel } from '@/src/obi/models/alarms/AlarmsClassesModel';
import { AlarmsClassesService } from '@/src/obi/service/alarms/AlarmsClassesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AlarmsClasses = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'class', header: 'Classes', dataType: 'text', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },

        { field: 'render', header: 'Rendu', dataType: 'numeric', bodyTemplate: templateHelper.render, sortable: true, filter: true, filterField: "render", showFilterMatchModes: false, filterPlaceholder: 'Rendu...', filterElement: sysComponentsHelper.alarmsRenders_lazyFilter },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Alarmes - Classes'
            prefix='alarms_class'
            defaultParams={new AlarmsClassesModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'class', order: 1 }, { field: 'name', order: 1 }], AlarmsClassesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AlarmsClassesService}
        />

    </>)

};

export default AlarmsClasses;
