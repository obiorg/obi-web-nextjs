import { Metadata } from "next";
import PersistencesCopy from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 - Copy",
    description: "Copy of persistence",
};
interface PersistencesCopyProps {
    params: any,
}

const PagePersistencesCopy = ({ params }: PersistencesCopyProps) => {
    return (<><PersistencesCopy params={params} /></>)
};

export default PagePersistencesCopy;
