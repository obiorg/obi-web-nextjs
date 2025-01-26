

import { OBI } from "@/src/types/obi";
import { TagsTablesModel } from "../../models/tags/TagsTablesModel";
import { ZodHelper } from "../../utilities/helpers/zodHelper";




// Define the shape of the form errors TagsTables
interface TagsTablesFormErrors {
    id?: string[];
    deleted?: string[];
    created?: string[];
    changed?: string[];

    company?: string[];
    table?: string[];
    designation?: string[];
    comment?: string[];

    companies?: string[][];
}

// Define the shape of the form state
interface TagsTablesFormState {
    errors: TagsTablesFormErrors;
}

// Define the props that the PostForm component expects
interface TagsTablesPostFormProps {
    formAction: any; // The action to perform when the form is submitted
    type: number; // 0: create, 1: update, 2: destroy (delete), 3: read
    initialData: {
        // The initial data for the form fields
        id: number;
        deleted: boolean;
        created: Date;
        changed: Date;


        company: number;
        table: string;
        designation: string;
        comment: string;

        companies?: {};
    };
}

// Define an interface for the form state
interface TagsTablesPostFormState {
    errors: {
        id?: string[];
        deleted?: string[];
        created?: string[];
        changed?: string[];

        company?: string[];
        table?: string[];
        designation?: string[];
        comment?: string[];

        companies?: string[][];

        _form?: string[];
    };
}




export const TagsTablesService = {

    /**
     * Find catalogs specified by lazy parameters
     * Recover all catalog based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns catalogs table.
     */
    async getLazy(lazy: any): Promise<any> {
        const url = process.env.httpPath + '/tags/tables/lazy/' + lazy.lazyEvent;
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
        const url = process.env.httpPath + '/tags/tables/lazy/count/' + lazy.lazyEvent;
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
        const url = process.env.httpPath + '/tags/tables/' + id;
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
        const model = new TagsTablesModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new TagsTablesModel();
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

        // Recover model object
        let model = (new TagsTablesModel());
        let data: any = model.defaults;
        // Recover original data type
        let dataType: any = model.type;

        // // Recover data from form
        // let dataForm: any = {};
        // for (const [key, value] of formData) {
        //     // console.log(`default >> ${key}: ${value}\n`);
        //     dataForm[key] = value;
        // }

        // Inject form data into the model
        for (const [key, value] of formData) {
            //console.log(`process >> ${key}: ${value} with dataType = ${dataType[key]}\n`);

            // Set form value
            data[key] = value;

            // Adapt form value depending on type
            //
            // Adapt Number value
            if (dataType[key] === Number) {
                data[key] = value === '' ? undefined : Number(value);
                // console.log(`key ${key} is a number and value is ${value} \n`);
            }
            // Adapt boolean value
            else if (dataType[key] === Boolean) {
                //console.log(`key ${key} is a boolean and value is ${value} \n`);
                data[key] = value === 'true' || value === '1' || value === 'on' ? true : false;
                //console.log('data['+ key + '] = ' + data[key]);
            }
        }
        delete data.companies;
        // console.log('TagsTables >> data', data);
        // console.log('TagsTables >> data stringify', JSON.stringify(data));

        // Define URL
        const url = process.env.httpPath + '/tags/tables';

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
                return JSON.parse(dataset);
            }
            // On fail !
            else {
                let datas: any = await res.json();
                console.log(datas);
                let dataset: any = {};
                if (datas.issues !== undefined && datas.issues.length > 0) {
                    if (datas.issues[0].unionErrors) {
                        dataset = { errors: ZodHelper.issuesFlatten(datas.issues[0].unionErrors, 0) };
                    } else {
                        dataset = datas;
                    }
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
            TagsTablesService.create(formState, row).then((res_row) => {
                console.log('res_row', res_row, 'res', res);
                res.push(res_row);
                console.log('res_row', res_row, 'res', res);
            })
        })

        return res;
    },

    async createMany(data: any[]): Promise<any> {

        const url = process.env.httpPath + '/tags/tables/create';

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
 
         // Recover model object
         let model = (new TagsTablesModel());
         let data: any = model.defaults;
         // Recover original data type
         let dataType: any = model.type;
 
         // // Recover data from form
         // let dataForm: any = {};
         // for (const [key, value] of formData) {
         //     // console.log(`default >> ${key}: ${value}\n`);
         //     dataForm[key] = value;
         // }
 
         // Inject form data into the model
         for (const [key, value] of formData) {
             //console.log(`process >> ${key}: ${value} with dataType = ${dataType[key]}\n`);
 
             // Set form value
             data[key] = value;
 
             // Adapt form value depending on type
             //
             // Adapt Number value
             if (dataType[key] === Number) {
                 data[key] = value === '' ? undefined : Number(value);
                 // console.log(`key ${key} is a number and value is ${value} \n`);
             }
             // Adapt boolean value
             else if (dataType[key] === Boolean) {
                 //console.log(`key ${key} is a boolean and value is ${value} \n`);
                 data[key] = value === 'true' || value === '1' || value === 'on' ? true : false;
                 //console.log('data['+ key + '] = ' + data[key]);
             }
         }

         delete data.companies;
         // console.log('TagsTables >> data', data);
         // console.log('TagsTables >> data stringify', JSON.stringify(data));
 
 
        const url = process.env.httpPath + '/tags/tables/' + data.id;


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


    async updateMany(
        data: any[]): Promise<any> {

        const url = process.env.httpPath + '/tags/tables/update';
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
        // console.log("TagsTablesService response", res);
        const dataset: any = await res.json();
        // console.log('TagsTablesService >> result from api machines ', dataset);
        return dataset;

    },



    async delete(id: any): Promise<any> {


        const url = process.env.httpPath + '/tags/tables/' + id;

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
        // console.log("TagsTablesService response", res);
        const dataset: any = await res.json();
        // console.log('TagsTablesService >> result from api machines ', dataset);
        return dataset;


    },

    async deleteMany(
        data: any[]): Promise<any[]> {

        const url = process.env.httpPath + '/tags/tables/delete';
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
        // console.log("TagsTablesService response", res);
        const dataset: any = await res.json();
        // console.log('TagsTablesService >> result from api machines ', dataset);
        return dataset;

    },


    async download(lazy: any): Promise<any[]> {
        const url = process.env.httpPath + '/tags/tables/download/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: any[] = await res.json();
        return dataset;
    },

};
