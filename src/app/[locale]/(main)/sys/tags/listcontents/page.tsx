import { Metadata } from "next";
import TagsListContentsPage from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - List Content ",
    description: "Content of a list",
};

const TagsListContents = () => {
    return (<><TagsListContentsPage /></>)
};

export default TagsListContents;
