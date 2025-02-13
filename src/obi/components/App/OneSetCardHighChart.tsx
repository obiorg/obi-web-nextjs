'use client';

import 'moment-timezone';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { TagsService } from "../../service/tags/TagsService";
import ReactIcons from "../Icons/ReactIcons";
import DialogHightChartPersistence from './DialogHightChartPersistence';
import DialogTablePersistence from './DialogTablePersistence';
import { PersistencesStandardsService } from '../../service/persistences/PersistencesStandardsService';


// Define the props that the PostForm component expects
interface OneSetCardHightChartProps {
    id?: string;                         // ID of the component
    name?: string;                       // Name of the component

    icon_gr: string;                        // React icon group
    icon: string; // React icon name
    tags: number[];         // Table containing tags number in the order Volume, Pression, T°middle, T°Bottom, State
    units: string[]; // Table containing units in corresponding to each tags
    patterns: any; // Define the patterns corresponding to each tags
    varDeltas?: boolean[]; // Define the corresponding tags as delta values not changing value

    onClick?: (e: any) => void; // The callback function to be called when the button is clicked
    onChange?: (e: any) => void; // when change occur in mode
    error?: any; // child of formState ex: formState.erros?.location

    refresh?: boolean; // enable automatic refresh defaulat true
    refresh_s?: number; // Number of seconds before auto-refresh, default 15 seconds,

    chart?: boolean; // enable chart
    chartTitle?: string; // chart title
    chartSubTitle?: string; // chart subtitle

    table?: boolean; // enable chart
    tableTitle?: string; // chart title
    tableSubTitle?: string; // chart subtitle
}


