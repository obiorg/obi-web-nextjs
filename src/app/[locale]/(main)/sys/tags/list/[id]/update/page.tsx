import { Metadata } from "next";
import TagsListUpdate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - List - Update",
    description: "Update the specified list tags",
};
interface PageTagsListUpdateProps {
    params: any,
}

const PageTagsListUpdate = ({ params }: PageTagsListUpdateProps) => {
    return (<><TagsListUpdate params={params} /></>)
};

export default PageTagsListUpdate;
