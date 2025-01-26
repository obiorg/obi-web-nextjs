import { Metadata } from "next";
import TagsTablesPage from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷  - Table",
    description: "Specify tags table",
};

const TagsTables = () => {
    return (<><TagsTablesPage /></>)
};

export default TagsTables;
