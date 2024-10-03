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
            { headers: { 'Cache-Control': 'no-cache' } },
        ).then((res: any) => res.json());
    },

    
    async findAll() {
        // console.log('try findAll')
        const res = await fetch(
            process.env.httpPath + '/persistences',
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const swapis: OBI.persistences[] = await res.json();
        //    console.log(swapis);
        //        console.log("res.data", res.then((d) => d.data as Admin.Entreprise[]));
        return swapis;
    },


    

    /**
     * Find persistences specified by lazy parameters
     * Recover all location based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns persistences table.
     */
    async getLazy(lazy: any): Promise<OBI.persistences[]> {
        const url = process.env.httpPath + '/persistences/lazy/' + lazy.lazyEvent;
        console.log(JSON.parse(lazy.lazyEvent))
        console.log(url)
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.persistences[] = await res.json();
        // console.log("Persistences dataset", dataset);
        return dataset;
    },


    /**
     * Count the number of persistences in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of persistences
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/persistences/lazy/count/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.persistences = val;
        return val;
    },

    async getById(id: any) {
        const url = process.env.httpPath + '/persistences/' + id;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.persistences = val;
        return val;
    },


    defaultMultiSortMeta(): any {
        const persistencesModel = new PersistencesModel();
        return persistencesModel.toMultiSortMeta();
    },

    defaultFilters(): any {
        const persistencesModel = new PersistencesModel();
        return persistencesModel.toDefaultFilters();
    },





    /**
     * 
     * @param formState 
     * @param formData 
     * @returns 
     */
    async create(
        formState: OBI.PersistencesFormState,
        formData: FormData): Promise<OBI.PersistencesFormState> {


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


        const url = process.env.httpPath + '/persistences';


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
        // console.log("PersistencesService response", res);
        const dataset: OBI.PersistencesFormState = await res.json();
        // console.log('PersistencesService >> result from api persistences ', dataset);
        return dataset;

    },


    async update(
        formState: OBI.PersistencesFormState,
        formData: FormData): Promise<OBI.PersistencesFormState> {


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


        const url = process.env.httpPath + '/persistences/' + data.id;


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
        // console.log("PersistencesService response", res);
        const dataset: OBI.PersistencesFormState = await res.json();
        // console.log('PersistencesService >> result from api persistences ', dataset);
        return dataset;


    },


    async delete(id: any): Promise<OBI.PersistencesFormState> {


        const url = process.env.httpPath + '/persistences/' + id;

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
        console.log("PersistencesService response", res);
        const dataset: OBI.PersistencesFormState = await res.json();
        // console.log('PersistencesService >> result from api persistences ', dataset);
        return dataset;


    },

    async download(lazy: any): Promise<OBI.persistences[]> {
        const url = process.env.httpPath + '/persistences/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.persistences[] = await res.json();
        // console.log("Persistences dataset", dataset);
        return dataset;
    },
};
