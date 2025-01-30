'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { TagsListService } from '@/src/obi/service/tags/TagsListService';
import { TagsListModel } from '@/src/obi/models/tags/TagsListModel';





const TagsListCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={TagsListService.create}
                type={0}
                initialData={new TagsListModel()}
            />

        </div>
    );
};

export default TagsListCreate;
