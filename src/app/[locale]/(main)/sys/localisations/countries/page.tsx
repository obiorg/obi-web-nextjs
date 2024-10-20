'use client';
import { useState } from 'react';

import Table from '@/src/obi/components/Tables/Table';
import { LocationsCountriesModel } from '@/src/obi/models/localisations/LocationsCountriesModel';
import { LocationsCountriesService } from '@/src/obi/service/localisations/LocationsCountriesService';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const SubRegions = () => {


    // Manage columns
    const [columns, setColumns]: OBI.ColumnMeta[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'iso3', header: 'iso3', dataType: 'text', sortable: true, filter: true },
        { field: 'numeric_code', header: 'Code Numerique', dataType: 'text', sortable: true, filter: true },
        { field: 'iso2', header: 'iso2', dataType: 'text', sortable: true, filter: true },
        { field: 'phonecode', header: 'Préfixe (Tel.)', dataType: 'text', sortable: true, filter: true },
        { field: 'capital', header: 'Capitale', dataType: 'text', sortable: true, filter: true },
        { field: 'currency', header: 'Money', dataType: 'text', sortable: true, filter: true },
        { field: 'currency_name', header: 'Money Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'currency_symbol', header: 'Money Symbol', dataType: 'text', sortable: true, filter: true },
        { field: 'tld', header: 'TLD', dataType: 'text', sortable: true, filter: true },
        { field: 'native', header: 'Native', dataType: 'text', sortable: true, filter: true },
        { field: 'region', header: 'Id Continent', dataType: 'text', sortable: true, filter: true },
        { field: 'region_id', header: 'Continent', dataType: 'text', bodyTemplate: templateHelper.regions, sortable: true, filter: true, filterField: "region_id", showFilterMatchModes: false, filterPlaceholder: 'Continent...', filterElement: sysComponentsHelper.regions_lazyFilter },
        { field: 'subregion', header: 'Id SR', dataType: 'text', sortable: true, filter: true },
        { field: 'subregion_id', header: 'Sous-régions', dataType: 'text', bodyTemplate: templateHelper.subregions, sortable: true, filter: true, filterField: "subregion_id", showFilterMatchModes: false, filterPlaceholder: 'Sous-régions...', filterElement: sysComponentsHelper.subregions_lazyFilter },

        { field: 'nationality', header: 'Nationalités', dataType: 'text', sortable: true, filter: true },
        { field: 'timezones', header: 'Time Zones', dataType: 'text', sortable: true, filter: true },
        { field: 'translations', header: 'Traduction', dataType: 'text', sortable: true, filter: true },
        { field: 'latitude', header: 'latitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'longitude', header: 'longitude', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'emoji', header: 'emoji', dataType: 'text', sortable: true, filter: true },
        { field: 'emojiU', header: 'emojiU', dataType: 'text', sortable: true, filter: true },

        { field: 'created_at', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'updated_at', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'flag', header: 'drapeau', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'wikiDataId', header: 'Wiki Data Id', dataType: 'text', sortable: true, filter: true },


    ]);



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
            title='Pays'
            prefix='countries'
            defaultParams={new LocationsCountriesModel().getStandardParam({ field: 'name', order: 1 }, LocationsCountriesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={exportColumnsStyle}
            services={LocationsCountriesService}
        />

    </>)

};

export default SubRegions;
