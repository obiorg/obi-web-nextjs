'use client'


import React from 'react';
import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import TableImport from '@/src/obi/components/Tables/TableImport';
import { useTranslations } from 'next-intl';

const MachinesImport = () => {

    const g = useTranslations('global');
    const t = useTranslations('connectionMachine');
    return (<>
        <TableImport
            title={t('import.table.title')}
            params={(new MachinesModel().getStandardParam({ field: 'name', order: 1 }, MachinesService.defaultFilters()))}
            services={MachinesService}
        />
    </>)
}

export default MachinesImport;