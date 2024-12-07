/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/src/types';

import { GrGlobe } from "react-icons/gr";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Applications', icon: 'pi pi-fw pi-building-columns',
            items: [
                {
                    label: 'Localisations', icon: 'pi pi-fw pi-map',
                    items: [
                        { label: 'Continent', group: 'fa6', icon: 'FaGlobe', to: '/obi/sys/localisations/regions' },
                        { label: 'Sous-continent', group: 'fa', icon: 'FaGlobeEurope', to: '/obi/sys/localisations/subregions' },
                        { label: 'Pays', group: 'fa', icon: 'FaCity', to: '/obi/sys/localisations/countries' },
                        { label: 'États', group: 'fa6', icon: 'FaMountainCity', to: '/obi/sys/localisations/states' },
                        { label: 'Villes', group: 'fa', icon: 'FaCity', to: '/obi/sys/localisations/cities' },
                        { label: 'Localisation', group: 'fa6', icon: 'FaMapLocationDot', to: '/obi/sys/localisations/locations' },
                    ]
                },
                {
                    label: 'Businesses', icon: 'pi pi-fw pi-briefcase',
                    items: [
                        { label: 'Entités', icon: 'pi pi-fw pi-building', to: '/obi/sys/businesses/entities' },
                        { label: 'Entreprises', icon: 'pi pi-fw pi-briefcase', to: '/obi/sys/businesses/businesses' },
                        { label: 'Sociétés', icon: 'pi pi-fw pi-building-columns', to: '/obi/sys/businesses/companies' },
                    ]
                },
                {
                    label: 'Gestion alarmes', icon: 'pi pi-fw pi-bell',
                    items: [
                        { label: 'Groupes', group: 'lia', icon: 'LiaLayerGroupSolid', to: '/obi/sys/alarms/groups' },
                        { label: 'Classes', group: 'vsc', icon: 'VscSymbolClass', to: '/obi/sys/alarms/classes' },
                        { label: 'Rendus', group: 'si', icon: 'SiOctanerender', to: '/obi/sys/alarms/renders' },
                        { label: 'Alarmes', group: 'fc', icon: 'FcAlarmClock', to: '/obi/sys/alarms' },
                    ]
                },
                {

                    label: 'Analyses', group: 'fa6', icon: 'FaCreativeCommonsSampling',
                    items: [
                        { label: 'Autorisées', group: 'lia', icon: 'LiaObjectGroupSolid', to: '/obi/sys/analyses/allowed' },
                        { label: 'Catégories', group: 'md', icon: 'MdOutlineCategory', to: '/obi/sys/analyses/categories' },
                        { label: 'Methodes', group: 'ri', icon: 'RiInputMethodLine', to: '/obi/sys/analyses/methods' },
                        { label: 'Points', group: 'gi', icon: 'GiImpactPoint', to: '/obi/sys/analyses/points' },
                        { label: 'Types', group: 'md', icon: 'MdOutlineTypeSpecimen', to: '/obi/sys/analyses/types' },

                    ]
                },
            ]
        },


        {
            label: 'Technologie', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Mesures', group: 'tb', icon: 'TbRulerMeasure', 
                    items: [
                        { label: 'Comparateurs', group: 'fa', icon: 'FaDraftingCompass', to: '/obi/sys/measures/comparators' },
                        { label: 'Limite Groupe', group: 'lu', icon: 'LuGroup', to: '/obi/sys/measures/limitsgroups' },
                        { label: 'Limites', group: 'md', icon: 'MdProductionQuantityLimits', to: '/obi/sys/measures/limits' },
                        { label: 'Unités', group: 'si', icon: 'SiJunit5', to: '/obi/sys/measures/units' },

                    ]
                },
            ]

        },


        {
            label: 'Systèmes', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Maintenance', group: 'bi', icon: 'BiSolidCarMechanic', 
                    items: [
                        { label: 'Equipements', group: 'gi', icon: 'GiMechanicGarage', to: '/obi/sys/maintenance/equipements' },
                        { label: 'Providers', group: 'sl', icon: 'SlSupport', to: '/obi/sys/maintenance/equipements/externalproviders' },
                        { label: 'Data Externe', group: 'bs', icon: 'BsDatabaseExclamation', to: '/obi/sys/maintenance/equipements/dataexternal' },

                    ]
                }
            ]

        },


        {
            label: 'Données', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Connexions', icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Drivers', icon: 'pi pi-fw pi-arrows-h', to: '/obi/sys/connexions/drivers' },
                        { label: 'Machines', icon: 'pi pi-fw pi-sitemap', to: '/obi/sys/connexions/machines' },

                    ]
                },
                {

                    label: 'Tags (Variables)', icon: 'pi pi-fw pi-server',
                    items: [
                        { label: 'Tags', icon: 'pi pi-fw pi-hashtag', to: '/obi/sys/tags' },
                        { label: 'Standard', icon: 'pi pi-fw pi-star', to: '/obi/sys/persistences/standards' },

                    ]
                },
                {

                    label: 'Archivage', icon: 'pi pi-fw pi-database',
                    items: [
                        { label: 'Persistences', icon: 'pi pi-fw pi-database', to: '/obi/sys/persistences' },
                        { label: 'Méthodes', icon: 'pi pi-fw pi-star', to: '/obi/sys/persistences/methods' },
                        { label: 'Standards', icon: 'pi pi-fw pi-star', to: '/obi/sys/persistences/standards' },
                        { label: 'Limites Standards', icon: 'pi pi-fw pi-star', to: '/obi/sys/persistences/standardslimits' },

                    ]
                }
            ]

        },



        // {
        //     label: 'UI Components',
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        //     ]
        // },
        // {
        //     label: 'Prime Blocks',
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Utilities',
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
        //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Pages',
        //     icon: 'pi pi-fw pi-briefcase',
        //     to: '/pages',
        //     items: [
        //         {
        //             label: 'Landing',
        //             icon: 'pi pi-fw pi-globe',
        //             to: '/landing'
        //         },
        //         {
        //             label: 'Auth',
        //             icon: 'pi pi-fw pi-user',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Crud',
        //             icon: 'pi pi-fw pi-pencil',
        //             to: '/pages/crud'
        //         },
        //         {
        //             label: 'Timeline',
        //             icon: 'pi pi-fw pi-calendar',
        //             to: '/pages/timeline'
        //         },
        //         {
        //             label: 'Not Found',
        //             icon: 'pi pi-fw pi-exclamation-circle',
        //             to: '/pages/notfound'
        //         },
        //         {
        //             label: 'Empty',
        //             icon: 'pi pi-fw pi-circle-off',
        //             to: '/pages/empty'
        //         }
        //     ]
        // },
        // {
        //     label: 'Hierarchy',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     items: [
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/documentation'
        //         },
        //         {
        //             label: 'Figma',
        //             url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
        //             icon: 'pi pi-fw pi-pencil',
        //             target: '_blank'
        //         },
        //         {
        //             label: 'View Source',
        //             icon: 'pi pi-fw pi-search',
        //             url: 'https://github.com/primefaces/sakai-react',
        //             target: '_blank'
        //         }
        //     ]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {
                    model.map((item, i) => {
                        return !item?.seperator ?
                            <AppMenuitem item={item} root={true} index={i} key={item.label} />
                            : <li className="menu-separator"></li>;
                    })
                }


            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
