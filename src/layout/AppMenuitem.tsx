'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
import { AppMenuItem, AppMenuItemProps } from '@/src/types';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactIcons from '../obi/components/Icons/ReactIcons';
import { defaultLocale, Locale } from '../config';





const AppMenuitem = (props: AppMenuItemProps) => {


    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item!.to && pathname === item!.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');
    const locale = props.locale || defaultLocale;

    const onRouteChange = (url: string) => {
        if (item!.to && item!.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        onRouteChange(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        //avoid processing disabled items
        if (item!.disabled) {
            event.preventDefault();
            return;
        }

        //execute command
        if (item!.command) {
            item!.command({ originalEvent: event, item: item });
        }

        // toggle active state
        if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
        else setActiveMenu(key);
    };

    const subMenu = item!.items && item!.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
            <ul>
                {item!.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>

            {/* Title Group */}
            {props.root && item!.visible !== false && <div className="layout-menuitem-root-text">{item!.label}</div>}


            {/* Group menu */}
            {(!item!.to || item!.items) && item!.visible !== false ? (
                <a
                    // href={item!.url}
                    onClick={(e) => itemClick(e)}
                    className={classNames(item!.class, 'p-ripple')}
                    target={item!.target}
                    tabIndex={0}
                >
                    {item!.group ?
                        <ReactIcons group={item!.group} icon={item!.icon} className={classNames('layout-menuitem-icon', item!.icon)} />
                        : <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
                    }
                    <span className="layout-menuitem-text">{item!.label}</span>
                    {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </a>
            ) : null}


            {/* Direct Link */}
            {item!.to && !item!.items && item!.visible !== false ? (
                AppMenuItemLink(
                    { item, locale, isActiveRoute, itemClick })
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;


interface AppMenuItemLinkProps {
    item: AppMenuItem | undefined;
    locale: Locale;
    isActiveRoute: string | boolean | undefined;
    itemClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function AppMenuItemLink({
    item,
    locale,
    isActiveRoute = false,
    itemClick
}: AppMenuItemLinkProps) {

    const pathname = usePathname();
    const isActive = item!.to && pathname === item!.to;

    if (isActiveRoute)
        console.log('is active route ' + pathname, item)
    return (
        <Link
            href={'/' + locale + '/' + (item?.to ? item?.to : '#')}
            replace={item!.replaceUrl}
            target={item!.target}
            onClick={(e) => itemClick(e)}
            className={classNames(item!.class, 'p-ripple', { 'active-route': isActiveRoute })}
            tabIndex={0}
            locale={locale}
        >
            {item!.group ?
                <ReactIcons group={item!.group} icon={item!.icon} className={classNames('layout-menuitem-icon', item!.icon)} />
                : <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
            }
            <span className="layout-menuitem-text">{item!.label}</span>
            {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}

            {/* Ripple effect for animation*/}
            <Ripple />

        </Link>
    );
}


{/* <Link
                    href={item!.to}
                    replace={item!.replaceUrl}
                    target={item!.target}
                    onClick={(e) => itemClick(e)}
                    className={classNames(item!.class, 'p-ripple', { 'active-route': isActiveRoute })}
                    tabIndex={0}
                >
                    {item!.group ?
                        <ReactIcons group={item!.group} icon={item!.icon} className={classNames('layout-menuitem-icon', item!.icon)} />
                        : <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
                    }
                    <span className="layout-menuitem-text">{item!.label}</span>
                    {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}

                    {/* Ripple effect for animation*/}
//     <Ripple />

// </Link> */}