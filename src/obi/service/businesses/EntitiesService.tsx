// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { EntitiesModel } from "../../models/businesses/EntitiesModel";



export const EntitiesService = {


    async getLazy(lazy: any) {
        // console.log('EntitiesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/companies/lazy/' + lazy.lazyEvent;
        //console.log('EntitiesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.entities[] = await res.json();
        // console.log('EntitiesService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('EntitiesService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/companies/lazy/count/' + lazy.lazyEvent;
        // console.log('EntitiesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('EntitiesService : get', val);
        const dataset: OBI.entities = val; //await res.json();
        // console.log('EntitiesService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const model = new EntitiesModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new EntitiesModel();
        return model.toDefaultFilters();
    }
};
