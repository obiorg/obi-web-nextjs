/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/src/types';

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
                    label: 'Businesses', icon: 'pi pi-fw pi-briefcase',
                    items: [
                        { label: 'Entitées', icon: 'pi pi-fw pi-building', to: '/business/entities' },
                        { label: 'Businesses', icon: 'pi pi-fw pi-briefcase', to: '/business/business' },
                        { label: 'Sociétées', icon: 'pi pi-fw pi-building-columns', to: '/business/companies' },
                    ]
                },
                {
                    label: 'Localisations', icon: 'pi pi-fw pi-map',
                    items: [
                        { label: 'Pays', icon: 'pi pi-fw pi-globe', to: '/business/entities' },
                        { label: 'Businesses', icon: 'pi pi-fw pi-briefcase', to: '/business/business' },
                        { label: 'Sociétées', icon: 'pi pi-fw pi-building-columns', to: '/business/companies' },
                    ]
                },
                {
                    label: 'Gestion alarmes', icon: 'pi pi-fw pi-bell',
                    items: [
                        { label: 'Pays', icon: 'pi pi-fw pi-globe', to: '/business/entities' },
                        { label: 'Businesses', icon: 'pi pi-fw pi-briefcase', to: '/business/business' },
                        { label: 'Sociétées', icon: 'pi pi-fw pi-building-columns', to: '/business/companies' },
                    ]
                }
            ]
        },


        {
            label: 'Technologie', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Analyses', icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Drivers', icon: 'pi pi-fw pi-arrows-h', to: '/connexion/drivers' },
                        { label: 'Machines', icon: 'pi pi-fw pi-sitemap', to: '/connexion/machines' },

                    ]
                },
                {

                    label: 'Mesures', icon: 'pi pi-fw pi-server',
                    items: [
                        { label: 'Persistences', icon: 'pi pi-fw pi-database', to: '/persistence' },
                        { label: 'Standard', icon: 'pi pi-fw pi-star', to: '/persistence/pers_standard' },

                    ]
                },
            ]

        },


        {
            label: 'Systèmes', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Maintenance', icon: 'pi pi-fw pi-flag-fill',
                    items: [
                        { label: 'Drivers', icon: 'pi pi-fw pi-arrows-h', to: '/connexion/drivers' },
                        { label: 'Machines', icon: 'pi pi-fw pi-sitemap', to: '/connexion/machines' },

                    ]
                }
            ]

        },


        {
            label: 'Données', icon: 'pi pi-fw pi-globe',
            items: [
                {

                    label: 'Connexion', icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Drivers', icon: 'pi pi-fw pi-arrows-h', to: '/obi/data/connexion/drivers' },
                        { label: 'Machines', icon: 'pi pi-fw pi-sitemap', to: '/obi/data/connexion/machines' },

                    ]
                },
                {

                    label: 'Tags (Variables)', icon: 'pi pi-fw pi-server',
                    items: [
                        { label: 'Persistences', icon: 'pi pi-fw pi-database', to: '/obi/data/persistence' },
                        { label: 'Standard', icon: 'pi pi-fw pi-star', to: '/obi/data/persistence/pers_standard' },

                    ]
                },
                {

                    label: 'Archivage', icon: 'pi pi-fw pi-database',
                    items: [
                        { label: 'Persistences', icon: 'pi pi-fw pi-database', to: '/obi/data/persistence' },
                        { label: 'Standard', icon: 'pi pi-fw pi-star', to: '/obi/data/persistence/pers_standard' },

                    ]
                }
            ]

        },



        {
            label: 'UI Components',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
            ]
        },
        {
            label: 'Prime Blocks',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Utilities',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    to: '/landing'
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/auth/login'
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud'
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    to: '/pages/timeline'
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    to: '/pages/notfound'
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    to: '/pages/empty'
                }
            ]
        },
        {
            label: 'Hierarchy',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-question',
                    to: '/documentation'
                },
                {
                    label: 'Figma',
                    url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                    icon: 'pi pi-fw pi-pencil',
                    target: '_blank'
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/primefaces/sakai-react',
                    target: '_blank'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
