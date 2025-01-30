import { Metadata } from "next";
import TagsListCopy from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - List - Copy",
    description: "Tags List create from a copy",
};
interface TagsCopyProps {
    params: any,
}

const PageTagsListCopy = ({ params }: TagsCopyProps) => {
    return (<><TagsListCopy params={params} /></>)
};

export default PageTagsListCopy;
