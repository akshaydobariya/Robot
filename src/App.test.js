import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Login from "./componet/login/Login";
import Register from "./componet/login/Register";
import { logout } from "./State/features/LoginSlice";
import Navbar from "./componet/Navbar/Navbar";

// Create a mock store with Redux mock store library
const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    // Initialize the store with the desired state
    store = mockStore({
      login: {
        loginData: null, // You can add any initial state required for testing
      },
    });
  });

  test("renders login text", () => {
    // Render the Login component within the Provider and MemoryRouter with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check if the login text is present in the rendered component
    expect(screen.getByText("Welcome-Back")).toBeInTheDocument();
    expect(screen.getByText("Sign in with")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
});

describe("Register Component", () => {
  let store;

  beforeEach(() => {
    // Initialize the store with the desired state
    store = mockStore({
      login: {
        registrationData: null, // You can add any initial state required for testing
      },
    });
  });

  test("renders register text and form fields", () => {
    // Render the Register component within the Provider and MemoryRouter with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    // Check if the register text and form fields are present in the rendered component
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Sign Up with")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
});

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    // Initialize the store with the desired state
    store = mockStore({
      login: {
        accessToken: null, // Set to null to simulate logged-out state
      },
    });
  });

  test("renders login and register links when not logged in", () => {
    // Render the Navbar component within the Provider and MemoryRouter with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check if login and register links are present
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();

    // Logout button should not be present
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
  });

  test("renders logout button when logged in", () => {
    // Set the accessToken to a non-null value to simulate logged-in state
    store = mockStore({
      login: {
        accessToken: "some-access-token", // Set a non-null value to simulate logged-in state
      },
    });

    // Render the Navbar component within the Provider and MemoryRouter with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check if the logout button is present
    expect(screen.getByText("Log Out")).toBeInTheDocument();

    // Login and register links should not be present
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
  });

  test("dispatches logout action when clicking the logout button", () => {
    // Set the accessToken to a non-null value to simulate logged-in state
    store = mockStore({
      login: {
        accessToken: "some-access-token", // Set a non-null value to simulate logged-in state
      },
    });

    // Render the Navbar component within the Provider and MemoryRouter with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Click the logout button to log out
    fireEvent.click(screen.getByText("Log Out"));

    // Check if the logout action has been dispatched
    expect(store.getActions()).toContainEqual(logout());
  });
});
