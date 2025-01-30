'use client'


import React from 'react';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';
import TableImport from '@/src/obi/components/Tables/TableImport';

const PersistencesImport = () => {
    return (<>
        <TableImport
            params={(new PersistencesModel().getStandardParam({ field: 'tag', order: 1 }, PersistencesService.defaultFilters()))}
            services={PersistencesService}
        />
    </>)
}

export default PersistencesImport;