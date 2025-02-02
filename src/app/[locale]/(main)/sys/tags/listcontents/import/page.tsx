import { Metadata } from "next";
import TagsListContentsImport from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Content List Import",
    description: "Import Content of a list",
};

const PageTagsListContentsImport = () => {
    return (<><TagsListContentsImport /></>)
};

export default PageTagsListContentsImport;
