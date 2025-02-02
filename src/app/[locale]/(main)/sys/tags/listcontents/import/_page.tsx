'use client'


import React from 'react';
import { TagsListContentsService } from '@/src/obi/service/tags/TagsListContentsService';
import { TagsListContentsModel } from '@/src/obi/models/tags/TagsListContentsModel';
import TableImport from '@/src/obi/components/Tables/TableImport';

const TagsListContentsImport = () => {
    return (<>
        <TableImport
            params={(new TagsListContentsModel().getStandardParam(
                { field: 'id', order: 1 },
                TagsListContentsService.defaultFilters()))}
            services={TagsListContentsService}
        />
    </>)
}

export default TagsListContentsImport;