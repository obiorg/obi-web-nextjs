import { Metadata } from "next";
import MachinesCopy from "./_page";


export const metadata: Metadata = {
    title: "Machines 🚇 - Copy",
    description: "Machine create a copy",
};
interface MachinesCopyProps {
    params: any,
}

const PageMachinesCopy = ({ params }: MachinesCopyProps) => {
    return (<><MachinesCopy params={params} /></>)
};

export default PageMachinesCopy;
