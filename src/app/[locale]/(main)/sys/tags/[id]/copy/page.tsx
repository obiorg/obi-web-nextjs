import { Metadata } from "next";
import TagsCopy from "./_page";


export const metadata: Metadata = {
    title: "Tags 🏷 - Copy",
    description: "Tags create a copy",
};
interface TagsCopyProps {
    params: any,
    // updatePost: (id: string, data: OBI.Localisations.Location) => void;
}

const PageCopy = ({ params }: TagsCopyProps) => {
    return (<><TagsCopy params={params} /></>)
};

export default PageCopy;
