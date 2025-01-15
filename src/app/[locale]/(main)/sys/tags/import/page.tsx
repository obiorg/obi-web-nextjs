'use client'


import TableImport from '@/src/obi/components/Tables/TableImport';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import { TagsService } from '@/src/obi/service/tags/TagsService';


// export const metadata: Metadata = {
//     title: "Tags 🏷 - Import",
//     description: "Import data tags",
// };

const TagsImport = () => {
    return (<>
        <TableImport
            params={(new TagsModel().getStandardParam({ field: 'name', order: 1 }, TagsService.defaultFilters()))}
            services={TagsService}
        />
    </>)
}

export default TagsImport;