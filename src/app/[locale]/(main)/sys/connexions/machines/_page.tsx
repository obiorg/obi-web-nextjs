'use client';

import Table from '@/src/obi/components/Tables/Table';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import { ExportsService } from '@/src/obi/utilities/export/ExportsService';
import { useState } from 'react';



const templateHelper = require('@/src/obi/components/Tables/TemplateHelper');
const sysComponentsHelper = require('@/src/app/[locale]/(main)/sys/SysComponentsHelper');

const Machines_ = () => {


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


    const [columns, setColumns] = useState<any[]>([
        { field: 'id', header: 'ID', dataType: 'numeric', sortable: true, filter: true, filterElement: templateHelper.integerFilterTemplate, style: { textAlign: 'right' } },

        { field: 'company', header: 'Société', dataType: 'text', bodyTemplate: templateHelper.company, sortable: true, filter: true, filterField: "company", showFilterMatchModes: false, filterPlaceholder: 'Chercher une société', filterElement: sysComponentsHelper.company_lazyFilter },
        { field: 'name', header: 'Nom', dataType: 'text', sortable: true, filter: true },
        { field: 'address', header: 'Adresse', dataType: 'text', sortable: true, filter: true },
        { field: 'mask', header: 'Mask', dataType: 'text', sortable: true, filter: true },
        { field: 'dns', header: 'DNS', dataType: 'text', sortable: true, filter: true },
        { field: 'ipv6', header: 'IPv6', dataType: 'text', sortable: true, filter: true },
        { field: 'port', header: 'Port', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'rack', header: 'Rack', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'slot', header: 'Slot', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'right' } },
        { field: 'driver', header: 'Driver', dataType: 'text', bodyTemplate: templateHelper.machinesDriver, sortable: true, filter: true, filterField: "driver", showFilterMatchModes: false, filterPlaceholder: 'Chercher par driver', filterElement: sysComponentsHelper.machines_drivers_lazyFilter },
        { field: 'mqtt', header: 'MQTT ON', dataType: "boolean", body: templateHelper.mqtt, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'mqtt_user', header: 'MQTT Utilisateur', dataType: 'text', sortable: true, filter: true },
        { field: 'mqtt_password', header: 'MQTT Password', dataType: 'text', bodyTemplate: mqttPasswordtemplate, sortable: true, filter: true },
        { field: 'webhook', header: 'Webhook ON', dataType: "boolean", body: templateHelper.workbook, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'webhook_secret', header: 'Webhook Secret', dataType: 'text', bodyTemplate: webhookSecretetemplate, sortable: true, filter: true },
        { field: 'bus', header: 'Bus', dataType: 'numeric', sortable: true, filter: true, style: { textAlign: 'center' } },
        { field: 'description', header: 'Description', dataType: 'text', sortable: true, filter: true },

        { field: 'deleted', header: 'Supp.', dataType: "boolean", body: templateHelper.deleted, sortable: true, filter: true, filterElement: templateHelper.booleanFilterTemplate, style: { textAlign: 'center', minWidth: '6rem' } },
        { field: 'created', header: 'Créé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },
        { field: 'changed', header: 'Changé', dataType: 'date', bodyTemplate: templateHelper.datetime, sortable: true, filter: true, filterField: "date", filterPlaceholder: 'Insérer une date', filterElement: templateHelper.dateFilterTemplate, style: { textAlign: 'center' } },

    ]);



    return (<>

        <Table
            title='Connexions - MACHINES'
            prefix='machines'
            defaultParams={new MachinesModel().getStandardParam([{ field: 'company', order: 1 }, { field: 'driver', order: 1 }, { field: 'name', order: 1 }, { field: 'address', order: 1 }], MachinesService.defaultFilters())}
            columns={columns}
            exportColumnsStyle={ExportsService.pdfColumnsStyle(columns)}
            services={MachinesService}
        />

    </>)

};

export default Machines_;
