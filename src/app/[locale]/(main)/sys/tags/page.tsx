'use client';
import { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { LocationsSubRegionsModel } from '@/src/obi/models/localisations/LocactionsSubRegionsModel';
import { LocationsSubRegionsService } from '@/src/obi/service/localisations/LocationsSubRegionsService';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService copy';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Tags = () => {


    const columns: OBI.ColumnMeta[] = [
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'table', header: 'Table', dataType: 'numeric', sortable: true, filter: true },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'machine', header: 'Machines', dataType: 'numeric', sortable: true, filter: true },
        { field: 'type', header: 'Types', dataType: 'numeric', sortable: true, filter: true },

        { field: 'memory', header: 'Mémoire', dataType: 'numeric', sortable: true, filter: true },
        { field: 'db', header: 'DB', dataType: 'numeric', sortable: true, filter: true },
        { field: 'byte', header: 'Byte', dataType: 'numeric', sortable: true, filter: true },
        { field: 'bit', header: 'Bit', dataType: 'numeric', sortable: true, filter: true },

        { field: 'active', header: 'Activé.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'cycle', header: 'Cycle', dataType: 'numeric', sortable: true, filter: true },

        { field: 'delta', header: 'Delta ON.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaFloat', header: 'Delta float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaInt', header: 'Delta Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaBool', header: 'Delta Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaDateTime', header: 'Delta Date Heure', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'vFloat', header: 'Val. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vInt', header: 'Val. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBool', header: 'Val. Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStr', header: 'Val. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTime', header: 'Val. Date Heure', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStamp', header: 'Val. Stamp', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vDefault', header: 'Val. Default On', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vFloatDefault', header: 'Val. Def. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vIntDefault', header: 'Val. Def. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBoolDefault', header: 'Val. Def. Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStrDefault', header: 'Val. Def. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTimeDefault', header: 'Val. Def. D.H', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStampDefault', header: 'Val. Def. Stamp', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'counter', header: 'Compteur ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'counterType', header: 'Type Compteur', dataType: 'numeric', sortable: true, filter: true },

        { field: 'mesure', header: 'Mesure ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mesureMin', header: 'Mesure Min.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesureMax', header: 'Mesure Max.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'measureUnit', header: 'Mesure Unité', dataType: 'numeric', sortable: true, filter: true },

        { field: 'mqtt_topic', header: 'MQTT TOPIC', dataType: 'text', sortable: true, filter: true },
        { field: 'webhook', header: 'WEBHOOK', dataType: 'text', sortable: true, filter: true },

        { field: 'laboratory', header: 'Laboratoire ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'formula', header: 'Formule ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'formCalculus', header: 'Formule Calc.', dataType: 'text', sortable: true, filter: true },
        { field: 'formProcessing', header: 'Formule Processing', dataType: 'numeric', sortable: true, filter: true },

        { field: 'error', header: 'Erreur ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'errorMsg', header: 'Msg. Erreur', dataType: 'text', sortable: true, filter: true },
        { field: 'errorStamp', header: 'Stamp Erreur', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'alarmEnable', header: 'Alarme ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'alarm', header: 'Alarme', dataType: 'numeric', sortable: true, filter: true },

        { field: 'persOffsetEnable', header: 'Pers. Offset  ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetFloat', header: 'Pers. Offset Fl.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persOffsetInt', header: 'Pers. Offset Int', dataType: 'numeric', sortable: true, filter: true },

        { field: 'persOffsetBool', header: 'Pers. Offset Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetDateTime', header: 'Pers. Offset D.H.', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true },
        { field: 'list', header: 'Liste', dataType: 'numeric', sortable: true, filter: true },
    ];



    const exportColumnsStyle = {
        0: { halign: 'right', valign: 'middle', fontSize: 8, cellPadding: 1, minCellWidth: 20, cellWidth: 'wrap' }, // id //fillColor: [0, 255, 0]
        1: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        2: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        3: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' },
        4: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }, // localisation
        5: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        6: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        7: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },   // country
        8: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        9: { halign: 'right', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'wrap' }, // ville
        10: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        11: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        12: { halign: 'left', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        13: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        14: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' },
        15: { halign: 'center', valign: 'top', fontSize: 8, cellPadding: 1, minCellWidth: 10, cellWidth: 'auto' }
    }



    return (<>

        <Table
            title='Tags'
            prefix='tags'
            defaultParams={new TagsModel().getStandardParam([{ field: 'company', order: 1 },{ field: 'machine', order: 1 },{ field: 'name', order: 1 }], TagsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={exportColumnsStyle}
            services={TagsService}
        />

    </>)

};

export default Tags;
