import { Metadata } from "next";
import PersistencesPick from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 - Pick",
    description: "Adapt persistence by picking",
};

const PagePersistencesPick = () => {
    return (<><PersistencesPick  /></>)
};

export default PagePersistencesPick;
