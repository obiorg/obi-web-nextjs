// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/index";
import { MachinesModel } from "@/src/obi/models/connexions/MachinesModel";

export const MachinesService = {

    async getLazy(lazy: any) {
        // console.log('MachinesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/connexions/machines/lazy/' + lazy.lazyEvent;
        //console.log('MachinesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.machines[] = await res.json();
        // console.log('MachinesService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('MachinesService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/connexions/machines/lazy/count/' + lazy.lazyEvent;
        // console.log('MachinesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('MachinesService : get', val);
        const dataset: OBI.machines = val; //await res.json();
        // console.log('MachinesService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const machinesModel = new MachinesModel();
        return machinesModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const machinesModel = new MachinesModel();
        return machinesModel.toDefaultFilters();
    }
};
