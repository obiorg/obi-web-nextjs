'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { TagsService } from '@/src/obi/service/tags/TagsService';
import { TagsModel } from '@/src/obi/models/tags/TagsModel';



const TagsCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={TagsService.create}
                type={0}
                initialData={new TagsModel()}
            />

        </div>
    );
};

export default TagsCreate;
