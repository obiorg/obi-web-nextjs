

import { OBI } from "@/src/types/obi";
import { TagsListModel } from "../../models/tags/TagsListModel";
import { ZodHelper } from "../../utilities/helpers/zodHelper";




// Define the shape of the form errors TagsLists
interface TagsListsFormErrors {
    id?: string[];
    deleted?: string[];
    created?: string[];
    changed?: string[];


    company?: string[];
    type?: string[];
    list?: string[];
    designation?: string[];
    comment?: string[];

    companies?: string[][];
    tags_lists_types?: string[][];

}

// Define the shape of the form state
interface TagsListsFormState {
    errors: TagsListsFormErrors;
}

// Define the props that the PostForm component expects
interface TagsListsPostFormProps {
    formAction: any; // The action to perform when the form is submitted
    type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
    initialData: {
        // The initial data for the form fields
        id: number;
        deleted: boolean;
        created: Date;
        changed: Date;



        company: number,
        type: number,
        list: number,
        designation: string,
        comment: string,

        companies: {},
        tags_lists_types: {},
    };
}

// Define an interface for the form state
interface TagsListsPostFormState {
    errors: {
        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];

        company?: string[];
        type?: string[];
        list?: string[];
        designation?: string[];
        comment?: string[];

        companies?: string[][];
        tags_lists_types?: string[][];

        _form?: string[];
    };
}




