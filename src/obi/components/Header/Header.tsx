import Link from "next/link";
import { i18n } from "@/i18n-config";


import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";


interface HeaderProps {
  label?: string;
  locale?: string;
}

export default function Header(
  {
    label,
    locale,

  }: HeaderProps) {

  const { locales, defaultLocale, languages } = i18n;

  const toast = useRef<Toast>(null);

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

            <Link key={l}
              href={l === defaultLocale ? "/obi" : `/${l}`}
            >
              {/* <button type="button" className="p-link layout-topbar-button"> */}
              {formatLanguage(l)}
              {/* </button> */}

            </Link>
          ))}
        </>
      </OverlayPanel>

      {/* w:{windowWidth} */}



    </>

  );
}


{/* <Link key={locale}
href={locale === defaultLocale ? "/" : `/${locale}`}
>
<button type="button" className="p-link layout-topbar-button">
  {locale}
</button>

</Link> */}