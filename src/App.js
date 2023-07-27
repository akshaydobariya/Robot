// Import required modules and components
import { Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import Footer from "./componet/Footer/Footer";
import Navbar from "./componet/Navbar/Navbar";
import Login from "./componet/login/Login";
import Register from "./componet/login/Register";
import AddRobot from "./componet/AddRobot/AddRobot";
import Home from "./componet/Home/home";
import View from "./componet/View/View";
import List from "./componet/RobotList/List";
import Shimmer from "./componet/Shimmer/shimmer";
import Error from "./componet/Error/Error";

// Main App component
const App = () => {
  return (
    <>
      {/* Render Navbar component */}
      <Navbar />
      {/* Render the child components based on the current route */}
      <Outlet />
      {/* Render Footer component */}
      <Footer />
    </>
  );
};

// Create the router configuration using createBrowserRouter
export const appRouter = createBrowserRouter([
  // Main route for the App component
  {
    path: "/",
    element: <App />,
    errorElement: <Error />, // Render Error component in case of an error
    children: [
      // Child routes for different components
      {
        path: "/", // The home route
        element: <Home />,
      },
      {
        path: "/view/:Roboid", // Route for viewing robot details with a specific ID
        element: <View />,
      },
      {
        path: "/list", // Route for displaying the list of robots
        element: <List />,
      },
      {
        path: "/addRobot", // Route for adding a new robot
        element: <AddRobot />,
      },
      {
        path: "/shimmer", // Route for displaying shimmer loading effect
        element: <Shimmer />,
      },
    ],
  },
  {
    path: "/login", // Route for user login
    element: <Login />,
  },
  {
    path: "/register", // Route for user registration
    element: <Register />,
  },
]);

export default App;