export const TagsListsService = {

    /**
     * Find catalogs specified by lazy parameters
     * Recover all catalog based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns catalogs table.
     */
    async getLazy(lazy: any): Promise<any> {
        const url = process.env.httpPath + '/tags/listcontents/lazy/' + lazy.lazyEvent;
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
        const url = process.env.httpPath + '/tags/listcontents/lazy/count/' + lazy.lazyEvent;
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
        const url = process.env.httpPath + '/tags/listcontents/' + id;
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
        const model = new TagsListModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new TagsListModel();
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

        // From default model adapt values
        let model = (new TagsListModel());
        let data: any = model.defaults;
        let dataType: any = model.type;

        // Transmited data
        let defaults: any = {};
        for (const [key, value] of formData) {
            // console.log(`default >> ${key}: ${value}\n`);
            defaults[key] = value;
        }

        for (const [key, value] of formData) {
            // console.log(`process >> ${key}: ${value}\n`);
            data[key] = value;


            // Change all string number to Number
            if (dataType[key] === Number) {
                data[key] = value === '' ? undefined : Number(value);
                // console.log(`key ${key} is a number and value is ${value} \n`);
            }

        }
        // console.log('TagsListService >> data', data);
        delete data.compagnies;
        delete data.tags_lists_types;

        // Define URL
        const url = process.env.httpPath + '/tags/list';

        // Fetch data from API
        try {
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

            // On success
            if (res.ok) {
                // console.log('Promise resolved and HTTP status is successful');
                const dataset: any = await res.json();
                return dataset;
            }
            // On fail !
            else {
                let datas: any = await res.json();
                // console.log(datas);
                let dataset: any = {};
                if (datas.issues !== undefined && datas.issues.length > 0) {
                    dataset = { errors: ZodHelper.issuesFlatten(datas.issues[0].unionErrors, 0) };
                    dataset['error'] = {};
                    dataset['error'].message = datas.issues[0].code;
                    dataset['error'].stack = datas.issues[0].message;
                } else {
                    dataset = datas;
                }
                dataset['status'] = res.status;
                dataset['message'] = res.statusText;
                return dataset;
            }



        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error);

            } else {
                console.log('There was an error', error);
                // Promise.reject(error);
                return ({
                    name: 'Fetching',
                    message: 'Check OAP API is running or database is reachable',
                    error: error,
                    // errors: datas,
                    url: url,
                    status: 500,
                });
            }
        }

    },

    async processAll(formState: any, datas: any): Promise<any> {
        let res: any = [];
        datas.forEach((row: any, index: any) => {
            TagsListsService.create(formState, row).then((res_row) => {
                console.log('res_row', res_row, 'res', res);
                res.push(res_row);
                console.log('res_row', res_row, 'res', res);
            })
        })

        return res;
    },

    async createMany(data: any[]): Promise<any> {

        const url = process.env.httpPath + '/tags/list/create';

        // Fetch data from API
        try {
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

            // On success
            if (res.ok) {
                // console.log('Promise resolved and HTTP status is successful');
                const dataset: any = await res.json();
                return dataset;
            }
            // On fail !
            else {
                let datas: any = await res.json();
                // console.log(datas);
                let dataset: any = {};
                if (datas.issues !== undefined && datas.issues.length > 0) {
                    dataset = { errors: ZodHelper.issuesFlatten(datas.issues[0].unionErrors, 0) };
                    dataset['error'] = {};
                    dataset['error'].message = datas.issues[0].code;
                    dataset['error'].stack = datas.issues[0].message;
                } else {
                    dataset = datas;
                }
                dataset['status'] = res.status;
                dataset['message'] = res.statusText;
                return dataset;
            }



        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error);

            } else {
                console.log('There was an error', error);
                // Promise.reject(error);
                return ({
                    name: 'Fetching',
                    message: 'Check OAP API is running or database is reachable',
                    error: error,
                    // errors: datas,
                    url: url,
                    status: 500,
                });
            }
        }

    },


    async update(
        formState: any,
        formData: FormData | any): Promise<any> {

        // From default model adapt values
        let model = (new TagsListModel());
        let data: any = model.defaults;
        let dataType: any = model.type;

        // Transmited data
        let defaults: any = {};
        for (const [key, value] of formData) {
            // console.log(`default >> ${key}: ${value}\n`);
            defaults[key] = value;
        }

        for (const [key, value] of formData) {
            // console.log(`process >> ${key}: ${value}\n`);
            data[key] = value;


            // Change all string number to Number
            if (dataType[key] === Number) {
                data[key] = value === '' ? undefined : Number(value);
                // console.log(`key ${key} is a number and value is ${value} \n`);
            }

        }
        // console.log('TagsListService >> data', data);
        delete data.compagnies;
        delete data.tags_lists_types;


        const url = process.env.httpPath + '/tags/list/' + data.id;


        // Fetch data from API
        try {
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

            // On success
            if (res.ok) {
                console.log('Promise resolved and HTTP status is successful');
                const dataset: any = await res.json();
                return dataset;
            }
            // On fail !
            else {
                let datas: any = await res.json();
                console.log(datas);
                let dataset: any = {};
                if (datas.issues !== undefined && datas.issues.length > 0) {
                    dataset = { errors: ZodHelper.issuesFlatten(datas.issues[0].unionErrors, 0) };
                    dataset['error'] = {};
                    dataset['error'].message = datas.issues[0].code;
                    dataset['error'].stack = datas.issues[0].message;
                } else {
                    dataset = datas;
                }
                dataset['status'] = res.status;
                dataset['message'] = res.statusText;
                return dataset;
            }



        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error);

            } else {
                console.log('There was an error', error);
                // Promise.reject(error);
                return ({
                    name: 'Fetching',
                    message: 'Check OAP API is running or database is reachable',
                    error: error,
                    // errors: datas,
                    url: url,
                    status: 500,
                });
            }
        }


    },


    async updateMany(
        data: any[]): Promise<any[]> {

        const url = process.env.httpPath + '/tags/list/update';
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



    async delete(id: any): Promise<TagsListsFormState> {


        const url = process.env.httpPath + '/tags/list/' + id;

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
        const dataset: any = await res.json();
        return dataset;


    },

    async deleteMany(
        data: any[]): Promise<any[]> {

        const url = process.env.httpPath + '/tags/list/delete';
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
        const url = process.env.httpPath + '/tags/listcontents/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: any[] = await res.json();
        return dataset;
    },

};
