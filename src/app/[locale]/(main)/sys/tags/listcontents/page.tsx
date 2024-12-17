'use client';

import Table from '@/src/obi/components/Tables/Table';
import { MeasuresLimitsModel } from '@/src/obi/models/measures/MeasuresLimitsModel';
import { MeasuresLimitsService } from '@/src/obi/service/measures/MeasuresLimitsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const MeasuresLimits = () => {


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'business', header: 'Entreprise', dataType: 'numeric', bodyTemplate: templateHelper.business, sortable: true, filter: true, filterField: "business", showFilterMatchModes: false, filterPlaceholder: 'Entreprise...', filterElement: sysComponentsHelper.businesses_lazyFilter },
        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },
        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tags...', filterElement: sysComponentsHelper.tags_lazyFilter },

        { field: 'name', header: 'Désignation', dataType: 'text', sortable: true, filter: true },
        { field: 'value', header: 'valeur', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'comparator', header: 'Mes. Comparateur', dataType: 'numeric', bodyTemplate: templateHelper.measuresComparator, sortable: true, filter: true, filterField: "comparator", showFilterMatchModes: false, filterPlaceholder: 'Mes. Comparateurs...', filterElement: sysComponentsHelper.measuresLimits_lazyFilter },
        { field: 'delay', header: 'Délai', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'hysteresis', header: 'Hystéresis', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },

        { field: 'target', header: 'Target', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'enable', header: 'Activé', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'group', header: 'Limit Groupe', dataType: 'numeric', bodyTemplate: templateHelper.measuresLimitsGroup, sortable: true, filter: true, filterField: "group", showFilterMatchModes: false, filterPlaceholder: 'Mes. limit Groupe...', filterElement: sysComponentsHelper.measuresLimitsGroups_lazyFilter },
        { field: 'sort', header: 'Ordre', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'description', header: 'description', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Mesures - Limites'
            prefix='measures_limits'
            defaultParams={new MeasuresLimitsModel().getStandardParam([{ field: 'business', order: 1 }, { field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'group', order: 1 }, { field: 'name', order: 1 }], MeasuresLimitsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={MeasuresLimitsService}
        />

    </>)

};

export default MeasuresLimits;
