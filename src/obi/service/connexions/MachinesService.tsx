// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/index";
import { MachinesModel } from "@/src/obi/models/connexions/MachinesModel";

export const MachinesService = {

    async getLazy(lazy: any) {
         console.log('MachinesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
         console.log('lazyEvent : ', lazy.lazyEvent);
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


    async add(dataset: any) {
        console.log('MachinesService : add >> entity : ', JSON.stringify(dataset));
        const url = process.env.httpPath + '/connexions/machines';

        await fetch(
            url,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(dataset),
                // Adding headers to the request 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(async (res) => {
            if (res.statusCode === 200) {
                // return res.json();
                console.log("Success");
                console.log("res", res.json());
            } else if (res.statusCode === 400) {
                console.log("Bad Request");
                console.log("res", res.json());
            } else {
                // console.log("Not manage error status code : " + res.statusCode);
                const result = await Promise.resolve(res.json());
                console.log("res", result);
                return await result;
            }

        }).then(async (res) => {

            const result = await Promise.resolve(res);
            console.log("res", result);
            return result;

        }).catch(err => {
            console.log('err', err);
        });
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
