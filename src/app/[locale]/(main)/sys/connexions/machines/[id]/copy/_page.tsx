// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.

import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { MachinesService } from '@/src/obi/service/connexions/MachinesService';

import PostForm from '../../components/post-form';


interface MachinesCopyProps {
    params: any,
}

// Defining a new page, server component PostsEdit
const MachinesCopy = ({ params }: MachinesCopyProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [catalog, setCatalog] = useState();

    useEffect(() => {
        // Fetch the post from the database
        MachinesService.getById(id).then((data) => {
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
            <PostForm formAction={MachinesService.create}
                type={2}
                initialData={catalog}
            />
            : null}
    </>
    );
};

export default MachinesCopy;