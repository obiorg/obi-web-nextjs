

import { OBI } from "@/src/types/obi";
import { TagsModel } from "../../models/tags/TagsModel";




    // Define the shape of the form errors Tags
    interface TagsFormErrors {
        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];
        entity?: string[];
        designation?: string[];
        builded?: string[];
        main?: string[];
        activated?: string[];
        logoPath?: string[];
        location?: string[];
    }

    // Define the shape of the form state
    interface TagsFormState {
        errors: TagsFormErrors;
    }

    // Define the props that the PostForm component expects
    interface TagsPostFormProps {
        formAction: any; // The action to perform when the form is submitted
        type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
        initialData: {
            // The initial data for the form fields
            id: number;
            deleted: boolean;
            created: Date;
            changed: Date;

            entity: string;
            designation: string;
            builded: boolean;
            main: number;
            activated: boolean;
            logoPath: string;
            location: number;
        };
    }

    // Define an interface for the form state
    interface TagsPostFormState {
        errors: {
            id?: string[];
            deleted?: string[];
            created?: string[];
            changed?: string[];
            entity?: string[];
            designation?: string[];
            builded?: string[];
            main?: string[];
            activated?: string[];
            logoPath?: string[];
            location?: string[];
            _form?: string[];
        };
    }




export const TagsService = {

    /**
     * Find catalogs specified by lazy parameters
     * Recover all catalog based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns catalogs table.
     */
    async getLazy(lazy: any): Promise<any> {
        const url = process.env.httpPath + '/tags/lazy/' + lazy.lazyEvent;
        // console.log(JSON.parse(lazy.lazyEvent))
        // console.log(url)
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                // console.log('Promise resolved and HTTP status is successful');
                const dataset: any[] = await res.json();
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
                    url: url,
                    status: 500,
                });
            }
        }
    },


    /**
     * Count the number of catalogs in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of catalogs
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/tags/lazy/count/' + lazy.lazyEvent;
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                const val = await res.json();
                const dataset: any = val;
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
                const dataset: any = val;
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


    async getByIds(ids: any) {
        const url = process.env.httpPath + '/tags/in/' + ids;
        try {
            const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
            if (res.ok) {
                const val = await res.json();
                const dataset: any = val;
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
        formState: TagsFormState,
        formData: FormData | any): Promise<TagsFormState> {

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
        const dataset: TagsFormState = await res.json();
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

    async createMany(data: any[]): Promise<any[]> {

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
        const dataset: TagsFormState[] = await res.json();
        return dataset;

    },


    async update(
        formState: TagsFormState,
        formData: FormData | any): Promise<TagsFormState> {


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
        const dataset: TagsFormState = await res.json();
        return dataset;


    },


    async updateMany(
        data: any[]): Promise<any[]> {

        const url = process.env.httpPath + '/tags/update';
        // console.log(data);
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
        const dataset: any = await res.json();
        return dataset;

    },



    async delete(id: any): Promise<TagsFormState> {


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
        const dataset: TagsFormState = await res.json();
        return dataset;


    },

    async deleteMany(
        data: any[]): Promise<any[]> {

        const url = process.env.httpPath + '/tags/delete';
        // console.log(data);
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
        const dataset: any = await res.json();
        return dataset;

    },

    async download(lazy: any): Promise<any[]> {
        const url = process.env.httpPath + '/tags/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: any[] = await res.json();
        return dataset;
    },

};
