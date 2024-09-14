// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.
'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import { LocationsService } from '@/src/obi/service/localisations/LocationsService';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';
import PostForm from '../../components/post-form';
import { OBI } from '@/src/types/obi';


const model = new LocationsModel();

interface LocationUpdateProps {
    params: model.defaults
    // updatePost: (id: string, data: OBI.Localisations.Location) => void;
}

// Defining a new page, server component PostsEdit
const LocationUpdate = ({ params }: LocationUpdateProps) => {
    // Receives params as a prop, which includes the id of the post to be edited.
    const { id } = params;

    const [location, setLocation] = useState();
    let m = new LocationsModel();
    useEffect(() => {
        // Fetch the post from the database
        LocationsService.getById(id).then((data) => {
            if (data.status) {
                // If there was an error, display the error message
                console.error(data.message);
            } else {
                // If the post was successfully fetched, set it as the current location
                setLocation(data);

            }
        })
    }, [id]);




    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                {/* // renders a PostForm component, passing the updateAction as the form action and the post data 
                // as the initial data */}
                {location ?
                    <PostForm formAction={LocationsService.update}
                        type={1}
                        initialData={location}
                    />
                    : null}
            </div>
        </main>
    );
};

export default LocationUpdate;