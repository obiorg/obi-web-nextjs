import { Metadata } from "next";
import TagsListContentsCopy from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Content List Copy",
    description: "Copy a content list of tags",
};
interface TagsListContentsCopyProps {
    params: any,
}

const PageTagsListContentsCopy = ({ params }: TagsListContentsCopyProps) => {
    return (<><TagsListContentsCopy params={params} /></>)
};

export default PageTagsListContentsCopy;
