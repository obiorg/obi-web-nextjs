import { Metadata } from "next";
import TagsListUpdate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Lists - Update",
    description: "Update the specified Liste of tags",
};
interface TagsListUpdateProps {
    params: any,
}

const PageTagsListUpdate = ({ params }: TagsListUpdateProps) => {
    return (<><TagsListUpdate params={params} /></>)
};

export default PageTagsListUpdate;
