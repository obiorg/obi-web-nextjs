'use client';

import Table from '@/src/obi/components/Tables/Table';
import { AlarmsRendersModel } from '@/src/obi/models/alarms/AlarmsRendersModel';
import { AlarmsRendersService } from '@/src/obi/service/alarms/AlarmsRendersService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const AlarmsRenders = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },

        { field: 'render', header: 'Rendu', dataType: 'text', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'color', header: 'Couleur', dataType: 'text', sortable: true, filter: true },
        { field: 'background', header: 'Arrière plan', dataType: 'text', sortable: true, filter: true },

        { field: 'blink', header: 'Clignotant', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'colorBlink', header: 'Couleur clig.', dataType: 'text', sortable: true, filter: true },
        { field: 'backgroundBlink', header: 'Arrière plan clig.', dataType: 'text', sortable: true, filter: true },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },


    ]);



    return (<>

        <Table
            title='Alarmes - Rendu'
            prefix='alarms_renders'
            defaultParams={new AlarmsRendersModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'render', order: 1 }, { field: 'name', order: 1 }], AlarmsRendersService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={AlarmsRendersService}
        />

    </>)

};

export default AlarmsRenders;
