'use client';


import '@/src/styles/obi/obi.scss';


import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import { MachinesService } from '@/src/obi/service/connexions/MachinesService';
import PostForm from '../components/post-form';





const MachineCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={MachinesService.create} 
                        type={0}
                        initialData={new MachinesModel()} 
                        />

        </div>
    );
};

export default MachineCreate;
