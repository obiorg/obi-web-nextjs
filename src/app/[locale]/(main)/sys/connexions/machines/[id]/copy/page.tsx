// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import PostForm from '../../components/post-form';
import { OBI } from '@/src/types/obi';


const model = new MachinesModel();

interface MachineCopyProps {
    params: any,
}

// Defining a new page, server component PostsEdit
const MachineCopy = ({ params }: MachineCopyProps) => {
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

export default MachineCopy;