import { Metadata } from "next";
import PersistencesUpdate from "./_page";


export const metadata: Metadata = {
    title: "Persistences 🗄 - Update",
    description: "Update the specified persistence",
};
interface TagsUpdateProps {
    params: any,
}

const PagePersistencesUpdate = ({ params }: TagsUpdateProps) => {
    return (<><PersistencesUpdate params={params} /></>)
};

export default PagePersistencesUpdate;
