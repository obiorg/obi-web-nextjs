// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { BusinessesModel } from "../../models/businesses/BusinessesModel";



export const BusinessesService = {


    async getLazy(lazy: any) {
        // console.log('BusinessesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/businesses/lazy/' + lazy.lazyEvent;
        //console.log('BusinessesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.entities[] = await res.json();
        // console.log('BusinessesService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('BusinessesService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/businesses/lazy/count/' + lazy.lazyEvent;
        // console.log('BusinessesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('BusinessesService : get', val);
        const dataset: OBI.entities = val; //await res.json();
        // console.log('BusinessesService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const model = new BusinessesModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new BusinessesModel();
        return model.toDefaultFilters();
    }
};
