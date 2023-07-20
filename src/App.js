import { Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import Footer from "./componet/Footer/Footer";
import Navbar from "./componet/Navbar/Navbar";
import Login from "./componet/login/Login";
import Register from "./componet/login/Register";
import AddRobot from "./componet/AddRobot/AddRobot";
import Home from "./componet/Home/home";
import View from "./componet/View/View";
import List from "./componet/RobotList/List";
import Shimmer from "./componet/Shimmer/shimmer";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRobotData());
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/view/:Roboid",
        element: <View />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/addRobot",
        element: <AddRobot />,
      },
      {
        path:"/shimmer",
        element: <Shimmer/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default App;
