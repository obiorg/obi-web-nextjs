// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { LocationsStatesModel } from "../../models/localisations/LocationsStatesModel";




export const StatesService = {

    /**
     * Find states specified by lazy parameters
     * Recover all states based on lazy parameter structured as fitler model 
     * primeract
     * @param lazy is configured parameter defined as primereact
     * @returns states table.
     */
    async getLazy(lazy: any): Promise<OBI.loc_states[]> {
        const url = process.env.httpPath + '/localisations/states/lazy/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const dataset: OBI.loc_states[] = await res.json();
        console.log("State dataset", dataset);
        return dataset;
    },


    /**
     * Count the number of states in lazy way
     * @param lazy is configured parameter defined as primereact
     * @returns number of states
     */
    async getLazyCount(lazy: any) {
        const url = process.env.httpPath + '/localisations/states/lazy/count/' + lazy.lazyEvent;
        const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } })
        const val = await res.json();
        const dataset: OBI.loc_states = val;
        return val;
    },




    defaultMultiSortMeta(): any {
        const model = new LocationsStatesModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new LocationsStatesModel();
        return model.toDefaultFilters();
    },



    /**
     * 
     * @param formState 
     * @param formData 
     * @returns 
     */
    async createPost(
        formState: OBI.StatesPostFormState,
        formData: FormData): Promise<OBI.StatesPostFormState> {


        // Validate the form data against the post schema
        // If the form data does not match the schema, the safeParse method returns an object
        // with a success property of false and an error property containing the validation errors.
        // If the form data matches the schema, the safeParse method returns an object
        // with a success property of true and a data property containing the validated data.
        // const result = postSchema.safeParse({
        //     entity: formData.get("entity"),
        //     designation: formData.get("designation"),
        // });


        // console.log("result", result.error);
        // console.log('StatesService : createPost >> formData : ', formData);
        // console.log('StatesService : createPost >> formState : ', formState);


        // // If validation fails, return the errors
        // if (!result.success) {
        //     return {
        //         // The flatten method is used to convert the validation errors into a flat object structure
        //         // that can be easily displayed in the form.
        //         errors: result.error.flatten().fieldErrors,
        //     };
        // }


        let data = {
            id: (formData.get("id") === '') ? undefined : Number(formData.get("id")),
            deleted: formData.get("deleted") === "true",
            created: formData.get("created"),
            changed: formData.get("changed"),

            location: formData.get("location"),
            designation: formData.get("designation"),
            group: formData.get("group"),
            country: formData.get("country"),
            state: formData.get("state"),
            city: formData.get("city"),
            address: formData.get("address"),
            address1: formData.get("address1"),
            address3: formData.get("address3"),
            bloc: formData.get("bloc"),
            floor: (formData.get("floor") === '') ? undefined : Number(formData.get("floor")),
            number: formData.get("number"),
        };



        const url = process.env.httpPath + '/localisations/states';
        //console.log('MachinesService : getLay >> url : ', url);
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
        console.log("StatesService response", res);
        const dataset: OBI.StatesPostFormState = await res.json();
        console.log('StatesService >> result from api entities ', dataset);
        return dataset;




        // Validate the form data against the post schema
        // If the form data does not match the schema, the safeParse method returns an object
        // with a success property of false and an error property containing the validation errors.
        // If the form data matches the schema, the safeParse method returns an object
        // with a success property of true and a data property containing the validated data.
        // const result = postSchema.safeParse({
        //     title: formData.get("title"),
        //     content: formData.get("content"),
        // });

        // // If validation fails, return the errors
        // if (!result.success) {
        //     return {
        //         // The flatten method is used to convert the validation errors into a flat object structure
        //         // that can be easily displayed in the form.
        //         errors: result.error.flatten().fieldErrors,
        //     };
        // }



        // let post: Post;
        // try {
        //     // If validation passes, create a new post in the database
        //     post = await db.post.create({
        //         data: {
        //             title: result.data.title,
        //             content: result.data.content,
        //         },
        //     });
        // } catch (error: unknown) {
        //     // If there's an error, return it
        //     if (error instanceof Error) {
        //         return {
        //             errors: {
        //                 _form: [error.message],
        //             },
        //         };
        //     } else {
        //         return {
        //             errors: {
        //                 _form: ["Something went wrong"],
        //             },
        //         };
        //     }
        // }

        // // Revalidate the path and redirect to the home page
        // revalidatePath("/");
        // redirect("/");

        // return ;
    },



};
