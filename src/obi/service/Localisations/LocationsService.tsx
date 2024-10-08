// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { LocationsModel } from "../../models/localisations/LocationsModel";




export const LocationsService = {

    /**
     * Find locations specified by lazy parameters
     * Recover all location based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns locations table.
     */
    async getLazy(lazy: any): Promise<OBI.locations[]> {
        const url = process.env.httpPath + '/localisations/locations/lazy/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.locations[] = await res.json();
        // console.log("Locations dataset", dataset);
        return dataset;
    },


    /**
     * Count the number of locations in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of locations
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/localisations/locations/lazy/count/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.locations = val;
        return val;
    },

    async getById(id: any) {
        const url = process.env.httpPath + '/localisations/locations/' + id;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.locations = val;
        return val;
    },


    defaultMultiSortMeta(): any {
        const model = new LocationsModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new LocationsModel();
        return model.toDefaultFilters();
    },



    /**
     * 
     * @param formState 
     * @param formData 
     * @returns 
     */
    async create(
        formState: OBI.LocationsFormState,
        formData: FormData): Promise<OBI.LocationsFormState> {


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


        const url = process.env.httpPath + '/localisations/locations';


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
        const dataset: OBI.LocationsFormState = await res.json();
        // console.log('LocationsService >> result from api locations ', dataset);
        return dataset;

    },


    async update(
        formState: OBI.LocationsFormState,
        formData: FormData): Promise<OBI.LocationsFormState> {


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


        const url = process.env.httpPath + '/localisations/locations/' + data.id;


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
        const dataset: OBI.LocationsFormState = await res.json();
        // console.log('LocationsService >> result from api locations ', dataset);
        return dataset;


    },


    async delete(id: any): Promise<OBI.LocationsFormState> {


        const url = process.env.httpPath + '/localisations/locations/' + id;

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
        const dataset: OBI.LocationsFormState = await res.json();
        // console.log('LocationsService >> result from api locations ', dataset);
        return dataset;


    },

    async download(lazy: any): Promise<OBI.locations[]> {
        const url = process.env.httpPath + '/localisations/locations/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.locations[] = await res.json();
        // console.log("Locations dataset", dataset);
        return dataset;
    },

};
