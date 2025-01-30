import { Metadata } from "next";
import PersistencesImport from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 - Import",
    description: "Gestion des archives de tags par importation",
};

const PagePersistencesImport = () => {
    return (<><PersistencesImport /></>)
};

export default PagePersistencesImport;
