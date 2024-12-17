'use client';

import Table from '@/src/obi/components/Tables/Table';
import { EquipementsDataExternalModel } from '@/src/obi/models/maintenance/EquipementsDataExternalModel';
import { EquipementsDataExternalService } from '@/src/obi/service/maintenance/EquipementsDataExternalService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const EquipementsDataExternal = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },
        { field: 'equipement', header: 'Equipement', dataType: 'numeric', bodyTemplate: templateHelper.equipement, sortable: true, filter: true, filterField: "equipement", showFilterMatchModes: false, filterPlaceholder: 'Equipements...', filterElement: sysComponentsHelper.equipements_lazyFilter },
        { field: 'provider', header: 'Provider', dataType: 'numeric', bodyTemplate: templateHelper.provider, sortable: true, filter: true, filterField: "provider", showFilterMatchModes: false, filterPlaceholder: 'Providers...', filterElement: sysComponentsHelper.equipementsExternalProviders_lazyFilter },


    ]);



    return (<>

        <Table
            title='Equipements - Données externe'
            prefix='equipements_dataexternal'
            defaultParams={new EquipementsDataExternalModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'equipement', order: 1 }, { field: 'provider', order: 1 }], EquipementsDataExternalService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={EquipementsDataExternalService}
        />

    </>)

};

export default EquipementsDataExternal;
