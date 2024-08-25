// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { TagsModel } from "@/src/obi/models/tags/TagsModel";


export const TagsService = {

    
    async getLazy(lazy: any) {
        const url = process.env.httpPath + '/tags/lazy/' + lazy.lazyEvent;
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        // console.log(res)
        const dataset: OBI.tags[] = await res.json();
        if(res.ok) {
            return dataset;
        }else{
            return [{error: true, message: res.statusText}];
        }
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/tags/lazy/count/' + lazy.lazyEvent;
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        const dataset: OBI.tags = val; 
        return val;
    },


    async findAll() {
        const res = await fetch(
            process.env.httpPath + '/tags',
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const swapis: OBI.tags[] = await res.json();
        return swapis;
    },



    defaultMultiSortMeta(): any {
        const tagsModel = new TagsModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return tagsModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const tagsModel = new TagsModel();
        //console.log('Analyse Data Model', analyseDataModel.toMultiSortMeta());
        return tagsModel.toDefaultFilters();
    }
};
