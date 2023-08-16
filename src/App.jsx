import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
import RequireAuth from "./components/RequireAuth";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";


const App = () => {

  const {user} = useContext(UserContext)

  if(user === false)
    return <p>Loading...</p>


  return (
    <>
      <Navbar />
      <h1>APP</h1>
      <Routes>
        <Route
          path="/"
          element={
          <RequireAuth> 
              <Home/>
          </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;