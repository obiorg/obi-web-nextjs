'use client';

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
interface DashCardCCTProps {
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

    refresh?: boolean; // enable automatic refresh defaulat true
    refresh_s?: number; // Number of seconds before auto-refresh, default 15 seconds,

}


export default function DashCardCCT(
    {
        id,
        name,
        icon_gr = 'gi',
        icon = 'GiEnergyTank',
        tags,
        units,
        patterns,
        onClick,
        onChange,
        error,

        refresh = true,
        refresh_s = 15,

    }: DashCardCCTProps) {



    const [volume, setVolume] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [temperatureMiddle, setTemperatureMiddle] = useState(0);
    const [temperatureBottom, setTemperatureBottom] = useState(0);
    const [stateDisplayed, setStateDisplayed] = useState('???');
    const [updated, setUpdated] = useState(new Date(0));


    const [changing, setChanging] = useState(false);
    const [changed, setChanged] = useState(false);


    const [stateTag, setStateTag] = useState<any>();
    const [stateTagSaved, setStateTagSaved] = useState<any>();

    /**
     * Get value listed by tags
     */
    const fetchData = useCallback(() => {
        // Get Lazy Data
        TagsService.getByIds(tags).then((data: any) => {
            // console.log('tag : ' + tags[cursor] + ' cursor : ' + cursor + ' = ', data)
            if (data.status && data.status !== 200) {
                // console.log(data.status + ' in DashCardCCT reading tag ' + tags[cursor]);
                console.log('DashCardCCT >> Error', data);
                return 0;
            } else {
                // console.log('DashCardCCT >> success', data);

                data.forEach((tag: any) => {
                    tags.forEach((tagId: any) => {
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
                                    if (stateTag?.vInt !== tag.vInt) {
                                        // console.log(stateTag, tag);
                                        setStateTag(tag);
                                    }
                                    break;
                            }
                        }
                    });
                    setChanging(!changing);
                });


                // update de date
                let update: any[] = data.map((d: any) => { return [Date.parse(d.vStamp.replace('Z', ''))]; });
                setUpdated(new Date(Math.min.apply(null, update)));


            }
        });

    }, [])



    /**
     * Recover state Map each time stateTag change
     */
    useEffect(() => {
        if (stateTag === undefined) {
            //console.error('DashCardCCT stateTag is undefined');
            return;
        }

        // console.log('Recovering state', stateTag, stateTagSaved);
        if (stateTag?.id !== stateTagSaved?.id) {
            TagsListContentsService.getByTag(stateTag).then((tagListContents: any) => {
                // console.log('find data is ', tagListContents, tagListContents[0]);
                if (tagListContents.length > 0) {
                    setStateDisplayed(tagListContents[0].value);
                    // setStateMap(tagListContents);

                }
            });
            setStateTagSaved(stateTag);
        }
    }, [stateTag, stateTagSaved]);

    /**
     * Get value listed by tags
     */
    useEffect(() => {
        fetchData();
    }, [fetchData, tags]);


    /**
     * Auto refresh time system
     */
    const [time, setTime] = useState(Date.now());
    useEffect(() => {
        if (refresh) {
            const interval = setInterval(() => setTime(Date.now()), refresh_s * 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, []);


    /**
     * Auto refresh time system callback
     */
    const [dateSaved, setDateSaved] = useState<Date>(new Date());
    useEffect(() => {
        let dt = new Date();
        // console.log('From ' + dateSaved.toLocaleTimeString()
        //     + ' to ' + dt.toLocaleTimeString() +
        //     ' delta = ' + (dt.getTime() - dateSaved.getTime()) / 1000);
        setDateSaved(dt);

        if (changing != changed) {
            fetchData();
            changed === changing;
        }
    }, [time]);



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
                            <div className="flex text-900 text-md justify-content-end align-content-center w-100">
                                {stateDisplayed}
                                <ReactIcons group="fa6" icon="FaArrowsTurnToDots" className='ml-3' />
                            </div>
                        </div>
                    </span>

                    <div>
                        <div className='flex flex-auto justify-content-between'>
                            <div>
                                {/* Pression */}
                                {/* <ReactIcons group="gi" icon="GiPressureCooker" className='mr-3' /> */}
                                <span className="text-green-500 font-medium text-3xl">
                                    <NumericFormat
                                        value={pressure}
                                        suffix={' '}
                                        thousandSeparator=' '
                                        decimalScale={3}
                                        displayType="text"
                                    />
                                </span>
                                <span className="text-500">{units[1]}</span><br />

                                {/* Middle Temperature */}
                                {/* <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /> */}
                                <NumericFormat
                                    className="text-green-500 font-medium"
                                    value={temperatureMiddle}
                                    suffix={' '}
                                    thousandSeparator=' '
                                    decimalScale={1}
                                    displayType="text"
                                />
                                <span className="text-500">{units[2]} (Tm)</span><br />

                                {/* Bottom Temperature */}
                                {/* <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /> */}
                                <NumericFormat
                                    className="text-green-500 font-medium"
                                    value={temperatureBottom}
                                    suffix={' '}
                                    thousandSeparator=' '
                                    decimalScale={1}
                                    displayType="text"
                                />
                                <span className="text-500">{units[3]} Tb</span><br />
                                {/* Date line */}
                                <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                                {/* <label className="">
                                    {displayTime}
                                </label> */}
                                <Moment date={updated}
                                    format='HH:mm:ss'
                                // add={{minutes: (updated?(new Date(updated)).getTimezoneOffset():0)}}
                                // locale='fr'
                                // tz='Africa/Sao_Tome'
                                />

                            </div>
                            {/* Volume  */}
                            <div className='flex flex-column w-6 align-content-center justify-content-center '>
                                <div className="flex text-yellow-500 text-900 font-bold text-5xl justify-content-center w-100">
                                    <NumericFormat
                                        value={volume}
                                        suffix={' ' + units[0]}
                                        thousandSeparator=' '
                                        decimalScale={0}
                                        displayType="text"
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