// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import { useEffect, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import PostForm from '../../components/post-form';





interface PersistencesUpdateProps {
    params: any
}

// Defining a new page, server component PostsEdit
const PersistencesUpdate = ({ params }: PersistencesUpdateProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [catalog, setCatalog] = useState();
    let m = new PersistencesModel();
    useEffect(() => {
        // Fetch the post from the database
        PersistencesService.getById(id).then((data) => {
            if (data.status) {
                // If there was an error, display the error message
                console.error(data.message);
            } else {
                // If the post was successfully fetched, set it as the current location
                setCatalog(data);

            }
        })
    }, [id]);




    return (<>
        {catalog ?
            <PostForm formAction={PersistencesService.update}
                type={1}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default PersistencesUpdate;