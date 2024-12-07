'use client';

import Table from '@/src/obi/components/Tables/Table';
import { PersistencesStandardsModel } from '@/src/obi/models/persistences/PersistencesStandardsModel';
import { PersistencesStandardsService } from '@/src/obi/service/persistences/PersistencesStandardsService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { OBI } from '@/src/types/obi';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const PersistencesStandards = () => {


    const [columns, setColumns] = useState<OBI.ColumnMeta[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.analysesCategories_lazyFilter },
        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tag...', filterElement: sysComponentsHelper.tags_lazyFilter },

        { field: 'vFloat', header: 'Val. Décimal', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },
        { field: 'vInt', header: 'Val. Entier', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'vBool', header: 'Val. Etat', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'vStr', header: 'Texte', dataType: 'text', sortable: true, filter: true },
        { field: 'vDateTime', header: 'Timing', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'vStamp', header: 'Instant', dataType: 'date', sortable: true, filter: true },
        { field: 'stampStart', header: 'Début', dataType: 'date', sortable: true, filter: true },
        { field: 'stampEnd', header: 'Fin', dataType: 'date', sortable: true, filter: true },

        { field: 'tbf', header: 'TBF', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },
        { field: 'ttr', header: 'TTR', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.floatFilterTemplate, style: { textAlign: 'right' } },

        { field: 'error', header: 'Erreur', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'errorMsg', header: 'Message Err.', dataType: 'text', sortable: true, filter: true },

    ]);



    return (<>

        <Table
            title='Persistences - Standard'
            prefix='persistences_standards'
            defaultParams={new PersistencesStandardsModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'created', order: -1 }], PersistencesStandardsService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={PersistencesStandardsService}
        />

        <div className="flex justify-content-between align-items-center">

            <div className='row mb-3'>
                <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
                    <div className='flex justify-content-center mb-0'>
                        <Link href="./chart" className='mr-2'>
                            <Button label="Graph" icon="pi pi-chart-line" severity="secondary" className=" mr-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>)

};

export default PersistencesStandards;
