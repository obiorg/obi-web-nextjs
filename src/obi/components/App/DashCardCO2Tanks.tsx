'use client';

import 'moment-timezone';
import { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { TagsService } from "../../service/tags/TagsService";
import ReactIcons from "../Icons/ReactIcons";


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
    const [state, setState] = useState('???');
    const [updated, setUpdated] = useState(new Date(0));

    const [loadLazyTimeout, setLoadLazyTimeout] = useState(0)

    const [changing, setChanging] = useState(false);
    const [changed, setChanged] = useState(false);

    /**
     * Get value listed by tags
     */
    const fetchData = useCallback(() => {
        // Get Lazy Data
        TagsService.getByIds(tags).then((data: any) => {
            // console.log('tag : ' + tags[cursor] + ' cursor : ' + cursor + ' = ', data)
            if (data.status && data.status !== 200) {
                // console.log(data.status + ' in DashCardCO2Tanks reading tag ' + tags[cursor]);
                console.log('DashCardCO2Tanks >> Error', data);
                return 0;
            } else {
                // console.log('DashCardCO2Tanks >> success', data);

                data.forEach((tag: any) => {
                    tags.forEach((tagId: any) => {
                        if (tagId === tag.id) {
                            switch (tags.indexOf(tagId)) {
                                case 0:
                                    setVolume(tag.vFloat);
                                    if (updated === undefined || updated > data.vStamp) {
                                        setUpdated(data.vStamp);
                                    }
                                    setChanging(!changing);
                                    break;
                            }
                        }
                    });
                });

                let update: any[] = data.map((d: any) => { return [Date.parse(d.vStamp.replace('Z', ''))]; });
                setUpdated(new Date(Math.min.apply(null, update)));


            }
        });

    }, [changing, tags, updated])

    useEffect(() => {
        fetchData();
    }, [fetchData, tags]);



    const [time, setTime] = useState<number>(new Date().getTime());
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Call from interval : ' + new Date().toLocaleTimeString() +
                ' delta = ' + (new Date().getTime() - time));
            setTime(new Date().getTime());


            if (changing != changed) {
                fetchData();
                changed === changing;
            }
        }, 5000); //set your time here. repeat every 5 seconds

        return () => clearInterval(interval);
    }, [state]);


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