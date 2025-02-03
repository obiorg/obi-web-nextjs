'use client';

import Table from '@/src/obi/components/Tables/Table';
import { Button } from '@/src/obi/components/Validations/Button';
import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react';




const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const PersistencesPage = () => {

    const activate = (rowData: any) => {
        return <i className={
            classNames('pi', {
                'true-icon pi-check text-green-600': rowData?.activate,
                'false-icon pi-times text-red-600': !rowData?.activate
            })} />;
    }

    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.deleted, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', body: templateHelper.datetimeCreated, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },
        { field: 'changed', header: 'Changé', dataType: 'date', body: templateHelper.datetimeChanged, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center', minWidth: '10rem' } },

        { field: 'company', header: 'Société', dataType: 'numeric', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Société...', filterElement: sysComponentsHelper.company_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'tag', header: 'Tag', dataType: 'numeric', bodyTemplate: templateHelper.tag, sortable: true, filter: true, filterField: "tag", showFilterMatchModes: false, filterPlaceholder: 'Tags...', filterElement: sysComponentsHelper.tags_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },
        { field: 'method', header: 'Méthode', dataType: 'numeric', bodyTemplate: templateHelper.persistencesMethod, sortable: true, filter: true, filterField: "method", showFilterMatchModes: false, filterPlaceholder: 'Méthode...', filterElement: sysComponentsHelper.persistencesMethods_lazyFilter, style: { textAlign: 'left', minWidth: '20rem' } },

        { field: 'activate', header: 'Activé', dataType: "boolean", body: activate, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'comment', header: 'comment', dataType: 'text', sortable: true, filter: true, style: { textAlign: 'left', minWidth: '20rem' } },

    ]);

    const extensionMenu = <React.Fragment>
        {/* Pick  */}
        <Link href='./pick' >
            {/* <Button
                label='Pick' 
                icon='pi pi-code'
                className='mr-2'
                tooltip='Pick Method'
                tooltipOptions={{ position: 'bottom' }}
            /> */}
        </Link>


    </React.Fragment>;

    return (<>

        <Table
            title='Persistences'
            prefix='persistences'
            defaultParams={new PersistencesModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'tag', order: 1 }, { field: 'method', order: 1 }, { field: 'created', order: -1 }], PersistencesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={PersistencesService}
            componentLeft={extensionMenu}
        />

    </>)

};


export default PersistencesPage;
