// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { MachinesDriversModel } from "@/src/obi/models/connexions/MachinesDriversModel";


export const MachinesDriversService = {

    async getLazy(lazy: any) {
        // console.log('MachinesDriversService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/connexions/machines/drivers/lazy/' + lazy.lazyEvent;
        //console.log('MachinesDriversService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.mach_drivers[] = await res.json();
        // console.log('MachinesDriversService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('MachinesDriversService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/connexions/machines/drivers/lazy/count/' + lazy.lazyEvent;
        // console.log('MachinesDriversService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('MachinesDriversService : get', val);
        const dataset: OBI.mach_drivers = val; //await res.json();
        // console.log('MachinesDriversService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const model = new MachinesDriversModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new MachinesDriversModel();
        return model.toDefaultFilters();
    }
};
