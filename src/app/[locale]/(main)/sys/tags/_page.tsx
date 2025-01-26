'use client';

import Table from '@/src/obi/components/Tables/Table';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { classNames } from 'primereact/utils';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const TagsPage = () => {


    const deltaDateTime = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.deltaDateTime);
    }

    const vDateTime = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.vDateTime);
    }

    const vStamp = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.vStamp);
    }

    const vDateTimeDefault = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.vDateTimeDefault);
    }

    const vStampDefault = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.vStampDefault);
    }

    const errorStamp = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.errorStamp);
    }

    const persOffsetDateTime = (rowData: any) => {
        return templateHelper.datetimeObj(rowData.persOffsetDateTime);
    }


    const deleted = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-red-600': rowData?.deleted,
                'false-icon pi-times text-green-600': !rowData?.deleted
            })} />;
    }


    const mqtt = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.mqtt,
                'false-icon pi-times text-red-600': !rowData?.mqtt
            })} />;
    }

    const workbook = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.workbook,
                'false-icon pi-times text-red-600': !rowData?.workbook
            })} />;
    }

    const active = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.active,
                'false-icon pi-times text-red-600': !rowData?.active
            })} />;
    }

    const delta = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.delta,
                'false-icon pi-times text-red-600': !rowData?.delta
            })} />;
    }

    const vBool = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.vBool,
                'false-icon pi-times text-red-600': !rowData?.vBool
            })} />;
    }

    const vDefault = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.vDefault,
                'false-icon pi-times text-red-600': !rowData?.vDefault
            })} />;
    }

    const counter = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.counter,
                'false-icon pi-times text-red-600': !rowData?.counter
            })} />;
    }

    const mesure = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.mesure,
                'false-icon pi-times text-red-600': !rowData?.mesure
            })} />;
    }

    const laboratory = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.laboratory,
                'false-icon pi-times text-red-600': !rowData?.laboratory
            })} />;
    }

    const formula = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.formula,
                'false-icon pi-times text-red-600': !rowData?.formula
            })} />;
    }

    const error = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.error,
                'false-icon pi-times text-red-600': !rowData?.error
            })} />;
    }

    const alarmEnable = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.alarmEnable,
                'false-icon pi-times text-red-600': !rowData?.alarmEnable
            })} />;
    }

    const persOffsetEnable = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.persOffsetEnable,
                'false-icon pi-times text-red-600': !rowData?.persOffsetEnable
            })} />;
    }


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.deleted, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', body: templateHelper.datetimeCreated, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },
        { field: 'changed', header: 'Changé', dataType: 'date', body: templateHelper.datetimeChanged, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter, style: { textAlign: 'center', minWidth: '15rem' } },

        { field: 'table', header: 'Table', dataType: 'numeric', bodyTemplate: templateHelper.tagsTable, sortable: true, filter: true, filterField: "table", showFilterMatchModes: false, filterPlaceholder: 'Table...', filterElement: sysComponentsHelper.tagsTables_lazyFilter, style: { textAlign: 'center', minWidth: '16rem' } },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },


        { field: 'machine', header: 'Machines', dataType: 'numeric', bodyTemplate: templateHelper.machine, sortable: true, filter: true, filterField: "machine", showFilterMatchModes: false, filterPlaceholder: 'Machines...', filterElement: sysComponentsHelper.machines_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'type', header: 'Types', dataType: 'numeric', bodyTemplate: templateHelper.tagsType, sortable: true, filter: true, filterField: "type", showFilterMatchModes: false, filterPlaceholder: 'Types...', filterElement: sysComponentsHelper.tagsTypes_lazyFilter, style: { textAlign: 'left', minWidth: '10rem' } },


        { field: 'memory', header: 'Mémoire', dataType: 'numeric', bodyTemplate: templateHelper.tagsMemory, sortable: true, filter: true, filterField: "memory", showFilterMatchModes: false, filterPlaceholder: 'Mémoires...', filterElement: sysComponentsHelper.tagsMemories_lazyFilter, style: { textAlign: 'left', minWidth: '5rem' } },
        { field: 'db', header: 'DB', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '5rem' } },
        { field: 'byte', header: 'Byte', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '5rem' } },
        { field: 'bit', header: 'Bit', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '5rem' } },

        { field: 'active', header: 'Activé.', dataType: "boolean", body: active, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'cycle', header: 'Cycle', dataType: 'numeric', sortable: true, filter: true },

        { field: 'delta', header: 'Delta ON.', dataType: "boolean", body: delta, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaFloat', header: 'Delta float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaInt', header: 'Delta Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'deltaBool', header: 'Delta Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'deltaDateTime', header: 'Delta Date Heure', dataType: 'date', body: deltaDateTime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'vFloat', header: 'Val. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vInt', header: 'Val. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBool', header: 'Val. Bool', dataType: "boolean", body: templateHelper.vBool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStr', header: 'Val. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTime', header: 'Val. Date Heure', dataType: 'date', body: vDateTime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStamp', header: 'Val. Stamp', dataType: 'date', body: vStamp, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vDefault', header: 'Val. Default On', dataType: "boolean", body: templateHelper.vDefault, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vFloatDefault', header: 'Val. Def. Float', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vIntDefault', header: 'Val. Def. Int', dataType: 'numeric', sortable: true, filter: true },
        { field: 'vBoolDefault', header: 'Val. Def. Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStrDefault', header: 'Val. Def. Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTimeDefault', header: 'Val. Def. D.H', dataType: 'date', body: vDateTimeDefault, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'vStampDefault', header: 'Val. Def. Stamp', dataType: 'date', body: vStampDefault, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },


        { field: 'counter', header: 'Compteur ON', dataType: "boolean", body: templateHelper.counter, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'counterType', header: 'Type Compteur', dataType: 'numeric', sortable: true, filter: true },

        { field: 'mesure', header: 'Mesure ON', dataType: "boolean", body: templateHelper.mesure, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mesureMin', header: 'Mesure Min.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'mesureMax', header: 'Mesure Max.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'measureUnit', header: 'Mesure Unité', dataType: 'numeric', bodyTemplate: templateHelper.measureUnit, sortable: true, filter: true, filterField: "measureUnit", showFilterMatchModes: false, filterPlaceholder: 'Unité de mesure...', filterElement: sysComponentsHelper.measuresUnits_lazyFilter },

        { field: 'mqtt_topic', header: 'MQTT TOPIC', dataType: 'text', sortable: true, filter: true },
        { field: 'webhook', header: 'WEBHOOK', dataType: 'text', sortable: true, filter: true },

        { field: 'laboratory', header: 'Laboratoire ON', dataType: "boolean", body: templateHelper.laboratory, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },

        { field: 'formula', header: 'Formule ON', dataType: "boolean", body: templateHelper.formula, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'formCalculus', header: 'Formule Calc.', dataType: 'text', sortable: true, filter: true },
        { field: 'formProcessing', header: 'Formule Processing', dataType: 'numeric', sortable: true, filter: true },

        { field: 'error', header: 'Erreur ON', dataType: "boolean", body: templateHelper.error, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'errorMsg', header: 'Msg. Erreur', dataType: 'text', sortable: true, filter: true },
        { field: 'errorStamp', header: 'Stamp Erreur', dataType: 'date', body: errorStamp, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'alarmEnable', header: 'Alarme ON', dataType: "boolean", body: templateHelper.alarmEnable, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'alarm', header: 'Alarme', dataType: 'numeric', bodyTemplate: templateHelper.alarm, sortable: true, filter: true, filterField: "alarm", showFilterMatchModes: false, filterPlaceholder: 'Alarme...', filterElement: sysComponentsHelper.alarms_lazyFilter },


        { field: 'persOffsetEnable', header: 'Pers. Offset  ON', dataType: "boolean", body: templateHelper.persOffsetEnable, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetFloat', header: 'Pers. Offset Fl.', dataType: 'numeric', sortable: true, filter: true },
        { field: 'persOffsetInt', header: 'Pers. Offset Int', dataType: 'numeric', sortable: true, filter: true },

        { field: 'persOffsetBool', header: 'Pers. Offset Bool', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'persOffsetDateTime', header: 'Pers. Offset D.H.', dataType: 'date', body: persOffsetDateTime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'comment', header: 'Commentaire', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'list', header: 'Liste', dataType: 'numeric', bodyTemplate: templateHelper.tagsList, sortable: true, filter: true, filterField: "list", showFilterMatchModes: false, filterPlaceholder: 'Liste...', filterElement: sysComponentsHelper.tagsLists_lazyFilter, style: { textAlign: 'left', minWidth: '10rem' } },

    ]);


    return (<>

        <Table
            title='Tags'
            prefix='tags'
            defaultParams={new TagsModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'machine', order: 1 }, { field: 'name', order: 1 }], TagsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={TagsService}
        />

    </>)

};

export default TagsPage;
