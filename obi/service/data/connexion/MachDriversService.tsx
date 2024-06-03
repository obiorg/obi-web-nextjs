// import { OBI } from '@/types';

import { Demo } from "@/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/types/obi";
import { MachDriversdModel } from "@/obi/models/data/connexion/MachDriversModel";
// import { PersistenceStandardModel } from "@/obi/models/PersistenceStandardModel";


export const MachDriversService = {








    async getLazy(lazy: any) {
        // console.log('MachDriversService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/data/connexion/mach_drivers/lazy/' + lazy.lazyEvent;
        //console.log('MachDriversService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.mach_drivers[] = await res.json();
        // console.log('MachDriversService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('MachDriversService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/data/connexion/mach_drivers/lazy/count/' + lazy.lazyEvent;
        // console.log('MachDriversService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('MachDriversService : get', val);
        const dataset: OBI.mach_drivers = val; //await res.json();
        // console.log('MachDriversService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const machDriversModel = new MachDriversdModel();
        return machDriversModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const machDriversModel = new MachDriversdModel();
        return machDriversModel.toDefaultFilters();
    }
};
