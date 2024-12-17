// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { TagsModel } from "../../models/tags/TagsModel";
import { create } from "domain";




export const TagsService = {

    /**
     * Find tags specified by lazy parameters
     * Recover all location based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns tags table.
     */
    async getLazy(lazy: any): Promise<any> {
        const url = process.env.httpPath + '/tags/lazy/' + lazy.lazyEvent;
        console.log(JSON.parse(lazy.lazyEvent))
        // console.log(url)
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                console.log('Promise resolved and HTTP status is successful');
                const dataset: OBI.tags[] = await res.json();
                return dataset;
            } else {
                // console.error('Promise resolved but HTTP status failed');
                Promise.reject({ status: res.status, message: res.status });
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                // For any other server error
                throw new Error(`HTTP status ${res.status} error`);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                // console.log('There was a SyntaxError', error);

            } else {
                // console.log('There was an error', error);
                // Promise.reject(error);
                return ({
                    name: 'Fetching',
                    message: 'Check OAP API is running or database is reachable',
                    error: error,
                    status: 500,
                });
            }
        }
    },


    /**
     * Count the number of tags in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of tags
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/tags/lazy/count/' + lazy.lazyEvent;
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                const val = await res.json();
                const dataset: OBI.tags = val;
                return val;
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                // For any other server error
                throw new Error(`HTTP status ${res.status} error`);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log('There was a SyntaxError', error);
            } else {
                // console.log('There was an error', error);
                // Promise.reject(error);
                return JSON.stringify({ error: error });
            }
        }
    },

    async getById(id: any) {
        const url = process.env.httpPath + '/tags/' + id;
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                const val = await res.json();
                const dataset: OBI.tags = val;
                return val;
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                // For any other server error
                throw new Error(`HTTP status ${res.status} error`);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log('There was a SyntaxError', error);
            } else {
                // console.log('There was an error', error);
                // Promise.reject(error);

                return JSON.stringify({ error: error });
            }
        }
    },


    defaultMultiSortMeta(): any {
        const model = new TagsModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new TagsModel();
        return model.toDefaultFilters();
    },



    /**
     * 
     * @param formState 
     * @param formData 
     * @returns 
     */
    async create(
        formState: any,
        formData: FormData | any): Promise<any> {

        // console.log('formData', formData);
        let data: any;

        if (formData.id) {
            data = formData;
        } else {
            data = {
                id: undefined, //(formData.get("id") === '') ? undefined : Number(formData.get("id")),
                deleted: formData.get("deleted") === "true",
                created: formData.get("created"),
                changed: formData.get("changed"),

                location: formData.get("location"),
                designation: formData.get("designation"),
                group: formData.get("group"),
                country: (formData.get("country") === '') ? undefined : Number(formData.get("country")),
                state: (formData.get("state") === '') ? undefined : Number(formData.get("state")),
                city: (formData.get("city") === '') ? undefined : Number(formData.get("city")),
                address: formData.get("address"),
                address1: formData.get("address1"),
                address3: formData.get("address3"),
                bloc: formData.get("bloc"),
                floor: (formData.get("floor") === '') ? undefined : Number(formData.get("floor")),
                number: formData.get("number"),
            };
        }
        // console.log(data);
        // console.log(formState);


        const url = process.env.httpPath + '/tags';


        const res = await fetch(
            url,
            {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(data), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
            }
        )
        // console.log("TagsService response", res);
        const dataset: any = await res.json();
        // console.log('TagsService >> result from api tags ', dataset);
        return dataset;

    },

    async processAll(formState: any, datas: any): Promise<any> {
        let res: any = [];
        datas.forEach((row:any, index:any) => {
            TagsService.create(formState, row).then((res_row) => {
                console.log('res_row', res_row, 'res', res);
                res.push(res_row);
                console.log('res_row', res_row, 'res', res);
            })
        })

        return res;
    },

    async createMany(
        formState: any[],
        data: any[]): Promise<any[]> {
        
            console.log('TagsService createMany', data, formState);
        const url = process.env.httpPath + '/tags/create';

        const res = await fetch(
            url,
            {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(data), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
            }
        )
        // console.log("TagsService response", res);
        const dataset: any = await res.json();
        console.log('TagsService >> result from api tags ', dataset);
        return dataset;

    },


    async update(
        formState: any,
        formData: FormData | any): Promise<any> {


        let data = {
            id: (formData.get("id") === '') ? undefined : Number(formData.get("id")),
            deleted: formData.get("deleted") === "on",
            created: formData.get("created"),
            changed: formData.get("changed"),

            location: formData.get("location"),
            designation: formData.get("designation"),
            group: formData.get("group"),
            country: (formData.get("country") === '') ? undefined : Number(formData.get("country")),
            state: (formData.get("state") === '') ? undefined : Number(formData.get("state")),
            city: (formData.get("city") === '') ? undefined : Number(formData.get("city")),
            address: formData.get("address"),
            address1: formData.get("address1"),
            address3: formData.get("address3"),
            bloc: formData.get("bloc"),
            floor: (formData.get("floor") === '') ? undefined : Number(formData.get("floor")),
            number: formData.get("number"),
        };
        // console.log(data);
        // console.log(formState);


        const url = process.env.httpPath + '/tags/' + data.id;


        const res = await fetch(
            url,
            {
                method: "PUT",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify(data), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
            }
        )
        // console.log("TagsService response", res);
        const dataset: any = await res.json();
        // console.log('TagsService >> result from api tags ', dataset);
        return dataset;


    },


    async delete(id: any): Promise<any> {


        const url = process.env.httpPath + '/tags/' + id;

        const res = await fetch(
            url,
            {
                method: "DELETE",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Cache-Control': 'no-cache'
                },
            }
        )
        console.log("TagsService response", res);
        const dataset: any = await res.json();
        // console.log('TagsService >> result from api tags ', dataset);
        return dataset;


    },

    async download(lazy: any): Promise<OBI.tags[]> {
        const url = process.env.httpPath + '/tags/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.tags[] = await res.json();
        // console.log("Tags dataset", dataset);
        return dataset;
    },

};
