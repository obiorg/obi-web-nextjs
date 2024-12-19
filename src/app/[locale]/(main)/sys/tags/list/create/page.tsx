'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { LocationsService } from '@/src/obi/service/localisat/LocationsService';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';





const LocationCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={LocationsService.create} 
                        type={0}
                        initialData={new LocationsModel()} 
                        />

        </div>
    );
};

export default LocationCreate;
