import { Metadata } from "next";
import TagsCreate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Create",
    description: "Create a new tag",
};

const PageCreate = () => {
    return (<><TagsCreate  /></>)
};

export default PageCreate;
