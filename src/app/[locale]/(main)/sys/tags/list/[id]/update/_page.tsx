// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import { useEffect, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { TagsListModel } from '@/src/obi/models/tags/TagsListModel';
import { TagsListService } from '@/src/obi/service/tags/TagsListService';
import PostForm from '../../components/post-form';




interface TagsListUpdateProps {
    params: any
}

// Defining a new page, server component PostsEdit
const TagsListUpdate = ({ params }: TagsListUpdateProps) => {
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
                setCatalog(data);

            }
        })
    }, [id]);




    return (<>
        {catalog ?
            <PostForm formAction={TagsListService.update}
                type={1}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default TagsListUpdate;