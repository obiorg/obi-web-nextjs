import { Metadata } from "next";
import MachinesUpdate from "./_page";


export const metadata: Metadata = {
    title: "Machines 🏭 - Update",
    description: "Update a machine",
};
interface MachinesUpdateProps {
    params: any,
}

const PageUpdate = ({ params }: MachinesUpdateProps) => {
    return (<><MachinesUpdate params={params} /></>)
};

export default PageUpdate;
