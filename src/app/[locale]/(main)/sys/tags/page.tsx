import { Metadata } from "next";
import TagsPage from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 ",
    description: "Page description",
};

const Tags = () => {
    return (<><TagsPage /></>)
};

export default Tags;
