'use client'

import Link from "next/link";



import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";



import { locales, defaultLocale, languages, Locale } from "@/src/config";
import { usePathname } from "@/src/i18n/routing";
import { useLocale } from "next-intl";

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

  useEffect(() => {
    isMounted.current = true;
    setLangs(languages);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const formatLanguage = (language: string) => {
    return language.charAt(0).toUpperCase() + language.substring(1, language.length);
  };




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
        // style={{ width: "450px" }}
        className="overlaypanel-demo"
      >
        <>
          <span>Langue active</span>

          {[...locales].sort().map((l) => (
            <>
              <LocaleLink key={l} locale={l} />
            </>
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
    <div>
      <Link
        className={isActive ? 'underline' : undefined}
        href={pathname + '/' + locale}
        // locale={locale}
      >
        <Flag country={locale.toUpperCase()} />
      </Link>

      {/* <Link key={l}
        href={l === defaultLocale ? "/fr" : `/${l}`}
      >
        <div>
          <button type="button" className="p-link layout-topbar-button">
            {formatLanguage(l)}
          </button>
        </div>

      </Link> */}
    </div>
  );
}

function isLocale(locale: Locale) {
  let loc: boolean = false;
  languages.map((language) => {
    if (language.locale === locale) {
      return true;
    }
  });
  return false;
}