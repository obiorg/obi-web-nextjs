import { Metadata } from "next";
import TagsList from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - List",
    description: "Describe list of a tag",
};

const PageTagsList = () => {
    return (<><TagsList /></>)
};

export default PageTagsList;
