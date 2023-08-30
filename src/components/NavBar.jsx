import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);

    const handleClickLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error.code);
        }
    };

    const classButtonBlue =
        "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

    const classButtonRed =
        "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";

    const classButtonGreen = 
        "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Cooperativa Pangea
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <>
                            <NavLink to="/" className={classButtonBlue}>
                                Inicio
                            </NavLink>
                            <button
                                onClick={handleClickLogout}
                                className={classButtonRed}
                            >
                                Cerrar Sesion
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={classButtonBlue}>
                                Iniciar Sesion
                            </NavLink>
                            <NavLink to="/register" className={classButtonGreen}>
                                Registrarse
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
