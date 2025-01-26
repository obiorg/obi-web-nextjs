import { Metadata } from "next";
import TagsTablesCreate from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 Tables - Create",
    description: "Create a new tag",
};

const PageCreate = () => {
    return (<><TagsTablesCreate  /></>)
};

export default PageCreate;
