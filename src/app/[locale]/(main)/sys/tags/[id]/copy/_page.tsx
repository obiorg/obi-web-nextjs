// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { TagsService } from '@/src/obi/service/tags/TagsService';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';
import PostForm from '../../components/post-form';



const model = new TagsModel();

interface TagsCopyProps {
    params: any,
    // updatePost: (id: string, data: OBI.Localisations.Location) => void;
}

// Defining a new page, server component PostsEdit
const TagsCopy = ({ params }: TagsCopyProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [catalog, setCatalog] = useState();
    let m = new TagsModel();
    useEffect(() => {
        // Fetch the post from the database
        TagsService.getById(id).then((data) => {
            if (data.status) {
                // If there was an error, display the error message
                console.error(data.message);
            } else {
                // If the post was successfully fetched, set it as the current location
                setCatalog(() => {
                    return {
                        ...data,
                    }
                });

            }
        })
    }, [id]);




    return (<>
        {catalog ?
            <PostForm formAction={TagsService.create}
                type={2}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default TagsCopy;