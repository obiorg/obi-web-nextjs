/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';


import { ProductService } from '@/src/demo/service/ProductService';
import { LayoutContext } from '@/src/layout/context/layoutcontext';

import Link from 'next/link';
import { Demo } from '@/src/types';
import { ChartData, ChartOptions } from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};
import { getIntl } from "@/src/lib/intl";
import ReactIcons from '@/src/obi/components/Icons/ReactIcons';
import { Card } from 'primereact/card';

type HomeProps = {
    params: { locale: string };
};

const Dashboard = ({ params: { locale } }: HomeProps) => {
    // console.log("Dashboard", locale);

    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const titleHeader = (
        <span className='flex flex-auto justify-content-between'>
            {/* icon */}
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}>
                <ReactIcons group="gi" icon="GiChemicalTank" className="text-blue-500 text-2xl" />
            </div>
            TOD 35
        </span>
    );

    const header = (
        <></>
    );
    const footer = (
        <>
            {/* Date line */}
            <div className="flex flex-row-reverse justify-content-start mt-0">
                <div className="vertical-align-middle">
                    <label >13:10:15</label>
                    <ReactIcons group="fa" icon="FaClock" className='ml-3' />
                </div>
            </div>
        </>
    );

    return (
        <div className="grid">


            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 p-1">

                    <span className='flex flex-auto justify-content-between'>
                        {/* icon */}
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round m-2"
                            style={{ width: '4.5rem', height: '3.5rem' }}>
                            <ReactIcons group="gi" icon="GiEnergyTank" className="text-orange-500 text-5xl" />
                        </div>
                        <div className='flex flex-column w-full'>
                            <span className="flex block text-500 font-medium text-3xl mb-2 justify-content-end">TOD 35</span>
                            <div className="flex text-900 text-md justify-content-end align-content-center w-100">
                                En attente de vidange
                                <ReactIcons group="gi" icon="GiPressureCooker" className='ml-3' />
                            </div>
                        </div>
                    </span>

                    <div>
                        <div className='flex flex-auto justify-content-between'>
                            <div>
                                <ReactIcons group="gi" icon="GiPressureCooker" className='mr-3' />
                                <span className="text-green-500 font-medium text-2xl">0,7354</span> <span className="text-500"> bar</span><br />
                                <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C (Tm)</span><br />
                                <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C Tb</span>
                            </div>
                            <div className='flex flex-column w-6 align-content-center justify-content-center '>
                                <div className="flex text-yellow-500 text-900 font-bold text-5xl justify-content-center w-100">2 765,5 hl</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 p-3">
                    <div className="flex justify-content-between mb-1">
                        <div>
                            <span className="block text-500 font-medium text-3xl mb-2">TOD 35</span>
                            <div className="text-yellow-500 text-900 font-bold text-3xl">2 765,5 hl</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                            style={{ width: '2.5rem', height: '2.5rem' }}>
                            <ReactIcons group="gi" icon="GiChemicalTank" className="text-blue-500 text-2xl" />
                        </div>
                    </div>


                    <ReactIcons group="gi" icon="GiPressureCooker" className='mr-3' /><span className="text-green-500 font-medium text-2xl">0,7354</span> <span className="text-500"> bar</span><br />
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C (Tm)</span><br />
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C Tb</span>

                    {/* Date line */}
                    <div className="card-text">
                        <div className="vertical-align-middle">
                            <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                            <label >13:10:15</label>
                        </div>
                    </div>

                </div>
            </div>



            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 p-3">
                    <div className="flex justify-content-between mb-1">
                        <div>
                            <span className="block text-500 font-medium text-3xl mb-2">TOD 35</span>
                            <div className="text-yellow-500 text-900 font-bold text-3xl">2 765,5 hl</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                            style={{ width: '2.5rem', height: '2.5rem' }}>
                            <ReactIcons group="gi" icon="GiChemicalTank" className="text-blue-500 text-2xl" />
                        </div>
                    </div>


                    <ReactIcons group="gi" icon="GiPressureCooker" className='mr-3' /><span className="text-green-500 font-medium text-2xl">0,7354</span> <span className="text-500"> bar</span><br />
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C (Tm)</span><br />
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C Tb</span>

                    {/* Date line */}
                    <div className="card-text">
                        <div className="vertical-align-middle">
                            <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                            <label >13:10:15</label>
                        </div>
                    </div>

                </div>
            </div>





            <div className="col-12 lg:col-6 xl:col-3">
                <Card title={titleHeader} subTitle='State TOD' header={header} footer={footer}>
                    <p>Content</p>
                </Card>

            </div>



            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 p-2">
                    <div className="flex justify-content-between mb-0">
                        <div className='w-100'>
                            <span className="block text-500 font-medium text-3xl mb-2">
                                TOD 38

                                <span className="text-xl">
                                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='ml-2 mr-2' />
                                    <span className="text-500 text-grey-500 ">Attente vidange</span><br />

                                </span>
                            </span>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                            style={{ width: '2.5rem', height: '2.5rem' }}>
                            <ReactIcons group="gi" icon="GiChemicalTank" className="text-blue-500 text-2xl" />
                        </div>
                    </div>

                    <div className="text-yellow-500 align-items-center  text-center text-900 font-bold text-3xl">2 765,5 hl</div>

                    <div>
                        <ReactIcons group="gi" icon="GiPressureCooker" className='mr-3' /><span className="text-green-500 font-medium text-2xl">0,7354</span> <span className="text-500"> bar</span><br />
                    </div>
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C (Tm)</span><br />
                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' /><span className="text-green-500 font-medium">17,5</span> <span className="text-500">°C Tb</span>

                    {/* Date line */}
                    <div className="card-text">
                        <div className="vertical-align-middle">
                            <ReactIcons group="fa" icon="FaClock" className='mr-3' />
                            <label >13:10:15</label>
                        </div>
                    </div>

                </div>
            </div>

            <Link className="text-decoration-none "
                // disabled="#{cc.attrs.outcome == null}"
                // outcome="#{cc.attrs.outcome}" 
                href="./"
            >

                <div className="card card-raised border-start border-primary border-4 mb-2">
                    <div className="card-body px-4  border-top">
                        <div className="card-header">

                            {/* <!-- COMPONENT TITLE --> */}
                            <div className="display-6 card-body-number">
                                <label>TOD ##</label>
                                {/* <h:outputText value="#{cc.attrs.name}" rendered="#{!cc.attrs.name.matches('')}"/>
                                <h:outputText value="#{cc.attrs.pressure.name}" rendered="#{cc.attrs.name.matches('')}"/> */}
                                {/* <!-- Sub line --> */}
                                <div className="d-inline-flex h6 card-text align-items-end #{cc.attrs.status.VInt==null?'collapse':(cc.attrs.subname_ico==null?'collapse':'')}">
                                    <i className="#{cc.attrs.subname_ico} #{cc.attrs.subname_ico==null?'collapse':''}"></i>
                                    <ReactIcons group="fa6" icon="FaTemperatureLow" className='mr-3' />
                                    {/* <!--<div className="caption #{cc.attrs.status.VInt==null?'collapse':''}">&ensp;#{cc.attrs.status.VInt}</div>-->
                                    <h:panelGroup id="#{cc.id}_state">
                                        <h:outputText styleClass="#{cc.attrs.state==null?'collapse':''}"
                                                      value="&ensp;#{cc.attrs.state}"/>
                                    </h:panelGroup>*/}
                                </div>
                            </div>
                        </div>

                        {/*
                        <div className="d-flex justify-content align-items-start p-2">
                            <!-- Icon -->
                            <div className="#{cc.attrs.issvg ? '' : 'icon-circle bg-primary'} text-white">
                                <h:panelGroup rendered="#{cc.attrs.issvg}">
                                    <svg className="bi "  
                                         width="#{cc.attrs.symbolWidth}"
                                         height="#{cc.attrs.symbolHeight}"
                                         >
                                        <use href="#{cc.attrs.symbol}" />
                                    </svg>
                                </h:panelGroup>
                                <h:panelGroup rendered="#{!cc.attrs.issvg}">
                                    <i className="#{cc.attrs.symbol}"></i>
                                </h:panelGroup>
                            </div>



                            <!-- Text -->&ensp;
                            <div className="ms-2">
                                <!-- VOLUME -->
                                <div className="card-text ">
                                    <h:panelGroup id="#{cc.id}_volume" layout="block">
                                        <!--<i className="fa-solid fa-fill"></i>-->
                                        <h:outputText value="#{cc.attrs.volume.VFloat}" styleClass="card-body-volume">
                                            <f:convertNumber pattern="#,###.0 hl" locale="fr"  />
                                        </h:outputText>
                                    </h:panelGroup>
                                </div>

                                <!-- PRESSURE -->
                                <div className="card-text">
                                    <h:panelGroup id="#{cc.id}_pressure" layout="block">
                                        <!--<i className="fa-solid fa-gauge-high"></i>-->
                                        <h:outputText value="#{cc.attrs.pressure.VFloat}" styleClass="card-body-pressure">
                                            <f:convertNumber pattern="#{cc.attrs.pattern} bar" locale="fr"  />
                                        </h:outputText>
                                    </h:panelGroup>
                                </div>


                                <!-- Temperatures -->
                                <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="fa-solid fa-temperature-three-quarters"></i>
                                        <h:outputText value="#{cc.attrs.temperature.VFloat}" styleClass="caption">
                                            <f:convertNumber pattern="&ensp;##.# °C" locale="fr"  />
                                        </h:outputText>
                                        <h:outputLabel value="&ensp;(Tm)" />
                                    </div>
                                </div>
                                <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="fa-solid fa-temperature-three-quarters"></i>
                                        <h:outputText value="#{cc.attrs.temperatureB.VFloat}" styleClass="caption">
                                            <f:convertNumber pattern="&ensp;##.# °C" locale="fr"  />
                                        </h:outputText>
                                        <h:outputLabel value="&ensp;(Tb)" />
                                    </div>
                                </div>


                                <!-- Date line -->
                                <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="fa-solid fa-clock"></i>
                                        <h:outputText  id="#{cc.id}_stamp"  className="caption" value="#{cc.attrs.pressure.VStamp}">
                                            <f:convertDateTime pattern="&ensp;#{cc.attrs.stampPattern}" />
                                        </h:outputText>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>


                </div>

            </Link>


            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Revenue</span>
                            <div className="text-900 font-medium text-xl">$2.100</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Customers</span>
                            <div className="text-900 font-medium text-xl">28441</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520 </span>
                    <span className="text-500">newly registered</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Comments</span>
                            <div className="text-900 font-medium text-xl">152 Unread</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Recent Sales</h5>
                    <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
                        <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                        <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                        <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
                        <Column
                            header="View"
                            style={{ width: '15%' }}
                            body={() => (
                                <>
                                    <Button icon="pi pi-search" text />
                                </>
                            )}
                        />
                    </DataTable>
                </div>
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Best Selling Products</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" rounded text className="p-button-plain" onClick={(event) => menu1.current?.toggle(event)} />
                            <Menu
                                ref={menu1}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div>
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                                <div className="mt-1 text-600">Clothing</div>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-orange-500 h-full" style={{ width: '50%' }} />
                                </div>
                                <span className="text-orange-500 ml-3 font-medium">%50</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                                <div className="mt-1 text-600">Accessories</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-cyan-500 h-full" style={{ width: '16%' }} />
                                </div>
                                <span className="text-cyan-500 ml-3 font-medium">%16</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                                <div className="mt-1 text-600">Accessories</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-pink-500 h-full" style={{ width: '67%' }} />
                                </div>
                                <span className="text-pink-500 ml-3 font-medium">%67</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                                <div className="mt-1 text-600">Office</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-green-500 h-full" style={{ width: '35%' }} />
                                </div>
                                <span className="text-green-500 ml-3 font-medium">%35</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                                <div className="mt-1 text-600">Accessories</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-purple-500 h-full" style={{ width: '75%' }} />
                                </div>
                                <span className="text-purple-500 ml-3 font-medium">%75</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                                <div className="mt-1 text-600">Clothing</div>
                            </div>
                            <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                    <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                                </div>
                                <span className="text-teal-500 ml-3 font-medium">%40</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Sales Overview</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <h5>Notifications</h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" rounded text className="p-button-plain" onClick={(event) => menu2.current?.toggle(event)} />
                            <Menu
                                ref={menu2}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div>
                    </div>

                    <span className="block text-600 font-medium mb-3">TODAY</span>
                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Richard Jones
                                <span className="text-700">
                                    {' '}
                                    has purchased a blue t-shirt for <span className="text-blue-500">79$</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-download text-xl text-orange-500" />
                            </div>
                            <span className="text-700 line-height-3">
                                Your request for withdrawal of <span className="text-blue-500 font-medium">2500$</span> has been initiated.
                            </span>
                        </li>
                    </ul>

                    <span className="block text-600 font-medium mb-3">YESTERDAY</span>
                    <ul className="p-0 m-0 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Keyser Wick
                                <span className="text-700">
                                    {' '}
                                    has purchased a black jacket for <span className="text-blue-500">59$</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-question text-xl text-pink-500" />
                            </div>
                            <span className="text-900 line-height-3">
                                Jane Davis
                                <span className="text-700"> has posted a new questions about your product.</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div
                    className="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                    style={{
                        borderRadius: '1rem',
                        background: 'linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)'
                    }}
                >
                    <div>
                        <div className="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
                        <div className="text-white font-medium text-5xl">Try PrimeBlocks</div>
                    </div>
                    <div className="mt-4 mr-auto md:mt-0 md:mr-0">
                        <Link href="https://blocks.primereact.org" className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;

