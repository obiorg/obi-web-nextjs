'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import ReactIcons from "../Icons/ReactIcons";
import { PersistencesStandardsService } from "../../service/persistences/PersistencesStandardsService";
import { PersistencesStandardsModel } from "../../models/persistences/PersistencesStandardsModel";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { TagsService } from "../../service/tags/TagsService";
import { NumericFormat, PatternFormat } from "react-number-format";
import FieldOutputLabel from "../Inputs/FieldOutputLabel";
import { format, formatDate } from "date-fns";
import { TagsListContentsService } from "../../service/tags/TagsListContentsService";
import Moment from "react-moment";
import 'moment-timezone';
import moment from "moment-timezone";


// Define the props that the PostForm component expects
interface DashCardCO2TanksProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component

    icon_gr: string;                        // React icon group
    icon: string; // React icon name
    tags: number[];         // Table containing tags number in the order Volume, Pression, T°middle, T°Bottom, State
    units: string[]; // Table containing units in corresponding to each tags
    patterns: string[]; // Define the patterns corresponding to each tags

    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // when change occur in mode
    error?: any; // child of formState ex: formState.erros?.location


}


export default function DashCardCO2Tanks(
    {
        id,
        name,
        icon_gr = 'md',
        icon = 'MdCo2',
        tags,
        units,
        patterns,
        onClick,
        onChange,
        error,

    }: DashCardCO2TanksProps) {



    const [volume, setVolume] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [temperatureMiddle, setTemperatureMiddle] = useState(0);
    const [temperatureBottom, setTemperatureBottom] = useState(0);
    const [state, setState] = useState('???');
    const [stateDisplayed, setStateDisplayed] = useState('???');
    const [updated, setUpdated] = useState(new Date(0));

    const [loading, setLoading] = useState(false);
    let loadLazyTimeout = useRef(null);
    const [lazyParams, setlazyParmas] =
        useState(
            new PersistencesStandardsModel().getStandardParam({ field: 'changed', order: -1 }, PersistencesStandardsService.defaultFilters()));



    /**
     * Get value listed by tags
     */
    const getValue = () => {

        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }


        //initiate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            // Get Lazy Data
            TagsService.getByIds(tags).then((data: any) => {
                // console.log('tag : ' + tags[cursor] + ' cursor : ' + cursor + ' = ', data)
                if (data.status && data.status !== 200) {
                    // console.log(data.status + ' in DashCardCO2Tanks reading tag ' + tags[cursor]);
                    console.log('DashCardCO2Tanks >> Error', data);
                    return 0;
                } else {
                    // console.log('DashCardCO2Tanks >> success', data);

                    data.forEach(tag => {
                        tags.forEach(tagId => {
                            if (tagId === tag.id) {
                                switch (tags.indexOf(tagId)) {
                                    case 0:
                                        setVolume(tag.vFloat);
                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }
                                        break;
                                    case 1:
                                        setPressure(tag.vFloat);
                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }
                                        break;
                                    case 2:
                                        setTemperatureMiddle(tag.vFloat);
                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }
                                        break;
                                    case 3:
                                        setTemperatureBottom(tag.vFloat);
                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }
                                        break;
                                    case 4:
                                        setState(tag.vInt);
                                        TagsListContentsService.getByTag(tag).then((tagListContents: any) => {
                                            // console.log('find data is ', tagListContents, tagListContents[0]);
                                            if (tagListContents.length > 0) {
                                                setStateDisplayed(tagListContents[0].value);
                                            }
                                        });

                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }
                                        break;
                                }
                            }
                        });
                    });


                    // let dates = data.map((d: any) => { return [d.vStamp.replace('Z','')]; });
                    // console.log('date', dates);
                    let update: Date[] = data.map((d: any) => { return [Date.parse(d.vStamp.replace('Z', ''))]; });
                    // console.log('update', update);
                    // console.log('Min', Math.min(...update))
                    setUpdated(Math.min(...update));


                }
            });
        }, Math.random() * 1000 + 500) as unknown as number;
    }

    useEffect(() => {
        // Update volume
        // readLast(0);
        getValue();

    }, [tags]);



    useEffect(() => {
        const interval = setInterval(() => {
            getValue();
        }, 5000); //set your time here. repeat every 5 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <div id={'DashCartCCT_' + id} className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 p-2">

                    <span className='flex flex-auto justify-content-between'>
                        {/* icon */}
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round m-2"
                            style={{ width: '4.5rem', height: '3.5rem' }}>
                            <ReactIcons group={icon_gr} icon={icon} className="text-orange-500 text-5xl" />
                        </div>
                        <div className='flex flex-column w-full'>
                            <span className="flex block text-500 font-medium text-3xl mb-2 justify-content-end">
                                {name}
                            </span>
                            {/* <div className="flex text-900 text-md justify-content-end align-content-center w-100">
                                {stateDisplayed}
                                <ReactIcons group="fa6" icon="FaArrowsTurnToDots" className='ml-3' />
                            </div> */}
                        </div>
                    </span>

                    <div>
                        <div className='flex flex-column justify-content-between'>

                            {/* Volume  */}
                            <div className='flex flex-column align-content-center justify-content-center '>
                                <div className="flex text-yellow-500 text-900 font-bold text-5xl justify-content-center mb-2">
                                    <NumericFormat
                                        value={volume}
                                        suffix={' ' + units[0]}
                                        thousandSeparator=' '
                                        decimalScale={0}
                                        displayType="text"
                                    />
                                </div>
                                <div>
                                    {/* Date line */}
                                    <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                                    <Moment date={updated}
                                        format='HH:mm:ss'
                                    />

                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>

        </>
    );
}