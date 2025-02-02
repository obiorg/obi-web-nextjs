import { Metadata } from "next";
import TagsListContentsCreate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 List Contents - Create",
    description: "Create content list of tags",
};

const PageTagsListsContentsCreate = () => {
    return (<><TagsListContentsCreate /></>)
};

export default PageTagsListsContentsCreate;
