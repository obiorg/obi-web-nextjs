

// import * as ai from "react-icons/ai";
// import * as bs from "react-icons/bs";
// import * as bi from "react-icons/bi";
// import * as ci from "react-icons/ci";
// import * as cg from "react-icons/cg";
// import * as di from "react-icons/di";
// import * as fi from "react-icons/fi";
// import * as fc from "react-icons/fc";
// import * as fa from "react-icons/fa";
// import * as fa6 from "react-icons/fa6";
// import * as gi from "react-icons/gi";
// import * as go from "react-icons/go";
// import * as gr from "react-icons/gr";
// import * as hi from "react-icons/hi";
// import * as hi2 from "react-icons/hi2";
// import * as im from "react-icons/im";
// import * as kua from "react-icons/lia";
// import * as io from "react-icons/io";
// import * as io5 from "react-icons/io5";
// import * as lu from "react-icons/lu";
// import * as md from "react-icons/md";
// import * as pi from "react-icons/pi";
// import * as rx from "react-icons/rx";
// import * as ri from "react-icons/ri";
// import * as si from "react-icons/si";
// import * as sl from "react-icons/sl";
// import * as tb from "react-icons/tb";
// import * as tfi from "react-icons/tfi";
// import * as ti from "react-icons/ti";
// import * as vsc from "react-icons/vsc";
// import * as wi from "react-icons/wi";
import Ai from "./reacticons/ai";
import Bi from "./reacticons/bi";
import Bs from "./reacticons/bs";
import Cg from "./reacticons/cg";
import Ci from "./reacticons/ci";
import Di from "./reacticons/di";
import Fa from "./reacticons/fa";
import Fa6 from "./reacticons/fa6";
import Fc from "./reacticons/fc";
import Fi from "./reacticons/fi";
import Gi from "./reacticons/gi";
import Go from "./reacticons/go";
import Gr from "./reacticons/gr";
import Hi from "./reacticons/hi";
import Hi2 from "./reacticons/hi2";
import Im from "./reacticons/im";
import Io from "./reacticons/io";
import Io5 from "./reacticons/io5";
import Lia from "./reacticons/lia";
import Lu from "./reacticons/lu";
import Md from "./reacticons/md";
import Pi from "./reacticons/pi";
import Ri from "./reacticons/ri";
import Rx from "./reacticons/rx";
import Si from "./reacticons/si";
import Sl from "./reacticons/sl";
import Tb from "./reacticons/tb";
import Tfi from "./reacticons/tfi";
import Ti from "./reacticons/ti";
import Vsc from "./reacticons/vsc";
import Wi from "./reacticons/wi";

// Define the props that the PostForm component expects
interface ReactIconsProps {
    id?: string;                         // ID of the component
    group?: string; // Name of familly default is fa6
    icon?: string; // Name of icon default FaFonticons 
    className?: string; // Default class name
}


export default function ReactIcons(
    {
        id,
        group = 'fa6',
        icon = 'FaFonctions',
        className,
    }: ReactIconsProps
) {


    const getComponent = (grp: string) => {
        switch (grp) {
            case 'ai':
                return <Ai icon={icon} className={className} />;
            case 'bi':
                return <Bi icon={icon} className={className} />;
            case 'bs':
                return <Bs icon={icon} className={className} />;
            case 'ci':
                return <Ci icon={icon} className={className} />;
            case 'cg':
                return <Cg icon={icon} className={className} />;
            case 'di':
                return <Di icon={icon} className={className} />;
            case 'fa':
                return <Fa icon={icon} className={className} />;
            case 'fa6':
                return <Fa6 icon={icon} className={className} />;
            case 'fc':
                return <Fc icon={icon} className={className} />;
            case 'fi':
                return <Fi icon={icon} className={className} />;
            case 'gi':
                return <Gi icon={icon} className={className} />;
            case 'go':
                return <Go icon={icon} className={className} />;
            case 'gr':
                return <Gr icon={icon} className={className} />;
            case 'hi':
                return <Hi icon={icon} className={className} />;
            case 'hi2':
                return <Hi2 icon={icon} className={className} />;
            case 'im':
                return <Im icon={icon} className={className} />;
            case 'io':
                return <Io icon={icon} className={className} />;
            case 'io5':
                return <Io5 icon={icon} className={className} />;
            case 'lia':
                return <Lia icon={icon} className={className} />;
            case 'lu':
                return <Lu icon={icon} className={className} />;
            case 'md':
                return <Md icon={icon} className={className} />;
            case 'pi':
                return <Pi icon={icon} className={className} />;
            case 'ri':
                return <Ri icon={icon} className={className} />;
            case 'rx':
                return <Rx icon={icon} className={className} />;
            case 'si':
                return <Si icon={icon} className={className} />;
            case 'sl':
                return <Sl icon={icon} className={className} />;
            case 'tb':
                return <Tb icon={icon} className={className} />;
            case 'tfi':
                return <Tfi icon={icon} className={className} />;
            case 'ti':
                return <Ti icon={icon} className={className} />;
            case 'vsc':
                return <Vsc icon={icon} className={className} />;
            case 'wi':
                return <Wi icon={icon} className={className} />;
        }
    };

    const component = getComponent(group);

    return (<>
        {component}
    </>);

};