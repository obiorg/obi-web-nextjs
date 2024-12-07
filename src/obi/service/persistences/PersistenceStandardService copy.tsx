// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { PersistencesStandardsModel } from "@/src/obi/models/persistences/PersistencesStandardsModel";


export const PersistenceStandardService = {


    /**
     * 
     * @returns data of storage tank 4
     */
    count() {
        return fetch(process.env.httpPath + '/persistences/standards/count',
            {
                headers: { 'Cache-Control': 'no-cache' }
            },
        ).then((res: any) => res.json());
    },

    async countTag(tag: number) {
        const res = await fetch(process.env.httpPath + '/persistences/standards/tags/' + tag + '/count', { headers: { 'Cache-Control': 'no-cache' } });
        return await res.json();
    },

    async findByTags(tag: number, offset: number, limit: number, sort: string) {
        const res =
            await fetch(process.env.httpPath + '/persistences/standards/tags/' + tag + '/offset/' + offset + '/limit/' + limit + '/sort/' + sort
                , { headers: { 'Cache-Control': 'no-cache' } }
            );
        return await res.json();
    },









    /**
        * Find persistences standard specified by lazy parameters
        * Recover all location based on lazy parameter structured as fitler model 
        * primeract
        * @param lazy is configured parameter defined as primereact
        * @returns persistences standard table.
        */
    async getLazy(lazy: any): Promise<OBI.pers_standard[]> {
        const url = process.env.httpPath + '/persistences/standards//lazy/' + lazy.lazyEvent;
        console.log(JSON.parse(lazy.lazyEvent))
        console.log(url)
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.pers_standard[] = await res.json();
        // console.log("Persistences dataset", dataset);
        return dataset;
    },


    /**
     * Count the number of persistences standard in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of persistences standard
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/persistences/standards//lazy/count/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.pers_standard = val;
        return val;
    },

    async getById(id: any) {
        const url = process.env.httpPath + '/persistences/standards//' + id;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.pers_standard = val;
        return val;
    },


    defaultMultiSortMeta(): any {
        const model = new PersistencesStandardsModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new PersistencesStandardsModel();
        return model.toDefaultFilters();
    },



    /**
     * 
     * @param formState 
     * @param formData 
     * @returns 
     */
    async create(
        formState: OBI.PersistencesStandardsFormState,
        formData: FormData): Promise<OBI.PersistencesStandardsFormState> {


        let data = {
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
        // console.log(data);
        // console.log(formState);


        const url = process.env.httpPath + '/persistences/standards/';


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
        // console.log("LocationsService response", res);
        const dataset: OBI.PersistencesStandardsFormState = await res.json();
        // console.log('LocationsService >> result from api persistences standard ', dataset);
        return dataset;

    },


    async update(
        formState: OBI.PersistencessStandardsFormState,
        formData: FormData): Promise<OBI.PersistencesStandardsFormState> {


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


        const url = process.env.httpPath + '/persistences/standards//' + data.id;


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
        // console.log("LocationsService response", res);
        const dataset: OBI.PersistencesStandardsFormState = await res.json();
        // console.log('LocationsService >> result from api persistences standard ', dataset);
        return dataset;


    },


    async delete(id: any): Promise<OBI.PersistencesStandardsFormState> {


        const url = process.env.httpPath + '/persistences/standards//' + id;

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
        console.log("LocationsService response", res);
        const dataset: OBI.PersistencesStandardsFormState = await res.json();
        // console.log('LocationsService >> result from api persistences standard ', dataset);
        return dataset;


    },

    async download(lazy: any): Promise<OBI.pers_standard[]> {
        const url = process.env.httpPath + '/persistences/standards//download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.pers_standard[] = await res.json();
        // console.log("Persistences dataset", dataset);
        return dataset;
    },
};
