'use client';

import '@/src/styles/obi/obi.scss';


import PostForm from '../components/post-form';
import { PersistencesService } from '@/src/obi/service/persistences/PersistencesService';
import { PersistencesModel } from '@/src/obi/models/persistences/PersistencesModel';





const PersistencesCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={PersistencesService.create}
                type={0}
                initialData={new PersistencesModel()}
            />
        </div>
    );
};

export default PersistencesCreate;
