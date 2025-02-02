'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { TagsListContentsService } from '@/src/obi/service/tags/TagsListContentsService';
import { TagsListContentsModel } from '@/src/obi/models/tags/TagsListContentsModel';





const TagsListContentsCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={TagsListContentsService.create}
                type={0}
                initialData={new TagsListContentsModel()}
            />

        </div>
    );
};

export default TagsListContentsCreate;
