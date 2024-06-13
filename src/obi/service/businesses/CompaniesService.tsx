// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { CompaniesModel } from "../../models/businesses/CompaniesModel";



export const CompaniesService = {


    async getLazy(lazy: any) {
        // console.log('CompaniesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/companies/lazy/' + lazy.lazyEvent;
        //console.log('CompaniesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        if (res.ok) {
            const dataset: OBI.companies[] = await res.json();
            // console.log('CompaniesService >> result from api mach_drivers ', dataset);
            return dataset;
        } else {
            return [];
        }
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('CompaniesService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/companies/lazy/count/' + lazy.lazyEvent;
        // console.log('CompaniesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('CompaniesService : get', val);
        const dataset: OBI.companies = val; //await res.json();
        // console.log('CompaniesService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const companiesModel = new CompaniesModel();
        return companiesModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const companiesModel = new CompaniesModel();
        return companiesModel.toDefaultFilters();
    }
};
