'use client'

import Link from "next/link";



import { Button } from 'primereact/button';
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";



import { flagFromFlagKit, getLanguageLabel, Locale, locales } from "@/src/config";
import { usePathname } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import Flag from 'react-flagkit';


interface HeaderProps {

  locale?: string;
}

export default function Header(
  {
    locale,

  }: HeaderProps) {


  const toast = useRef<any>(null);

  const [langs, setLangs] = useState<HeaderProps[] | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<HeaderProps | null>(null);
  const op = useRef<OverlayPanel>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && selectedLanguage) {
      op.current?.hide();
      toast.current?.show({
        severity: "info",
        summary: "Selected Language " + langs,
        detail: selectedLanguage.locale,
        life: 3000
      });
    }
  }, [selectedLanguage]);// eslint-disable-line react-hooks/exhaustive-deps





  /** Manage Window Size */
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []); // En windows size management

  const t = useTranslations('header');
  return (
    <>

      <Toast ref={toast}></Toast>

      <Button
        type="button"
        onClick={(e) => op.current?.toggle(e)}
        aria-haspopup
        aria-controls="overlay_panel"
        className="p-link layout-topbar-button select-product-button"
      >
        <i className="pi pi-language" />
      </Button>



      <OverlayPanel
        ref={op}
        showCloseIcon
        id="overlay_panel"
        style={{ width: "240px" }}
        className="overlaypanel-demo"
      >
        <>
          <h6>{t('lang.active')}</h6>

          {[...locales].sort().map((l, i) => (

            <LocaleLink key={l + '_' + i} locale={l} />

          ))}

        </>
      </OverlayPanel>





    </>

  );
}





function LocaleLink({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isActive = useLocale() === locale;


  return (
    <Link
      className={(isActive ? 'active' : undefined) + ''}
      href={pathname + '/' + locale}
      locale={locale + ''}
    >
      <div className={"flex flex-row flex-wrap hover:shadow-8 hover:bg-primary-reverse" + (isActive ? 'active bg-primary-reverse' : '')}>

        <div className='flex flex-row flex-wrap'>
          <Flag country={flagFromFlagKit(locale)} className="flex align-items-center justify-content-center font-bold m-2 border-round" />
          <span className="flex align-items-center justify-content-center  font-bold m-2 border-round">{getLanguageLabel(locale)}</span>
        </div>
      </div>

    </Link>
  );
}



