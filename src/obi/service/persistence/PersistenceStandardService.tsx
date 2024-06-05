// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { PersistenceStandardModel } from "@/src/obi/models/PersistenceStandardModel";


export const PersistenceStandardService = {


    // getCustomersMedium() {
    //     return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data as Demo.Customer[]);
    // },

    // getCustomersLarge() {
    //     return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data as Demo.Customer[]);
    // },


    /**
     * 
     * @returns data of storage tank 4
     */
    count() {
        return fetch(process.env.httpPath + '/pers_standard/count',
            {
                headers: { 'Cache-Control': 'no-cache' }
            },
        ).then((res: any) => res.json());
    },

    async countTag(tag: number) {
        const res = await fetch(process.env.httpPath + '/pers_standard/tags/' + tag + '/count', { headers: { 'Cache-Control': 'no-cache' } });
        return await res.json();
    },

    async findByTags(tag: number, offset: number, limit: number, sort: string) {
        const res =
            await fetch(process.env.httpPath + '/pers_standard/tags/' + tag + '/offset/' + offset + '/limit/' + limit + '/sort/' + sort
                , { headers: { 'Cache-Control': 'no-cache' } }
            );
        return await res.json();
    },





    async getLazy(lazy: any) {
        // console.log('PersistenceStandardService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/pers_standard/lazy/' + lazy.lazyEvent;
        //console.log('PersistenceStandardService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.pers_standard[] = await res.json();
        // console.log('PersistenceStandardService >> result from api pers_standard ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('PersistenceStandardService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/pers_standard/lazy/count/' + lazy.lazyEvent;
        // console.log('PersistenceStandardService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('PersistenceStandardService : get', val);
        const dataset: OBI.pers_standard = val; //await res.json();
        // console.log('PersistenceStandardService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },


    async findAll() {
        const res = await fetch(
            process.env.httpPath + '/pers_standard',
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const swapis: OBI.pers_standard[] = await res.json();
        //    console.log(swapis);
        //        console.log("res.data", res.then((d) => d.data as Admin.Entreprise[]));
        return swapis;
    },



    defaultMultiSortMeta(): any {
        const persistenceStandardModel = new PersistenceStandardModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return persistenceStandardModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const persistenceStandardModel = new PersistenceStandardModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return persistenceStandardModel.toDefaultFilters();
    }
};
