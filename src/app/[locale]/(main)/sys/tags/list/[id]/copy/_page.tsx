// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { TagsListService } from '@/src/obi/service/tags/TagsListService';
import { TagsListModel } from '@/src/obi/models/tags/TagsListModel';
import PostForm from '../../components/post-form';



interface TagsListCopyProps {
    params: any
}

// Defining a new page, server component PostsEdit
const TagsListCopy = ({ params }: TagsListCopyProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [catalog, setCatalog] = useState();
    let m = new TagsListModel();
    useEffect(() => {
        // Fetch the post from the database
        TagsListService.getById(id).then((data) => {
            if (data.status) {
                // If there was an error, display the error message
                console.error(data.message);
            } else {
                // If the post was successfully fetched, set it as the current catalog
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
            <PostForm formAction={TagsListService.create}
                type={2}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default TagsListCopy;