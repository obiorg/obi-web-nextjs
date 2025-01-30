import { Metadata } from "next";
import PersistencesPage from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 ",
    description: "Gestion des archives de tags",
};

const Persistences = () => {
    return (<><PersistencesPage /></>)
};

export default Persistences;
