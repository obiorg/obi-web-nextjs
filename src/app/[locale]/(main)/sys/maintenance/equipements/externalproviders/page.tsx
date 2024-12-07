'use client';

import Table from '@/src/obi/components/Tables/Table';
import { EquipementsExternalProvidersModel } from '@/src/obi/models/maintenance/EquipementsExternalProvidersModel';
import { EquipementsExternalProvidersService } from '@/src/obi/service/maintenance/EquipementsExternalProvidersService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const EquipementsExternalProviders = () => {

    
    const bddPassword = (rowData: any) => {
        let p = '*';
        for (let i = 0; i < rowData.bddPassword?.length; i++)
            p += '*';
        return <label>{p}</label>
    }

    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },

        { field: 'provider', header: 'Provider', dataType: 'text', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },

        { field: 'type', header: 'Type', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'sourceType', header: 'Type Source', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'link', header: 'Lien', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'source', header: 'Source', dataType: 'text', sortable: true, filter: true },
        { field: 'bddServer', header: 'BDD Server', dataType: 'text', sortable: true, filter: true },
        { field: 'bddUser', header: 'BDD User', dataType: 'text', sortable: true, filter: true },
        { field: 'bddPassword', header: 'BDD Pass.', dataType: 'text', bodyTemplate: bddPassword, sortable: true, filter: true },
        { field: 'bddPort', header: 'Port', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

 
        { field: 'paramBool1', header: 'Bool 1', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'paramBool2', header: 'Bool 2', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'paramBool3', header: 'Bool 3', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'paramBool4', header: 'Bool 4', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'paramBool5', header: 'Bool 5', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'paramInt1', header: 'Entier 1', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'paramInt2', header: 'Entier 2', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'paramInt3', header: 'Entier 3', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'paramInt4', header: 'Entier 4', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'paramInt5', header: 'Entier 5', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'paramStr1', header: 'Text 1', dataType: 'text', sortable: true, filter: true },
        { field: 'paramStr2', header: 'Text 2', dataType: 'text', sortable: true, filter: true },
        { field: 'paramStr3', header: 'Text 3', dataType: 'text', sortable: true, filter: true },
        { field: 'paramStr4', header: 'Text 4', dataType: 'text', sortable: true, filter: true },
        { field: 'paramStr5', header: 'Text 5', dataType: 'text', sortable: true, filter: true },

 

    ]);



    return (<>

        <Table
            title='Equipements - Ext. Providers' 
            prefix='equipements_externalprovider'
            defaultParams={new EquipementsExternalProvidersModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'provider', order: 1 }], EquipementsExternalProvidersService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={EquipementsExternalProvidersService}
        />

    </>)

};

export default EquipementsExternalProviders;
