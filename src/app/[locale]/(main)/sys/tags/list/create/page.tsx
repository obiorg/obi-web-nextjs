import { Metadata } from "next";
import TagsListCreate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - List - Create",
    description: "Create a new list corresponding for tag",
};

const PageTagsListCreate = () => {
    return (<><TagsListCreate /></>)
};

export default PageTagsListCreate;
