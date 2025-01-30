import { Metadata } from "next";
import PersistencesCreate from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 - Create",
    description: "Création d'une nouvelle persistence (archive)...",
};

const PagePersistencesCreate = () => {
    return (<><PersistencesCreate  /></>)
};

export default PagePersistencesCreate;
