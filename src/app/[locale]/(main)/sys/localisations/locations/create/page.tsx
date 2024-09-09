'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { OBI } from '@/src/types/obi';
import { Skeleton } from 'primereact/skeleton';
import { CompaniesService } from '@/src/obi/service/businesses/CompaniesService';


import '@/src/styles/obi/obi.scss';
import { CompaniesModel } from '@/src/obi/models/businesses/CompaniesModel';
import { MachinesModel } from '@/src/obi/models/connexions/MachinesModel';
import { InputNumber } from 'primereact/inputnumber';
import { MachinesDriversService } from '@/src/obi/service/connexions/MachinesDriversService';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { Editor } from 'primereact/editor';
import Link from 'next/link';



import { useForm, Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

import { Model } from '@/src/obi/models/model';
import { InputUtil } from '@/src/obi/utilities/InputUtil';

import { scrollIntoViewHelper } from '@/src/obi/utilities/helpers/scrollIntoViewHelper';
import { creatorServiceHelper } from '@/src/obi/utilities/helpers/creatorServiceHelper';
import { MachinesService } from '@/src/obi/service/connexions/MachinesService';



import { useFormState } from "react-dom"
import PostForm from '../components/post-form';
import { LocationsService } from '@/src/obi/service/localisations/LocationsService';
import { LocationsModel } from '@/src/obi/models/localisations/LocationsModel';





const PostCreate = () => {
    return (
        <div className="card">
            {/* // Renders a PostForm component, passing the createPost action as the form action 
                // and an initial data object with empty title and content. */}
            <PostForm formAction={LocationsService.createPost} 
                        type={0}
                        initialData={new LocationsModel()} 
                        />

        </div>
    );
};

export default PostCreate;
