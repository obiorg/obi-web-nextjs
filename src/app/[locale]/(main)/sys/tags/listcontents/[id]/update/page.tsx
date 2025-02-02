import { Metadata } from "next";
import TagsListContentsUpdate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Content List Update",
    description: "Update the specified content list of tags",
};
interface TagsListContentsUpdateProps {
    params: any,
}

const PageTagsListContentsUpdate = ({ params }: TagsListContentsUpdateProps) => {
    return (<><TagsListContentsUpdate params={params} /></>)
};

export default PageTagsListContentsUpdate;
