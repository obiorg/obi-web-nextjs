// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { PersistencesModel } from "../../models/persistences/PersistencesModel";



export const PersistencesService = {

    /**
     * 
     * @returns data of storage tank 4
     */
    count() {
        return fetch(process.env.httpPath + '/persistences/count',
            {
                headers: { 'Cache-Control': 'no-cache' }
            },
        ).then((res: any) => res.json());
    },


    async getLazy(lazy: any) {
        // console.log('PersistenceStandardService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/persistences/lazy/' + lazy.lazyEvent;
        //console.log('PersistenceStandardService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.persistences[] = await res.json();
        // console.log('PersistenceStandardService >> result from api persistences ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('PersistenceStandardService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/persistences/lazy/count/' + lazy.lazyEvent;
        // console.log('PersistenceStandardService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('PersistenceStandardService : get', val);
        const dataset: OBI.persistences = val; //await res.json();
        // console.log('PersistenceStandardService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },


    async findAll() {
        const res = await fetch(
            process.env.httpPath + '/persistences',
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const swapis: OBI.persistences[] = await res.json();
        //    console.log(swapis);
        //        console.log("res.data", res.then((d) => d.data as Admin.Entreprise[]));
        return swapis;
    },



    defaultMultiSortMeta(): any {
        const persistencesModel = new PersistencesModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return persistencesModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const persistencesModel = new PersistencesModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return persistencesModel.toDefaultFilters();
    }
};
