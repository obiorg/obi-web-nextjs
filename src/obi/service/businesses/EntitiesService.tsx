// import { OBI } from '@/types';

import { Demo } from "@/src/types";

import path from 'path';
import fs from 'fs';
import https from 'https';
import { OBI } from "@/src/types/obi";
import { EntitiesModel } from "../../models/businesses/EntitiesModel";



// Import the Zod library for validation
import { z } from "zod";

// Define a schema for the post using Zod
const postSchema = z.object({
    // id: z.number(),
    //deleted: z.boolean(),
    // created: z.date(),
    // changed: z.date(),
    entity: z.string().min(3),
    designation: z.string().min(3),
    builded: z.number().int().min(4),
    main: z.boolean(),
    activated: z.boolean(),
    logoPath: z.string().url(),
    location: z.string(),

});

export const EntitiesService = {


    async getLazy(lazy: any) {
        // console.log('MachinesService : getLazy >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/entities/lazy/' + lazy.lazyEvent;
        //console.log('MachinesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const dataset: OBI.entities[] = await res.json();
        // console.log('MachinesService >> result from api mach_drivers ', dataset);
        return dataset;
    },


    /**
     * Get Count using Lazy filter
     */
    async getLazyCount(lazy: any) {
        // console.log('EntitiesService : getLazyCount >> lazyEvent : ', lazy.lazyEvent);
        const url = process.env.httpPath + '/businesses/entities/lazy/count/' + lazy.lazyEvent;
        // console.log('EntitiesService : getLay >> url : ', url);
        const res = await fetch(
            url,
            { headers: { 'Cache-Control': 'no-cache' } }
        )
        const val = await res.json();
        // console.log('EntitiesService : get', val);
        const dataset: OBI.entities = val; //await res.json();
        // console.log('EntitiesService >>> result from api persistenceStandard ', dataset[0]);
        return val;
    },




    defaultMultiSortMeta(): any {
        const model = new EntitiesModel();
        return model.toMultiSortMeta();
    },

    defaultFilters(): any {
        const model = new EntitiesModel();
        return model.toDefaultFilters();
    },




    async createPost(
        formState: OBI.EntitiesPostFormState,
        formData: FormData): Promise<OBI.EntitiesPostFormState> {


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
        // console.log('EntitiesService : createPost >> formData : ', formData);
        // console.log('EntitiesService : createPost >> formState : ', formState);


        // // If validation fails, return the errors
        // if (!result.success) {
        //     return {
        //         // The flatten method is used to convert the validation errors into a flat object structure
        //         // that can be easily displayed in the form.
        //         errors: result.error.flatten().fieldErrors,
        //     };
        // }

        const data = {
            entity: formData.get("entity"),
            designation: formData.get("designation"),
        };
        console.log('EntitiesService : createPost >> data : ', data);







        const url = process.env.httpPath + '/businesses/entities';
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
        console.log("EntitiesService response", res);
        const dataset: OBI.EntitiesPostFormState = await res.json();
        console.log('EntitiesService >> result from api entities ', dataset);
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
