'use client';
import React, { useEffect, useRef, useState } from 'react';


import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { TagsTablesService } from '@/src/obi/service/tags/TagsTablesService';
import { TagsTablesModel } from '@/src/obi/models/tags/TagsTablesModel';





const TagsTablesCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={TagsTablesService.create} 
                        type={0}
                        initialData={new TagsTablesModel()} 
                        />

        </div>
    );
};

export default TagsTablesCreate;
