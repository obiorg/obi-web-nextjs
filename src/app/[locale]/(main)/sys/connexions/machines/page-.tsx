'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableFilterMeta, DataTableSortMeta } from 'primereact/datatable';
import { Column, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { Button } from 'primereact/button';

import { Admin, OBI } from '@/src/types/index';

import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import TableHeader from '@/src/obi/components/Tables/TableHeader';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import TableToolbar from '@/src/obi/components/Tables/TableToolbar';


import DialogError from '@/src/obi/components/Dialog/DialogError';
import { ContextMenu } from 'primereact/contextmenu';
import { useRouter } from 'next/navigation';
import Table from '@/src/obi/components/Tables/Table';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Machines = () => {


    const mqttPasswordtemplate = (rowData: any) => {
        let p = '*';
        for (let i = 0; i < rowData.mqtt_password?.length; i++)
            p += '*';
        return <label>{p}</label>
    }

    const webhookSecretetemplate = (rowData: any) => {
        let p = '*';
        for (let i = 0; i < rowData.webhook_secret?.length; i++)
            p += '*';
        return <label>{p}</label>
    }


    
    // Manage columns
    const [columns, setColumns]: any[] = useState([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },
        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

        { field: 'company', header: 'Société', dataType: 'text', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Chercher une société', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'mask', header: 'Mask', dataType: 'text', sortable: true, filter: true },
        { field: 'dns', header: 'DNS', dataType: 'text', sortable: true, filter: true },
        { field: 'ipv6', header: 'IPv6', dataType: 'text', sortable: true, filter: true },
        { field: 'port', header: 'Port', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'rack', header: 'Rack', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'slot', header: 'Slot', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'driver', header: 'Driver', dataType: 'text', bodyTemplate: templateHelper.driver, sortable: true, filter: true, filterField: "driver", showFilterMatchModes: false, filterPlaceholder: 'Chercher par driver', filterElement: sysComponentsHelper.machines_drivers_lazyFilter },
        { field: 'mqtt', header: 'MQTT ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mqtt_user', header: 'MQTT Utilisateur', dataType: 'text', sortable: true, filter: true },
        { field: 'mqtt_password', header: 'MQTT Password', dataType: 'text', bodyTemplate: mqttPasswordtemplate, sortable: true, filter: true },
        { field: 'webhook', header: 'Webhook ON', dataType: "boolean", body: templateHelper.bool, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'webhook_secret', header: 'Webhook Secret', dataType: 'text', bodyTemplate: webhookSecretetemplate, sortable: true, filter: true },
        { field: 'bus', header: 'Bus', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'center' } },
        { field: 'description', header: 'Description', dataType: 'text', sortable: true, filter: true },

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
            title='Machines'
            prefix='machines'
            defaultParams={new MachinesModel().getStandardParam({ field: 'address', order: 1 }, MachinesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={exportColumnsStyle}
            services={MachinesService}
        />

    </>)

};

export default Machines;
