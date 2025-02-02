// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import { useEffect, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { TagsListContentsModel } from '@/src/obi/models/tags/TagsListContentsModel';
import { TagsListContentsService } from '@/src/obi/service/tags/TagsListContentsService';
import PostForm from '../../components/post-form';


const model = new TagsListContentsModel();

interface TagsListContentsUpdateProps {
    params: any
}

// Defining a new page, server component PostsEdit
const TagsListContentsUpdate = ({ params }: TagsListContentsUpdateProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [catalog, setCatalog] = useState();
    let m = new TagsListContentsModel();
    useEffect(() => {
        // Fetch the post from the database
        TagsListContentsService.getById(id).then((data) => {
            if (data.status) {
                // If there was an error, display the error message
                console.error(data.message);
            } else {
                // If the post was successfully fetched, set it as the current catalog
                setCatalog(data);

            }
        })
    }, [id]);




    return (<>
        {catalog ?
            <PostForm formAction={TagsListContentsService.update}
                type={1}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default TagsListContentsUpdate;