export default function OneSetCardHightChart(
    {
        id,
        name,
        icon_gr = 'md',
        icon = 'MdCo2',
        tags,
        units,
        patterns,
        varDeltas = [false],
        onClick,
        onChange,
        error,

        refresh = true,
        refresh_s = 15,

        chart = false,
        chartTitle = undefined,
        chartSubTitle = undefined,

        table = false,
        tableTitle = undefined,
        tableSubTitle = undefined

    }: OneSetCardHightChartProps) {



    const [params, setParams] = useState(0);
    const [updated, setUpdated] = useState(new Date(0));

    const [loadLazyTimeout, setLoadLazyTimeout] = useState(0)

    const [changing, setChanging] = useState(false);
    const [changed, setChanged] = useState(false);

    // Manage dialog visibility
    const [visible, setVisible] = useState(false);
    const [visibleTable, setVisibleTable] = useState(false);

    /**
     * Get value listed by tags
     */
    const fetchData = useCallback(() => {
        if (varDeltas[0]) {
            PersistencesStandardsService.deltaInDays(tags[0], 1).then((data: any) => {
                setParams(data[0].delta);
                setChanging(!changing);
            }).then(() => {
                TagsService.getByIds(tags).then((data: any) => {
                    // console.log('tag : ' + tags[cursor] + ' cursor : ' + cursor + ' = ', data)
                    if (data.status && data.status !== 200) {
                        // console.log(data.status + ' in OneSetCard reading tag ' + tags[cursor]);
                        console.log('OneSetCard >> Error', data);
                        return 0;
                    } else {
                        // console.log('OneSetCard >> success', data);

                        data.forEach((tag: any) => {
                            tags.forEach((tagId: any) => {
                                if (tagId === tag.id) {
                                    switch (tags.indexOf(tagId)) {
                                        case 0:
                                            if (updated === undefined || updated > data.vStamp) {
                                                setUpdated(data.vStamp);
                                            }

                                            break;
                                    }
                                }
                            });
                            setChanging(!changing);
                        });

                        let update: any[] = data.map((d: any) => { return [Date.parse(d.vStamp.replace('Z', ''))]; });
                        setUpdated(new Date(Math.min.apply(null, update)));


                    }
                });
            })
        } else {
            // Get Lazy Data
            TagsService.getByIds(tags).then((data: any) => {
                // console.log('tag : ' + tags[cursor] + ' cursor : ' + cursor + ' = ', data)
                if (data.status && data.status !== 200) {
                    // console.log(data.status + ' in OneSetCard reading tag ' + tags[cursor]);
                    console.log('OneSetCard >> Error', data);
                    return 0;
                } else {
                    // console.log('OneSetCard >> success', data);

                    data.forEach((tag: any) => {
                        tags.forEach((tagId: any) => {
                            if (tagId === tag.id) {
                                switch (tags.indexOf(tagId)) {
                                    case 0:
                                        setParams(tag.vFloat);
                                        if (updated === undefined || updated > data.vStamp) {
                                            setUpdated(data.vStamp);
                                        }

                                        break;
                                }
                            }
                        });
                        setChanging(!changing);
                    });

                    let update: any[] = data.map((d: any) => { return [Date.parse(d.vStamp.replace('Z', ''))]; });
                    setUpdated(new Date(Math.min.apply(null, update)));


                }
            });
        }

    }, [tags])

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
            <div id={'OneSetCard_' + id} className={'col-12 lg:col-6 xl:col-3 '}

            >
                <div className="card mb-0 p-2">

                    <span className='flex flex-auto justify-content-between'>
                        {/* icon */}
                        <div className="flex align-items-center justify-content-center bg-yellow-100 border-round m-2"
                            style={{ width: '4.5rem', height: '3.5rem' }}>

                            <ReactIcons group={icon_gr} icon={icon} className="text-orange-500 text-5xl" />
                        </div>

                        <div className='flex flex-column w-full'>
                            <span className="flex block text-500 font-medium text-3xl mb-2 justify-content-end">
                                {name}
                            </span>
                            <div className="flex text-yellow-500 text-900 font-bold text-5xl justify-content-center mb-2">
                                <NumericFormat
                                    value={params}
                                    suffix={' ' + units[0]}
                                    thousandSeparator=' '
                                    decimalScale={patterns[0]}
                                    displayType="text"
                                />
                            </div>
                        </div>


                    </span>

                    <div className="flex justify-content-between flex-wrap">
                        <div className='flex justify-content-start flex-wrap'>
                            <div className='flex align-items-center justify-content-start mr-2'>
                                <div>
                                    {/* Date line */}
                                    <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                                    <Moment date={updated}
                                        format='HH:mm:ss'
                                        className='mr-3'
                                    />
                                    ({tags[0]}<ReactIcons group="fa" icon="FaTag" className='ml-1' />)
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-content-end flex-wrap'>
                            <div className='flex align-items-center justify-content-end ml-2'>
                                <div >
                                    <Button className='m-0 p-1 bg-primary border-none border-noround ml-1'
                                        onClick={(e: any) => { setVisible(true && chart); }}
                                    >
                                        <ReactIcons group="fa" icon="FaChartLine" className='' />
                                    </Button>
                                </div>
                                {table ?
                                    <div >
                                        <Button className='m-0 p-1 bg-primary border-none border-noround ml-1'
                                            onClick={(e: any) => { setVisibleTable(true && table) }}
                                        >
                                            <ReactIcons group="bs" icon="BsTable" className='' />
                                        </Button>
                                    </div>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* + (chart ? 'cursor-pointer' : '') */}
            <DialogHightChartPersistence
                id={id}
                name={name}
                title={chartTitle}
                tags={tags}
                units={units}
                patterns={patterns}
                varDeltas={varDeltas}
                visible={visible}
                onChangedVisible={(e: any) => { setVisible(e) }}
            />


            {visibleTable ?
                <DialogTablePersistence
                    id={id}
                    name={name}
                    title={tableTitle}
                    tags={tags}
                    units={units}
                    patterns={patterns}
                    varDeltas={varDeltas}
                    visible={visibleTable}
                    onChangedVisible={(e: any) => { setVisibleTable(e) }}
                />
                : <></>}
        </>
    );
}