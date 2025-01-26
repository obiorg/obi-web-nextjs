import { Metadata } from "next";
import TagsUpdate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Update",
    description: "Update the specified tags",
};
interface TagsUpdateProps {
    params: any,
    // updatePost: (id: string, data: OBI.Localisations.Location) => void;
}

const PageUpdate = ({ params }: TagsUpdateProps) => {
    return (<><TagsUpdate params={params} /></>)
};

export default PageUpdate;
