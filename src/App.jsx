import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
import Perfil from "./routes/Perfil";

import Navbar from "./components/NavBar";
import LayoutRequireAuth from "./layouts/LayoutRequireAuth";
import LayoutContainerForm from "./layouts/LayoutContainerForm";
import LayoutRedirect from "./layouts/LayoutRedirect";



const App = () => {

  const {user} = useContext(UserContext)

  if(user === false)
    return <p>Loading...</p>


  return (
    <>
        <Navbar />
        <Routes>

              <Route path="/" element={<LayoutRequireAuth/>}>
                <Route index element={<Home/>} />
                <Route path="/perfil" element={<Perfil/>} />
              </Route>


              <Route path="/" element={<LayoutContainerForm/>}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Route>

              <Route path="/:nanoid" element={<LayoutRedirect/>}>
                  <Route index element={<NotFound />} />
              </Route>

              
        </Routes>
    </>
  );
};

export default App;