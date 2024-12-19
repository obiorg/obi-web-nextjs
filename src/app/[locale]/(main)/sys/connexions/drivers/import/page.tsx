'use client'


import React from 'react';
import { LocationsService } from '@/src/obi/service/localisations/LocationsService';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';
import TableImport from '@/src/obi/components/Tables/TableImport';

const LocationsImport = () => {
    return (<>
        <TableImport 
            params = {(new LocationsModel().getStandardParam({ field: 'location', order: 1 }, LocationsService.defaultFilters()))}
            services={LocationsService}
            />
    </>)
}

export default LocationsImport;