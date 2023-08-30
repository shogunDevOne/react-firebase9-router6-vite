import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => { 
    return (
        <>
            <div className="flex justify-center">
                <img src="/prometeus.jpg" alt="" className="w-56 h-auto  rounded" />
            </div>
            <div className="w-96 mx-auto">
                <Outlet />
            </div>
            
        </>
    )
 }

 export default LayoutContainerForm;