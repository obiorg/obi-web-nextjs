'use client';

import Table from '@/src/obi/components/Tables/Table';
import { PersistencesStandardsLimitsModel } from '@/src/obi/models/persistences/PersistencesStandardsLimitsModel';
import { PersistencesStandardsLimitsService } from '@/src/obi/service/persistences/PersistencesStandardsLimitsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const PersistencesStandardsLimits = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },
        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tag...', filterElement: sysComponentsHelper.tags_lazyFilter },
        { field: 'pers_standard', header: 'Standard', dataType: 'numeric', bodyTemplate: templateHelper.persistencesStandard, sortable: true, filter: true, filterField: "pers_standard", showFilterMatchModes: false, filterPlaceholder: 'Pesistences standard...', filterElement: sysComponentsHelper.persistencesStandards_lazyFilter },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'value', header: 'Valeur', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },
        
        { field: 'comparator', header: 'Mes. Comparateur', dataType: 'numeric', bodyTemplate: templateHelper.measuresComparator, sortable: true, filter: true, filterField: "comparator", showFilterMatchModes: false, filterPlaceholder: 'Mes. Comparateurs...', filterElement: sysComponentsHelper.measuresLimits_lazyFilter },
        { field: 'delay', header: 'Délai', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'hysteresis', header: 'Hystéresis', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },

        { field: 'group', header: 'Limit Groupe', dataType: 'numeric', bodyTemplate: templateHelper.measuresLimitsGroup, sortable: true, filter: true, filterField: "group", showFilterMatchModes: false, filterPlaceholder: 'Mes. limit Groupe...', filterElement: sysComponentsHelper.measuresLimitsGroups_lazyFilter },
        { field: 'sort', header: 'Ordre', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'hit', header: 'Target', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'reached', header: 'Activé', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

    ]);



    return (<>

        <Table
            title='Persistences - Limites Standard'
            prefix='persistences_standardslimits'
            defaultParams={new PersistencesStandardsLimitsModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'pers_standard', order: 1 }, { field: 'name', order: -1 }], PersistencesStandardsLimitsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={PersistencesStandardsLimitsService}
        />


    </>)

};

export default PersistencesStandardsLimits;
