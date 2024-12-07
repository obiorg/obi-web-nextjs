'use client';

import Table from '@/src/obi/components/Tables/Table';
import { MeasuresUnitsModel } from '@/src/obi/models/measures/MeasuresUnitsModel';
import { MeasuresUnitsService } from '@/src/obi/service/measures/MeasuresUnitsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const MeasuresUnits = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'entity', header: 'Entité/Coporate', dataType: 'numeric', bodyTemplate: templateHelper.entity, sortable: true, filter: true, filterField: "entity", showFilterMatchModes: false, filterPlaceholder: 'Corporate...', filterElement: sysComponentsHelper.entities_lazyFilter },

        { field: 'sizeName', header: 'Dim. Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'sizeSymbol', header: 'Dim. Symbole', dataType: 'text', sortable: true, filter: true },
        { field: 'unitName', header: 'Nom Unité', dataType: 'text', sortable: true, filter: true },
        { field: 'unitSymbol', header: 'Symbole Unité', dataType: 'text', sortable: true, filter: true },
        { field: 'dimension', header: 'Dimenssion', dataType: 'text', sortable: true, filter: true },
        { field: 'group', header: 'Groupe', dataType: 'text', sortable: true, filter: true },
        { field: 'tagging', header: 'Tagging', dataType: 'text', sortable: true, filter: true },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Mesures - Unités'
            prefix='measures_units'
            defaultParams={new MeasuresUnitsModel().getStandardParam([{ field: 'entity', order: 1 }, { field: 'group', order: 1 }, { field: 'sizeName', order: 1 }], MeasuresUnitsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={MeasuresUnitsService}
        />

    </>)

};

export default MeasuresUnits;
